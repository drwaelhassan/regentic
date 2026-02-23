import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard.jsx';
import LawInput from './components/LawInput.jsx';
import GalJsonViewer from './components/GalJsonViewer.jsx';
import ValidationResults from './components/ValidationResults.jsx';
import ComplianceMatrix from './components/ComplianceMatrix.jsx';
import OntologyBrowser from './components/OntologyBrowser.jsx';

const NAV_ITEMS = [
    { key: 'dashboard', icon: '📊', label: 'Dashboard' },
    { key: 'input', icon: '📝', label: 'Input / Extract' },
    { key: 'law-model', icon: '📜', label: 'Law Model (Φ_L)' },
    { key: 'enterprise-model', icon: '🏢', label: 'Enterprise (Φ_E)' },
    { key: 'validation', icon: '🔬', label: 'Validation' },
    { key: 'matrix', icon: '📋', label: 'Compliance Matrix' },
    { key: 'ontology', icon: '🧬', label: 'Ontology Browser' },
];

export default function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [lawModel, setLawModel] = useState(null);
    const [enterpriseModel, setEnterpriseModel] = useState(null);
    const [validationReport, setValidationReport] = useState(null);
    const [complianceMatrix, setComplianceMatrix] = useState(null);

    const handleModelLoaded = useCallback((type, model) => {
        if (type === 'law') {
            setLawModel(model);
            setActiveView('law-model');
        } else {
            setEnterpriseModel(model);
            setActiveView('enterprise-model');
        }
    }, []);

    const handleResult = useCallback((type, data) => {
        if (type === 'validation') {
            setValidationReport(data);
            setActiveView('validation');
        } else if (type === 'matrix') {
            setComplianceMatrix(data);
            setActiveView('matrix');
        }
    }, []);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard onResult={handleResult} lawModel={lawModel} enterpriseModel={enterpriseModel} />;
            case 'input':
                return <LawInput onModelLoaded={handleModelLoaded} />;
            case 'law-model':
                return <GalJsonViewer model={lawModel} title="Law Model (Φ_L)" />;
            case 'enterprise-model':
                return <GalJsonViewer model={enterpriseModel} title="Enterprise Model (Φ_E)" />;
            case 'validation':
                return <ValidationResults report={validationReport} />;
            case 'matrix':
                return <ComplianceMatrix matrix={complianceMatrix} />;
            case 'ontology':
                return <OntologyBrowser />;
            default:
                return <Dashboard onResult={handleResult} lawModel={lawModel} enterpriseModel={enterpriseModel} />;
        }
    };

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">⚖️</span>
                    <h1>GAM Engine</h1>
                </div>

                <nav className="nav-section">
                    <div className="nav-section-title">Navigation</div>
                    {NAV_ITEMS.map(item => (
                        <div key={item.key}
                            className={`nav-item ${activeView === item.key ? 'active' : ''}`}
                            onClick={() => setActiveView(item.key)}>
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <nav className="nav-section" style={{ marginTop: 'auto' }}>
                    <div className="nav-section-title">Status</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0 var(--space-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span>Φ_L</span>
                            <span className={`badge ${lawModel ? 'badge-pass' : 'badge-indeterminate'}`}>
                                {lawModel ? 'Loaded' : 'Empty'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Φ_E</span>
                            <span className={`badge ${enterpriseModel ? 'badge-pass' : 'badge-indeterminate'}`}>
                                {enterpriseModel ? 'Loaded' : 'Empty'}
                            </span>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {renderView()}
            </main>
        </div>
    );
}
