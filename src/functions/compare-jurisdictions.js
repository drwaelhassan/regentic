/**
 * @Compare_Jurisdictions — Comparative analysis of two jurisdictions
 * Maps equivalences, identifies gaps and conflicts, recommends highest-common-denominator
 */

import { resolveConflict } from '../core/defeasibility.js';

/**
 * @Compare_Jurisdictions(jurisdiction_A, jurisdiction_B, domain)
 */
export function compareJurisdictions(modelA, modelB, domain = 'All') {
    const report = {
        jurisdiction_a: modelA.jurisdiction,
        jurisdiction_b: modelB.jurisdiction,
        domain,
        timestamp: new Date().toISOString(),
        equivalences: [],
        gaps_a: [],
        gaps_b: [],
        conflicts: [],
        recommendations: [],
    };

    // Find equivalences
    const entitiesA = new Map((modelA.entities || []).map(e => [e.id, e]));
    const entitiesB = new Map((modelB.entities || []).map(e => [e.id, e]));

    // Check existing equivalence relations
    const equivRelations = [
        ...(modelA.relations || []).filter(r => ['EquRole', 'EquActivity', 'EquProcess'].includes(r.type)),
        ...(modelB.relations || []).filter(r => ['EquRole', 'EquActivity', 'EquProcess'].includes(r.type)),
    ];

    for (const eq of equivRelations) {
        report.equivalences.push({
            type: eq.type,
            entity_a: eq.source,
            entity_b: eq.target,
            name_a: entitiesA.get(eq.source)?.name || eq.source,
            name_b: entitiesB.get(eq.target)?.name || eq.target,
        });
    }

    // Auto-match by name similarity
    for (const [idA, entityA] of entitiesA) {
        let matched = false;
        for (const [idB, entityB] of entitiesB) {
            if (entityA.type === entityB.type && areSimilar(entityA.name, entityB.name)) {
                if (!report.equivalences.some(e => e.entity_a === idA || e.entity_b === idB)) {
                    report.equivalences.push({
                        type: `Equ${entityA.type}`,
                        entity_a: idA, entity_b: idB,
                        name_a: entityA.name, name_b: entityB.name,
                        auto_matched: true,
                    });
                    matched = true;
                    break;
                }
            }
        }
        if (!matched) {
            report.gaps_b.push({
                entity_id: idA,
                entity_name: entityA.name,
                entity_type: entityA.type,
                message: `${entityA.name} exists in ${modelA.jurisdiction.name} but has no equivalent in ${modelB.jurisdiction.name}`,
            });
        }
    }

    for (const [idB, entityB] of entitiesB) {
        if (!report.equivalences.some(e => e.entity_b === idB)) {
            report.gaps_a.push({
                entity_id: idB,
                entity_name: entityB.name,
                entity_type: entityB.type,
                message: `${entityB.name} exists in ${modelB.jurisdiction.name} but has no equivalent in ${modelA.jurisdiction.name}`,
            });
        }
    }

    // Compare policies
    comparePolicies(modelA, modelB, report);

    // Generate recommendations
    generateRecommendations(report);

    return report;
}

function areSimilar(nameA, nameB) {
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalize(nameA) === normalize(nameB) ||
        normalize(nameA).includes(normalize(nameB)) ||
        normalize(nameB).includes(normalize(nameA));
}

function comparePolicies(modelA, modelB, report) {
    const policiesA = modelA.policies || [];
    const policiesB = modelB.policies || [];

    for (const polA of policiesA) {
        for (const polB of policiesB) {
            if (polA.type === polB.type && polA.source === polB.source && polA.target === polB.target) {
                if (polA.allow_deny !== polB.allow_deny) {
                    report.conflicts.push({
                        type: polA.type,
                        entity: polA.source,
                        jurisdiction_a_policy: polA.allow_deny,
                        jurisdiction_b_policy: polB.allow_deny,
                        message: `Conflicting ${polA.type} policy: ${modelA.jurisdiction.name} says ${polA.allow_deny}, ${modelB.jurisdiction.name} says ${polB.allow_deny}`,
                    });
                }
            }
        }
    }
}

function generateRecommendations(report) {
    if (report.conflicts.length > 0) {
        report.recommendations.push({
            priority: 'Critical',
            action: 'Resolve policy conflicts using highest-common-denominator approach',
            detail: `${report.conflicts.length} conflicting policies detected. Apply the stricter standard to ensure compliance across both jurisdictions.`,
        });
    }
    if (report.gaps_a.length > 0) {
        report.recommendations.push({
            priority: 'Major',
            action: `Add ${report.gaps_a.length} missing entities to match ${report.jurisdiction_a?.name} requirements`,
            detail: report.gaps_a.map(g => g.entity_name).join(', '),
        });
    }
    if (report.gaps_b.length > 0) {
        report.recommendations.push({
            priority: 'Major',
            action: `Add ${report.gaps_b.length} missing entities to match ${report.jurisdiction_b?.name} requirements`,
            detail: report.gaps_b.map(g => g.entity_name).join(', '),
        });
    }
    if (report.equivalences.length > 0) {
        report.recommendations.push({
            priority: 'Info',
            action: 'Use equivalence mappings to avoid duplicate policy definitions',
            detail: `${report.equivalences.length} equivalences identified that can streamline compliance`,
        });
    }
}

export default { compareJurisdictions };
