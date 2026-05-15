const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\nacho\\Desktop\\pdfs\\Master Agentes IA.pdf';
const outPath = 'C:\\Users\\nacho\\Desktop\\appcurso master\\pdf_content.txt';

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync(outPath, data.text);
    console.log("PDF text extracted successfully.");
}).catch(function(error) {
    console.error("Error extracting PDF:", error);
});
