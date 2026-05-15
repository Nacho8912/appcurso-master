const fs = require('fs');
const buf = fs.readFileSync('pdf_content.txt').slice(0, 50);
console.log(buf);
console.log(buf.toString('utf16le').slice(0, 20));
console.log(buf.toString('utf8').slice(0, 20));
