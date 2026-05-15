import { NextResponse } from 'next/server';
import {
    buildPasswordRecoveryEmail,
    buildUsernameRecoveryEmail,
    sendMail,
} from '@/lib/mail';
import { getUserByEmail } from '@/lib/users';

const SUCCESS_MESSAGE =
    'Si el correo está registrado, recibirás un email con tus datos de acceso en unos minutos. Revisa también la carpeta de spam.';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        const type = body.type === 'username' ? 'username' : 'password';

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Introduce tu correo electrónico.' },
                { status: 400 }
            );
        }

        const user = getUserByEmail(email);

        if (user) {
            const payload = {
                name: user.name,
                email: user.email,
                password: user.password,
            };

            const mailContent =
                type === 'username'
                    ? buildUsernameRecoveryEmail(payload)
                    : buildPasswordRecoveryEmail(payload);

            const mailResult = await sendMail({
                to: user.email,
                subject: mailContent.subject,
                text: mailContent.text,
                html: mailContent.html,
            });

            if (!mailResult.ok) {
                return NextResponse.json(
                    { success: false, error: mailResult.error },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Error en el servidor.' },
            { status: 500 }
        );
    }
}
