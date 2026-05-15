import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const completedPath = path.join(process.cwd(), 'src', 'lib', 'completed_sessions.json');

interface CompletedSession {
    userEmail: string;
    moduleId: string;
    completedAt: string;
}

// GET - Obtener sesiones completadas de un usuario
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('userEmail');
        const moduleId = searchParams.get('moduleId');

        let sessions: CompletedSession[] = [];
        try {
            const data = fs.readFileSync(completedPath, 'utf8');
            sessions = JSON.parse(data);
        } catch {
            return NextResponse.json([]);
        }

        if (userEmail && moduleId) {
            const isCompleted = sessions.some(s => s.userEmail === userEmail && s.moduleId === moduleId);
            return NextResponse.json({ completed: isCompleted });
        }

        if (userEmail) {
            const userSessions = sessions.filter(s => s.userEmail === userEmail);
            return NextResponse.json(userSessions);
        }

        return NextResponse.json(sessions);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

// POST - Marcar sesión como completada
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userEmail, moduleId } = body;

        if (!userEmail || !moduleId) {
            return NextResponse.json({ error: 'UserEmail and moduleId are required' }, { status: 400 });
        }

        let sessions: CompletedSession[] = [];
        try {
            const data = fs.readFileSync(completedPath, 'utf8');
            sessions = JSON.parse(data);
        } catch {
            sessions = [];
        }

        // Verificar si ya está completada
        const alreadyCompleted = sessions.some(s => s.userEmail === userEmail && s.moduleId === moduleId);

        if (!alreadyCompleted) {
            const newSession: CompletedSession = {
                userEmail,
                moduleId,
                completedAt: new Date().toISOString()
            };
            sessions.push(newSession);
            fs.writeFileSync(completedPath, JSON.stringify(sessions, null, 2));
        }

        return NextResponse.json({ success: true, completed: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save completion' }, { status: 500 });
    }
}
