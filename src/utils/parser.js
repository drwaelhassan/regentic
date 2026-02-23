/**
 * Parser Utilities — Text processing helpers
 */

export function sanitizeText(text) {
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

export function extractSections(text) {
    const lines = text.split('\n');
    const sections = [];
    let current = null;

    for (const line of lines) {
        const sectionMatch = line.match(/^(?:Section|Article|Part|Chapter|§)\s*(\d+[\.\d]*)\s*[.:\-–—]\s*(.*)/i);
        if (sectionMatch) {
            if (current) sections.push(current);
            current = {
                number: sectionMatch[1],
                title: sectionMatch[2].trim(),
                text: '',
            };
        } else if (current) {
            current.text += line + '\n';
        } else {
            if (!current) {
                current = { number: '0', title: 'Preamble', text: line + '\n' };
            }
        }
    }
    if (current) sections.push(current);
    return sections;
}

export function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s'-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1);
}

export function extractQuotedPhrases(text) {
    const phrases = [];
    const regex = /"([^"]+)"|'([^']+)'|"([^"]+)"|«([^»]+)»/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        phrases.push(match[1] || match[2] || match[3] || match[4]);
    }
    return phrases;
}

export function extractNumbers(text) {
    const numbers = [];
    const regex = /\$?[\d,]+\.?\d*\s*(?:million|billion|M|B|%|mph|km\/h|kWh|lbs|days|months|years)?/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
        numbers.push(match[0].trim());
    }
    return numbers;
}

export function extractDates(text) {
    const dates = [];
    const patterns = [
        /\b\d{4}-\d{2}-\d{2}\b/g,
        /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
        /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/gi,
    ];
    for (const pat of patterns) {
        let match;
        while ((match = pat.exec(text)) !== null) {
            dates.push(match[0]);
        }
    }
    return dates;
}
