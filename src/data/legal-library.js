/**
 * Legal Library — Curated links to primary legal sources organized by jurisdiction
 * These can be fetched and consumed by the Phase 1 extraction pipeline
 */

export const LegalLibrary = {
    // ─── European Union ───────────────────────────────────────────────────────────
    EU: {
        name: 'European Union',
        flag: '🇪🇺',
        laws: [
            {
                id: 'eu-gdpr',
                name: 'GDPR (General Data Protection Regulation)',
                citation: 'Regulation (EU) 2016/679',
                url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679',
                domains: ['Privacy'],
                effective_date: '2018-05-25',
                description: 'Comprehensive data protection regulation governing the processing of personal data of individuals in the EU/EEA. Establishes data subject rights, controller/processor obligations, lawful bases for processing, cross-border transfer mechanisms, and enforcement via supervisory authorities with penalties up to €20M or 4% of global turnover.',
                key_provisions: ['Lawful Basis (Art. 6)', 'Consent (Art. 7)', 'Data Subject Rights (Arts. 12-23)', 'Controller Obligations (Arts. 24-43)', 'Transfers (Ch. V)', 'Supervisory Authorities (Ch. VI)', 'Penalties (Art. 83)'],
            },
            {
                id: 'eu-ai-act',
                name: 'The AI Act',
                citation: 'Regulation (EU) 2024/1689',
                url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
                domains: ['AV', 'Privacy', 'Financial'],
                effective_date: '2024-08-01',
                description: 'Risk-based regulatory framework for artificial intelligence systems. Classifies AI into unacceptable, high-risk, limited, and minimal risk tiers. Imposes conformity assessments, transparency obligations, human oversight requirements, and prohibitions on manipulative/exploitative AI practices.',
                key_provisions: ['Prohibited Practices (Art. 5)', 'High-Risk Classification (Art. 6)', 'Conformity Assessment (Art. 43)', 'Transparency (Art. 52)', 'Penalties (Art. 99)'],
            },
            {
                id: 'eu-eprivacy',
                name: 'ePrivacy Directive',
                citation: 'Directive 2002/58/EC',
                url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32002L0058',
                domains: ['Privacy'],
                effective_date: '2002-07-31',
                description: 'Governs privacy in electronic communications, including cookies and consent for tracking, confidentiality of communications, traffic and location data processing, and unsolicited marketing restrictions.',
                key_provisions: ['Confidentiality of Communications (Art. 5)', 'Traffic Data (Art. 6)', 'Cookies/Consent (Art. 5(3))', 'Unsolicited Communications (Art. 13)'],
            },
            {
                id: 'eu-psd2',
                name: 'PSD2 (Payment Services Directive)',
                citation: 'Directive (EU) 2015/2366',
                url: 'https://eur-lex.europa.eu/legal-content/EN/AUTO/?uri=CELEX:32015L2366',
                domains: ['Financial'],
                effective_date: '2018-01-13',
                description: 'Regulates payment services and payment service providers throughout the EU. Introduces strong customer authentication (SCA), open banking via account access APIs, and enhanced consumer protection for electronic payments.',
                key_provisions: ['Strong Customer Authentication (Art. 97)', 'Account Access (Art. 67)', 'Consumer Protection (Title III)', 'Licensing (Title II)'],
            },
            {
                id: 'eu-dsa',
                name: 'Digital Services Act (DSA)',
                citation: 'Regulation (EU) 2022/2065',
                url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32022R2065',
                domains: ['Privacy'],
                effective_date: '2024-02-17',
                description: 'Establishes a framework for digital intermediary services, addressing illegal content, transparent advertising, and algorithmic accountability. Imposes tiered obligations on hosting services, online platforms, and very large platforms.',
                key_provisions: ['Due Diligence (Ch. III)', 'Illegal Content (Art. 16)', 'Transparency (Art. 24)', 'Systemic Risk (Art. 34)', 'Penalties (Art. 52)'],
            },
        ],
    },

    // ─── United Kingdom ───────────────────────────────────────────────────────────
    UK: {
        name: 'United Kingdom',
        flag: '🇬🇧',
        laws: [
            {
                id: 'uk-gdpr',
                name: 'UK GDPR / Data Protection Act 2018',
                citation: 'Data Protection Act 2018',
                url: 'https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted',
                domains: ['Privacy'],
                effective_date: '2018-05-25',
                description: 'UK\'s post-Brexit data protection framework, retaining the substantive provisions of the EU GDPR as applied domestically. Governs processing of personal data by controllers and processors established in the UK, with enforcement by the ICO.',
                key_provisions: ['General Processing (Part 2)', 'Law Enforcement Processing (Part 3)', 'Intelligence Services Processing (Part 4)', 'ICO Powers (Part 5)', 'Enforcement (Part 6)'],
            },
            {
                id: 'uk-pecr',
                name: 'Privacy and Electronic Communications Regulations (PECR)',
                citation: 'PECR 2003 (SI 2003/2426)',
                url: 'https://ico.org.uk/for-organisations/guide-to-pecr/',
                domains: ['Privacy'],
                effective_date: '2003-12-11',
                description: 'Regulates electronic marketing communications, cookies, and traffic/location data in the UK. Complements the UK GDPR for electronic communications privacy.',
                key_provisions: ['Marketing Calls (Reg. 21)', 'Marketing Emails (Reg. 22)', 'Cookies (Reg. 6)', 'Traffic Data (Reg. 7)'],
            },
            {
                id: 'uk-online-safety',
                name: 'Online Safety Act 2023',
                citation: 'Online Safety Act 2023',
                url: 'https://www.legislation.gov.uk/ukpga/2023/30/contents/enacted',
                domains: ['Privacy'],
                effective_date: '2023-10-26',
                description: 'Comprehensive online safety regulation imposing duties of care on service providers regarding illegal content, content harmful to children, and fraudulent advertising. Enforced by Ofcom.',
                key_provisions: ['Illegal Content Duties (Part 3)', 'Children\'s Safety (Part 4)', 'Transparency Reporting (Part 6)', 'Ofcom Enforcement (Part 7)'],
            },
            {
                id: 'uk-fsma-2023',
                name: 'Financial Services and Markets Act 2023',
                citation: 'Financial Services and Markets Act 2023',
                url: 'https://www.legislation.gov.uk/ukpga/2023/29/contents/enacted',
                domains: ['Financial'],
                effective_date: '2023-06-29',
                description: 'Post-Brexit overhaul of UK financial regulation. Revokes retained EU financial services law and delegates rule-making to FCA and PRA. Establishes designated activities regime and crypto-asset regulation framework.',
                key_provisions: ['Designated Activities (Part 1)', 'FCA/PRA Rule-Making (Part 2)', 'Digital Settlement Assets (Part 3)', 'Consumer Protection (Part 4)'],
            },
        ],
    },

    // ─── Ireland ──────────────────────────────────────────────────────────────────
    IE: {
        name: 'Ireland',
        flag: '🇮🇪',
        laws: [
            {
                id: 'ie-dpa-2018',
                name: 'Data Protection Act 2018',
                citation: 'Data Protection Act 2018 (No. 7 of 2018)',
                url: 'https://www.irishstatutebook.ie/eli/2018/act/7/enacted/en/html',
                domains: ['Privacy'],
                effective_date: '2018-05-24',
                description: 'Gives further effect to the GDPR in Irish law and transposes the Law Enforcement Directive. Establishes the Data Protection Commission (DPC) as the lead supervisory authority for many multinational tech companies headquartered in Ireland.',
                key_provisions: ['DPC Powers (Part 5)', 'Law Enforcement Processing (Part 5)', 'Restrictions on Data Subject Rights (Part 6)', 'Offences (Part 9)'],
            },
            {
                id: 'ie-consumer-protection',
                name: 'Consumer Protection (Financial Services)',
                citation: 'Central Bank of Ireland Legislation',
                url: 'https://www.centralbank.ie/regulation/how-we-regulate/legislation',
                domains: ['Financial'],
                effective_date: null,
                description: 'Central Bank of Ireland\'s consumer protection framework governing financial services providers, including conduct of business rules, fitness and probity standards, and consumer protection codes.',
                key_provisions: ['Consumer Protection Code', 'Fitness and Probity Standards', 'Conduct of Business Rules'],
            },
        ],
    },

    // ─── Canada ───────────────────────────────────────────────────────────────────
    CA: {
        name: 'Canada',
        flag: '🇨🇦',
        laws: [
            {
                id: 'ca-pipeda',
                name: 'PIPEDA (Personal Information Protection and Electronic Documents Act)',
                citation: 'S.C. 2000, c. 5',
                url: 'https://laws-lois.justice.gc.ca/eng/acts/P-8.6/',
                domains: ['Privacy'],
                effective_date: '2000-04-13',
                description: 'Federal private-sector privacy law establishing 10 Fair Information Principles: Accountability, Identifying Purposes, Consent, Limiting Collection, Limiting Use/Disclosure/Retention, Accuracy, Safeguards, Openness, Individual Access, and Challenging Compliance. Mandatory breach reporting for real risk of significant harm.',
                key_provisions: ['10 Fair Information Principles (Schedule 1)', 'Consent (s. 6.1)', 'Breach Reporting (s. 10.1)', 'Commissioner Powers (Part 1)', 'Penalties'],
            },
            {
                id: 'ca-privacy-act',
                name: 'Privacy Act (Public Sector)',
                citation: 'R.S.C. 1985, c. P-21',
                url: 'https://laws-lois.justice.gc.ca/eng/acts/P-21/',
                domains: ['Privacy'],
                effective_date: '1983-07-01',
                description: 'Governs the collection, use, and disclosure of personal information by federal government institutions. Establishes the right of Canadian citizens and permanent residents to access and correct their personal information held by the government.',
                key_provisions: ['Collection (s. 4)', 'Use & Disclosure (ss. 7-8)', 'Access Rights (s. 12)', 'Privacy Commissioner (Part II)'],
            },
            {
                id: 'ca-bank-act',
                name: 'The Bank Act',
                citation: 'S.C. 1991, c. 46',
                url: 'https://laws-lois.justice.gc.ca/eng/acts/B-1.01/',
                domains: ['Financial'],
                effective_date: '1991-12-01',
                description: 'Primary federal statute governing banks and banking in Canada. Covers incorporation, ownership, governance, capital requirements, permitted business activities, consumer protection, and OSFI supervision.',
                key_provisions: ['Corporate Governance (Part VI)', 'Capital & Liquidity (Part VII)', 'Investments (Part VIII)', 'Consumer Protection (Part XII.2)'],
            },
            {
                id: 'ca-bill-c27',
                name: 'Digital Charter Implementation Act (Bill C-27)',
                citation: 'Bill C-27 (44th Parliament)',
                url: 'https://www.parl.ca/DocumentViewer/en/44-1/bill/C-27/first-reading',
                domains: ['Privacy', 'AV'],
                effective_date: null,
                description: 'Proposed legislation containing three parts: Consumer Privacy Protection Act (CPPA), Personal Information and Data Protection Tribunal Act, and Artificial Intelligence and Data Act (AIDA). Bill C-27 died on the order paper in January 2025.',
                key_provisions: ['CPPA (Part 1)', 'Tribunal (Part 2)', 'AIDA (Part 3)', 'Consent Framework', 'Algorithmic Transparency'],
                status: 'Died on order paper — January 2025',
            },
            {
                id: 'ca-quebec-law25',
                name: 'Quebec Law 25',
                citation: 'Act respecting the protection of personal information in the private sector (R.S.Q., c. P-39.1)',
                url: 'https://www.legisquebec.gouv.qc.ca/en/document/cs/p-39.1',
                domains: ['Privacy'],
                effective_date: '2023-09-22',
                description: 'Quebec\'s modernized private-sector privacy law. Mandates Privacy Impact Assessments (PIAs), opt-in consent for sensitive data, data portability, and administrative monetary penalties up to C$10M or 2% of worldwide turnover.',
                key_provisions: ['Mandatory PIAs (s. 3.3)', 'Consent (s. 14)', 'De-identification (s. 12)', 'AMPs up to C$10M (s. 90.1)', 'Right to Portability (s. 27)'],
            },
        ],
    },

    // ─── United States ────────────────────────────────────────────────────────────
    US: {
        name: 'United States',
        flag: '🇺🇸',
        laws: [
            {
                id: 'us-glba',
                name: 'Gramm-Leach-Bliley Act (GLBA)',
                citation: 'Pub.L. 106–102',
                url: 'https://www.ftc.gov/business-guidance/resources/how-comply-privacy-consumer-financial-information-rule-gramm-leach-bliley-act',
                domains: ['Financial', 'Privacy'],
                effective_date: '1999-11-12',
                description: 'Requires financial institutions to explain information-sharing practices and safeguard sensitive data. Establishes the Financial Privacy Rule (disclosure of privacy practices), the Safeguards Rule (security program requirements), and pretexting protection.',
                key_provisions: ['Financial Privacy Rule', 'Safeguards Rule', 'Pretexting Protection', 'FTC Enforcement'],
            },
            {
                id: 'us-hipaa',
                name: 'HIPAA (Health Insurance Portability and Accountability Act)',
                citation: 'Pub.L. 104–191',
                url: 'https://www.hhs.gov/hipaa/index.html',
                domains: ['Privacy'],
                effective_date: '1996-08-21',
                description: 'Establishes national standards for the protection of patient health information (PHI). The Privacy Rule governs use and disclosure of PHI, the Security Rule mandates administrative/physical/technical safeguards for electronic PHI, and the Breach Notification Rule requires reporting of unauthorized disclosures.',
                key_provisions: ['Privacy Rule (45 CFR Part 160/164)', 'Security Rule', 'Breach Notification Rule', 'Enforcement Rule', 'Minimum Necessary Standard'],
            },
            {
                id: 'us-ccpa-cpra',
                name: 'CCPA/CPRA (California Consumer Privacy Act)',
                citation: 'Cal. Civ. Code § 1798.100 et seq.',
                url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&part=4.&lawCode=CIV&title=1.81.5',
                domains: ['Privacy'],
                effective_date: '2020-01-01',
                description: 'California\'s comprehensive consumer privacy law, amended by CPRA (effective 2023). Grants consumers rights to know, delete, opt-out of sale/sharing, correct, and limit use of sensitive personal information. Enforced by the California Privacy Protection Agency (CPPA) with penalties up to $7,988/violation.',
                key_provisions: ['Right to Know (§ 1798.100)', 'Right to Delete (§ 1798.105)', 'Right to Opt-Out (§ 1798.120)', 'Sensitive PI (§ 1798.121)', 'CPPA Enforcement (§ 1798.199)'],
            },
            {
                id: 'us-fcra',
                name: 'Fair Credit Reporting Act (FCRA)',
                citation: '15 U.S.C. § 1681 et seq.',
                url: 'https://www.consumer.ftc.gov/articles/pdf-0111-fair-credit-reporting-act.pdf',
                domains: ['Financial', 'Privacy'],
                effective_date: '1970-10-26',
                description: 'Regulates the collection, dissemination, and use of consumer credit information. Establishes accuracy, fairness, and privacy obligations for consumer reporting agencies, and rights for consumers to access and dispute their credit reports.',
                key_provisions: ['Permissible Purposes (§ 1681b)', 'Consumer Disclosure (§ 1681g)', 'Dispute Procedures (§ 1681i)', 'Adverse Action (§ 1681m)', 'Identity Theft (§ 1681c-1)'],
            },
            {
                id: 'us-cisa',
                name: 'Cybersecurity Information Sharing Act (CISA)',
                citation: 'Pub.L. 114–113 (Title I)',
                url: 'https://www.cisa.gov/resources-tools/resources/cybersecurity-information-sharing-act-2015-procedures-and-guidance',
                domains: ['Privacy'],
                effective_date: '2015-12-18',
                description: 'Authorizes the sharing of cyber threat indicators and defensive measures between the federal government and private sector. Provides liability protections for organizations sharing cybersecurity threat information in good faith.',
                key_provisions: ['Threat Indicator Sharing (§ 104)', 'Liability Protection (§ 106)', 'Privacy Protections (§ 105)', 'Federal Coordination (§ 103)'],
            },
        ],
    },
};

/**
 * Get all laws as a flat array
 */
export function getAllLaws() {
    const laws = [];
    for (const [jurisdictionCode, jurisdiction] of Object.entries(LegalLibrary)) {
        for (const law of jurisdiction.laws) {
            laws.push({
                ...law,
                jurisdiction_code: jurisdictionCode,
                jurisdiction_name: jurisdiction.name,
                jurisdiction_flag: jurisdiction.flag,
            });
        }
    }
    return laws;
}

/**
 * Get laws filtered by domain
 */
export function getLawsByDomain(domain) {
    return getAllLaws().filter(l => l.domains.includes(domain));
}

/**
 * Get laws filtered by jurisdiction
 */
export function getLawsByJurisdiction(code) {
    const jurisdiction = LegalLibrary[code];
    if (!jurisdiction) return [];
    return jurisdiction.laws.map(law => ({
        ...law,
        jurisdiction_code: code,
        jurisdiction_name: jurisdiction.name,
        jurisdiction_flag: jurisdiction.flag,
    }));
}

/**
 * Get a specific law by ID
 */
export function getLawById(id) {
    return getAllLaws().find(l => l.id === id) || null;
}

/**
 * Search laws by keyword
 */
export function searchLaws(query) {
    const q = query.toLowerCase();
    return getAllLaws().filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.citation.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.domains.some(d => d.toLowerCase().includes(q))
    );
}

export default LegalLibrary;
