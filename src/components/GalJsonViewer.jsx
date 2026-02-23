import React, { useState, useMemo } from 'react';

function JsonNode({ data, name, depth = 0, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen && depth < 2);

    if (data === null || data === undefined) {
        return <span className="json-null">null</span>;
    }
    if (typeof data === 'boolean') {
        return <span className="json-boolean">{data.toString()}</span>;
    }
    if (typeof data === 'number') {
        return <span className="json-number">{data}</span>;
    }
    if (typeof data === 'string') {
        return <span className="json-string">"{data}"</span>;
    }

    const isArray = Array.isArray(data);
    const entries = isArray ? data.map((v, i) => [i, v]) : Object.entries(data);
    const preview = isArray ? `[${data.length}]` : `{${entries.length}}`;

    return (
        <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
            <span className="json-collapsible" onClick={() => setOpen(!open)} style={{ userSelect: 'none' }}>
                <span style={{ display: 'inline-block', width: 14, textAlign: 'center', color: 'var(--text-muted)' }}>
                    {open ? '▾' : '▸'}
                </span>
                {name !== undefined && <span className="json-key">"{name}"</span>}
                {name !== undefined && <span style={{ color: 'var(--text-muted)' }}>: </span>}
                {!open && <span className="json-bracket" style={{ fontSize: '0.75rem', opacity: 0.6 }}>{preview}</span>}
            </span>
            {open && (
                <div>
                    <span className="json-bracket">{isArray ? '[' : '{'}</span>
                    {entries.map(([key, val], idx) => (
                        <div key={key} style={{ marginLeft: 16 }}>
                            {!isArray && <span className="json-key">"{key}"</span>}
                            {!isArray && <span style={{ color: 'var(--text-muted)' }}>: </span>}
                            {typeof val === 'object' && val !== null ? (
                                <JsonNode data={val} name={isArray ? undefined : undefined} depth={depth + 1} />
                            ) : (
                                <JsonNode data={val} />
                            )}
                            {idx < entries.length - 1 && <span style={{ color: 'var(--text-muted)' }}>,</span>}
                        </div>
                    ))}
                    <span className="json-bracket">{isArray ? ']' : '}'}</span>
                </div>
            )}
        </div>
    );
}

export default function GalJsonViewer({ model, title = 'GAL-JSON Model' }) {
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('tree');

    const filteredModel = useMemo(() => {
        if (!search || !model) return model;
        return filterModel(model, search.toLowerCase());
    }, [model, search]);

    if (!model) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📄</div>
                <div className="empty-state-title">No Model Loaded</div>
                <div className="empty-state-desc">
                    Generate a Law Model or Enterprise Model from the Input panel to view it here.
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
                🔍 {title}
            </h2>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', alignItems: 'center' }}>
                <input className="form-input" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search entities, relations, policies…" style={{ flex: 1 }} />
                <div className="tabs" style={{ border: 'none', margin: 0 }}>
                    <button className={`tab ${viewMode === 'tree' ? 'active' : ''}`} onClick={() => setViewMode('tree')}>
                        Tree
                    </button>
                    <button className={`tab ${viewMode === 'raw' ? 'active' : ''}`} onClick={() => setViewMode('raw')}>
                        Raw JSON
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="stat-card">
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>
                        {model.entities?.length || 0}
                    </div>
                    <div className="stat-label">Entities</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--accent-2)' }}>
                        {model.relations?.length || 0}
                    </div>
                    <div className="stat-label">Relations</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--warn)' }}>
                        {model.policies?.length || 0}
                    </div>
                    <div className="stat-label">Policies</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--pass)' }}>
                        {model.validation_checks?.length || 0}
                    </div>
                    <div className="stat-label">Checks</div>
                </div>
            </div>

            {/* Viewer */}
            <div className="json-viewer">
                {viewMode === 'tree' ? (
                    <JsonNode data={filteredModel} depth={0} />
                ) : (
                    <pre style={{ margin: 0 }}>{JSON.stringify(filteredModel, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

function filterModel(model, search) {
    if (!model || typeof model !== 'object') return model;
    const str = JSON.stringify(model).toLowerCase();
    if (!str.includes(search)) return null;
    return model;
}
