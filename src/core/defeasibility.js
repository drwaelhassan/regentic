/**
 * Defeasibility Engine — Non-Monotonic Legal Reasoning
 * Implements defeat mechanisms, conflict resolution meta-principles,
 * default hierarchies, and Sartor's inferential strength classification
 */

// ─── Defeat Mechanisms ──────────────────────────────────────────────────────────

/**
 * Evaluate defeasibility relationships within a model
 * Returns resolved rules with defeat annotations
 */
export function evaluateDefeasibility(model) {
    const rules = indexRules(model);
    const defeats = indexDefeats(model);
    const preferences = indexPreferences(model);
    const results = [];

    for (const rule of rules) {
        const status = resolveRuleStatus(rule, defeats, preferences, rules);
        results.push({
            rule_id: rule.id,
            rule_name: rule.name,
            inferential_strength: rule.subtype === 'Strict' ? 'Strict' : 'Defeasible',
            status: status.active ? 'Active' : 'Defeated',
            defeated_by: status.defeated_by,
            defeat_mechanism: status.mechanism,
            reinstated: status.reinstated,
            reinstated_by: status.reinstated_by,
        });
    }

    return results;
}

function indexRules(model) {
    return (model.entities || []).filter(e => e.type === 'Rule');
}

function indexDefeats(model) {
    return (model.relations || []).filter(
        r => r.type === 'Rebuts' || r.type === 'Undercuts'
    );
}

function indexPreferences(model) {
    return (model.relations || []).filter(r => r.type === 'Prefers');
}

function resolveRuleStatus(rule, defeats, preferences, allRules) {
    // Check if this rule is defeated
    const directDefeats = defeats.filter(d => d.target === rule.id);

    if (directDefeats.length === 0) {
        return { active: true, defeated_by: null, mechanism: null, reinstated: false, reinstated_by: null };
    }

    for (const defeat of directDefeats) {
        const attacker = allRules.find(r => r.id === defeat.source);
        if (!attacker) continue;

        // Check if attacker has superiority via preferences
        const hasPreference = preferences.some(
            p => p.source === defeat.source && p.target === rule.id
        );

        // Rebutting: two rules lead to mutually exclusive conclusions
        if (defeat.type === 'Rebuts') {
            // Check if the defending rule has a preference over the attacker
            const defensePreference = preferences.some(
                p => p.source === rule.id && p.target === defeat.source
            );
            if (defensePreference) {
                continue; // Defense wins via preference
            }
            if (hasPreference) {
                // Check for reinstatement: is the attacker itself defeated?
                const attackerDefeats = defeats.filter(d => d.target === defeat.source);
                if (attackerDefeats.length > 0) {
                    const reinstater = attackerDefeats[0];
                    return {
                        active: true,
                        defeated_by: defeat.source,
                        mechanism: 'Rebutting',
                        reinstated: true,
                        reinstated_by: reinstater.source,
                    };
                }
                return {
                    active: false,
                    defeated_by: defeat.source,
                    mechanism: 'Rebutting',
                    reinstated: false,
                    reinstated_by: null,
                };
            }
        }

        // Undercutting: attacks the inferential link
        if (defeat.type === 'Undercuts') {
            const condition = defeat.parameters?.condition;
            // Undercutting is effective if the exceptional condition holds
            return {
                active: false,
                defeated_by: defeat.source,
                mechanism: 'Undercutting',
                reinstated: false,
                reinstated_by: null,
            };
        }
    }

    return { active: true, defeated_by: null, mechanism: null, reinstated: false, reinstated_by: null };
}

// ─── Conflict Resolution Meta-Principles ────────────────────────────────────────

export const ConflictResolvers = {
    /**
     * Lex Specialis: Specific law overrides general
     * e.g., HIPAA overrides general state privacy for PHI
     */
    LexSpecialis(ruleA, ruleB) {
        const specificity = (r) => {
            let score = 0;
            if (r.jurisdiction) score += 2;
            if (r.subtype) score += 1;
            if (r.description && r.description.length > 50) score += 1;
            return score;
        };
        const sA = specificity(ruleA);
        const sB = specificity(ruleB);
        if (sA > sB) return { winner: ruleA, loser: ruleB, principle: 'LexSpecialis' };
        if (sB > sA) return { winner: ruleB, loser: ruleA, principle: 'LexSpecialis' };
        return null; // Cannot resolve
    },

    /**
     * Lex Posterior: Later law overrides earlier
     * e.g., CPRA amendments override original CCPA
     */
    LexPosterior(ruleA, ruleB, dateA, dateB) {
        if (!dateA || !dateB) return null;
        const dA = new Date(dateA);
        const dB = new Date(dateB);
        if (dA > dB) return { winner: ruleA, loser: ruleB, principle: 'LexPosterior' };
        if (dB > dA) return { winner: ruleB, loser: ruleA, principle: 'LexPosterior' };
        return null;
    },

    /**
     * Lex Superior: Higher-level law overrides lower
     * Priority: Supranational > Federal > State/Provincial > Municipal > Emirate
     */
    LexSuperior(ruleA, ruleB) {
        const hierarchy = {
            'Supranational': 5,
            'Federal': 4,
            'State': 3,
            'Provincial': 3,
            'Municipal': 2,
            'Emirate': 2,
        };
        const levelA = hierarchy[ruleA.jurisdiction_level] || 0;
        const levelB = hierarchy[ruleB.jurisdiction_level] || 0;
        if (levelA > levelB) return { winner: ruleA, loser: ruleB, principle: 'LexSuperior' };
        if (levelB > levelA) return { winner: ruleB, loser: ruleA, principle: 'LexSuperior' };
        return null;
    },

    /**
     * Value-Preference: Values hierarchy resolves conflict
     * e.g., PublicSafety > TrafficEfficiency
     */
    ValuePreference(ruleA, ruleB, valuePreferences) {
        if (!valuePreferences || valuePreferences.length === 0) return null;
        // Check if there's a direct preference between the values backing these rules
        for (const vp of valuePreferences) {
            if (vp.preferred === ruleA.value && vp.over === ruleB.value) {
                return { winner: ruleA, loser: ruleB, principle: 'Value-Preference' };
            }
            if (vp.preferred === ruleB.value && vp.over === ruleA.value) {
                return { winner: ruleB, loser: ruleA, principle: 'Value-Preference' };
            }
        }
        return null;
    },

    /**
     * Jurisdictional Primacy: Multi-state operations use highest-common-denominator
     * or consumer-location-based applicability
     */
    JurisdictionalPrimacy(ruleA, ruleB, operatingJurisdictions = []) {
        // If one rule's jurisdiction is in the operating set and the other is not
        const aApplies = operatingJurisdictions.includes(ruleA.jurisdiction);
        const bApplies = operatingJurisdictions.includes(ruleB.jurisdiction);
        if (aApplies && !bApplies) return { winner: ruleA, loser: ruleB, principle: 'JurisdictionalPrimacy' };
        if (bApplies && !aApplies) return { winner: ruleB, loser: ruleA, principle: 'JurisdictionalPrimacy' };
        return null; // Both apply or neither — highest common denominator needed
    },
};

/**
 * Resolve a conflict between two rules using all available meta-principles
 * Attempts resolution in order: LexSpecialis → LexPosterior → LexSuperior → Value-Preference
 */
export function resolveConflict(ruleA, ruleB, context = {}) {
    const resolvers = [
        () => ConflictResolvers.LexSpecialis(ruleA, ruleB),
        () => ConflictResolvers.LexPosterior(ruleA, ruleB, context.dateA, context.dateB),
        () => ConflictResolvers.LexSuperior(ruleA, ruleB),
        () => ConflictResolvers.ValuePreference(ruleA, ruleB, context.valuePreferences),
        () => ConflictResolvers.JurisdictionalPrimacy(ruleA, ruleB, context.operatingJurisdictions),
    ];

    for (const resolver of resolvers) {
        const result = resolver();
        if (result) return result;
    }

    return {
        winner: null, loser: null,
        principle: 'UNRESOLVED',
        message: `Cannot resolve conflict between ${ruleA.id} and ${ruleB.id} — requires manual adjudication`,
    };
}

// ─── Hohfeldian Modality Consistency ────────────────────────────────────────────

export const HohfeldianCorrelatives = {
    'Duty': 'Claim-Right',
    'Claim-Right': 'Duty',
    'Privilege': 'No-Right',
    'No-Right': 'Privilege',
    'Power': 'Liability',
    'Liability': 'Power',
    'Immunity': 'Disability',
    'Disability': 'Immunity',
};

export const HohfeldianOpposites = {
    'Duty': 'Privilege',
    'Privilege': 'Duty',
    'Claim-Right': 'No-Right',
    'No-Right': 'Claim-Right',
    'Power': 'Disability',
    'Disability': 'Power',
    'Immunity': 'Liability',
    'Liability': 'Immunity',
};

/**
 * Check Hohfeldian modality consistency across policies
 * Ensures correlative modalities are properly paired
 */
export function checkPotestativeConsistency(policies) {
    const violations = [];

    for (let i = 0; i < policies.length; i++) {
        for (let j = i + 1; j < policies.length; j++) {
            const a = policies[i];
            const b = policies[j];

            // Check if they reference the same subject-object pair (reversed)
            if (a.source === b.target && a.target === b.source) {
                // Correlative check: if A has Duty, B should have Claim-Right
                const expectedCorrelative = HohfeldianCorrelatives[a.hohfeldian_modality];
                if (expectedCorrelative && b.hohfeldian_modality !== expectedCorrelative && b.hohfeldian_modality !== 'None') {
                    violations.push({
                        type: 'HOHFELDIAN_MISMATCH',
                        policy_a: a,
                        policy_b: b,
                        expected: expectedCorrelative,
                        actual: b.hohfeldian_modality,
                        message: `${a.source} has ${a.hohfeldian_modality} toward ${a.target}, but ${b.source} has ${b.hohfeldian_modality} instead of expected correlative ${expectedCorrelative}`,
                    });
                }

                // Opposite check: cannot have both a modality and its opposite
                const opposite = HohfeldianOpposites[a.hohfeldian_modality];
                if (opposite && b.hohfeldian_modality === opposite) {
                    violations.push({
                        type: 'HOHFELDIAN_CONTRADICTION',
                        policy_a: a,
                        policy_b: b,
                        message: `${a.source} has both ${a.hohfeldian_modality} and ${opposite} toward ${a.target} — logical contradiction`,
                    });
                }
            }
        }
    }

    return violations;
}

// ─── Default Hierarchy ──────────────────────────────────────────────────────────

/**
 * Build a default hierarchy from rules and their defeat relations
 * General defaults at the top, specific exceptions layered below
 */
export function buildDefaultHierarchy(model) {
    const rules = indexRules(model);
    const defeats = indexDefeats(model);
    const preferences = indexPreferences(model);

    const hierarchy = { nodes: [], edges: [] };

    for (const rule of rules) {
        const node = {
            id: rule.id,
            name: rule.name,
            strength: rule.subtype === 'Strict' ? 'Strict' : 'Defeasible',
            level: 0,
        };

        // Determine level based on defeats
        const defeatedBy = defeats.filter(d => d.target === rule.id);
        const defeats_others = defeats.filter(d => d.source === rule.id);

        node.level = defeats_others.length - defeatedBy.length;
        hierarchy.nodes.push(node);

        for (const d of defeatedBy) {
            hierarchy.edges.push({
                from: d.source,
                to: rule.id,
                type: d.type,
            });
        }
    }

    // Sort nodes by level (general → specific)
    hierarchy.nodes.sort((a, b) => b.level - a.level);

    return hierarchy;
}
