const fs = require('fs');
const text = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = text.split('\n');

const answers = [];
let currentAnswer = null;

let i = 0;
while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    // Detectar Módulo para asignar ID numérico
    const moduleMatch = line.match(/RESPUESTAS\s+MODELO\s*-\s*MÓDULO\s*(\d+)/i);
    if (moduleMatch) {
        const num = moduleMatch[1];
        currentAnswer = { id: `ans-${num}`, title: `Respuestas: Módulo ${num}`, content: [] };
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
console.log(`Biblioteca simplificada: ${answers.length} secciones.`);
