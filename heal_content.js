const fs = require('fs');

let content = fs.readFileSync('pdf_content.txt', 'utf8');

// Reparar las palabras clave rotas usando el código universal del carácter de reemplazo
content = content.replace(/M\ufffdDULO/g, 'MÓDULO');
content = content.replace(/SUBMODULO/g, 'SUBMÓDULO');
content = content.replace(/INTRODUCCI\ufffdN/g, 'INTRODUCCIÓN');
content = content.replace(/M\ufffdSTER/g, 'MÁSTER');

// Limpiar el resto de caracteres basura
content = content.replace(/\ufffd/g, ' ');

// Guardar versión reparada
fs.writeFileSync('pdf_content_clean.txt', content, 'utf8');
console.log("Archivo pdf_content_clean.txt REPARADO y PURIFICADO.");
