const fs = require('fs');
const path = 'src/lib/modules.json';

const modules = JSON.parse(fs.readFileSync(path, 'utf8'));

const modulo0 = {
  id: "modulo-0",
  title: "MÓDULO 0: MARCOS MENTALES",
  description: "FUNDAMENTALES PARA DISEÑADORES DE AGENTES",
  content: [
    { type: "heading", level: 1, text: "MÓDULO 0: MARCOS MENTALES" },
    { type: "heading", level: 3, text: "FUNDAMENTALES PARA DISEÑADORES DE AGENTES" },
    { type: "text", text: "Introducción al Módulo 0" },
    { type: "text", text: "Antes de tocar una sola línea de código, antes de aprender arquitecturas, antes de diseñar sistemas, necesitamos construir tu mente correctamente. Los mejores diseñadores de agentes no son los que saben más técnicas; son los que piensan diferente." },
    { type: "text", text: "Este módulo es el scaffolding invisible. Es el acondicionamiento de tu mente para que los módulos posteriores tengan sentido profundo. Si saltas esto, los módulos posteriores parecerán colecciones de técnicas desconectadas. Si completas este módulo, todo lo que siga será integrado, coherente, y profundo." },
    { type: "text", text: "Piensa en este módulo como en entrenar tus ojos para ver. Un pintor entrenado ve la luz, las sombras, los colores donde otros solo ven \"un árbol\". Similarmente, después de este módulo, verás sistemas donde otros ven componentes aislados." },
    { type: "heading", level: 3, text: "OBJETIVO DEL MÓDULO 0" },
    { type: "text", text: "Al completar este módulo, serás capaz de:" },
    { type: "text", text: "1. Pensar en términos de sistemas en lugar de componentes aislados" },
    { type: "text", text: "2. Reconocer cuándo algo es un \"primer principio\" versus un \"supuesto no cuestionado\"" },
    { type: "text", text: "3. Analizar cualquier problema usando el framework de causa-efecto de múltiples órdenes" },
    { type: "text", text: "4. Diseñar soluciones basadas en probabilidades, no en certezas absolutas" },
    { type: "text", text: "5. Identificar puntos de retroalimentación negativa en sistemas" },
    { type: "text", text: "6. Navegar información asimétrica en interacciones complejas" },
    { type: "text", text: "7. Aplicar pensamiento de primeros principios a tus propios problemas" },
    { type: "text", text: "8. Pensar como los mejores diseñadores de agentes del mundo" },
    { type: "heading", level: 3, text: "PREGUNTA PROVOCATIVA CENTRAL" },
    { type: "text", text: "¿Cuál es la diferencia entre un sistema que \"simplemente funciona\" y un sistema que \"continúa funcionando incluso cuando todo sale mal\"?" },
    { type: "text", text: "Reflexiona sobre esto profundamente por un momento. Un agente que funciona bajo condiciones perfectas no es un agente útil en el mundo real. Un agente útil es uno que se adapta, que se recupera, que mejora incluso cuando los supuestos originales resultan completamente incorrectos." },
    { type: "text", text: "¿Qué arquitectura hace diferente a uno del otro?" }
  ]
};

// Reemplazar el módulo 0 existente
const index = modules.findIndex(m => m.id === 'modulo-0');
if (index !== -1) {
  modules[index] = modulo0;
} else {
  modules.unshift(modulo0);
}

fs.writeFileSync(path, JSON.stringify(modules, null, 2));
console.log("Módulo 0 actualizado con el texto exacto proporcionado.");
