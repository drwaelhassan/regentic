import React, { useState, useMemo } from 'react';
import { LegalLibrary, getAllLaws, searchLaws } from '../data/legal-library.js';

export default function LegalLibraryBrowser({ onSelectLaw }) {
    const [search, setSearch] = useState('');
    const [filterJurisdiction, setFilterJurisdiction] = useState('All');
    const [filterDomain, setFilterDomain] = useState('All');
    const [expandedLaw, setExpandedLaw] = useState(null);

    const jurisdictions = useMemo(() => ['All', ...Object.keys(LegalLibrary)], []);
    const domains = ['All', 'Privacy', 'Financial', 'AV', 'Traffic'];

    const allLaws = useMemo(() => getAllLaws(), []);

    const filtered = useMemo(() => {
        let results = search ? searchLaws(search) : allLaws;
        if (filterJurisdiction !== 'All') {
            results = results.filter(l => l.jurisdiction_code === filterJurisdiction);
        }
        if (filterDomain !== 'All') {
            results = results.filter(l => l.domains.includes(filterDomain));
        }
        return results;
    }, [search, filterJurisdiction, filterDomain, allLaws]);

    const domainColor = (domain) => ({
        'Privacy': 'var(--accent)',
        'Financial': 'var(--warn)',
        'AV': 'var(--accent-2)',
        'Traffic': 'var(--pass)',
    }[domain] || 'var(--text-secondary)');

    return (
        <div className="animate-in">
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                    📚 Legal Library
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Primary legal sources — click any law to load it into the extraction pipeline
                </p>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                {Object.entries(LegalLibrary).map(([code, jur]) => (
                    <div key={code} className="stat-card" style={{ cursor: 'pointer' }}
                        onClick={() => setFilterJurisdiction(filterJurisdiction === code ? 'All' : code)}>
                        <div className="stat-value" style={{
                            fontSize: '1.5rem',
                            color: filterJurisdiction === code ? 'var(--accent)' : 'var(--text-primary)',
                        }}>
                            {jur.flag} {jur.laws.length}
                        </div>
                        <div className="stat-label">{jur.name}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', alignItems: 'center' }}>
                <input className="form-input" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search laws by name, citation, or keyword…" style={{ flex: 1 }} />
                <select className="form-select" value={filterJurisdiction}
                    onChange={e => setFilterJurisdiction(e.target.value)}>
                    {jurisdictions.map(j => (
                        <option key={j} value={j}>
                            {j === 'All' ? 'All Jurisdictions' : `${LegalLibrary[j]?.flag} ${LegalLibrary[j]?.name}`}
                        </option>
                    ))}
                </select>
                <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                    {domains.map(d => (
                        <button key={d}
                            className={`btn btn-sm ${filterDomain === d ? 'btn-primary' : ''}`}
                            onClick={() => setFilterDomain(d)}>
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: 'var(--space-md)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Showing {filtered.length} of {allLaws.length} laws
            </div>

            {/* Law Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {filtered.map(law => (
                    <div key={law.id} className="card" style={{
                        cursor: 'pointer',
                        borderColor: expandedLaw === law.id ? 'var(--accent)' : undefined,
                    }}>
                        {/* Header */}
                        <div onClick={() => setExpandedLaw(expandedLaw === law.id ? null : law.id)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{law.jurisdiction_flag}</span>
                                    <span style={{ fontWeight: 600 }}>{law.name}</span>
                                    {law.status && (
                                        <span className="badge badge-warn" style={{ fontSize: '0.65rem' }}>{law.status}</span>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {law.citation}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-xs)', flexShrink: 0 }}>
                                {law.domains.map(d => (
                                    <span key={d} className="badge" style={{
                                        background: `${domainColor(d)}1a`,
                                        color: domainColor(d),
                                        border: `1px solid ${domainColor(d)}40`,
                                    }}>
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedLaw === law.id && (
                            <div className="animate-in" style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-primary)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                                    {law.description}
                                </p>

                                {law.effective_date && (
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                                        <strong>Effective:</strong> {law.effective_date}
                                    </div>
                                )}

                                {law.key_provisions && (
                                    <div style={{ marginBottom: 'var(--space-md)' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                            Key Provisions
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                                            {law.key_provisions.map((p, i) => (
                                                <span key={i} className="badge badge-accent" style={{ fontSize: '0.72rem' }}>{p}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                    <a href={law.url} target="_blank" rel="noopener noreferrer"
                                        className="btn btn-sm" style={{ textDecoration: 'none' }}>
                                        🔗 View Source Text
                                    </a>
                                    {onSelectLaw && (
                                        <button className="btn btn-sm btn-primary" onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectLaw(law);
                                        }}>
                                            📥 Load into Pipeline
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <div className="empty-state-title">No laws found</div>
                    <div className="empty-state-desc">Try adjusting your search or filters.</div>
                </div>
            )}
        </div>
    );
}
