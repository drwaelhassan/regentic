/**
 * @Read_Policy_To_GAM — Parse corporate/fleet/privacy/financial policy → GAL-JSON Enterprise_Model (Φ_E)
 * Same pipeline as Read_Law minus validation check generation
 */

import { createModel } from '../core/schema.js';
import { extractPatterns } from '../pipeline/phase1-extractor.js';
import { translatePatterns } from '../pipeline/phase2-translator.js';

/**
 * @Read_Policy_To_GAM(corporate_policy_text)
 * @param {string} policyText - Corporate/fleet/privacy/financial policy text
 * @param {Object} options - { jurisdiction, domains, effective_date }
 * @returns {Object} GAL-JSON Enterprise_Model (no validation_checks)
 */
export function readPolicyToGAM(policyText, options = {}) {
    const jurisdiction = options.jurisdiction || { country: 'OTHER', level: 'Federal', name: '' };

    // Phase 1: Pattern Extraction
    const phase1 = extractPatterns(policyText, {
        jurisdiction: jurisdiction.name,
        domain: options.domains?.[0] || 'All',
    });

    // Phase 2: GAL Translation
    const phase2 = translatePatterns(phase1.patterns, phase1.entityIndex);

    // Combine entities
    const allEntities = [...phase1.entities, ...phase2.newEntities];

    // Build Enterprise Model (NO validation checks)
    return createModel('Enterprise_Model', `Policy: ${policyText.substring(0, 100)}...`, jurisdiction, {
        effective_date: options.effective_date || new Date().toISOString().split('T')[0],
        domains: options.domains || ['All'],
        entities: allEntities,
        relations: phase2.relations,
        policies: phase2.policies,
    });
}

/**
 * Build an Enterprise Model from pre-structured policy definitions
 */
export function buildEnterpriseModel(context, jurisdiction, definitions) {
    return createModel('Enterprise_Model', context, jurisdiction, {
        effective_date: definitions.effective_date,
        domains: definitions.domains || ['All'],
        entities: definitions.entities || [],
        relations: definitions.relations || [],
        policies: definitions.policies || [],
    });
}

export default { readPolicyToGAM, buildEnterpriseModel };
