const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(/{&quot; &quot;}/g, '{" "}');
content = content.replace(/\[&quot;Términos&quot;, &quot;Privacidad&quot;, &quot;Contacto&quot;\]/g, '["Términos", "Privacidad", "Contacto"]');

fs.writeFileSync('src/app/page.tsx', content);
