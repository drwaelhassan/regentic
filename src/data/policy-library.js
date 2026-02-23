/**
 * Company Policy Library — Pre-loaded enterprise privacy policies, trust centers,
 * community guidelines, safety policies, and regulatory portals
 */

export const PolicyLibrary = {

    // ═══════════════════════════════════════════════════════════════════════════════
    // PRIVACY POLICIES
    // ═══════════════════════════════════════════════════════════════════════════════
    privacy_policies: {
        name: 'Privacy Policies',
        icon: '🔒',
        description: 'Corporate privacy notices and data handling disclosures',
        entries: [
            {
                id: 'pp-google',
                company: 'Google',
                logo: '🔍',
                name: 'Google Privacy Policy',
                url: 'https://policies.google.com/privacy',
                category: 'Big Tech',
                domains: ['Privacy', 'AV'],
                description: 'Covers data collection across all Google services including Search, Maps, YouTube, Android, Google Cloud, and Waymo. Addresses automated decision-making, cross-service data sharing, and international transfers.',
            },
            {
                id: 'pp-apple',
                company: 'Apple',
                logo: '🍎',
                name: 'Apple Privacy Policy',
                url: 'https://www.apple.com/legal/privacy/en-ww/',
                category: 'Big Tech',
                domains: ['Privacy'],
                description: 'Global privacy policy covering iCloud, App Store, Apple Pay, Siri, Health, and device telemetry. Emphasizes on-device processing, differential privacy, and transparency reports.',
            },
            {
                id: 'pp-microsoft',
                company: 'Microsoft',
                logo: '🪟',
                name: 'Microsoft Privacy Statement',
                url: 'https://privacy.microsoft.com/en-us/privacystatement',
                category: 'Big Tech',
                domains: ['Privacy'],
                description: 'Comprehensive privacy statement for Microsoft 365, Azure, Windows, LinkedIn, GitHub, and Xbox. Details AI-powered features, enterprise data processing, and children\'s privacy.',
            },
            {
                id: 'pp-meta',
                company: 'Meta',
                logo: '👤',
                name: 'Meta Privacy Policy',
                url: 'https://www.facebook.com/privacy/policy/',
                category: 'Big Tech',
                domains: ['Privacy'],
                description: 'Unified privacy policy for Facebook, Instagram, WhatsApp, Messenger, and Meta Quest. Covers ad targeting, content moderation, cross-platform data sharing, and EU/UK-specific provisions.',
            },
            {
                id: 'pp-uber',
                company: 'Uber',
                logo: '🚗',
                name: 'Uber Privacy Notice',
                url: 'https://www.uber.com/legal/en/document/?country=united-states&lang=en&name=privacy-notice',
                category: 'Ride-Hailing',
                domains: ['Privacy', 'Traffic'],
                description: 'Privacy notice covering rider, driver, and delivery partner data. Addresses real-time GPS tracking, trip recordings, biometric verification, payment processing, and background check data.',
            },
            {
                id: 'pp-linkedin',
                company: 'LinkedIn',
                logo: '💼',
                name: 'LinkedIn Privacy Policy',
                url: 'https://www.linkedin.com/legal/privacy-policy',
                category: 'Big Tech',
                domains: ['Privacy'],
                description: 'Privacy policy for professional networking, job seeking, and B2B marketing. Covers profile visibility, recruiter activity, InMail, and enterprise talent solutions data.',
            },
            {
                id: 'pp-adobe',
                company: 'Adobe',
                logo: '🎨',
                name: 'Adobe Privacy Policy',
                url: 'https://www.adobe.com/privacy/policy.html',
                category: 'Big Tech',
                domains: ['Privacy'],
                description: 'Covers Creative Cloud, Document Cloud, Experience Cloud, and Adobe Firefly AI. Addresses content analysis for AI training, cloud storage, and cross-product data usage.',
            },
            {
                id: 'pp-cloudflare',
                company: 'Cloudflare',
                logo: '☁️',
                name: 'Cloudflare Privacy Policy',
                url: 'https://www.cloudflare.com/privacypolicy/',
                category: 'Infrastructure',
                domains: ['Privacy'],
                description: 'Infrastructure-focused privacy policy covering DNS resolution, CDN caching, DDoS mitigation, Zero Trust, and Workers. Addresses network-level data processing and law enforcement requests.',
            },
            {
                id: 'pp-stripe',
                company: 'Stripe',
                logo: '💳',
                name: 'Stripe Privacy Policy',
                url: 'https://stripe.com/privacy',
                category: 'Financial',
                domains: ['Privacy', 'Financial'],
                description: 'Payment processing privacy policy covering merchant and cardholder data, fraud detection, identity verification (Stripe Identity), and financial reporting obligations.',
            },
            {
                id: 'pp-shopify',
                company: 'Shopify',
                logo: '🛒',
                name: 'Shopify Privacy Policy',
                url: 'https://www.shopify.com/legal/privacy',
                category: 'E-Commerce',
                domains: ['Privacy', 'Financial'],
                description: 'E-commerce platform privacy policy covering merchant accounts, customer checkout data, Shopify Payments, Shop app, and Shopify Balance financial services.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // RIDE-HAILING & LOGISTICS PRIVACY
    // ═══════════════════════════════════════════════════════════════════════════════
    ridehail_privacy: {
        name: 'Ride-Hailing & Logistics',
        icon: '🚕',
        description: 'Privacy policies from ride-hailing, delivery, and autonomous mobility companies',
        entries: [
            {
                id: 'rh-lyft',
                company: 'Lyft',
                logo: '🟣',
                name: 'Lyft Privacy Policy',
                url: 'https://www.lyft.com/privacy',
                category: 'Ride-Hailing',
                domains: ['Privacy', 'Traffic'],
                description: 'Covers rider and driver data including real-time location, trip history, payment methods, identity verification, and insurance claims data.',
            },
            {
                id: 'rh-grab',
                company: 'Grab',
                logo: '🟢',
                name: 'Grab Privacy Notice',
                url: 'https://www.grab.com/sg/privacy/',
                category: 'Ride-Hailing',
                domains: ['Privacy', 'Traffic', 'Financial'],
                description: 'Southeast Asian super-app privacy notice covering ride-hailing, GrabPay financial services, GrabFood delivery, and GrabMart. Multi-jurisdictional across 8 countries.',
            },
            {
                id: 'rh-didi',
                company: 'DiDi Global',
                logo: '🟠',
                name: 'DiDi Privacy Center',
                url: 'https://web.didiglobal.com/privacy/',
                category: 'Ride-Hailing',
                domains: ['Privacy', 'Traffic', 'AV'],
                description: 'Global ride-hailing privacy policy covering operations in China, Latin America, and other markets. Addresses autonomous driving data, facial recognition, and PIPL compliance.',
            },
            {
                id: 'rh-doordash',
                company: 'DoorDash',
                logo: '🔴',
                name: 'DoorDash Privacy Policy',
                url: 'https://www.doordash.com/privacy/',
                category: 'Delivery',
                domains: ['Privacy'],
                description: 'Delivery platform privacy policy covering consumer, Dasher, and merchant data. Addresses real-time GPS tracking, order history, background checks, and DashPass subscription billing.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // AUTONOMOUS DRIVING & AI
    // ═══════════════════════════════════════════════════════════════════════════════
    autonomous_driving: {
        name: 'Autonomous Driving & AI',
        icon: '🤖',
        description: 'Safety and privacy centers from autonomous vehicle and AI companies',
        entries: [
            {
                id: 'av-waymo',
                company: 'Waymo (Alphabet)',
                logo: '🚐',
                name: 'Waymo Safety & Privacy',
                url: 'https://waymo.com/privacy/',
                category: 'Autonomous Vehicles',
                domains: ['Privacy', 'AV', 'Traffic'],
                description: 'Autonomous driving privacy policy covering LiDAR/camera data collection, rider identification, trip recording, pedestrian detection data, and operational design domain telemetry.',
            },
            {
                id: 'av-tesla',
                company: 'Tesla',
                logo: '⚡',
                name: 'Tesla Privacy & Legal',
                url: 'https://www.tesla.com/legal/privacy',
                category: 'Autonomous Vehicles',
                domains: ['Privacy', 'AV', 'Traffic'],
                description: 'Covers vehicle telemetry, Autopilot/FSD data, cabin camera footage, Supercharger location, Tesla app, and energy product data. Addresses fleet learning and OTA update analytics.',
            },
            {
                id: 'av-amazon',
                company: 'Amazon',
                logo: '📦',
                name: 'Amazon Privacy Notice',
                url: 'https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ',
                category: 'Big Tech',
                domains: ['Privacy', 'AV'],
                description: 'Covers Amazon.com, Alexa, Ring, AWS, Prime, and Zoox autonomous vehicles. Addresses voice recording storage, delivery surveillance, and Alexa skill third-party data sharing.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // TRUST & SECURITY CENTERS
    // ═══════════════════════════════════════════════════════════════════════════════
    trust_security: {
        name: 'Trust & Security Centers',
        icon: '🛡️',
        description: 'Enterprise security documentation, compliance certifications, and shared responsibility models',
        entries: [
            {
                id: 'ts-aws',
                company: 'AWS',
                logo: '☁️',
                name: 'AWS Shared Responsibility Model',
                url: 'https://aws.amazon.com/compliance/shared-responsibility-model/',
                category: 'Cloud',
                domains: ['Privacy', 'Financial'],
                description: 'Defines security responsibility split between AWS (infrastructure) and customer (data, identity, encryption). Foundation for SOC 2, ISO 27001, PCI DSS, and HIPAA compliance.',
            },
            {
                id: 'ts-gcloud',
                company: 'Google Cloud',
                logo: '🔍',
                name: 'Google Cloud Trust Center',
                url: 'https://cloud.google.com/trust-center',
                category: 'Cloud',
                domains: ['Privacy', 'Financial'],
                description: 'Covers data sovereignty, encryption, access transparency, compliance certifications (FedRAMP, HIPAA, PCI DSS), and AI/ML data governance.',
            },
            {
                id: 'ts-microsoft',
                company: 'Microsoft',
                logo: '🪟',
                name: 'Microsoft Trust Center',
                url: 'https://www.microsoft.com/en-us/trust-center',
                category: 'Cloud',
                domains: ['Privacy', 'Financial'],
                description: 'Covers Azure, Microsoft 365, Dynamics 365, and Power Platform. Includes compliance offerings, data residency, encryption, and government cloud.',
            },
            {
                id: 'ts-cloudflare',
                company: 'Cloudflare',
                logo: '☁️',
                name: 'Cloudflare Trust Hub',
                url: 'https://www.cloudflare.com/trust-hub/',
                category: 'Infrastructure',
                domains: ['Privacy'],
                description: 'Infrastructure trust center covering certifications (SOC 2, ISO 27001, PCI DSS), data processing locations, law enforcement request transparency, and GDPR Data Processing Addendum.',
            },
            {
                id: 'ts-stripe',
                company: 'Stripe',
                logo: '💳',
                name: 'Stripe Security',
                url: 'https://stripe.com/docs/security/stripe',
                category: 'Financial',
                domains: ['Financial', 'Privacy'],
                description: 'PCI Level 1 Service Provider security documentation. Covers tokenization, encryption, fraud prevention (Radar), and SOC 2 Type II compliance.',
            },
            {
                id: 'ts-shopify',
                company: 'Shopify',
                logo: '🛒',
                name: 'Shopify Security',
                url: 'https://www.shopify.com/security',
                category: 'E-Commerce',
                domains: ['Financial', 'Privacy'],
                description: 'E-commerce platform security covering PCI DSS Level 1 compliance, bug bounty program, DDoS protection, and merchant data encryption.',
            },
            {
                id: 'ts-github',
                company: 'GitHub',
                logo: '🐙',
                name: 'GitHub Trust Center',
                url: 'https://github.com/trust-center',
                category: 'Developer',
                domains: ['Privacy'],
                description: 'Developer platform security covering SOC 2, code scanning, secret scanning, dependency review, and enterprise managed users.',
            },
            {
                id: 'ts-atlassian',
                company: 'Atlassian',
                logo: '🔷',
                name: 'Atlassian Trust Center',
                url: 'https://www.atlassian.com/trust',
                category: 'Developer',
                domains: ['Privacy'],
                description: 'Covers Jira, Confluence, Bitbucket, and Trello. Includes SOC 2/3, ISO 27001, GDPR, data residency, and vulnerability management practices.',
            },
            {
                id: 'ts-dropbox',
                company: 'Dropbox',
                logo: '📁',
                name: 'Dropbox Security',
                url: 'https://www.dropbox.com/business/trust/security',
                category: 'Cloud Storage',
                domains: ['Privacy'],
                description: 'Cloud storage security covering encryption (AES-256), SSO, advanced audit logging, data classification, and compliance certifications.',
            },
            {
                id: 'ts-zoom',
                company: 'Zoom',
                logo: '📹',
                name: 'Zoom Security',
                url: 'https://explore.zoom.us/en/trust/security/',
                category: 'Communications',
                domains: ['Privacy'],
                description: 'Video communications security covering end-to-end encryption, waiting rooms, data routing controls, and SOC 2 Type II/ISO 27001 compliance.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // COMMUNITY GUIDELINES & ACCEPTABLE USE
    // ═══════════════════════════════════════════════════════════════════════════════
    community_guidelines: {
        name: 'Community Guidelines',
        icon: '📜',
        description: 'Platform community standards, acceptable use policies, and content policies',
        entries: [
            {
                id: 'cg-uber',
                company: 'Uber',
                logo: '🚗',
                name: 'Uber Community Guidelines',
                url: 'https://www.uber.com/legal/community-guidelines/us-can-en/',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'Behavioral standards for riders and drivers covering safety, respect, accountability, discrimination, and fraud prevention.',
            },
            {
                id: 'cg-lyft',
                company: 'Lyft',
                logo: '🟣',
                name: 'Lyft Community Guidelines',
                url: 'https://www.lyft.com/safety/community-guidelines',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'Community safety standards covering zero-tolerance policies, anti-discrimination, vehicle safety requirements, and reporting mechanisms.',
            },
            {
                id: 'cg-airbnb',
                company: 'Airbnb',
                logo: '🏠',
                name: 'Airbnb Community Standards',
                url: 'https://www.airbnb.com/help/article/3328',
                category: 'Hospitality',
                domains: ['Privacy'],
                description: 'Host and guest behavioral standards covering safety, cleanliness, accuracy, communication, and non-discrimination policies.',
            },
            {
                id: 'cg-tiktok',
                company: 'TikTok',
                logo: '🎵',
                name: 'TikTok Community Guidelines',
                url: 'https://www.tiktok.com/community-guidelines',
                category: 'Social Media',
                domains: ['Privacy'],
                description: 'Content moderation policies covering minor safety, harmful content, integrity, AI-generated content labeling, and data collection in-app.',
            },
            {
                id: 'cg-youtube',
                company: 'YouTube',
                logo: '▶️',
                name: 'YouTube Community Guidelines',
                url: 'https://www.youtube.com/howyoutubeworks/policies/community-guidelines/',
                category: 'Social Media',
                domains: ['Privacy'],
                description: 'Content policies covering hateful content, harassment, misinformation, harmful/dangerous content, and monetization eligibility.',
            },
            {
                id: 'cg-x',
                company: 'X (Twitter)',
                logo: '✖️',
                name: 'X Rules and Policies',
                url: 'https://help.x.com/en/rules-and-policies',
                category: 'Social Media',
                domains: ['Privacy'],
                description: 'Platform rules covering abuse, hateful conduct, synthetic/manipulated media, and private information disclosure policies.',
            },
            {
                id: 'cg-reddit',
                company: 'Reddit',
                logo: '🤖',
                name: 'Reddit Content Policy',
                url: 'https://www.redditinc.com/policies/content-policy',
                category: 'Social Media',
                domains: ['Privacy'],
                description: 'Content policy covering community governance, prohibited content, advertising standards, and moderator conduct expectations.',
            },
            {
                id: 'cg-github',
                company: 'GitHub',
                logo: '🐙',
                name: 'GitHub Acceptable Use Policies',
                url: 'https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies',
                category: 'Developer',
                domains: ['Privacy'],
                description: 'Acceptable use policies covering malware, exploits, cryptomining abuse, spam, impersonation, and repository content restrictions.',
            },
            {
                id: 'cg-apple-appstore',
                company: 'Apple',
                logo: '🍎',
                name: 'App Store Review Guidelines',
                url: 'https://developer.apple.com/app-store/review/guidelines/',
                category: 'App Marketplace',
                domains: ['Privacy'],
                description: 'Developer content and privacy guidelines for App Store submissions. Covers data collection transparency, App Tracking Transparency, and in-app purchase rules.',
            },
            {
                id: 'cg-google-play',
                company: 'Google',
                logo: '🔍',
                name: 'Google Play Developer Content Policy',
                url: 'https://play.google.com/about/developer-content-policy/',
                category: 'App Marketplace',
                domains: ['Privacy'],
                description: 'Play Store developer policies covering restricted content, privacy requirements, permissions, data safety section, and monetization standards.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // RIDE-HAILING SAFETY POLICIES
    // ═══════════════════════════════════════════════════════════════════════════════
    safety_policies: {
        name: 'Safety Policies',
        icon: '🦺',
        description: 'Ride-hailing and mobility platform safety programs and incident response',
        entries: [
            {
                id: 'sf-uber',
                company: 'Uber',
                logo: '🚗',
                name: 'Uber Safety Center',
                url: 'https://www.uber.com/mx/en/safety/',
                category: 'Ride-Hailing',
                domains: ['Traffic', 'Privacy'],
                description: 'Real-time safety features including trip sharing, emergency assistance, RideCheck, driver verification, insurance coverage, and incident reporting mechanisms.',
            },
            {
                id: 'sf-lyft',
                company: 'Lyft',
                logo: '🟣',
                name: 'Lyft Safety Center',
                url: 'https://www.lyft.com/safety',
                category: 'Ride-Hailing',
                domains: ['Traffic', 'Privacy'],
                description: 'Safety programs including continuous criminal monitoring, vehicle inspection, emergency help, smart trip check-ins, and community safety education.',
            },
            {
                id: 'sf-grab',
                company: 'Grab',
                logo: '🟢',
                name: 'Grab Safety Center',
                url: 'https://www.grab.com/sg/safety-in-every-ride/',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'Southeast Asian ride-hailing safety covering driver training, facial recognition verification, in-trip safety features, and GrabProtect hygiene standards.',
            },
            {
                id: 'sf-bolt',
                company: 'Bolt',
                logo: '⚡',
                name: 'Bolt Safety',
                url: 'https://bolt.eu/en/rides/safety/',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'European ride-hailing safety features including trip sharing, emergency button, driver background checks, and real-time support.',
            },
            {
                id: 'sf-gojek',
                company: 'Gojek',
                logo: '🟢',
                name: 'Gojek Safety',
                url: 'https://www.gojek.com/sg/safety/',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'Indonesian super-app safety program covering driver verification, route monitoring, emergency SOS, and number masking.',
            },
            {
                id: 'sf-freenow',
                company: 'Free Now',
                logo: '🔵',
                name: 'Free Now Safety',
                url: 'https://www.free-now.com/uk/safety/',
                category: 'Ride-Hailing',
                domains: ['Traffic'],
                description: 'European ride-hailing safety covering licensed driver verification, in-app safety toolkit, and partnership with local transport authorities.',
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // REGULATORY PORTALS
    // ═══════════════════════════════════════════════════════════════════════════════
    regulatory_portals: {
        name: 'Regulatory Portals',
        icon: '🏛️',
        description: 'Government regulatory frameworks for transportation network companies',
        entries: [
            {
                id: 'reg-cpuc-tnc',
                company: 'CPUC',
                logo: '🏛️',
                name: 'California PUC — TNC Licensing',
                url: 'https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies',
                category: 'Regulator',
                domains: ['Traffic', 'AV'],
                description: 'California Public Utilities Commission TNC licensing framework. Covers permit requirements, insurance minimums, driver background checks, accessibility requirements, and AV deployment permits.',
            },
            {
                id: 'reg-cpuc-data',
                company: 'CPUC',
                logo: '🏛️',
                name: 'California PUC — TNC Data Portal',
                url: 'https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies/tnc-data-portal',
                category: 'Regulator',
                domains: ['Traffic', 'Privacy'],
                description: 'TNC reporting requirements including trip data, accessibility metrics, driver hours, collision reports, and zero-emission vehicle deployment data.',
            },
            {
                id: 'reg-nyc-tlc',
                company: 'NYC TLC',
                logo: '🗽',
                name: 'NYC Taxi & Limousine Commission Rules',
                url: 'https://www.nyc.gov/site/tlc/about/tlc-rules.page',
                category: 'Regulator',
                domains: ['Traffic'],
                description: 'New York City TLC rules governing for-hire vehicles, medallion taxis, commuter vans, and app-based services. Covers driver licensing, vehicle standards, fare regulation, and data retention.',
            },
            {
                id: 'reg-tfl',
                company: 'TfL',
                logo: '🇬🇧',
                name: 'Transport for London — Private Hire',
                url: 'https://tfl.gov.uk/info-for/taxis-and-private-hire/',
                category: 'Regulator',
                domains: ['Traffic'],
                description: 'London private hire vehicle and taxi regulations. Covers operator licensing, driver knowledge requirements, vehicle standards, and PHV licence conditions.',
            },
        ],
    },
};

/**
 * Get all policy entries as a flat array
 */
export function getAllPolicies() {
    const policies = [];
    for (const [sectionKey, section] of Object.entries(PolicyLibrary)) {
        for (const entry of section.entries) {
            policies.push({
                ...entry,
                section_key: sectionKey,
                section_name: section.name,
                section_icon: section.icon,
            });
        }
    }
    return policies;
}

/**
 * Get policies by category
 */
export function getPoliciesByCategory(category) {
    return getAllPolicies().filter(p => p.category === category);
}

/**
 * Get policies by company
 */
export function getPoliciesByCompany(company) {
    return getAllPolicies().filter(p => p.company === company);
}

/**
 * Get unique categories
 */
export function getCategories() {
    const cats = new Set();
    getAllPolicies().forEach(p => cats.add(p.category));
    return [...cats].sort();
}

/**
 * Get unique companies
 */
export function getCompanies() {
    const companies = new Set();
    getAllPolicies().forEach(p => companies.add(p.company));
    return [...companies].sort();
}

/**
 * Search policies by keyword
 */
export function searchPolicies(query) {
    const q = query.toLowerCase();
    return getAllPolicies().filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.domains.some(d => d.toLowerCase().includes(q))
    );
}

/**
 * Get policy library stats
 */
export function getPolicyStats() {
    const all = getAllPolicies();
    const companies = new Set(all.map(p => p.company));
    const categories = new Set(all.map(p => p.category));
    const sections = Object.keys(PolicyLibrary).length;
    return {
        totalPolicies: all.length,
        totalCompanies: companies.size,
        totalCategories: categories.size,
        totalSections: sections,
    };
}

export default PolicyLibrary;
