const fs = require('fs');
const text = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = text.split('\n');

const answers = [];
let currentAnswer = null;

// Función para limpiar IDs (quita tildes y caracteres raros)
const cleanId = (text) => {
    return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita tildes
        .replace(/\s+/g, '-') // Espacios por guiones
        .replace(/[^a-z0-9-]/g, ''); // Quita todo lo que no sea letra, número o guion
};

let i = 0;
while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    const match = line.match(/^RESPUESTAS\s+MODELO\s*-\s*(.*)/i);
    if (match) {
        const title = match[1].trim();
        const id = `ans-${cleanId(title)}`;
        currentAnswer = { id, title: `Respuestas: ${title}`, content: [] };
        answers.push(currentAnswer);
        i++; continue;
    }

    if (currentAnswer) {
        if (line.match(/^MÓDULO|^SUBMÓDULO|^SECCIÓN/i) && !line.match(/RESPUESTAS/i)) {
            currentAnswer = null;
        } else {
            currentAnswer.content.push(line);
        }
    }
    i++;
}

fs.writeFileSync('src/lib/answers.json', JSON.stringify(answers, null, 2));
console.log(`Biblioteca corregida con IDs limpios: ${answers.length} secciones.`);
