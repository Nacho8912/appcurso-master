const fs = require('fs');

const path = 'src/lib/modules.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const introModuleIndex = data.findIndex(m => m.id === 'modulo-introductorio');

if (introModuleIndex !== -1) {
    // Add interactive blocks
    data[introModuleIndex].content.push(
        {
            type: "heading",
            level: 2,
            text: "PONLO EN PRÁCTICA: INTERACCIÓN Y REFLEXIÓN"
        },
        {
            type: "text",
            text: "Tal como prometimos en la introducción, aquí no hay teoría huérfana. A continuación encontrarás bloques interactivos diseñados bajo las metodologías de Aprendizaje Activo, Método Feynman y Fricción Estructurada."
        },
        {
            type: "quiz",
            question: "¿Por qué el 'Aprendizaje por Fricción' es superior para retener conocimiento técnico complejo?",
            options: [
                "Porque al leer el mismo texto varias veces, el cerebro memoriza mejor.",
                "Porque los errores y la confusión temporal obligan al cerebro a construir nuevas conexiones neuronales duraderas.",
                "Porque permite copiar y pegar código más rápidamente sin entenderlo.",
                "Porque evita que el estudiante cometa errores desde el principio."
            ],
            correctAnswer: 1
        },
        {
            type: "quiz",
            question: "¿Cuál es el núcleo del First Principles Thinking (Pensamiento de Primeros Principios)?",
            options: [
                "Aprender a usar los frameworks de IA más populares del mercado como LangChain.",
                "Razonar por analogía, copiando cómo otras empresas han implementado sus agentes.",
                "Desmontar un problema hasta sus verdades fundamentales irreductibles y construir la solución desde ahí.",
                "Confiar siempre en la documentación oficial sin cuestionarla."
            ],
            correctAnswer: 2
        },
        {
            type: "exercise",
            title: "Ejercicio de Compromiso (OKR)",
            description: "Aplica el 'Aprendizaje por Objetivos'. Escribe tu primer OKR (Objective and Key Result) para este Master.\n\nReglas:\n1. El 'Objective' debe ser inspirador y claro.\n2. Los 'Key Results' (2 o 3) deben ser numéricos y medibles.\n\nIntenta escribirlo en un papel o en tu bloc de notas antes de ver el ejemplo.",
            solution: "Objective: Convertirme en un desarrollador capaz de desplegar agentes autónomos funcionales en producción.\n\nKey Results:\nKR1: Completar el 100% de las lecciones prácticas y quizzes del máster.\nKR2: Desplegar al menos 3 agentes distintos en un entorno cloud (ej. AWS/Vercel/Render).\nKR3: Reducir un proceso manual de mi trabajo/negocio en un 80% usando un agente creado por mí."
        },
        {
            type: "reflection",
            prompt: "MÉTODO FEYNMAN: Explica con tus propias palabras (como si se lo explicaras a alguien de 12 años) qué diferencia a un sistema 'tradicional' de código frente a un 'agente autónomo'. ¿Cuál es ese ciclo de retroalimentación del que hemos hablado?",
            type_variant: "feynman"
        },
        {
            type: "reflection",
            prompt: "MAYÉUTICA: ¿Qué miedo o excusa te ha impedido hasta hoy profundizar en la programación de IA? ¿Es un miedo basado en datos reales o en suposiciones?",
            type_variant: "mayeutica"
        }
    );

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log("Interactive blocks added to modulo-introductorio successfully.");
} else {
    console.log("Could not find modulo-introductorio");
}
