const fs = require('fs');
const path = require('path');

const pdfText = fs.readFileSync('pdf_content_clean.txt', 'utf8');
const lines = pdfText.split('\n');

const modules = [];
let currentModule = null;

function createModule(id, title) {
    return {
        id,
        title,
        description: '',
        content: [],
        createdAt: new Date().toISOString()
    };
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detectar Módulo Principal
    const modMatch = line.match(/^MÓDULO\s+(\d+):\s*(.*)/i);
    if (modMatch) {
        const id = `modulo-${modMatch[1]}`;
        currentModule = createModule(id, line);
        modules.push(currentModule);
        continue;
    }

    // Detectar Submódulo
    const subMatch = line.match(/^SUBMÓDULO\s+(\d+\.\d+):\s*(.*)/i);
    if (subMatch) {
        const id = `submodulo-${subMatch[1].replace('.', '-')}`;
        currentModule = createModule(id, line);
        modules.push(currentModule);
        continue;
    }

    if (!currentModule) continue;

    // --- APLICACIÓN DE METODOLOGÍAS ---

    // Metodología 3: Objetivos Concretos
    if (line.match(/^OBJETIVO/i)) {
        currentModule.content.push({ type: 'heading', level: 2, text: 'Misión del Módulo' });
        continue;
    }

    // Metodología 8: Polimatía (Grandes Maestros)
    if (line.match(/Leonardo da Vinci|Benjamin Franklin|Goethe|García Márquez|Aristóteles/i)) {
        currentModule.content.push({ 
            type: 'polymath', 
            field: 'Conexión Genial', 
            connection: line 
        });
        continue;
    }

    // Metodología 4: Feynman (Simplificación)
    if (line.match(/En términos simples|Para que lo entienda un niño|Básicamente|En esencia/i)) {
        currentModule.content.push({ 
            type: 'feynman', 
            concept: 'Claridad Maestra', 
            text: line 
        });
        continue;
    }

    // Metodología 6: Mayéutica (Preguntas)
    if (line.endsWith('?') && line.length > 20) {
        currentModule.content.push({ 
            type: 'socratic', 
            question: line,
            hint: 'Reflexiona antes de seguir leyendo.'
        });
        continue;
    }

    // Metodología 7: Fricción (Desafíos)
    if (line.match(/EJERCICIO|PROYECTO|DESAFÍO|RETO/i)) {
        currentModule.content.push({ 
            type: 'friction', 
            challenge: line,
            goal: 'Superar la barrera técnica y mental.'
        });
        continue;
    }

    // Contenido Estándar
    if (line.match(/^[1-9]\d*\./)) {
        // Listas
        const lastBlock = currentModule.content[currentModule.content.length - 1];
        if (lastBlock && lastBlock.type === 'list') {
            lastBlock.items.push(line);
        } else {
            currentModule.content.push({ type: 'list', ordered: true, items: [line] });
        }
    } else {
        currentModule.content.push({ type: 'text', text: line });
    }
}

fs.writeFileSync('src/lib/modules.json', JSON.stringify(modules, null, 2));
console.log(`Reestructuración completada: ${modules.length} módulos procesados.`);
