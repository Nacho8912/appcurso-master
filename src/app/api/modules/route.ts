import { NextResponse } from 'next/server';
import { getModules, saveModule } from '@/lib/db';

export async function GET() {
    try {
        const modules = getModules();
        return NextResponse.json(modules);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener módulos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 });
        }

        const newModule = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description: description || '',
            content,
            createdAt: new Date().toISOString()
        };

        saveModule(newModule);

        return NextResponse.json({ success: true, module: newModule });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error al guardar el módulo', details: error.message }, { status: 500 });
    }
}
