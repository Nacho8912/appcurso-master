'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Rocket } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_role', data.role);

                if (data.role === 'admin') {
                    sessionStorage.setItem('admin_authenticated', 'true');
                    window.location.href = '/admin';
                } else {
                    router.push('/dashboard');
                }
            } else {
                setError(data.error || 'Credenciales incorrectas.');
            }
        } catch {
            setError('Error de conexión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Assets and Glows */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-float" />
            </div>

            <div className="relative z-10 max-w-lg w-full">
                {/* Brand Identity */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Rocket className="w-8 h-8 text-secondary" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase leading-none mb-4">
                        AGENTES<span className="premium-gradient bg-clip-text text-transparent">PRO</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Portal de Acceso Exclusivo</p>
                </div>

                {/* Form Container */}
                <div className="glass-card !p-12 border-white/10">
                    <form onSubmit={handleAuth} className="space-y-8">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-700 focus:outline-none focus:border-secondary/50 focus:bg-black/60 transition-all font-medium text-lg leading-none"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 ml-1">Clave de Acceso</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-700 focus:outline-none focus:border-secondary/50 focus:bg-black/60 transition-all font-medium text-lg leading-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl text-accent text-xs font-black text-center uppercase tracking-widest animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="commercial-button w-full justify-center !py-6 !rounded-2xl !text-lg !tracking-[0.2em] shadow-[0_20px_40px_rgba(139,92,246,0.3)] disabled:opacity-50"
                        >
                            {loading ? 'VERIFICANDO...' : 'ENTRAR AL PORTAL'} {!loading && <ArrowRight className="w-6 h-6" />}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <Link
                            href="/login/recuperar-contrasena"
                            className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <span className="hidden sm:inline text-slate-700">|</span>
                        <Link
                            href="/login/recuperar-usuario"
                            className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"
                        >
                            ¿Olvidaste tu usuario?
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3 text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
                        <ShieldCheck className="w-4 h-4 text-secondary/50" />
                        CONEXIÓN SEGURA Y CIFRADA
                    </div>
                </div>

                <div className="text-center mt-12 animate-fade-in delay-500">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        ¿No tienes acceso? <Link href="/#precios" className="text-secondary font-black hover:underline underline-offset-4">Adquiere el Master aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
