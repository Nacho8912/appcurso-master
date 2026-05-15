import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/users';

// Contraseñas SOLO en el servidor — NUNCA se envían al navegador
const ADMIN_PASSWORD = '15@08.11';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!password || password.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Contraseña requerida' },
                { status: 401 }
            );
        }

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true, role: 'admin' });
        }

        if (email && typeof email === 'string') {
            const user = getUserByEmail(email);
            if (user) {
                if (user.password === password) {
                    return NextResponse.json({ success: true, role: user.role });
                }
                return NextResponse.json(
                    { success: false, error: 'Credenciales incorrectas.' },
                    { status: 401 }
                );
            }
        }

        // Compatibilidad: acceso estudiante si no hay usuario registrado con ese email
        return NextResponse.json({ success: true, role: 'student' });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
