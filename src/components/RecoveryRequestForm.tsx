'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Rocket } from 'lucide-react';

type RecoveryType = 'password' | 'username';

const copy: Record<
    RecoveryType,
    { title: string; description: string; button: string; success: string }
> = {
    password: {
        title: 'Recuperar contraseña',
        description:
            'Introduce el correo con el que te registraste. Te enviaremos tu contraseña y datos de acceso.',
        button: 'Enviar contraseña',
        success: 'Revisa tu bandeja de entrada. Si el correo está registrado, recibirás tus datos de acceso.',
    },
    username: {
        title: 'Recuperar usuario',
        description:
            'Introduce el correo con el que te registraste. Te enviaremos tu usuario y contraseña de acceso.',
        button: 'Enviar usuario',
        success: 'Revisa tu bandeja de entrada. Si el correo está registrado, recibirás tus datos de acceso.',
    },
};

export default function RecoveryRequestForm({ type }: { type: RecoveryType }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const labels = copy[type];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const res = await fetch('/api/auth/recover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
            } else {
                setError(data.error || 'No se pudo procesar la solicitud.');
            }
        } catch {
            setError('Error de conexión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero.png"
                    alt=""
                    className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-lg w-full">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Rocket className="w-8 h-8 text-indigo-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase leading-none mb-3 text-white">
                        {labels.title}
                    </h1>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">{labels.description}</p>
                </div>

                <div className="glass-card !p-10 border-white/10">
                    {success ? (
                        <div className="text-center space-y-6">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl text-emerald-300 text-sm leading-relaxed">
                                {labels.success}
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest hover:text-indigo-300 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 ml-1">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-400/50 focus:bg-black/60 transition-all font-medium text-lg leading-none"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-300 text-xs font-black text-center uppercase tracking-widest">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-indigo-500 py-5 text-lg font-black uppercase tracking-[0.2em] text-black shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition hover:bg-indigo-400 disabled:opacity-50"
                            >
                                {loading ? 'ENVIANDO...' : labels.button}
                                {!loading && <ArrowRight className="w-6 h-6" />}
                            </button>

                            <div className="text-center pt-2">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Volver al inicio de sesión
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
