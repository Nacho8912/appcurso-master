const fs = require('fs');
const path = 'src/lib/modules.json';

const modules = JSON.parse(fs.readFileSync(path, 'utf8'));

const submodulo01 = {
  id: "submodulo-0-1",
  title: "SUBMÓDULO 0.1: PENSAMIENTO DE SISTEMAS",
  description: "MARCO MENTAL 1: SISTEMAS ITERATIVOS AUTO-REGULADORES",
  content: [
    { type: "heading", level: 2, text: "SUBMÓDULO 0.1: PENSAMIENTO DE SISTEMAS" },
    { type: "text", text: "bioquímica procesando químicos detectados. En una empresa, es la dirección analizando datos y tomando decisiones." },
    { type: "heading", level: 3, text: "Nivel 3: Salida (Output / Acción)" },
    { type: "text", text: "El sistema actúa sobre el mundo basándose en sus decisiones. Sus acciones tienen consecuencias. El mundo no permanece indiferente a lo que el sistema hace. Un agente toma una acción (comunica, compra, rechaza, ajusta). Un humano actúa (habla, se mueve, escribe). Una célula produce proteínas o se divide. Una empresa lanza un producto o retira uno del mercado." },
    { type: "text", text: "Pero aquí está lo CRUCIAL que la mayoría de los diseñadores de agentes ignoran o olvidan:" },
    { type: "text", text: "Nivel 3 (Salida) se convierte automáticamente en Nivel 1 (Entrada) del siguiente ciclo." },
    { type: "text", text: "Ese es el ciclo. Ese es el patrón fundamental de cualquier sistema. Un sistema sin ciclo no es realmente un sistema; es solo una máquina que procesa una sola vez sin aprender ni adaptarse." },
    { type: "heading", level: 3, text: "CICLO FUNDAMENTAL DE CUALQUIER SISTEMA:" },
    { type: "code", language: "text", code: "ENTRADA (Percibir el estado actual)\n↓\nPROCESAMIENTO (Decidir qué hacer basado en percepción)\n↓\nSALIDA (Actuar sobre el mundo)\n↓\n(El mundo observa esta acción)\n↓\n(Consecuencias ocurren en el mundo)\n↓\n(El sistema observa lo que sucedió)\n↓\nNUEVA ENTRADA (observación de las consecuencias de la acción anterior)\n↓\nPROCESAMIENTO (Decidir qué hacer AHORA basado en lo que pasó)\n↓\nSALIDA (Actuar nuevamente)\n↑ ↓\n└──────────────────────────────────────┘\n(El ciclo se repite infinitamente)\n(Cada iteración puede mejorar o degradar)" },
    { type: "text", text: "Un agente que no completa este ciclo no es realmente un agente autónomo. Es solo una máquina que recibe input y produce output, sin aprender, sin adaptarse, sin mejorar, sin evolucionar." },
    { type: "text", text: "Esto es crítico: Muchas empresas \"construyen agentes\" que son realmente solo programas que procesan una sola vez. No tienen ciclo de retroalimentación. Por eso fallan. No aprenden de experiencias. No se adaptan. Cuando el mundo cambia ligeramente (nuevos tipos de solicitudes, nuevos patrones de comportamiento), dejan de funcionar completamente. Están frágiles." },
    { type: "text", text: "Los mejores agentes son aquellos donde el ciclo es fuerte, claro, bien definido, y se completa rápidamente. Cada iteración agrega valor." },
    { type: "heading", level: 3, text: "Concepto 0.1.3: Retroalimentación Positiva vs. Retroalimentación Negativa" },
    { type: "text", text: "Este es uno de los conceptos más poderosos en teoría de sistemas, y la mayoría de diseñadores de agentes no lo entiende adecuadamente o lo confunde." },
    { type: "text", text: "Retroalimentación Negativa (el nombre es confuso, pero el concepto es crucial):" },
    { type: "text", text: "La retroalimentación negativa es cuando el output de un sistema reduce, contrarresta, o modera la actividad del sistema. Parece \"negativa\", pero es extremadamente positiva para la estabilidad del sistema." },
    { type: "text", text: "Ejemplo biológico: Tu cuerpo mantiene una temperatura de treinta y siete grados centígrados. Si la temperatura sube a treinta y ocho grados (fiebre), ¿qué sucede? Tu cuerpo comienza a sudar (retroalimentación negativa: reduce la temperatura de vuelta a treinta y siete grados). Si la temperatura baja a treinta y seis grados, tiemblas (retroalimentación negativa nuevamente: genera calor para volver a treinta y siete grados)." },
    { type: "text", text: "La retroalimentación negativa ESTABILIZA el sistema. Lo mantiene dentro de parámetros seguros. Es homeostasis: auto-regulación hacia un punto de equilibrio." },
    { type: "text", text: "Retroalimentación Positiva (amplificación sin control):" },
    { type: "text", text: "La retroalimentación positiva es cuando el output de un sistema AMPLIFICA O INTENSIFICA la actividad del sistema. Parece \"positiva\", pero sin control es extremadamente peligrosa y destructiva." },
    { type: "text", text: "Ejemplo biológico: Si tu cuerpo, en lugar de sudar cuando sube la temperatura, generara MÁS calor internamente, seguiría subiendo indefinidamente. La temperatura subiría a treinta y ocho, luego treinta y nueve, luego cuarenta. Eventualmente morirías por sobrecalentamiento. Eso es retroalimentación positiva. Es un ciclo de amplificación descontrolada hacia el colapso." },
    { type: "heading", level: 3, text: "Por qué importa esto para diseñadores de agentes" },
    { type: "text", text: "Un agente mal diseñado puede entrar en ciclos de retroalimentación positiva donde se vuelve caótico, impredecible, incontrolable, o autodestructivo. Un agente bien diseñado tiene mecanismos explícitos de retroalimentación negativa que lo mantienen estable, dentro de parámetros de funcionamiento seguros." },
    { type: "text", text: "Ejemplo 1: Agente con retroalimentación positiva descontrolada (MALO):" },
    { type: "text", text: "• Agente genera contenido automático para redes sociales\n• El algoritmo de la red social premia contenido sensacionalista (genera muchos clicks)\n• Más clicks = más visualizaciones en el feed = más \"éxito\" según la métrica del agente\n• El agente observa esto y aprende: \"el contenido sensacionalista funciona\"\n• Agente genera contenido cada vez MÁS sensacionalista, más dramático, más clickeable\n• Los usuarios que ven esto se sienten atraídos (es adictivo), pero se ofenden o se asustan\n• El agente sigue intensificando porque la métrica sigue mejorando\n• Eventualmente genera desinformación clara, mentiras, conspiraciones\n• Las redes sociales cierran la cuenta por violación de términos de servicio\n• El negocio colapsa" },
    { type: "text", text: "El ciclo se amplificó hasta la auto-destrucción del sistema. Fue un ciclo de retroalimentación positiva donde cada iteración empeoraba todo." },
    { type: "text", text: "Ejemplo 2: Agente con retroalimentación negativa integrada (BUENO):" },
    { type: "text", text: "• Agente genera contenido automático para redes sociales\n• Tiene una métrica explícita de \"engagement genuino\" (no solo clicks vacíos, sino comentarios auténticos, compartidos voluntarios de amigos, retención de usuarios que vuelven al día siguiente)\n• Genera contenido sensacionalista inicialmente\n• Inicial: muchos clicks inmediatos (métrica de \"actividad rápida\" positiva)\n• Pero después: muchos usuarios no vuelven (retención baja = métrica de \"engagement genuino\" negativa)\n• Si engagement genuino baja consistentemente, el agente recibe RETROALIMENTACIÓN NEGATIVA explícita\n• El agente reduce automáticamente el sensacionalismo\n• Engagement genuino sube nuevamente\n• Sistema se auto-regula hacia equilibrio\n• Si se detecta información objetivamente incorrecta en un análisis, el sistema de control reduce el output automáticamente\n• El agente permanece dentro de parámetros de calidad definidos" },
    { type: "text", text: "El ciclo se regula a sí mismo. No se amplifica hacia la auto-destrucción; se auto-estabiliza hacia equilibrio." },
    { type: "heading", level: 3, text: "Marco Mental 1: Sistemas Iterativos Auto-Reguladores" },
    { type: "text", text: "Definición simplificada:\nUn buen sistema es uno que tiene ciclos de retroalimentación que lo mantienen en equilibrio dinámico, no en extremos descontrolados. No es uno que solo produce output sin observar o sin ajustar." },
    { type: "text", text: "Cómo reconocerlo:\n• Si tu sistema produce output y NUNCA observa ese output para ajustar el siguiente output, no es un sistema. Es una máquina lineal, y las máquinas lineales son frágiles ante cambios.\n• Si tu sistema observa output pero lo amplifica (retroalimentación positiva descontrolada), es un sistema que eventualmente se destruye a sí mismo o sale de control.\n• Si tu sistema observa output y se ajusta para mantener estabilidad dentro de parámetros definidos (retroalimentación negativa), es un sistema robusto que funciona incluso cuando las condiciones externas cambian." },
    { type: "text", text: "Cómo diseñarlo:\nSiempre pregúntate estas preguntas críticas cuando diseñes un agente:\n1. ¿Cuál es el ciclo de retroalimentación? (¿Cómo observa el sistema lo que sucedió?)\n2. ¿Cómo observará el sistema las consecuencias de sus acciones? (¿Qué métrica usa?)\n3. ¿Cómo usará esa observación para ajustarse? (¿Qué cambios hará basado en lo observado?)\n4. ¿Hay peligro de retroalimentación positiva descontrolada? ¿Cómo lo prevengo?\n5. ¿Cuáles son los parámetros \"seguros\"? (¿Dentro de qué límites debe operar?)\n6. ¿Cómo me aseguro de que el sistema no sale de ellos? (¿Qué mecanismos de restricción tengo?)" },
    { type: "text", text: "Si NO puedes responder estas preguntas sobre tu agente, entonces tu agente no es realmente un sistema adaptativo. Es solo una máquina, y las máquinas sin inteligencia adaptativa son reemplazables, predecibles, frágiles." },
    { type: "heading", level: 3, text: "ACTIVIDADES DEL SUBMODULO 0.1" },
    { type: "exercise", title: "[EJERCICIO 0.1.A] Análisis de Sistema Real en Profundidad", description: "Mapea el sistema completo identificando Entrada, Procesamiento, Salida, Feedback, Aprendizaje y tipo de Retroalimentación." },
    { type: "exercise", title: "[PREGUNTA SÍNTESIS 0.1.B] Retroalimentación en Agente Real", description: "Describe el peligro de retroalimentación positiva en un agente de negociación y cómo implementar mecanismos negativos." },
    { type: "exercise", title: "[EJERCICIO 0.1.C] Identificación de Ciclos Destructivos en Tu Vida", description: "Identifica un ciclo de retroalimentación positiva sin control en un sistema real que conozcas personalmente." }
  ]
};

const index = modules.findIndex(m => m.id === 'submodulo-0-1');
if (index !== -1) {
  modules[index] = submodulo01;
} else {
  modules.push(submodulo01);
}

fs.writeFileSync(path, JSON.stringify(modules, null, 2));
console.log("Submódulo 0.1 actualizado con fidelidad total.");
