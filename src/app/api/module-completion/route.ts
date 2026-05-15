import { NextResponse } from 'next/server';
import { getModules } from '@/lib/db';
import fs from 'fs';
import path from 'path';

const COMPLETED_FILE = path.join(process.cwd(), 'src', 'lib', 'completed.json');

interface CompletedSession {
    userEmail: string;
    moduleId: string;
    completedAt: string;
}

function getCompletedSessions(): CompletedSession[] {
    try {
        if (fs.existsSync(COMPLETED_FILE)) {
            const data = fs.readFileSync(COMPLETED_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading completed sessions:', error);
    }
    return [];
}

// Extract module number from session ID or title
// Examples: "0.1" -> 0, "fase0_sesion01" -> 0, "1.2" -> 1
function extractModuleNumber(sessionId: string): number | null {
    // Try pattern like "0.1", "1.2", etc.
    const dotPattern = /^(\d+)\./;
    const dotMatch = sessionId.match(dotPattern);
    if (dotMatch) {
        return parseInt(dotMatch[1], 10);
    }

    // Try pattern like "fase0_sesion01"
    const fasePattern = /fase(\d+)/i;
    const faseMatch = sessionId.match(fasePattern);
    if (faseMatch) {
        return parseInt(faseMatch[1], 10);
    }

    return null;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    const moduleNumberStr = searchParams.get('moduleNumber');

    if (!userEmail || moduleNumberStr === null) {
        return NextResponse.json(
            { error: 'userEmail and moduleNumber are required' },
            { status: 400 }
        );
    }

    const moduleNumber = parseInt(moduleNumberStr, 10);

    try {
        // Get all modules/sessions
        const allModules = getModules();

        // Filter sessions that belong to this module
        const moduleSessions = allModules.filter(module => {
            const modNum = extractModuleNumber(module.id);
            return modNum === moduleNumber;
        });

        const totalSessions = moduleSessions.length;

        // Get user's completed sessions
        const completedSessions = getCompletedSessions();
        const userCompletedSessionIds = completedSessions
            .filter(c => c.userEmail === userEmail)
            .map(c => c.moduleId);

        // Check which sessions of this module are completed
        const completedModuleSessions = moduleSessions.filter(session =>
            userCompletedSessionIds.includes(session.id)
        );

        const completedCount = completedModuleSessions.length;
        const isCompleted = totalSessions > 0 && completedCount === totalSessions;

        // Find missing sessions
        const missingSessions = moduleSessions
            .filter(session => !userCompletedSessionIds.includes(session.id))
            .map(session => session.id);

        return NextResponse.json({
            moduleNumber,
            totalSessions,
            completedSessions: completedCount,
            completed: isCompleted,
            missingSessions,
            progress: totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0
        });
    } catch (error) {
        console.error('Error checking module completion:', error);
        return NextResponse.json(
            { error: 'Failed to check module completion' },
            { status: 500 }
        );
    }
}
