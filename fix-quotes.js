const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace all occurrences of double quotes inside paragraphs and list items that are unescaped text entities
// A simple way is to replace specific known strings from the provided text that have double quotes.
content = content.replace(/"aprendido Python"/g, '&quot;aprendido Python&quot;');
content = content.replace(/"esto aparece una y otra vez, debe ser importante, hay que guardarlo"/g, '&quot;esto aparece una y otra vez, debe ser importante, hay que guardarlo&quot;');
content = content.replace(/"aprender Python"/g, '&quot;aprender Python&quot;');
content = content.replace(/"entender la IA"/g, '&quot;entender la IA&quot;');
content = content.replace(/"estudias Python"/g, '&quot;estudias Python&quot;');
content = content.replace(/"aprendes sobre LLMs"/g, '&quot;aprendes sobre LLMs&quot;');
content = content.replace(/"Explícalo como si tuvieras 12 años"/g, '&quot;Explícalo como si tuvieras 12 años&quot;');
content = content.replace(/"mayéutica"/g, '&quot;mayéutica&quot;');
content = content.replace(/"esto se hace así porque siempre se ha hecho así"/g, '&quot;esto se hace así porque siempre se ha hecho así&quot;');
content = content.replace(/"hacer el ejercicio bien a la primera"/g, '&quot;hacer el ejercicio bien a la primera&quot;');

// There might be some other ones in the old text that was duplicated. Oh wait, the previous code had 2 copies of the old curriculum. Let me check the replacement.

fs.writeFileSync('src/app/page.tsx', content);
