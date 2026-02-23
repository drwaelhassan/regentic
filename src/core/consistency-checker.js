/**
 * Consistency Checker — Con(Φ_E ∧ Φ_L) Validation Engine
 * Converts GAL-JSON models into propositional clauses and
 * uses the SAT solver to verify consistency
 */

import { SATSolver } from './sat-solver.js';

export class ConsistencyChecker {
    constructor() {
        this.solver = new SATSolver();
        this.violations = [];
    }

    /**
     * Main consistency check: Con(Φ_E ∧ Φ_L)
     * @param {Object} lawModel - GAL-JSON Law_Model
     * @param {Object} enterpriseModel - GAL-JSON Enterprise_Model
     * @returns {{ consistent: boolean, violations: Array, model: Object, stats: Object }}
     */
    check(lawModel, enterpriseModel) {
        this.solver.reset();
        this.violations = [];

        const clauses = [];

        // Encode law model constraints
        clauses.push(...this._encodeRelations(lawModel.relations || [], 'law'));
        clauses.push(...this._encodePolicies(lawModel.policies || [], 'law'));

        // Encode enterprise model constraints
        clauses.push(...this._encodeRelations(enterpriseModel.relations || [], 'enterprise'));
        clauses.push(...this._encodePolicies(enterpriseModel.policies || [], 'enterprise'));

        // Cross-model consistency checks
        clauses.push(...this._encodeSeparationOfDuties(lawModel, enterpriseModel));
        clauses.push(...this._encodeAccessControlConstraints(lawModel, enterpriseModel));
        clauses.push(...this._encodeEquivalenceConstraints(lawModel, enterpriseModel));

        const result = this.solver.solve(clauses);

        if (!result.satisfiable) {
            // Find conflicting clauses
            const conflictIndices = this.solver.findConflicts(clauses);
            this.violations.push({
                type: 'INCONSISTENCY',
                severity: 'Critical',
                message: `Logical inconsistency detected: Φ_E ∧ Φ_L is unsatisfiable`,
                conflictingClauses: conflictIndices.length,
            });
        }

        return {
            consistent: result.satisfiable,
            violations: this.violations,
            model: result.model,
            stats: result.stats,
        };
    }

    // ─── Relation Encoding ──────────────────────────────────────────────────────

    _encodeRelations(relations, scope) {
        const clauses = [];
        for (const rel of relations) {
            switch (rel.type) {
                case 'Contains':
                    // If process exists, activity must exist within it
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:process:${rel.source}`),
                        this.solver.pos(`${scope}:activity:${rel.target}`)
                    ));
                    break;

                case 'Next':
                    // Sequential flow: if predecessor completes, successor must follow
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:completed:${rel.source}`),
                        this.solver.pos(`${scope}:initiated:${rel.target}`)
                    ));
                    break;

                case 'ComposedOf':
                    // Composite process requires all sub-processes
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:process:${rel.source}`),
                        this.solver.pos(`${scope}:process:${rel.target}`)
                    ));
                    break;

                case 'Includes':
                    // Hierarchical inclusion
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:role:${rel.source}`),
                        this.solver.pos(`${scope}:role:${rel.target}`)
                    ));
                    break;

                case 'AssignedTo':
                    // Role-activity binding
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:role:${rel.source}`),
                        this.solver.pos(`${scope}:activity:${rel.target}`)
                    ));
                    break;

                case 'Separate':
                    // Mutual exclusion — cannot be accessed concurrently by same user
                    clauses.push(...this.solver.mutualExclusion(
                        this.solver.pos(`${scope}:access:${rel.source}`),
                        this.solver.pos(`${scope}:access:${rel.target}`)
                    ));
                    break;

                case 'Acts':
                    // User fills a role
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:user:${rel.target}`),
                        this.solver.pos(`${scope}:role:${rel.source}`)
                    ));
                    break;

                case 'Assumes':
                    // User participates in process
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:user:${rel.source}`),
                        this.solver.pos(`${scope}:process:${rel.target}`)
                    ));
                    break;

                case 'CountsAs':
                    // Constitutive rule: X counts as Y
                    const iffClauses = this.solver.iff(
                        this.solver.pos(`${scope}:${rel.source}`),
                        this.solver.pos(`${scope}:${rel.target}`)
                    );
                    clauses.push(...iffClauses);
                    break;

                case 'RequiresCondition':
                    // Technical rule: action requires condition
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:action:${rel.source}`),
                        this.solver.pos(`${scope}:condition:${rel.target}`)
                    ));
                    break;

                case 'MustReport':
                    // Mandatory reporting
                    clauses.push(this.solver.implies(
                        this.solver.pos(`${scope}:event:${rel.source}`),
                        this.solver.pos(`${scope}:report:${rel.target}`)
                    ));
                    break;
            }
        }
        return clauses;
    }

    // ─── Policy Encoding ────────────────────────────────────────────────────────

    _encodePolicies(policies, scope) {
        const clauses = [];
        for (const pol of policies) {
            const activityKey = pol.parameters?.activity_or_process
                ? `:${pol.parameters.activity_or_process}`
                : '';

            if (pol.allow_deny === 'Allow') {
                // Permitted: the action/access is possible
                clauses.push([this.solver.pos(`${scope}:policy:${pol.type}:${pol.source}:${pol.target}${activityKey}`)]);
            } else {
                // Denied: the action/access must not occur
                clauses.push([this.solver.neg(`${scope}:policy:${pol.type}:${pol.source}:${pol.target}${activityKey}`)]);
            }

            // Deontic encoding
            if (pol.deontic_status === 'Obligatory') {
                clauses.push([this.solver.pos(`${scope}:obligation:${pol.source}:${pol.target}`)]);
            } else if (pol.deontic_status === 'Prohibited') {
                clauses.push([this.solver.neg(`${scope}:permitted:${pol.source}:${pol.target}`)]);
            }
        }
        return clauses;
    }

    // ─── Separation of Duties ───────────────────────────────────────────────────

    _encodeSeparationOfDuties(lawModel, enterpriseModel) {
        const clauses = [];
        const separations = (lawModel.relations || []).filter(r => r.type === 'Separate');

        for (const sep of separations) {
            // Find enterprise users who might access separated processes
            const usersInProcess1 = this._findUsersInProcess(enterpriseModel, sep.source);
            const usersInProcess2 = this._findUsersInProcess(enterpriseModel, sep.target);

            // Each user who accesses process1 must NOT access process2
            for (const user of usersInProcess1) {
                if (usersInProcess2.includes(user)) {
                    this.violations.push({
                        type: 'SOD_VIOLATION',
                        severity: 'Critical',
                        message: `Separation of Duties violation: User "${user}" has access to both "${sep.source}" and "${sep.target}"`,
                        user, process1: sep.source, process2: sep.target,
                    });
                    // Add contradicting clause to make formula UNSAT
                    clauses.push([this.solver.pos(`sod:${user}:${sep.source}`)]);
                    clauses.push([this.solver.neg(`sod:${user}:${sep.source}`)]);
                }
            }

            // Structural constraint: mutual exclusion for any user-process access
            clauses.push(...this.solver.mutualExclusion(
                this.solver.pos(`sod:combined:${sep.source}`),
                this.solver.pos(`sod:combined:${sep.target}`)
            ));
        }
        return clauses;
    }

    _findUsersInProcess(model, processId) {
        const users = [];
        for (const rel of (model.relations || [])) {
            if (rel.type === 'Assumes' && rel.target === processId) {
                users.push(rel.source);
            }
        }
        return users;
    }

    // ─── Access Control Constraints ─────────────────────────────────────────────

    _encodeAccessControlConstraints(lawModel, enterpriseModel) {
        const clauses = [];

        // Collect law denials
        const denials = new Map();
        for (const pol of (lawModel.policies || [])) {
            if (pol.allow_deny === 'Deny') {
                const key = `${pol.type}:${pol.source}:${pol.target}`;
                denials.set(key, pol);
            }
        }

        // Check enterprise policies against law denials
        for (const pol of (enterpriseModel.policies || [])) {
            if (pol.allow_deny === 'Allow') {
                const key = `${pol.type}:${pol.source}:${pol.target}`;
                if (denials.has(key)) {
                    this.violations.push({
                        type: 'ACCESS_CONTROL_CONTRADICTION',
                        severity: 'Critical',
                        message: `Enterprise allows ${pol.type} for ${pol.source}→${pol.target} but law denies it`,
                        lawPolicy: denials.get(key),
                        enterprisePolicy: pol,
                    });
                    // Force UNSAT
                    const v = this.solver.pos(`access_conflict:${key}`);
                    clauses.push([v]);
                    clauses.push([-v]);
                }
            }
        }
        return clauses;
    }

    // ─── Equivalence Constraints ────────────────────────────────────────────────

    _encodeEquivalenceConstraints(lawModel, enterpriseModel) {
        const clauses = [];
        const equivalences = (lawModel.relations || []).filter(
            r => r.type === 'EquRole' || r.type === 'EquActivity' || r.type === 'EquProcess'
        );

        for (const eq of equivalences) {
            // Equivalence means constraints on one apply to the other
            const iffClauses = this.solver.iff(
                this.solver.pos(`equiv:${eq.source}`),
                this.solver.pos(`equiv:${eq.target}`)
            );
            clauses.push(...iffClauses);
        }
        return clauses;
    }

    // ─── Quick Consistency Check ────────────────────────────────────────────────

    /**
     * Quick check: does the model have internal contradictions?
     */
    checkSingleModel(model) {
        this.solver.reset();
        this.violations = [];

        const clauses = [];
        clauses.push(...this._encodeRelations(model.relations || [], 'model'));
        clauses.push(...this._encodePolicies(model.policies || [], 'model'));

        // Check for internal SoD contradictions
        const separations = (model.relations || []).filter(r => r.type === 'Separate');
        for (const sep of separations) {
            clauses.push(...this.solver.mutualExclusion(
                this.solver.pos(`model:access:${sep.source}`),
                this.solver.pos(`model:access:${sep.target}`)
            ));
        }

        const result = this.solver.solve(clauses);
        return {
            consistent: result.satisfiable,
            violations: this.violations,
            stats: result.stats,
        };
    }
}

export default ConsistencyChecker;
