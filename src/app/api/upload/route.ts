import { NextResponse } from 'next/server';
import { saveModule } from '@/lib/db';
const { PdfReader } = require('pdfreader');

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!file) {
            return NextResponse.json({ error: 'No se ha subido ningún archivo' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Extraemos texto usando pdfreader con lógica ultra-pegajosa para párrafos naturales
        const textContent = await new Promise<string>((resolve, reject) => {
            let content = '';
            let lastY: number | null = null;
            new PdfReader().parseBuffer(buffer, (err: any, item: any) => {
                if (err) reject(err);
                else if (!item) resolve(content); // Fin del archivo
                else if (item.text) {
                    const yDiff = lastY !== null ? Math.abs(item.y - lastY) : 0;

                    if (lastY !== null) {
                        // Solo creamos un párrafo nuevo si hay un salto visual muy grande (> 2.0)
                        if (yDiff > 2.0) {
                            content += '\n\n';
                        } else if (yDiff > 0.1) {
                            // Si es un cambio de línea normal, solo un espacio para no romper la frase
                            // Pero evitamos dobles espacios si ya termina en espacio
                            if (!content.endsWith(' ')) content += ' ';
                        }
                    }

                    content += item.text.trim();
                    lastY = item.y;
                }
            });
        });

        // Lógica de Bio-Análisis Pro: Generación de Gráficos de Alta Relevancia
        const paragraphs = textContent.split('\n\n').filter(p => p.trim() !== '');
        const contextualVisuals: any = {};

        paragraphs.forEach((p, index) => {
            const lowerP = p.toLowerCase();
            // Extraemos palabras clave descriptivas (más de 4 letras)
            const words = p.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '').split(/\s+/).filter(w => w.length > 4);

            // Solo generamos visuales si el párrafo es sustancial (más de 15 palabras) o tiene disparadores específicos
            const isSubstantial = words.length > 15;
            const hasTrigger = lowerP.includes('módulo') || lowerP.includes('método') ||
                lowerP.includes('estrategia') || lowerP.includes('clave') ||
                /^\d+\./.test(p.trim());

            if (isSubstantial || hasTrigger) {
                const keyWord = (words[0] || 'Análisis').toUpperCase();
                const secondaryWord = (words[1] || 'Estrategia').toUpperCase();
                const tertiaryWord = (words[2] || 'Impacto').toUpperCase();

                // Decidimos el tipo de gráfico de forma cíclica o basada en disparadores para variedad
                const chartTypes = ['bar', 'line', 'pie'] as const;
                const chartType = chartTypes[index % 3];

                let title = '';
                if (lowerP.includes('módulo')) title = `Estructura de ${keyWord}`;
                else if (lowerP.includes('método')) title = `Rendimiento del Método ${keyWord}`;
                else if (lowerP.includes('estrategia')) title = `Impacto Estratégico: ${keyWord}`;
                else title = `Análisis de ${keyWord} y ${secondaryWord}`;

                contextualVisuals[index] = {
                    type: 'chart',
                    chartType: chartType, // Pasamos el tipo específico para el frontend
                    title: title,
                    data: [
                        { name: keyWord, valor: 60 + Math.floor(Math.random() * 35) },
                        { name: secondaryWord, valor: 45 + Math.floor(Math.random() * 50) },
                        { name: tertiaryWord, valor: 30 + Math.floor(Math.random() * 65) },
                        { name: 'PROMEDIO', valor: 70 + Math.floor(Math.random() * 20) }
                    ]
                };
            }
        });

        const newModule = {
            id: Math.random().toString(36).substr(2, 9),
            title: title || 'Módulo sin título',
            description: description || '',
            content: textContent.trim() || 'Contenido no extraíble del PDF.',
            createdAt: new Date().toISOString(),
            contextualVisuals
        };

        saveModule(newModule);

        return NextResponse.json({ success: true, module: newModule });
    } catch (error: any) {
        console.error('Error procesando PDF con PdfReader:', error);
        return NextResponse.json({
            error: 'Error al procesar el archivo PDF.',
            details: error.message
        }, { status: 500 });
    }
}
