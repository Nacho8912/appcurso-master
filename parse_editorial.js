const fs = require('fs');
const pdfText = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = pdfText.split('\n');

const modules = [];
let currentModule = null;
let currentParagraph = "";

function flushParagraph(mod) {
    if (currentParagraph.trim()) {
        mod.content.push({ type: 'text', text: currentParagraph.trim() });
        currentParagraph = "";
    }
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
        if (currentModule) flushParagraph(currentModule);
        continue;
    }

    // Detectar Módulos y Submódulos
    const modMatch = line.match(/^MÓDULO\s+(\d+):\s*(.*)/i);
    const subMatch = line.match(/^SUBMÓDULO\s+(\d+\.\d+):\s*(.*)/i);

    if (modMatch || subMatch) {
        if (currentModule) flushParagraph(currentModule);
        const id = modMatch ? `modulo-${modMatch[1]}` : `submodulo-${subMatch[1].replace('.', '-')}`;
        currentModule = { id, title: line, content: [], createdAt: new Date().toISOString() };
        modules.push(currentModule);
        continue;
    }

    if (!currentModule) continue;

    // Detectar Listas
    if (line.match(/^[•\-\*]|\d+\./)) {
        flushParagraph(currentModule);
        const cleanItem = line.replace(/^[•\-\*]|\d+\.\s*/, '').trim();
        const lastBlock = currentModule.content[currentModule.content.length - 1];
        if (lastBlock && lastBlock.type === 'list') {
            lastBlock.items.push(cleanItem);
        } else {
            currentModule.content.push({ type: 'list', ordered: line.match(/^\d+\./), items: [cleanItem] });
        }
        continue;
    }

    // Detectar Metodologías (Feynman, Polymath, etc.)
    if (line.match(/Leonardo da Vinci|Benjamin Franklin|En términos simples|EJERCICIO/i)) {
        flushParagraph(currentModule);
        if (line.match(/EJERCICIO/i)) {
            currentModule.content.push({ type: 'friction', challenge: line, goal: 'Reflexión profunda' });
        } else if (line.match(/Leonardo/i)) {
            currentModule.content.push({ type: 'polymath', field: 'Conexión Genial', connection: line });
        } else {
            currentModule.content.push({ type: 'feynman', concept: 'Claridad', text: line });
        }
        continue;
    }

    // Reconstrucción de párrafos: si la línea no termina en punto, es continuación de la anterior
    currentParagraph += " " + line;
    if (line.match(/[\.\?\!]$/)) {
        flushParagraph(currentModule);
    }
}

fs.writeFileSync('src/lib/modules.json', JSON.stringify(modules, null, 2));
console.log("Restauración editorial completada.");
