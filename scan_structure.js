const fs = require('fs');
const text = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = text.split('\n');

lines.forEach((line, i) => {
    const l = line.trim();
    if (l.match(/MODULO/i) || l.match(/MÓDULO/i) || l.match(/SUBMODULO/i) || l.match(/MÁSTER/i)) {
        if (l.length < 100) {
            console.log(`Línea ${i}: ${l}`);
        }
    }
});
