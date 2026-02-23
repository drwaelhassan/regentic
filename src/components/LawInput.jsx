import React, { useState } from 'react';
import { readLawToGAM } from '../functions/read-law.js';
import { readPolicyToGAM } from '../functions/read-policy.js';
import { Countries, JurisdictionLevels, Domains } from '../core/schema.js';
import { importModel } from '../utils/export.js';

const SAMPLE_LAW = `Section 1. Privacy Protection
Every organization shall designate a Chief Privacy Officer who shall be accountable for the organization's compliance with privacy legislation.
Before collecting personal information, the organization must identify the purposes for which the information is being collected and obtain consent from the data subject.
Personal information shall not be used or disclosed for purposes other than those for which it was collected, except with the consent of the individual.
The organization must report any breach that poses a real risk of significant harm to the Privacy Commissioner within 72 hours.

Section 2. Separation of Duties
The request process and procurement process must not be performed by the same individual.
The CEO and CFO shall certify the effectiveness of internal controls over financial reporting.`;

const SAMPLE_POLICY = `Corporate Privacy Policy v2.1
The Privacy Office, headed by the Chief Privacy Officer (CPO), shall oversee all data processing activities.
All data collection processes must include a Privacy Impact Assessment before proceeding.
Access to personal health information is denied to unauthorized clinic staff.
The organization shall maintain a breach response process including notification to the Privacy Commissioner within 48 hours.
The CFO shall evaluate ICFR effectiveness annually and disclose findings in the MD&A.`;

export default function LawInput({ onModelLoaded }) {
    const [mode, setMode] = useState('law');
    const [text, setText] = useState('');
    const [country, setCountry] = useState('CA');
    const [level, setLevel] = useState('Federal');
    const [jurisdictionName, setJurisdictionName] = useState('');
    const [selectedDomains, setSelectedDomains] = useState(['All']);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleProcess = () => {
        if (!text.trim()) return;
        setProcessing(true);
        setError(null);
        try {
            const jurisdiction = { country, level, name: jurisdictionName };
            const options = { domains: selectedDomains };

            let model;
            if (mode === 'law') {
                model = readLawToGAM(text, jurisdiction, options);
            } else {
                model = readPolicyToGAM(text, { jurisdiction, ...options });
            }
            setResult(model);
            onModelLoaded(mode, model);
        } catch (err) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const model = await importModel(file);
            setResult(model);
            onModelLoaded(model.model_type === 'Law_Model' ? 'law' : 'policy', model);
        } catch (err) {
            setError(err.message);
        }
    };

    const loadSample = () => {
        setText(mode === 'law' ? SAMPLE_LAW : SAMPLE_POLICY);
    };

    const toggleDomain = (d) => {
        if (d === 'All') {
            setSelectedDomains(['All']);
        } else {
            setSelectedDomains(prev => {
                const filtered = prev.filter(x => x !== 'All');
                return filtered.includes(d) ? filtered.filter(x => x !== d) : [...filtered, d];
            });
        }
    };

    return (
        <div className="animate-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>
                {mode === 'law' ? '📜 Read Law to GAM' : '🏢 Read Policy to GAM'}
            </h2>

            {/* Mode Tabs */}
            <div className="tabs">
                <button className={`tab ${mode === 'law' ? 'active' : ''}`} onClick={() => setMode('law')}>
                    @Read_Law_To_GAM
                </button>
                <button className={`tab ${mode === 'policy' ? 'active' : ''}`} onClick={() => setMode('policy')}>
                    @Read_Policy_To_GAM
                </button>
            </div>

            {/* Jurisdiction Config */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
                        {Countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Level</label>
                    <select className="form-select" value={level} onChange={e => setLevel(e.target.value)}>
                        {JurisdictionLevels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Jurisdiction Name</label>
                    <input className="form-input" value={jurisdictionName}
                        onChange={e => setJurisdictionName(e.target.value)}
                        placeholder="e.g., PIPEDA, SOX, Ontario HTA" />
                </div>
            </div>

            {/* Domain Selector */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <span className="form-label" style={{ marginBottom: 'var(--space-sm)', display: 'block' }}>Domains</span>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                    {Domains.map(d => (
                        <button key={d}
                            className={`btn btn-sm ${selectedDomains.includes(d) ? 'btn-primary' : ''}`}
                            onClick={() => toggleDomain(d)}>
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Text Input */}
            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">{mode === 'law' ? 'Legal Text' : 'Corporate Policy Text'}</label>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button className="btn btn-sm" onClick={loadSample}>Load Sample</button>
                        <label className="btn btn-sm" style={{ cursor: 'pointer' }}>
                            📁 Upload JSON
                            <input type="file" accept=".json" onChange={handleFileUpload}
                                style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>
                <textarea className="form-textarea" value={text} onChange={e => setText(e.target.value)}
                    placeholder={mode === 'law'
                        ? 'Paste legal text here (e.g., PIPEDA sections, SOX requirements, traffic act provisions)...'
                        : 'Paste corporate/fleet/privacy/financial policy text here...'
                    }
                    style={{ minHeight: '280px' }} />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <button className="btn btn-primary btn-lg" onClick={handleProcess} disabled={!text.trim() || processing}>
                    {processing ? '⏳ Processing…' : `🔄 Generate ${mode === 'law' ? 'Law' : 'Enterprise'} Model`}
                </button>
                {result && (
                    <span className="badge badge-pass">
                        ✓ {result.model_type} generated — {result.entities?.length || 0} entities,{' '}
                        {result.relations?.length || 0} relations
                        {result.validation_checks?.length > 0 && `, ${result.validation_checks.length} checks`}
                    </span>
                )}
            </div>

            {error && (
                <div className="card animate-in" style={{ marginTop: 'var(--space-lg)', borderColor: 'var(--fail)' }}>
                    <span style={{ color: 'var(--fail)', fontSize: '0.85rem' }}>❌ {error}</span>
                </div>
            )}
        </div>
    );
}
