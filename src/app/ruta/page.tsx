'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Video, MessageSquare, Star, ArrowRight, UserCircle, LogOut, Zap, BookMarked, Lock, CheckCircle2, FileText, Download, LayoutDashboard, Map, Folder, BarChart, ChevronDown, ChevronRight, Settings, HelpCircle, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Module {
    id: string;
    title: string;
    description: string;
}

export default function RutaPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [leccionesOpen, setLeccionesOpen] = useState(true);

    useEffect(() => {
        const storedEmail = localStorage.getItem('user_email');
        if (!storedEmail) {
            router.push('/login');
            return;
        }
        setEmail(storedEmail);

        async function fetchModules() {
            try {
                const res = await fetch('/api/modules');
                if (res.ok) {
                    const data = await res.json();
                    setModules(data);
                }
            } catch (error) {
                console.error("Error al cargar módulos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchModules();
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Sidebar Nav */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#0f172a] border-r border-white/5 flex flex-col py-6 overflow-y-auto z-40 shadow-2xl">
                <div className="px-6 mb-10">
                    <div className="text-xl font-black text-white flex items-center gap-2">
                        AgentesPro
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">
                        Master IA Agentica
                    </div>
                </div>

                <div className="px-6 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Plataforma</span>
                </div>
                
                <nav className="flex flex-col gap-1 px-4 mb-8">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-bold">Dashboard</span>
                    </Link>
                    <Link href="/ruta" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white transition-colors">
                        <Map className="w-5 h-5" />
                        <span className="text-sm font-bold">Ruta del Master</span>
                    </Link>
                    
                    {/* Lecciones - Collapsible */}
                    <div className="flex flex-col mt-2">
                        <button 
                            onClick={() => setLeccionesOpen(!leccionesOpen)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${leccionesOpen ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-sm font-bold">Lecciones</span>
                            </div>
                            {leccionesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        {leccionesOpen && (
                            <div className="flex flex-col pl-12 pr-4 py-2 gap-1">
                                {modules.map((m) => (
                                    <Link key={m.id} href={`/modulo/${m.id}`} className="text-[11px] font-bold text-slate-500 hover:text-indigo-400 py-2 truncate transition-colors uppercase tracking-wider">
                                        {m.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/proyectos" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors mt-2">
                        <Folder className="w-5 h-5" />
                        <span className="text-sm font-bold">Proyectos</span>
                    </Link>
                    <Link href="/progreso" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <BarChart className="w-5 h-5" />
                        <span className="text-sm font-bold">Progreso</span>
                    </Link>
                    <Link href="/biblioteca" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-bold">Biblioteca</span>
                    </Link>
                    <Link href="/comunidad" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-bold">Comunidad</span>
                    </Link>
                </nav>

                <div className="px-6 mb-4 mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cuenta</span>
                </div>
                <div className="px-4">
                    <Link href="/perfil" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors mb-2">
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-bold">Ajustes</span>
                    </Link>
                    <Link href="/ayuda" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors mb-2">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-sm font-bold">Ayuda</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-bold">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="ml-72 pl-10 pr-10 py-12 max-w-4xl">
                <header className="mb-16">
                    <h1 className="text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">RUTA DEL MÁSTER</h1>
                    <p className="text-slate-400 font-medium text-lg max-w-2xl">
                        Tu camino para convertirte en un experto arquitecto de Sistemas Inteligentes Autónomos. Sigue esta ruta paso a paso.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative pl-8 border-l-2 border-slate-800 space-y-12 pb-20">
                        {modules.map((m, index) => (
                            <div key={m.id} className="relative group">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10"></div>
                                
                                <Link href={`/modulo/${m.id}`}>
                                    <div className="bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 p-8 rounded-3xl transition-all hover:bg-slate-900 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-xs font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">
                                                Fase {index + 1}
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">{m.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{m.description || "Adéntrate en los fundamentos y domina los conceptos clave de esta fase."}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
