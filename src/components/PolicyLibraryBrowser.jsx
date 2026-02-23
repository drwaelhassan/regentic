import React, { useState, useMemo } from 'react';
import { PolicyLibrary, getAllPolicies, searchPolicies, getCategories, getCompanies, getPolicyStats } from '../data/policy-library.js';

export default function PolicyLibraryBrowser({ onSelectPolicy }) {
    const [search, setSearch] = useState('');
    const [filterSection, setFilterSection] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');
    const [expandedPolicy, setExpandedPolicy] = useState(null);

    const sections = useMemo(() => ['All', ...Object.keys(PolicyLibrary)], []);
    const categories = useMemo(() => ['All', ...getCategories()], []);
    const stats = useMemo(() => getPolicyStats(), []);
    const allPolicies = useMemo(() => getAllPolicies(), []);

    const filtered = useMemo(() => {
        let results = search ? searchPolicies(search) : allPolicies;
        if (filterSection !== 'All') {
            results = results.filter(p => p.section_key === filterSection);
        }
        if (filterCategory !== 'All') {
            results = results.filter(p => p.category === filterCategory);
        }
        return results;
    }, [search, filterSection, filterCategory, allPolicies]);

    const categoryColor = (cat) => ({
        'Big Tech': '#8b5cf6',
        'Ride-Hailing': '#f59e0b',
        'Autonomous Vehicles': '#10b981',
        'Cloud': '#3b82f6',
        'Financial': '#ef4444',
        'Infrastructure': '#6366f1',
        'E-Commerce': '#ec4899',
        'Social Media': '#06b6d4',
        'Developer': '#84cc16',
        'Regulator': '#f97316',
        'Delivery': '#e11d48',
        'App Marketplace': '#a855f7',
        'Hospitality': '#14b8a6',
        'Communications': '#2563eb',
        'Cloud Storage': '#0891b2',
    }[cat] || 'var(--text-secondary)');

    return (
        <div className="animate-in">
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                    🏢 Company Policy Library
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Pre-loaded enterprise privacy policies, trust centers, and compliance documentation
                </p>
            </div>

            {/* Stats Bar */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.totalPolicies}</div>
                    <div className="stat-label">Total Policies</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalCompanies}</div>
                    <div className="stat-label">Companies</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalCategories}</div>
                    <div className="stat-label">Categories</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalSections}</div>
                    <div className="stat-label">Sections</div>
                </div>
            </div>

            {/* Section Tabs */}
            <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button className={`btn btn-sm ${filterSection === 'All' ? 'btn-primary' : ''}`}
                    onClick={() => setFilterSection('All')}>
                    All
                </button>
                {Object.entries(PolicyLibrary).map(([key, section]) => (
                    <button key={key}
                        className={`btn btn-sm ${filterSection === key ? 'btn-primary' : ''}`}
                        onClick={() => setFilterSection(filterSection === key ? 'All' : key)}>
                        {section.icon} {section.name}
                    </button>
                ))}
            </div>

            {/* Search + Category Filter */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', alignItems: 'center' }}>
                <input className="form-input" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by company, policy name, or keyword…" style={{ flex: 1 }} />
                <select className="form-select" value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}>
                    {categories.map(c => (
                        <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: 'var(--space-md)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Showing {filtered.length} of {allPolicies.length} policies
            </div>

            {/* Policy Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {filtered.map(policy => (
                    <div key={policy.id} className="card" style={{
                        cursor: 'pointer',
                        borderColor: expandedPolicy === policy.id ? 'var(--accent)' : undefined,
                    }}>
                        <div onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                                    <span style={{ fontSize: '1.3rem' }}>{policy.logo}</span>
                                    <div>
                                        <span style={{ fontWeight: 600 }}>{policy.name}</span>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{policy.company}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-xs)', flexShrink: 0, alignItems: 'center' }}>
                                <span className="badge" style={{
                                    background: `${categoryColor(policy.category)}1a`,
                                    color: categoryColor(policy.category),
                                    border: `1px solid ${categoryColor(policy.category)}40`,
                                    fontSize: '0.68rem',
                                }}>
                                    {policy.category}
                                </span>
                                <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>
                                    {policy.section_icon} {policy.section_name}
                                </span>
                            </div>
                        </div>

                        {expandedPolicy === policy.id && (
                            <div className="animate-in" style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-primary)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                                    {policy.description}
                                </p>

                                <div style={{ marginBottom: 'var(--space-md)' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        Domains
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                                        {policy.domains.map(d => (
                                            <span key={d} className="badge badge-accent" style={{ fontSize: '0.72rem' }}>{d}</span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                    <a href={policy.url} target="_blank" rel="noopener noreferrer"
                                        className="btn btn-sm" style={{ textDecoration: 'none' }}>
                                        🔗 View Policy
                                    </a>
                                    {onSelectPolicy && (
                                        <button className="btn btn-sm btn-primary" onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectPolicy(policy);
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
                    <div className="empty-state-title">No policies found</div>
                    <div className="empty-state-desc">Try adjusting your search or filters.</div>
                </div>
            )}
        </div>
    );
}
