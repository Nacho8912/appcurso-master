import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const answersPath = path.join(process.cwd(), 'src', 'lib', 'answers.json');

interface Answer {
    id: string;
    moduleId: string;
    content: string;
    createdAt: string;
}

// GET - Obtener respuestas de un módulo específico
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const moduleId = searchParams.get('moduleId');

        const data = fs.readFileSync(answersPath, 'utf8');
        const answers: Answer[] = JSON.parse(data);

        if (moduleId) {
            const moduleAnswer = answers.find(a => a.moduleId === moduleId);
            return NextResponse.json(moduleAnswer || null);
        }

        return NextResponse.json(answers);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

// POST - Crear o actualizar respuesta para un módulo
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { moduleId, content } = body;

        if (!moduleId || !content) {
            return NextResponse.json({ error: 'ModuleId and content are required' }, { status: 400 });
        }

        let answers: Answer[] = [];
        try {
            const data = fs.readFileSync(answersPath, 'utf8');
            answers = JSON.parse(data);
        } catch {
            answers = [];
        }

        // Buscar si ya existe una respuesta para este módulo
        const existingIndex = answers.findIndex(a => a.moduleId === moduleId);

        if (existingIndex >= 0) {
            // Actualizar existente
            answers[existingIndex] = {
                ...answers[existingIndex],
                content,
                createdAt: new Date().toISOString()
            };
        } else {
            // Crear nueva
            const newAnswer: Answer = {
                id: `ans_${Date.now()}`,
                moduleId,
                content,
                createdAt: new Date().toISOString()
            };
            answers.push(newAnswer);
        }

        fs.writeFileSync(answersPath, JSON.stringify(answers, null, 2));

        return NextResponse.json({ success: true, answer: answers[existingIndex >= 0 ? existingIndex : answers.length - 1] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
    }
}

// DELETE - Eliminar respuesta de un módulo
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const moduleId = searchParams.get('moduleId');

        if (!moduleId) {
            return NextResponse.json({ error: 'ModuleId is required' }, { status: 400 });
        }

        let answers: Answer[] = [];
        try {
            const data = fs.readFileSync(answersPath, 'utf8');
            answers = JSON.parse(data);
        } catch {
            return NextResponse.json({ success: true });
        }

        const filtered = answers.filter(a => a.moduleId !== moduleId);

        fs.writeFileSync(answersPath, JSON.stringify(filtered, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
    }
}
