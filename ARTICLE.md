# Introducing Regentic: An Open-Source Engine That Translates Law Into Logic

## When Compliance Stops Being a Checklist and Starts Being a Proof

Every enterprise today sits at the intersection of dozens — sometimes hundreds — of overlapping legal obligations. A fleet operator in Ontario must simultaneously satisfy the Highway Traffic Act, PIPEDA, Quebec's Law 25, NI 52-109 financial reporting rules, and (if they're deploying autonomous vehicles) the emerging patchwork of AV regulations from California's CPUC to the UK's Automated Vehicles Act 2024 to Japan's revised Road Traffic Act. A single misstep doesn't just mean a fine — it means systemic risk.

The traditional approach? Spreadsheets. Policy manuals. Expensive consultants. Annual audits that confirm what was true six months ago. Compliance treated as a human judgment call, not a provable state.

**What if compliance could be mathematically proven?**

That's the question behind **Regentic** — an open-source compliance validation engine I've just released at [github.com/drwaelhassan/regentic](https://github.com/drwaelhassan/regentic).

---

## The Core Idea: Con(Φ_E ∧ Φ_L)

At its heart, Regentic reduces the compliance question to a single formal equation:

> **Is the conjunction of your enterprise model (Φ_E) and the legal requirements (Φ_L) logically consistent?**

If yes — no contradictions exist between what you do and what the law demands. If no — the system tells you exactly where and why.

This isn't metaphor. Regentic contains a working SAT solver that encodes legal obligations, corporate policies, role assignments, separation-of-duties constraints, sequential process requirements, and data access controls as Boolean satisfiability clauses. It then proves — or disproves — consistency.

---

## From Sartor's Jurisprudence to Running Code

The theoretical engine behind Regentic draws heavily on Giovanni Sartor's *Cognitive Approach to Legal Reasoning* (Volume 5 of A Treatise of Legal Philosophy and General Jurisprudence) and the Governance Analysis Method (GAM) framework.

Three ideas from this body of work are central:

**1. Doxification of Practical Reasoning.** Traditional philosophy draws a hard line between beliefs (what is true) and norms (what ought to be done). Sartor argues that norms can be processed as "normative beliefs" — a specialized form of belief that can be subjected to the same logical consistency checks we apply to factual propositions. This is the theoretical foundation that lets us treat "organizations must designate a privacy officer" with the same computational rigor as "water boils at 100°C."

**2. Bounded Rationality and Cognitive Delegation.** The legal system is a distributed cognitive architecture. Legislators, judges, and regulators each handle pieces of reasoning that no single agent could manage alone. Regentic operationalizes this by decomposing legal text into formal patterns — activities, processes, roles, assignments, separations, delegations — that a solver can evaluate.

**3. Defeasible Reasoning.** Legal rules defeat each other. A provincial regulation overrides a federal one in specific circumstances (Lex Specialis). A newer statute supersedes an older one (Lex Posterior). A constitutional provision trumps ordinary legislation (Lex Superior). Regentic's defeasibility engine models all of these conflict-resolution principles, including reinstatement — where a defeated rule is restored when the defeater is itself defeated.

---

## What Regentic Actually Does

The system operates as a three-phase pipeline:

**Phase 1: Pattern Extraction.** Natural language legal text is decomposed into 14 standardized compliance primitives — activity patterns, process patterns, role patterns, separation-of-concerns patterns, exemption patterns, temporal and zone-based modalities, and more.

**Phase 2: GAL Translation.** Extracted patterns are translated into the Governance Analysis Language — a structured JSON format with 35+ operators covering process hierarchy (ComposedOf, Contains, Next), role assignment (AssignedTo, Assumes, Acts), delegation, equivalence, and 12 policy-modality operators (CanAssignTo, CanAssume, CanAccess, CanCollect, CanDelegate, and others).

**Phase 3: Validation Logic.** The system generates 19 types of formal checks — from simple instance verification ("does this required role exist in your org?") to transitive activity traces, separation-of-duties enforcement, Hohfeldian modality consistency, and cross-jurisdictional conflict detection.

The output is a **7-section compliance audit**:
- Consistency Analysis (SAT-based)
- Ontology Audit
- Scenario Audit
- Potestative Audit (Hohfeldian correlatives)
- Defeasibility Audit
- Completeness Audit
- Executive Summary with critical violations

---

## 208 Entities Across Five Domains

Regentic ships with a pre-built ontology spanning:

- **Privacy** — PIPEDA's 10 Fair Information Principles, Quebec Law 25, Ontario FIPPA/PHIPA, CCPA/CPRA, and 20+ US state privacy laws
- **Financial Reporting** — SOX Sections 302/404/906, NI 52-109 CEO/CFO certification, PCAOB standards
- **Traffic & Autonomous Vehicles** — Driver classifications (G1/G2/Full, Class 5/7, Learner/Novice), vehicle types, infrastructure zones, ODD constraints
- **Robo-Taxi Regulations** — California's tripartite permitting matrix, Arizona SB 1417, UNECE WP.29, UK AV Act 2024, Japan's teledriving framework, China's vehicle-road-cloud integration, Singapore LTA
- **Cross-Jurisdictional Equivalence** — EquProcess, EquRole, and EquActivity operators that map analogous concepts across borders (e.g., Canadian ICFR ↔ US Internal Controls)

---

## Why Open Source, Why Now

The regulatory landscape for emerging technology — particularly autonomous mobility and AI-driven data processing — is evolving faster than any organization's compliance team can track manually. In the first quarter of 2026 alone:

- UNECE's GRVA finalized draft global ADS regulations for vehicles with no human supervision
- Ontario FIPPA amendments mandating PIAs took effect
- Arizona's SB 1417 imposed $5M insurance minimums and forensic data retention requirements for driverless operations
- China's MIIT announced stricter market access standards for connected vehicles

These aren't isolated events. They interact. A fleet operator deploying robo-taxis in Toronto and San Francisco must satisfy overlapping (and sometimes contradicting) requirements from multiple sovereigns. The only scalable response is formalization.

Regentic is released under **CC BY-NC 4.0** — free for research, education, and non-commercial use. The goal is to provide a foundation that the compliance, legal-tech, and academic communities can build on.

---

## Try It

```bash
git clone https://github.com/drwaelhassan/regentic.git
cd regentic && npm install && npm run dev
```

Paste any legal text. Select jurisdiction and domain. Generate a formal model. Run compliance validation. See exactly where the gaps are.

The code is the argument.

---

*Dr. Wael Hassan is a governance and compliance technology researcher. Regentic is available at [github.com/drwaelhassan/regentic](https://github.com/drwaelhassan/regentic).*

---

**Tags:** #LegalTech #Compliance #GRC #AutonomousVehicles #Privacy #OpenSource #SAT #FormalMethods #RegulatoryTechnology #RegTech
