const fs = require('fs');

const text = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = text.split('\n');

const modules = [];
let currentModule = null;
let currentBlock = null;

const getOrCreateModule = (id, title) => {
    let existing = modules.find(m => m.id === id);
    if (!existing) {
        currentModule = { id, title: title.trim(), description: "", content: [] };
        modules.push(currentModule);
    } else {
        currentModule = existing;
    }
    currentBlock = null;
};

// --- NUEVA LÓGICA DE TEXTO VERBATIM (Respeto a las listas y párrafos) ---
const addVerbatimText = (line) => {
    if (!currentModule || !line.trim()) return;
    
    const trimmedLine = line.trim();
    
    // REGLA DE ORO: Si empieza por número, bullet o es una línea de "Introducción", NO se une
    const isList = trimmedLine.match(/^\d+\./) || trimmedLine.match(/^[•\-\*]/);
    const isIntro = trimmedLine.match(/^Introducción/i);
    
    if (currentBlock && currentBlock.type === 'text' && !isList && !isIntro) {
        const lastText = currentBlock.text.trim();
        // Solo unimos si la línea anterior es muy corta y NO termina en puntuación
        // Esto captura frases cortadas por el PDF pero respeta párrafos intencionales
        if (!lastText.match(/[.!?:]\s*$/) && lastText.length < 90) {
            currentBlock.text += ' ' + trimmedLine;
            return;
        }
    }

    currentBlock = { type: 'text', text: trimmedLine };
    currentModule.content.push(currentBlock);
};

let i = 0;
while (i < lines.length) {
    const rawLine = lines[i];
    let line = rawLine.trim();
    if (!line) { i++; continue; }

    if (line.match(/Página \d+/i) || line === "Master Agentes IA") {
        i++; continue;
    }

    // --- DETECCIÓN DE TÍTULOS ---
    const isIntro = line.match(/^INTRODUCCIÓN GENERAL/i);
    const isMod = line.match(/^MÓDULO\s+(\d+)/i);
    const isSub = line.match(/^SUBMÓDULO\s+([0-9.]+)/i);
    const isSec = line.match(/^SECCIÓN\s+([0-9.]+)/i);

    if (isIntro || isMod || isSub || isSec) {
        const id = isIntro ? 'modulo-introductorio' : 
                   isMod ? `modulo-${isMod[1]}` : 
                   `submodulo-${(isSub ? isSub[1] : isSec[1]).replace('.', '-')}`;
        
        getOrCreateModule(id, line);
        currentModule.content.push({ type: 'heading', level: id.startsWith('sub') ? 2 : 1, text: line });
        i++; continue;
    }

    if (!currentModule) { i++; continue; }

    // --- BLOQUES ESPECIALES ---
    if (line.match(/^\[(FEYNMAN|FLASHCARD|EJERCICIO|PREGUNTA|ACTIVIDAD).*\]/i)) {
        const typeStr = line.toUpperCase();
        let newBlock;
        if (typeStr.includes('FEYNMAN')) newBlock = { type: 'reflection', type_variant: 'feynman', prompt: '' };
        else if (typeStr.includes('FLASHCARD')) newBlock = { type: 'flashcard', front: '', back: '' };
        else newBlock = { type: 'exercise', title: line, description: '' };
        currentModule.content.push(newBlock);
        currentBlock = newBlock;
        let k = i + 1;
        while (k < lines.length) {
            const kLine = lines[k].trim();
            if (!kLine || kLine.match(/^\[/) || kLine.match(/^MÓDULO|^SUBMÓDULO|^SECCIÓN/)) break;
            if (currentBlock.type === 'exercise') currentBlock.description += ' ' + kLine;
            else if (currentBlock.type === 'reflection') currentBlock.prompt += ' ' + kLine;
            else if (currentBlock.type === 'flashcard') {
                if (!currentBlock.front) currentBlock.front = kLine;
                else currentBlock.back += ' ' + kLine;
            }
            k++;
        }
        i = k; continue;
    }

    // --- CÓDIGO ---
    if (line.startsWith('Copy') || line.match(/^(import|from|class|def|@|#)\s/)) {
        currentBlock = { type: 'code', code: rawLine.replace(/^Copy/, ''), language: 'python' };
        currentModule.content.push(currentBlock);
        let k = i + 1;
        while (k < lines.length) {
            const kRaw = lines[k];
            if (kRaw.trim() === '' || kRaw.startsWith('    ') || kRaw.startsWith('\t')) {
                currentBlock.code += '\n' + kRaw.replace(/^Copy/, '');
                k++;
            } else break;
        }
        i = k; continue;
    }

    addVerbatimText(line);
    i++;
}

fs.writeFileSync('src/lib/modules.json', JSON.stringify(modules, null, 2));
console.log(`Transcripción FIDELIDAD TOTAL finalizada: ${modules.length} sesiones.`);
