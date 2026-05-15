const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(/"(OKRs?|Antifrágil|Lean Startup|Reflexión|Preguntas Socráticas?|Trial and Error|Explícalo|First Principles|Aprendizaje)"/gi, '&quot;$1&quot;');

// Also match explicit remaining literal quotes that failed lint
content = content.replace(/"aprender Python"/g, '&quot;aprender Python&quot;');
content = content.replace(/"entender la IA"/g, '&quot;entender la IA&quot;');
content = content.replace(/"estudias Python"/g, '&quot;estudias Python&quot;');
content = content.replace(/"aprendes sobre LLMs"/g, '&quot;aprendes sobre LLMs&quot;');
content = content.replace(/"Explícalo como si tuvieras 12 años"/g, '&quot;Explícalo como si tuvieras 12 años&quot;');
content = content.replace(/"mayéutica"/g, '&quot;mayéutica&quot;');
content = content.replace(/"esto se hace así porque siempre se ha hecho así"/g, '&quot;esto se hace así porque siempre se ha hecho así&quot;');
content = content.replace(/"hacer el ejercicio bien a la primera"/g, '&quot;hacer el ejercicio bien a la primera&quot;');

content = content.replace(/"en general"/g, '&quot;en general&quot;');

content = content.replace(/"(.*?)"/g, (match, p1) => {
    // Only escape if it's text inside a tag, meaning not an HTML attribute.
    // If it's pure text, we can escape it. This is hard with regex, so we just target the exact strings based on the lint output.
    return match;
});

content = content.replace(/>([^<]*?)"([^<]*?)"([^<]*?)</g, '>$1&quot;$2&quot;$3<');
content = content.replace(/>([^<]*?)"([^<]*?)"([^<]*?)</g, '>$1&quot;$2&quot;$3<');
content = content.replace(/>([^<]*?)"([^<]*?)"([^<]*?)</g, '>$1&quot;$2&quot;$3<');
content = content.replace(/>([^<]*?)"([^<]*?)"([^<]*?)</g, '>$1&quot;$2&quot;$3<');

fs.writeFileSync('src/app/page.tsx', content);
