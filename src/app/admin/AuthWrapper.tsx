'use client';

import { useState, useEffect } from 'react';
import { Lock, LogOut, AlertCircle, Shield } from 'lucide-react';

const AUTH_KEY = 'admin_authenticated';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        const authStatus = sessionStorage.getItem(AUTH_KEY);
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setChecking(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success && data.role === 'admin') {
                sessionStorage.setItem(AUTH_KEY, 'true');
                setIsAuthenticated(true);
                setPassword('');
            } else {
                setError('Contraseña incorrecta. Acceso denegado.');
                setPassword('');
            }
        } catch {
            setError('Error de conexión. Inténtalo de nuevo.');
        } finally {
            setChecking(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setPassword('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-float" />
                    <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
                </div>

                <div className="relative z-10 w-full max-w-md px-8 animate-fade-in">
                    <div className="glass-card !p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/20 text-primary mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">
                                AGENTES<span className="text-secondary">PRO</span>
                            </h1>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                Panel de Administración
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">
                                    Contraseña de Seguridad
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Introduce la contraseña..."
                                        className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-white/10 rounded-2xl text-white font-medium placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 animate-fade-in">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-bold">{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={checking}
                                className="commercial-button w-full justify-center text-base py-5 disabled:opacity-50"
                            >
                                {checking ? 'Verificando...' : 'Acceder al Panel'}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                Sistema Protegido • Solo Administradores
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated view - show logout button and children
    return (
        <div className="relative">
            {/* Logout Button (Fixed in top-right) */}
            <button
                onClick={handleLogout}
                className="fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:border-red-500/50 transition-all font-bold text-sm group"
                title="Cerrar sesión"
            >
                <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>

            {children}
        </div>
    );
}
