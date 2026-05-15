import nodemailer from 'nodemailer';

type SendMailResult = { ok: true; simulated?: boolean } | { ok: false; error: string };

function isSmtpConfigured() {
    return Boolean(
        process.env.SMTP_HOST &&
            process.env.SMTP_USER &&
            process.env.SMTP_PASS
    );
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function credentialsHtml(user: { name: string; email: string; password: string }, intro: string) {
    return `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <p>Hola <strong>${escapeHtml(user.name)}</strong>,</p>
            <p>${escapeHtml(intro)}</p>
            <p>
                <strong>Nombre:</strong> ${escapeHtml(user.name)}<br/>
                <strong>Usuario (correo de acceso):</strong> ${escapeHtml(user.email)}<br/>
                <strong>Contraseña:</strong> ${escapeHtml(user.password)}
            </p>
            <p style="color:#666;font-size:14px">Si no solicitaste este mensaje, ignóralo.</p>
            <p>— Equipo AgentesPro</p>
        </div>
    `;
}

export async function sendMail(options: {
    to: string;
    subject: string;
    text: string;
    html: string;
}): Promise<SendMailResult> {
    if (!isSmtpConfigured()) {
        console.log('[AgentesPro mail — modo desarrollo, SMTP no configurado]');
        console.log('Para:', options.to);
        console.log('Asunto:', options.subject);
        console.log(options.text);
        return { ok: true, simulated: true };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        return { ok: true };
    } catch (error) {
        console.error('Error sending mail:', error);
        return { ok: false, error: 'No se pudo enviar el correo. Inténtalo más tarde.' };
    }
}

export function buildPasswordRecoveryEmail(user: { name: string; email: string; password: string }) {
    const subject = 'Recuperación de contraseña — AgentesPro';
    const text = [
        `Hola ${user.name},`,
        '',
        'Has solicitado recuperar tu contraseña de acceso al Master AgentesPro.',
        '',
        `Nombre: ${user.name}`,
        `Correo de acceso: ${user.email}`,
        `Contraseña: ${user.password}`,
        '',
        'Si no solicitaste este mensaje, ignóralo.',
        '',
        '— Equipo AgentesPro',
    ].join('\n');

    const html = credentialsHtml(
        user,
        'Has solicitado recuperar tu contraseña de acceso al Master AgentesPro.'
    );

    return { subject, text, html };
}

export function buildUsernameRecoveryEmail(user: { name: string; email: string; password: string }) {
    const subject = 'Recuperación de usuario — AgentesPro';
    const text = [
        `Hola ${user.name},`,
        '',
        'Has solicitado recuperar tu usuario de acceso al Master AgentesPro.',
        '',
        `Nombre: ${user.name}`,
        `Usuario (correo de acceso): ${user.email}`,
        `Contraseña: ${user.password}`,
        '',
        'Si no solicitaste este mensaje, ignóralo.',
        '',
        '— Equipo AgentesPro',
    ].join('\n');

    const html = credentialsHtml(
        user,
        'Has solicitado recuperar tu usuario de acceso al Master AgentesPro.'
    );

    return { subject, text, html };
}
