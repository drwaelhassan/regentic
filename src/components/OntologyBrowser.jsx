import React from 'react';
import { getAllEntities } from '../core/ontology.js';
import { useState, useMemo } from 'react';

export default function OntologyBrowser() {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');

    const entities = useMemo(() => getAllEntities(), []);
    const types = useMemo(() => ['All', ...new Set(entities.map(e => e.type))], [entities]);

    const filtered = useMemo(() => {
        return entities.filter(e => {
            const matchesType = filterType === 'All' || e.type === filterType;
            const matchesSearch = !search ||
                e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.id.toLowerCase().includes(search.toLowerCase()) ||
                (e.jurisdiction || '').toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [entities, search, filterType]);

    const typeColor = (type) => ({
        'User': 'hsl(195, 85%, 52%)',
        'DepartmentRole': 'hsl(250, 80%, 68%)',
        'Activity': 'hsl(152, 60%, 55%)',
        'Process': 'hsl(38, 90%, 55%)',
        'LegalEntity': 'hsl(0, 72%, 60%)',
        'DataObject': 'hsl(280, 60%, 60%)',
        'Vehicle': 'hsl(170, 60%, 50%)',
        'InfrastructureZone': 'hsl(30, 70%, 55%)',
        'LegalInstrument': 'hsl(210, 60%, 60%)',
        'Constraint': 'hsl(340, 65%, 58%)',
        'Value': 'hsl(60, 70%, 50%)',
    }[type] || 'var(--text-secondary)');

    return (
        <div className="animate-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
                🧬 Ontology Browser
            </h2>

            <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <input className="form-input" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search entities…" style={{ flex: 1 }} />
                <select className="form-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                    {types.map(t => <option key={t} value={t}>{t} ({t === 'All' ? entities.length : entities.filter(e => e.type === t).length})</option>)}
                </select>
            </div>

            <div style={{ marginBottom: 'var(--space-md)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Showing {filtered.length} of {entities.length} entities
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Subtype</th>
                            <th>Jurisdiction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.slice(0, 100).map((e, i) => (
                            <tr key={i}>
                                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {e.id}
                                </td>
                                <td>
                                    <span className="badge" style={{
                                        background: `${typeColor(e.type)}1a`,
                                        color: typeColor(e.type),
                                        border: `1px solid ${typeColor(e.type)}40`,
                                    }}>
                                        {e.type}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 500, fontSize: '0.82rem' }}>{e.name}</td>
                                <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{e.subtype || '—'}</td>
                                <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{e.jurisdiction || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
