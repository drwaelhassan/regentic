import React from 'react';

export default function ComplianceMatrix({ matrix }) {
    if (!matrix) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <div className="empty-state-title">No Compliance Matrix</div>
                <div className="empty-state-desc">
                    Run Generate Compliance Matrix from the Dashboard to map requirements to controls.
                </div>
            </div>
        );
    }

    const statusColor = (status) => ({
        'COVERED': 'var(--pass)',
        'GAP': 'var(--fail)',
        'CONFLICT': 'var(--warn)',
    }[status] || 'var(--text-muted)');

    const statusBadge = (status) => ({
        'COVERED': 'badge-pass',
        'GAP': 'badge-fail',
        'CONFLICT': 'badge-warn',
    }[status] || 'badge-indeterminate');

    return (
        <div className="animate-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
                📊 Compliance Matrix
            </h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent)' }}>{matrix.summary.total}</div>
                    <div className="stat-label">Total Requirements</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--pass)' }}>{matrix.summary.covered}</div>
                    <div className="stat-label">Covered</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--fail)' }}>{matrix.summary.gaps}</div>
                    <div className="stat-label">Gaps</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--accent-2)' }}>{matrix.summary.coverage_pct}%</div>
                    <div className="stat-label">Coverage</div>
                </div>
            </div>

            <div className="progress-bar" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="progress-bar-fill" style={{ width: `${matrix.summary.coverage_pct}%` }} />
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Requirement</th>
                            <th>Jurisdiction</th>
                            <th>Enterprise Control</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.rows.map((row, i) => (
                            <tr key={i}>
                                <td><span className="badge badge-accent">{row.requirement_type}</span></td>
                                <td style={{ fontWeight: 500, fontSize: '0.82rem' }}>{row.requirement_name}</td>
                                <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{row.jurisdiction}</td>
                                <td style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                                    {row.enterprise_control || '—'}
                                </td>
                                <td><span className={`badge ${statusBadge(row.status)}`}>{row.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
