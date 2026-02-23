# ⚖️ Regentic

**SAT-based compliance validation engine** — translating natural language legal text into formal mathematical logic for automated enterprise compliance checking.

Built on the **Governance Analysis Method (GAM)** framework and Giovanni Sartor's *Cognitive Approach to Legal Reasoning*, Regentic bridges the gap between jurisprudence and computational logic using a structured data format called **GAL-JSON** (Governance Analysis Language).

---

## ✨ Features

### Core Engine
- **GAL-JSON Schema** — 11 entity types, 20+ relation types, 12 policy operators with full validation
- **Ontology Registry** — 208 pre-registered entities across traffic/AV, privacy, and financial domains
- **DPLL SAT Solver** — Unit propagation, pure literal elimination, and conflict analysis
- **Consistency Checker** — Validates `Con(Φ_E ∧ Φ_L)` — no logical contradictions between enterprise and law
- **Defeasibility Engine** — Rebutting/undercutting defeat, reinstatement, Lex Specialis/Posterior/Superior

### Three-Phase Pipeline
| Phase | Description |
|-------|-------------|
| **1. Pattern Extraction** | Extracts 14 pattern types from natural language legal text |
| **2. GAL Translation** | Translates to 35+ GAL operators and 12 policy types |
| **3. Validation Logic** | Generates 19 check types for SAT-based verification |

### System Meta-Functions
| Function | Purpose |
|----------|---------|
| `@Read_Law_To_GAM` | Parse legal text → GAL-JSON Law Model (Φ_L) |
| `@Read_Policy_To_GAM` | Parse corporate policy → Enterprise Model (Φ_E) |
| `@Validate_Compliance` | 7-section audit: consistency, ontology, scenario, potestative, defeasibility, completeness |
| `@Compare_Jurisdictions` | Cross-jurisdictional equivalence mapping and gap analysis |
| `@Generate_Compliance_Matrix` | Map legal requirements to enterprise controls |
| `@Deprecate_Rule` | Cascading rule deprecation without ontology disruption |

### Web Interface
Premium dark-mode React UI with:
- **Dashboard** — Stats, action buttons, ontology breakdown
- **Law/Policy Input** — Jurisdiction selector, domain picker, sample data, JSON upload
- **GAL-JSON Viewer** — Collapsible tree with search and raw JSON toggle
- **Validation Results** — 7-tab audit report with progress bars
- **Compliance Matrix** — Requirements-to-controls table
- **Ontology Browser** — Searchable, filterable entity table

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Installation
```bash
git clone https://github.com/drwaelhassan/regentic.git
cd regentic
npm install
```

### Run
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── core/                    # Engine modules
│   ├── schema.js            # GAL-JSON schema & validators
│   ├── ontology.js          # 208-entity registry
│   ├── sat-solver.js        # DPLL SAT solver
│   ├── consistency-checker.js
│   └── defeasibility.js     # Defeat & conflict resolution
├── pipeline/                # Three-phase pipeline
│   ├── phase1-extractor.js  # Pattern extraction
│   ├── phase2-translator.js # GAL translation
│   └── phase3-validator.js  # Validation logic
├── functions/               # System meta-functions
│   ├── read-law.js
│   ├── read-policy.js
│   ├── validate-compliance.js
│   ├── compare-jurisdictions.js
│   ├── compliance-matrix.js
│   └── deprecate-rule.js
├── components/              # React UI
│   ├── Dashboard.jsx
│   ├── LawInput.jsx
│   ├── GalJsonViewer.jsx
│   ├── ValidationResults.jsx
│   ├── ComplianceMatrix.jsx
│   └── OntologyBrowser.jsx
├── utils/                   # Helpers
├── App.jsx                  # Main app shell
├── main.jsx                 # Entry point
└── index.css                # Design system
```

---

## 🌍 Supported Jurisdictions & Domains

| Domain | Coverage |
|--------|----------|
| **Privacy** | PIPEDA, Quebec Law 25, Ontario FIPPA/PHIPA, Alberta/BC PIPA, CCPA/CPRA, VCDPA, CPA, 20+ US state laws |
| **Financial** | SOX (302/404/906), NI 52-109, PCAOB, SEC, FASB |
| **Traffic & AV** | Ontario HTA, California DMV/CPUC, Arizona SB 1417, UNECE WP.29, UK AV Act 2024, Germany StVG, Japan Road Traffic Act, Singapore LTA, China MIIT, UAE ITC |
| **Robo-Taxi** | SAE L3/L4/L5, ODD constraints, teledriving, remote operation |

---

## 📖 Theoretical Foundation

Regentic implements the formal compliance equation:

$$Con(\Phi_E \wedge \Phi_L)$$

Where:
- **Φ_E** = Enterprise operational model (policies, processes, controls)
- **Φ_L** = Legal requirements (statutes, regulations, case law)
- **Con()** = Logical consistency — no contradictions exist in the conjunction

Key theoretical concepts from Sartor's framework:
- **Doxification of Practical Reasoning** — Norms treated as normative beliefs subject to logical scrutiny
- **Bounded Rationality** — Law as a distributed cognitive system with institutional delegation
- **Defeasible Reasoning** — Rules can be defeated by more specific, more recent, or higher-authority norms
- **Hohfeldian Modalities** — Right/Duty, Privilege/NoRight, Power/Liability, Immunity/Disability correlatives

---

## 🛠️ Tech Stack

- **Core**: JavaScript (ES Modules)
- **UI**: React 19 + Vite 6
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **Logic**: Custom DPLL SAT solver (no external dependencies)

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

You are free to share and adapt this work for **non-commercial purposes only**, with appropriate attribution.

See [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Dr. Wael Hassan** — [github.com/drwaelhassan](https://github.com/drwaelhassan)
