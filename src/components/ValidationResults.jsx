import React, { useState } from 'react';
import { exportReport } from '../utils/export.js';

export default function ValidationResults({ report }) {
    const [activeSection, setActiveSection] = useState('executive_summary');
    const [showDetail, setShowDetail] = useState({});

    if (!report) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔬</div>
                <div className="empty-state-title">No Validation Results</div>
                <div className="empty-state-desc">
                    Load both a Law Model and Enterprise Model, then run Validate Compliance from the Dashboard.
                </div>
            </div>
        );
    }

    const sections = report.sections || {};
    const summary = report.executive_summary || {};

    const sectionTabs = [
        { key: 'executive_summary', label: '📋 Executive Summary', icon: '📋' },
        { key: 'consistency', label: '🔗 Consistency', icon: '🔗' },
        { key: 'ontology', label: '📦 Ontology', icon: '📦' },
        { key: 'scenario', label: '🎯 Scenario', icon: '🎯' },
        { key: 'potestative', label: '⚖️ Potestative', icon: '⚖️' },
        { key: 'defeasibility', label: '🛡️ Defeasibility', icon: '🛡️' },
        { key: 'completeness', label: '✅ Completeness', icon: '✅' },
    ];

    const toggleDetail = (key) => {
        setShowDetail(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="animate-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                        🔬 Compliance Audit Report
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        {report.law_context} × {report.enterprise_context}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                    <span className={`badge ${report.overall_status === 'COMPLIANT' ? 'badge-pass' : 'badge-fail'}`}
                        style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
                        {report.overall_status === 'COMPLIANT' ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}
                    </span>
                    <button className="btn btn-sm" onClick={() => exportReport(report)}>📥 Export</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--pass)' }}>{summary.passed_sections || 0}</div>
                    <div className="stat-label">Sections Passed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--fail)' }}>{summary.failed_sections || 0}</div>
                    <div className="stat-label">Sections Failed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--fail)' }}>
                        {summary.critical_violations?.length || 0}
                    </div>
                    <div className="stat-label">Critical Violations</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent)' }}>{summary.total_sections || 0}</div>
                    <div className="stat-label">Total Sections</div>
                </div>
            </div>

            {/* Section Tabs */}
            <div className="tabs">
                {sectionTabs.map(tab => (
                    <button key={tab.key}
                        className={`tab ${activeSection === tab.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(tab.key)}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Section Content */}
            <div className="card animate-in" key={activeSection}>
                {activeSection === 'executive_summary' && (
                    <div>
                        <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>{summary.summary}</p>
                        {(summary.critical_violations || []).length > 0 && (
                            <div>
                                <h4 style={{ color: 'var(--fail)', marginBottom: 'var(--space-sm)' }}>Critical Violations</h4>
                                {summary.critical_violations.map((v, i) => (
                                    <div key={i} className="check-item" style={{ background: 'var(--fail-bg)', marginBottom: 'var(--space-xs)', borderRadius: 'var(--radius-sm)' }}>
                                        <span className="badge badge-fail">Critical</span>
                                        <span className="check-label">{v.message || v.label || v.detail}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeSection === 'consistency' && sections.consistency && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                            <span className={`badge ${sections.consistency.result === 'PASS' ? 'badge-pass' : 'badge-fail'}`}>
                                {sections.consistency.result}
                            </span>
                            <span style={{ fontSize: '0.85rem' }}>{sections.consistency.detail}</span>
                        </div>
                        {sections.consistency.violations?.map((v, i) => (
                            <div key={i} className="check-item" style={{ marginBottom: 'var(--space-xs)' }}>
                                <span className="badge badge-fail">{v.type}</span>
                                <span className="check-label">{v.message}</span>
                                <span className="badge badge-warn">{v.severity}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'scenario' && sections.scenario && (
                    <div>
                        <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                            <span style={{ fontSize: '0.85rem' }}>
                                <strong style={{ color: 'var(--pass)' }}>{sections.scenario.passed}</strong> passed ·
                                <strong style={{ color: 'var(--fail)' }}> {sections.scenario.failed}</strong> failed ·
                                <strong style={{ color: 'var(--indeterminate)' }}> {sections.scenario.indeterminate}</strong> indeterminate
                            </span>
                        </div>
                        <div className="progress-bar" style={{ marginBottom: 'var(--space-lg)' }}>
                            <div className="progress-bar-fill" style={{
                                width: `${sections.scenario.total_checks > 0 ? (sections.scenario.passed / sections.scenario.total_checks) * 100 : 0}%`
                            }} />
                        </div>
                        {sections.scenario.checks?.map((check, i) => (
                            <div key={i} className="check-item" onClick={() => toggleDetail(`check-${i}`)}
                                style={{ cursor: 'pointer', marginBottom: 2 }}>
                                <span className={`badge ${check.result === 'PASS' ? 'badge-pass' : check.result === 'FAIL' ? 'badge-fail' : 'badge-indeterminate'}`}>
                                    {check.result}
                                </span>
                                <div>
                                    <div className="check-label">{check.label}</div>
                                    {showDetail[`check-${i}`] && (
                                        <div className="check-detail animate-in">{check.detail}</div>
                                    )}
                                </div>
                                <span className={`badge ${check.severity === 'Critical' ? 'badge-fail' : 'badge-warn'}`}>
                                    {check.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'ontology' && sections.ontology && (
                    <div>
                        <div style={{ marginBottom: 'var(--space-md)' }}>
                            <span className={`badge ${sections.ontology.result === 'PASS' ? 'badge-pass' : 'badge-fail'}`}>
                                {sections.ontology.result}
                            </span>
                            <span style={{ marginLeft: 'var(--space-md)', fontSize: '0.85rem' }}>
                                Coverage: {sections.ontology.coverage?.coverage_pct}%
                            </span>
                        </div>
                        {sections.ontology.gaps?.map((gap, i) => (
                            <div key={i} className="check-item" style={{ marginBottom: 2 }}>
                                <span className="badge badge-fail">GAP</span>
                                <span className="check-label">{gap.message}</span>
                                <span className="badge badge-accent">{gap.entity_type}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'potestative' && sections.potestative && (
                    <div>
                        <span className={`badge ${sections.potestative.result === 'PASS' ? 'badge-pass' : 'badge-fail'}`}>
                            {sections.potestative.result}
                        </span>
                        {sections.potestative.violations?.map((v, i) => (
                            <div key={i} className="check-item" style={{ marginTop: 'var(--space-sm)' }}>
                                <span className="badge badge-fail">{v.type}</span>
                                <span className="check-label">{v.message}</span>
                            </div>
                        ))}
                        {sections.potestative.violations?.length === 0 && (
                            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)', fontSize: '0.85rem' }}>
                                All Hohfeldian modality correlatives are consistent.
                            </p>
                        )}
                    </div>
                )}

                {activeSection === 'defeasibility' && sections.defeasibility && (
                    <div>
                        <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)', fontSize: '0.85rem' }}>
                            <span>Total: {sections.defeasibility.total_rules}</span>
                            <span style={{ color: 'var(--pass)' }}>Active: {sections.defeasibility.active_rules}</span>
                            <span style={{ color: 'var(--fail)' }}>Defeated: {sections.defeasibility.defeated_rules}</span>
                            <span style={{ color: 'var(--warn)' }}>Reinstated: {sections.defeasibility.reinstated_rules}</span>
                        </div>
                        {sections.defeasibility.details?.map((d, i) => (
                            <div key={i} className="check-item" style={{ marginBottom: 2 }}>
                                <span className={`badge ${d.status === 'Active' ? 'badge-pass' : 'badge-fail'}`}>{d.status}</span>
                                <div>
                                    <div className="check-label">{d.rule_name || d.rule_id}</div>
                                    <div className="check-detail">
                                        {d.inferential_strength} | {d.defeat_mechanism || 'No defeat'} {d.reinstated ? '→ Reinstated' : ''}
                                    </div>
                                </div>
                                <span className="badge badge-accent">{d.inferential_strength}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'completeness' && sections.completeness && (
                    <div>
                        <span className={`badge ${sections.completeness.result === 'PASS' ? 'badge-pass' : 'badge-fail'}`}>
                            {sections.completeness.result}
                        </span>
                        {sections.completeness.gaps?.map((gap, i) => (
                            <div key={i} className="check-item" style={{ marginTop: 'var(--space-sm)' }}>
                                <span className="badge badge-fail">{gap.type}</span>
                                <span className="check-label">{gap.message}</span>
                            </div>
                        ))}
                        {sections.completeness.gaps?.length === 0 && (
                            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-md)', fontSize: '0.85rem' }}>
                                All mandated requirements are fully implemented.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
