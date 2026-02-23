import React, { useState, useCallback } from 'react';

import { readLawToGAM } from '../functions/read-law.js';
import { readPolicyToGAM } from '../functions/read-policy.js';
import { validateCompliance } from '../functions/validate-compliance.js';
import { compareJurisdictions } from '../functions/compare-jurisdictions.js';
import { generateComplianceMatrix } from '../functions/compliance-matrix.js';
import { deprecateRule } from '../functions/deprecate-rule.js';
import { getOntologyStats } from '../core/ontology.js';

export default function Dashboard({ onResult, lawModel, enterpriseModel }) {
    const [stats] = useState(() => getOntologyStats());
    const [processing, setProcessing] = useState(false);
    const [lastAction, setLastAction] = useState(null);

    const runValidation = useCallback(() => {
        if (!lawModel || !enterpriseModel) return;
        setProcessing(true);
        try {
            const report = validateCompliance(lawModel, enterpriseModel);
            onResult('validation', report);
            setLastAction({ type: 'validation', status: report.overall_status, time: new Date() });
        } finally {
            setProcessing(false);
        }
    }, [lawModel, enterpriseModel, onResult]);

    const runMatrix = useCallback(() => {
        if (!lawModel || !enterpriseModel) return;
        setProcessing(true);
        try {
            const matrix = generateComplianceMatrix(lawModel, enterpriseModel);
            onResult('matrix', matrix);
            setLastAction({ type: 'matrix', status: `${matrix.summary.coverage_pct}%`, time: new Date() });
        } finally {
            setProcessing(false);
        }
    }, [lawModel, enterpriseModel, onResult]);

    const runComparison = useCallback(() => {
        if (!lawModel || !enterpriseModel) return;
        setProcessing(true);
        try {
            const comparison = compareJurisdictions(lawModel, enterpriseModel);
            onResult('comparison', comparison);
            setLastAction({ type: 'comparison', time: new Date() });
        } finally {
            setProcessing(false);
        }
    }, [lawModel, enterpriseModel, onResult]);

    return (
        <div className="animate-in">
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                    Compliance Dashboard
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Governance Analysis Method — SAT-based compliance validation engine
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent)' }}>{stats.total}</div>
                    <div className="stat-label">Ontology Entities</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent-2)' }}>{Object.keys(stats.byType).length}</div>
                    <div className="stat-label">Entity Types</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: lawModel ? 'var(--pass)' : 'var(--text-muted)' }}>
                        {lawModel ? '✓' : '—'}
                    </div>
                    <div className="stat-label">Law Model (Φ_L)</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: enterpriseModel ? 'var(--pass)' : 'var(--text-muted)' }}>
                        {enterpriseModel ? '✓' : '—'}
                    </div>
                    <div className="stat-label">Enterprise Model (Φ_E)</div>
                </div>
            </div>

            {/* Actions */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="card-header">
                    <span className="card-title">⚡ System Functions</span>
                    {processing && <span className="badge badge-warn animate-pulse">Processing…</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                    <button className="btn btn-primary" onClick={runValidation}
                        disabled={!lawModel || !enterpriseModel || processing}>
                        🔬 Validate Compliance
                    </button>
                    <button className="btn" onClick={runMatrix}
                        disabled={!lawModel || !enterpriseModel || processing}>
                        📊 Compliance Matrix
                    </button>
                    <button className="btn" onClick={runComparison}
                        disabled={!lawModel || !enterpriseModel || processing}>
                        ⚖️ Compare Jurisdictions
                    </button>
                </div>
            </div>

            {/* Ontology Breakdown */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title">📦 Ontology Registry</span>
                    <span className="badge badge-accent">{stats.total} entities</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-sm)' }}>
                    {Object.entries(stats.byType).map(([type, count]) => (
                        <div key={type} style={{
                            display: 'flex', justifyContent: 'space-between',
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-secondary)',
                            fontSize: '0.8rem',
                        }}>
                            <span style={{ color: 'var(--text-secondary)' }}>{type}</span>
                            <span style={{ fontWeight: 600 }}>{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Last Action */}
            {lastAction && (
                <div className="card animate-in" style={{ marginTop: 'var(--space-lg)' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        Last action: <strong>{lastAction.type}</strong>
                        {lastAction.status && <span> — {lastAction.status}</span>}
                        <span style={{ marginLeft: 'var(--space-md)', color: 'var(--text-muted)' }}>
                            {lastAction.time.toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
