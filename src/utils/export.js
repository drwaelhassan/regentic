/**
 * Export/Import Utilities — JSON model serialization
 */

export function exportModel(model, filename = 'gal-model.json') {
    const blob = new Blob([JSON.stringify(model, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export function importModel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const model = JSON.parse(e.target.result);
                resolve(model);
            } catch (err) {
                reject(new Error(`Invalid JSON: ${err.message}`));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

export function exportReport(report, filename = 'compliance-report.json') {
    exportModel(report, filename);
}

export function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}
