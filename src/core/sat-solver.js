/**
 * DPLL-Based SAT Solver
 * Propositional satisfiability checker for GAM compliance validation
 * Supports unit propagation, pure literal elimination, and conflict detection
 */

// ─── Clause Representation ──────────────────────────────────────────────────────
// A clause is an array of integers. Positive = variable true, negative = variable false.
// A formula is an array of clauses (CNF).

export class SATSolver {
    constructor() {
        this.variableNames = new Map(); // name → variable number
        this.variableIndex = new Map(); // variable number → name
        this.nextVar = 1;
        this.stats = { decisions: 0, propagations: 0, conflicts: 0 };
    }

    /** Get or create a variable index for a named proposition */
    variable(name) {
        if (this.variableNames.has(name)) return this.variableNames.get(name);
        const v = this.nextVar++;
        this.variableNames.set(name, v);
        this.variableIndex.set(v, name);
        return v;
    }

    /** Create a positive literal */
    pos(name) { return this.variable(name); }

    /** Create a negative literal */
    neg(name) { return -this.variable(name); }

    /** Reset solver state */
    reset() {
        this.variableNames.clear();
        this.variableIndex.clear();
        this.nextVar = 1;
        this.stats = { decisions: 0, propagations: 0, conflicts: 0 };
    }

    // ─── CNF Construction Helpers ───────────────────────────────────────────────

    /** A implies B: ¬A ∨ B */
    implies(a, b) { return [-a, b]; }

    /** A if and only if B: (¬A ∨ B) ∧ (A ∨ ¬B) */
    iff(a, b) { return [[-a, b], [a, -b]]; }

    /** At least one of the literals is true */
    atLeastOne(literals) { return [literals]; }

    /** At most one of the literals is true (pairwise exclusion) */
    atMostOne(literals) {
        const clauses = [];
        for (let i = 0; i < literals.length; i++) {
            for (let j = i + 1; j < literals.length; j++) {
                clauses.push([-literals[i], -literals[j]]);
            }
        }
        return clauses;
    }

    /** Exactly one of the literals is true */
    exactlyOne(literals) {
        return [...this.atLeastOne(literals), ...this.atMostOne(literals)];
    }

    /** Mutual exclusion: A and B cannot both be true */
    mutualExclusion(a, b) { return [[-a, -b]]; }

    // ─── DPLL Solver ────────────────────────────────────────────────────────────

    /**
     * Solve a CNF formula. Returns { satisfiable, model, stats }
     * model maps variable names to boolean values
     */
    solve(clauses) {
        this.stats = { decisions: 0, propagations: 0, conflicts: 0 };
        const assignment = new Map();
        const result = this._dpll([...clauses.map(c => [...c])], assignment);

        if (result) {
            const model = {};
            for (const [varNum, val] of assignment) {
                const name = this.variableIndex.get(varNum);
                if (name) model[name] = val;
            }
            return { satisfiable: true, model, stats: { ...this.stats } };
        }
        return { satisfiable: false, model: null, stats: { ...this.stats } };
    }

    _dpll(clauses, assignment) {
        // Unit propagation
        let changed = true;
        while (changed) {
            changed = false;
            for (let i = 0; i < clauses.length; i++) {
                const clause = clauses[i];
                if (clause === null) continue;

                // Filter satisfied/resolved literals
                const remaining = [];
                let satisfied = false;
                for (const lit of clause) {
                    const v = Math.abs(lit);
                    if (assignment.has(v)) {
                        const val = assignment.get(v);
                        if ((lit > 0 && val) || (lit < 0 && !val)) {
                            satisfied = true;
                            break;
                        }
                        // literal is false, skip it
                    } else {
                        remaining.push(lit);
                    }
                }

                if (satisfied) {
                    clauses[i] = null;
                    continue;
                }

                if (remaining.length === 0) {
                    this.stats.conflicts++;
                    return false; // UNSAT — empty clause
                }

                if (remaining.length === 1) {
                    // Unit clause → propagate
                    const lit = remaining[0];
                    const v = Math.abs(lit);
                    assignment.set(v, lit > 0);
                    clauses[i] = null;
                    this.stats.propagations++;
                    changed = true;
                }
            }
        }

        // Pure literal elimination
        const literalPolarity = new Map();
        for (const clause of clauses) {
            if (clause === null) continue;
            for (const lit of clause) {
                const v = Math.abs(lit);
                if (assignment.has(v)) continue;
                const pol = lit > 0 ? 1 : -1;
                if (!literalPolarity.has(v)) {
                    literalPolarity.set(v, pol);
                } else if (literalPolarity.get(v) !== pol) {
                    literalPolarity.set(v, 0); // mixed polarity
                }
            }
        }
        for (const [v, pol] of literalPolarity) {
            if (pol !== 0 && !assignment.has(v)) {
                assignment.set(v, pol > 0);
                this.stats.propagations++;
            }
        }

        // Clean up satisfied clauses
        const active = [];
        for (const clause of clauses) {
            if (clause === null) continue;
            let satisfied = false;
            const remaining = [];
            for (const lit of clause) {
                const v = Math.abs(lit);
                if (assignment.has(v)) {
                    const val = assignment.get(v);
                    if ((lit > 0 && val) || (lit < 0 && !val)) {
                        satisfied = true;
                        break;
                    }
                } else {
                    remaining.push(lit);
                }
            }
            if (!satisfied) {
                if (remaining.length === 0) {
                    this.stats.conflicts++;
                    return false;
                }
                active.push(remaining);
            }
        }

        // All clauses satisfied
        if (active.length === 0) return true;

        // Choose an unassigned variable (pick from the first active clause)
        let chosenVar = null;
        for (const clause of active) {
            for (const lit of clause) {
                const v = Math.abs(lit);
                if (!assignment.has(v)) {
                    chosenVar = v;
                    break;
                }
            }
            if (chosenVar !== null) break;
        }

        if (chosenVar === null) return true;

        this.stats.decisions++;

        // Try true
        const savedAssignment = new Map(assignment);
        assignment.set(chosenVar, true);
        if (this._dpll(active.map(c => [...c]), assignment)) return true;

        // Backtrack and try false
        assignment.clear();
        for (const [k, v] of savedAssignment) assignment.set(k, v);
        assignment.set(chosenVar, false);
        this.stats.decisions++;
        return this._dpll(active.map(c => [...c]), assignment);
    }

    // ─── Conflict Extraction ──────────────────────────────────────────────────

    /**
     * Find all minimal unsatisfiable subsets (MUS) — simplified heuristic version
     * Returns array of clause indices that contribute to unsatisfiability
     */
    findConflicts(clauses) {
        const conflicts = [];
        if (this.solve(clauses).satisfiable) return conflicts;

        // Remove one clause at a time; if remaining become SAT, that clause is critical
        for (let i = 0; i < clauses.length; i++) {
            const reduced = clauses.filter((_, j) => j !== i);
            if (this.solve(reduced).satisfiable) {
                conflicts.push(i);
            }
        }
        return conflicts;
    }
}

export default SATSolver;
