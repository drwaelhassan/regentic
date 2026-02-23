/**
 * @Validate_Compliance — Formal mathematical compliance validation
 * Con(Φ_E ∧ Φ_L) + Ontology Audit + Scenario Audit + Completeness Audit
 */

import { ConsistencyChecker } from '../core/consistency-checker.js';
import { evaluateDefeasibility, checkPotestativeConsistency, resolveConflict } from '../core/defeasibility.js';
import { executeChecks } from '../pipeline/phase3-validator.js';
import { mergeModels } from '../core/schema.js';

/**
 * @Validate_Compliance(Law_Model, Enterprise_Model)
 * @param {Object} lawModel - GAL-JSON Law_Model (Φ_L)
 * @param {Object} enterpriseModel - GAL-JSON Enterprise_Model (Φ_E)
 * @returns {Object} Comprehensive Compliance Audit Report
 */
export function validateCompliance(lawModel, enterpriseModel) {
    const report = {
        timestamp: new Date().toISOString(),
        law_context: lawModel.context,
        enterprise_context: enterpriseModel.context,
        overall_status: 'PENDING',
        sections: {},
    };

    // 1. Consistency Analysis: Con(Φ_E ∧ Φ_L)
    const checker = new ConsistencyChecker();
    const consistencyResult = checker.check(lawModel, enterpriseModel);
    report.sections.consistency = {
        title: 'Consistency Analysis',
        result: consistencyResult.consistent ? 'PASS' : 'FAIL',
        violations: consistencyResult.violations,
        solver_stats: consistencyResult.stats,
        detail: consistencyResult.consistent
            ? 'Con(Φ_E ∧ Φ_L) holds — no logical contradictions detected'
            : `Con(Φ_E ∧ Φ_L) FAILS — ${consistencyResult.violations.length} contradiction(s) detected`,
    };

    // 2. Ontology Audit: Entity completeness
    const ontologyResult = auditOntology(lawModel, enterpriseModel);
    report.sections.ontology = {
        title: 'Ontology Audit',
        result: ontologyResult.gaps.length === 0 ? 'PASS' : 'FAIL',
        gaps: ontologyResult.gaps,
        coverage: ontologyResult.coverage,
    };

    // 3. Scenario Audit: Execute all validation checks
    const combinedModel = mergeModels(lawModel, enterpriseModel);
    const checkResults = executeChecks(lawModel.validation_checks || [], combinedModel);
    const passed = checkResults.filter(r => r.result === 'PASS').length;
    const failed = checkResults.filter(r => r.result === 'FAIL').length;
    const indeterminate = checkResults.filter(r => r.result === 'INDETERMINATE').length;
    report.sections.scenario = {
        title: 'Scenario Audit',
        result: failed === 0 ? 'PASS' : 'FAIL',
        total_checks: checkResults.length,
        passed, failed, indeterminate,
        checks: checkResults,
    };

    // 4. Access & Potestative Audit
    const potestativeViolations = checkPotestativeConsistency([
        ...(lawModel.policies || []),
        ...(enterpriseModel.policies || []),
    ]);
    report.sections.potestative = {
        title: 'Access & Potestative Audit',
        result: potestativeViolations.length === 0 ? 'PASS' : 'FAIL',
        violations: potestativeViolations,
    };

    // 5. Defeasibility Audit
    const defeasibilityResults = evaluateDefeasibility(lawModel);
    const defeatedRules = defeasibilityResults.filter(r => r.status === 'Defeated');
    report.sections.defeasibility = {
        title: 'Defeasibility Audit',
        total_rules: defeasibilityResults.length,
        active_rules: defeasibilityResults.filter(r => r.status === 'Active').length,
        defeated_rules: defeatedRules.length,
        reinstated_rules: defeasibilityResults.filter(r => r.reinstated).length,
        details: defeasibilityResults,
    };

    // 6. Completeness Audit
    const completenessResult = auditCompleteness(lawModel, enterpriseModel);
    report.sections.completeness = {
        title: 'Completeness Audit',
        result: completenessResult.gaps.length === 0 ? 'PASS' : 'FAIL',
        gaps: completenessResult.gaps,
    };

    // 7. Executive Summary
    const allSections = Object.values(report.sections);
    const failedSections = allSections.filter(s => s.result === 'FAIL');
    report.overall_status = failedSections.length === 0 ? 'COMPLIANT' : 'NON_COMPLIANT';
    report.executive_summary = {
        overall: report.overall_status,
        total_sections: allSections.length,
        passed_sections: allSections.filter(s => s.result === 'PASS').length,
        failed_sections: failedSections.length,
        critical_violations: [
            ...consistencyResult.violations.filter(v => v.severity === 'Critical'),
            ...potestativeViolations.filter(v => v.type === 'HOHFELDIAN_CONTRADICTION'),
            ...checkResults.filter(r => r.result === 'FAIL' && r.severity === 'Critical'),
        ],
        summary: failedSections.length === 0
            ? 'Enterprise model is compliant with all legal requirements'
            : `Enterprise model has ${failedSections.length} compliance failure(s) requiring remediation`,
    };

    return report;
}

// ─── Supporting Audits ──────────────────────────────────────────────────────────

function auditOntology(lawModel, enterpriseModel) {
    const lawEntities = new Map((lawModel.entities || []).map(e => [e.id, e]));
    const enterpriseEntities = new Set((enterpriseModel.entities || []).map(e => e.id));
    const gaps = [];

    // Check that all required roles/processes in law are present in enterprise
    for (const [id, entity] of lawEntities) {
        if (entity.type === 'DepartmentRole' || entity.type === 'Process') {
            // Look for equivalent in enterprise (exact match or equivalence relation)
            const hasEquiv = (lawModel.relations || []).some(
                r => (r.type === 'EquRole' || r.type === 'EquProcess') &&
                    (r.source === id || r.target === id)
            );
            if (!enterpriseEntities.has(id) && !hasEquiv) {
                gaps.push({
                    type: 'MISSING_ENTITY',
                    entity_id: id,
                    entity_name: entity.name,
                    entity_type: entity.type,
                    message: `Law requires ${entity.type} "${entity.name}" but not found in enterprise model`,
                });
            }
        }
    }

    const coverage = {
        law_entities: lawEntities.size,
        enterprise_entities: enterpriseEntities.size,
        matched: lawEntities.size - gaps.length,
        coverage_pct: lawEntities.size > 0
            ? Math.round(((lawEntities.size - gaps.length) / lawEntities.size) * 100)
            : 100,
    };

    return { gaps, coverage };
}

function auditCompleteness(lawModel, enterpriseModel) {
    const gaps = [];

    // Check for unimplemented mandatory assignments
    const lawAssignments = (lawModel.relations || []).filter(r => r.type === 'AssignedTo');
    const enterpriseAssignments = new Set(
        (enterpriseModel.relations || [])
            .filter(r => r.type === 'AssignedTo')
            .map(r => `${r.source}:${r.target}`)
    );

    for (const la of lawAssignments) {
        if (!enterpriseAssignments.has(`${la.source}:${la.target}`)) {
            gaps.push({
                type: 'UNIMPLEMENTED_ASSIGNMENT',
                role: la.source,
                activity: la.target,
                message: `Assignment ${la.source} → ${la.target} required by law but not implemented`,
            });
        }
    }

    // Check for mandatory reporting requirements
    const lawReporting = (lawModel.relations || []).filter(r => r.type === 'MustReport');
    const enterpriseReporting = new Set(
        (enterpriseModel.relations || [])
            .filter(r => r.type === 'MustReport')
            .map(r => `${r.source}:${r.target}`)
    );

    for (const lr of lawReporting) {
        if (!enterpriseReporting.has(`${lr.source}:${lr.target}`)) {
            gaps.push({
                type: 'MISSING_REPORTING',
                source: lr.source,
                target: lr.target,
                message: `Mandatory reporting ${lr.source} → ${lr.target} not implemented`,
            });
        }
    }

    // Check for missing sequential requirements
    const lawSequences = (lawModel.relations || []).filter(r => r.type === 'Next');
    const enterpriseSequences = new Set(
        (enterpriseModel.relations || [])
            .filter(r => r.type === 'Next')
            .map(r => `${r.source}:${r.target}`)
    );

    for (const ls of lawSequences) {
        if (!enterpriseSequences.has(`${ls.source}:${ls.target}`)) {
            gaps.push({
                type: 'MISSING_SEQUENCE',
                predecessor: ls.source,
                successor: ls.target,
                message: `Sequential requirement ${ls.source} → ${ls.target} not implemented`,
            });
        }
    }

    return { gaps };
}

export default { validateCompliance };
