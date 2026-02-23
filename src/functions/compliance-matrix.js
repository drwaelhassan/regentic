/**
 * @Generate_Compliance_Matrix — Map all legal requirements to enterprise controls
 */

/**
 * @Generate_Compliance_Matrix(enterprise_scope)
 * @param {Object} lawModel - GAL-JSON Law_Model
 * @param {Object} enterpriseModel - GAL-JSON Enterprise_Model
 * @returns {Object} Compliance matrix mapping requirements → controls
 */
export function generateComplianceMatrix(lawModel, enterpriseModel) {
    const matrix = {
        timestamp: new Date().toISOString(),
        scope: enterpriseModel.context,
        jurisdiction: lawModel.jurisdiction,
        rows: [],
        summary: { total: 0, covered: 0, gaps: 0, partial: 0 },
    };

    const enterpriseRoles = new Set((enterpriseModel.entities || []).filter(e => e.type === 'DepartmentRole').map(e => e.id));
    const enterpriseProcesses = new Set((enterpriseModel.entities || []).filter(e => e.type === 'Process').map(e => e.id));
    const enterpriseActivities = new Set((enterpriseModel.entities || []).filter(e => e.type === 'Activity').map(e => e.id));
    const enterpriseRelations = new Map();
    for (const rel of (enterpriseModel.relations || [])) {
        const key = `${rel.type}:${rel.source}:${rel.target}`;
        enterpriseRelations.set(key, rel);
    }
    const enterprisePolicies = new Map();
    for (const pol of (enterpriseModel.policies || [])) {
        const key = `${pol.type}:${pol.source}:${pol.target}`;
        enterprisePolicies.set(key, pol);
    }

    // Map each law requirement to enterprise controls
    // 1. Role requirements
    for (const entity of (lawModel.entities || [])) {
        if (entity.type === 'DepartmentRole') {
            const covered = enterpriseRoles.has(entity.id);
            matrix.rows.push({
                requirement_type: 'Role',
                requirement_id: entity.id,
                requirement_name: entity.name,
                jurisdiction: entity.jurisdiction || lawModel.jurisdiction.name,
                enterprise_control: covered ? entity.id : null,
                status: covered ? 'COVERED' : 'GAP',
            });
        }
    }

    // 2. Process requirements
    for (const entity of (lawModel.entities || [])) {
        if (entity.type === 'Process') {
            const covered = enterpriseProcesses.has(entity.id);
            matrix.rows.push({
                requirement_type: 'Process',
                requirement_id: entity.id,
                requirement_name: entity.name,
                jurisdiction: entity.jurisdiction || lawModel.jurisdiction.name,
                enterprise_control: covered ? entity.id : null,
                status: covered ? 'COVERED' : 'GAP',
            });
        }
    }

    // 3. Assignment requirements
    for (const rel of (lawModel.relations || [])) {
        if (rel.type === 'AssignedTo') {
            const key = `AssignedTo:${rel.source}:${rel.target}`;
            const covered = enterpriseRelations.has(key);
            matrix.rows.push({
                requirement_type: 'Assignment',
                requirement_id: key,
                requirement_name: `${rel.source} → ${rel.target}`,
                jurisdiction: rel.parameters?.jurisdiction || lawModel.jurisdiction.name,
                enterprise_control: covered ? key : null,
                status: covered ? 'COVERED' : 'GAP',
            });
        }
    }

    // 4. Separation requirements
    for (const rel of (lawModel.relations || [])) {
        if (rel.type === 'Separate') {
            const key = `Separate:${rel.source}:${rel.target}`;
            const covered = enterpriseRelations.has(key);
            matrix.rows.push({
                requirement_type: 'SoD',
                requirement_id: key,
                requirement_name: `Separate(${rel.source}, ${rel.target})`,
                jurisdiction: lawModel.jurisdiction.name,
                enterprise_control: covered ? key : null,
                status: covered ? 'COVERED' : 'GAP',
            });
        }
    }

    // 5. Policy requirements
    for (const pol of (lawModel.policies || [])) {
        const key = `${pol.type}:${pol.source}:${pol.target}`;
        const enterprisePol = enterprisePolicies.get(key);
        let status = 'GAP';
        if (enterprisePol) {
            status = enterprisePol.allow_deny === pol.allow_deny ? 'COVERED' : 'CONFLICT';
        }
        matrix.rows.push({
            requirement_type: 'Policy',
            requirement_id: key,
            requirement_name: `${pol.type}(${pol.allow_deny}, ${pol.source}, ${pol.target})`,
            jurisdiction: pol.parameters?.jurisdiction || lawModel.jurisdiction.name,
            enterprise_control: enterprisePol ? key : null,
            status,
        });
    }

    // Compute summary
    matrix.summary.total = matrix.rows.length;
    matrix.summary.covered = matrix.rows.filter(r => r.status === 'COVERED').length;
    matrix.summary.gaps = matrix.rows.filter(r => r.status === 'GAP').length;
    matrix.summary.partial = matrix.rows.filter(r => r.status === 'CONFLICT').length;
    matrix.summary.coverage_pct = matrix.summary.total > 0
        ? Math.round((matrix.summary.covered / matrix.summary.total) * 100)
        : 100;

    return matrix;
}

export default { generateComplianceMatrix };
