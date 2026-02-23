/**
 * @Deprecate_Rule — Remove a specific rule and associated checks without disrupting ontology
 */

/**
 * @Deprecate_Rule(rule_id, reason)
 * @param {Object} model - GAL-JSON model to modify
 * @param {string} ruleId - ID of the rule to deprecate
 * @param {string} reason - Reason for deprecation
 * @returns {Object} Modified model + deprecation report
 */
export function deprecateRule(model, ruleId, reason) {
    const report = {
        rule_id: ruleId,
        reason,
        timestamp: new Date().toISOString(),
        entities_removed: [],
        relations_removed: [],
        policies_removed: [],
        checks_removed: [],
        downstream_effects: [],
    };

    // Find the rule entity
    const ruleEntity = (model.entities || []).find(e => e.id === ruleId);
    if (!ruleEntity) {
        return { model, report: { ...report, error: `Rule ${ruleId} not found in model` } };
    }

    // Mark entity as deprecated (don't remove, add deprecation flag)
    ruleEntity._deprecated = true;
    ruleEntity._deprecation_reason = reason;
    ruleEntity._deprecation_date = report.timestamp;
    report.entities_removed.push(ruleEntity.id);

    // Find and remove related relations
    const newRelations = [];
    for (const rel of (model.relations || [])) {
        if (rel.source === ruleId || rel.target === ruleId) {
            report.relations_removed.push({
                type: rel.type,
                source: rel.source,
                target: rel.target,
            });
            // Check for downstream effects
            if (rel.type === 'Prefers' || rel.type === 'Rebuts' || rel.type === 'Undercuts') {
                report.downstream_effects.push({
                    type: 'DEFEASIBILITY_CHANGE',
                    affected_rule: rel.target === ruleId ? rel.source : rel.target,
                    message: `Removing ${rel.type} relation may alter defeasibility status of ${rel.target === ruleId ? rel.source : rel.target}`,
                });
            }
        } else {
            newRelations.push(rel);
        }
    }
    model.relations = newRelations;

    // Find and remove related policies  
    const newPolicies = [];
    for (const pol of (model.policies || [])) {
        if (pol.parameters?.legal_basis === ruleId ||
            pol.source === ruleId || pol.target === ruleId) {
            report.policies_removed.push({
                type: pol.type,
                source: pol.source,
                target: pol.target,
            });
        } else {
            newPolicies.push(pol);
        }
    }
    model.policies = newPolicies;

    // Find and remove related validation checks
    const newChecks = [];
    for (const check of (model.validation_checks || [])) {
        if (check.source === ruleId || check.target === ruleId ||
            check.label.includes(ruleId)) {
            report.checks_removed.push({
                check_type: check.check_type,
                label: check.label,
            });
        } else {
            newChecks.push(check);
        }
    }
    model.validation_checks = newChecks;

    return { model, report };
}

export default { deprecateRule };
