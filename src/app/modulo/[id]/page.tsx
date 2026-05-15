'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    ChevronRight, 
    CheckCircle, 
    LayoutDashboard, 
    Loader2, 
    Database,
    Zap,
    Brain,
    BookOpen,
    Menu,
    X
} from 'lucide-react';
import { ContentBlocks } from '@/components/ContentBlocks';

export default function ModulePage({ params }: { params: any }) {
    const [module, setModule] = useState<any>(null);
    const [allModules, setAllModules] = useState<any[]>([]);
    const [moduleId, setModuleId] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        async function load() {
            const resolvedParams = await params;
            const currentId = decodeURIComponent(resolvedParams.id);
            setModuleId(currentId);
            
            const res = await fetch('/api/modules');
            if (res.ok) {
                const data = await res.json();
                const sorted = [...data].sort((a: any, b: any) => {
                    const aNum = a.id.match(/\d+/)?.[0] || 0;
                    const bNum = b.id.match(/\d+/)?.[0] || 0;
                    return Number(aNum) - Number(bNum);
                });
                setAllModules(sorted);
                
                const found = data.find((m: any) => m.id === currentId);
                if (found) {
                    setModule(found);
                    setSelectedAnswer(null);
                    checkIfCompleted(currentId);
                } else {
                    const ansRes = await fetch('/api/answers_library');
                    const ansData = await ansRes.json();
                    const foundAns = ansData.find((a: any) => a.id === currentId);
                    if (foundAns) {
                        setSelectedAnswer(foundAns);
                        setModule(null);
                    }
                }
            }
        }
        load();
    }, [params]);

    const checkIfCompleted = async (id: string) => {
        const email = localStorage.getItem('user_email') || 'nachofl35@gmail.com';
        const res = await fetch(`/api/completed?userEmail=${email}&moduleId=${id}`);
        if (res.ok) {
            const data = await res.json();
            setIsCompleted(data.completed);
        }
    };

    const handleCompleteSession = async () => {
        const email = localStorage.getItem('user_email') || 'nachofl35@gmail.com';
        const res = await fetch('/api/completed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: email, moduleId })
        });
        if (res.ok) setIsCompleted(true);
    };

    if (!module && !selectedAnswer) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#050505] text-slate-300 font-sans">
            {/* BACKGROUND GLOWS */}
            <div className="agentespro-glow" />

            {/* SIDEBAR DINÁMICO */}
            <aside className={`fixed left-0 top-0 h-full bg-[#080808]/90 backdrop-blur-3xl border-r border-white/5 z-50 transition-all duration-500 flex flex-col ${sidebarOpen ? 'w-80' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0 overflow-hidden'}`}>
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && <span className="font-black uppercase tracking-tighter text-white whitespace-nowrap">AgentesPro</span>}
                    </Link>
                </div>
                
                <nav className="flex-grow overflow-y-auto p-6 space-y-10 custom-scrollbar pb-32">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 block mb-6 ml-2">Módulos del Máster</span>
                        <div className="space-y-6">
                            {Array.from(new Set(allModules.map(m => m.id.match(/\d+/)?.[0]))).map(modNum => {
                                const parent = allModules.find(m => m.id === `modulo-${modNum}`);
                                const children = allModules.filter(m => m.id.startsWith(`submodulo-${modNum}-`));
                                return (
                                    <div key={modNum} className="relative">
                                        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/5" />
                                        {parent && (
                                            <Link href={`/modulo/${parent.id}`} className={`flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wide no-underline ${
                                                moduleId === parent.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}>
                                                <BookOpen size={16} /> {sidebarOpen ? `Módulo ${modNum}` : modNum}
                                            </Link>
                                        )}
                                        {sidebarOpen && (
                                            <div className="mt-2 space-y-1">
                                                {children.map(child => (
                                                    <Link key={child.id} href={`/modulo/${child.id}`} className={`flex items-center gap-3 p-2.5 ml-4 rounded-xl transition-all text-[11px] font-medium no-underline relative group ${
                                                        moduleId === child.id ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-500 hover:text-slate-300'
                                                    }`}>
                                                        <div className={`w-1 h-1.5 rounded-full transition-all ${moduleId === child.id ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-slate-800'}`} />
                                                        <span className="truncate">{child.title.split(':')[1]?.trim() || child.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </aside>

            {/* BOTÓN TOGGLE SIDEBAR (Para móvil y colapso) */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed bottom-8 left-8 z-50 p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all lg:hidden"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* MAIN CONTENT */}
            <main className={`flex-grow transition-all duration-500 relative ${sidebarOpen ? 'lg:pl-80' : 'lg:pl-20'}`}>
                <div className="max-w-[850px] mx-auto px-8 md:px-12 py-32 relative z-10">
                    
                    <header className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-indigo-400 transition-colors no-underline">Dashboard</Link>
                            <ChevronRight size={10} className="text-slate-700" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Sesión Activa</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-10 italic drop-shadow-2xl">
                            {selectedAnswer ? selectedAnswer.title : module?.title}
                        </h1>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full" />
                    </header>

                    <article className="prose prose-invert max-w-none">
                        {selectedAnswer ? (
                            <div className="glass-card p-12 md:p-16 rounded-[3.5rem] border border-emerald-500/10">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs italic">Bóveda Desbloqueada</h4>
                                        <p className="text-emerald-100/30 text-[9px] uppercase font-bold tracking-tighter">Acceso Maestro Confirmado</p>
                                    </div>
                                </div>
                                {selectedAnswer.content.map((t: string, i: number) => (
                                    <p key={i} className="text-xl leading-[1.8] text-emerald-100/80 mb-8 font-light italic selection:bg-emerald-500/30">
                                        {t}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <ContentBlocks blocks={module.content} />
                        )}
                    </article>

                    {/* PIE DE PÁGINA: SINCRONIZACIÓN */}
                    {module && (
                        <footer className="mt-48 pt-20 border-t border-white/5">
                            <div className="glass-card p-16 rounded-[4rem] text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                                
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">¿Has asimilado el concepto?</h3>
                                <p className="text-slate-400 mb-12 max-w-sm mx-auto text-base leading-relaxed font-medium">
                                    Registra esta sesión para sincronizar tu progreso y desbloquear la respuesta maestra en tu biblioteca.
                                </p>
                                
                                <button 
                                    onClick={handleCompleteSession}
                                    disabled={isCompleted}
                                    className={`px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-700 relative overflow-hidden ${
                                        isCompleted 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                        : 'bg-white text-black hover:bg-indigo-600 hover:text-white shadow-2xl hover:shadow-indigo-500/40 active:scale-95'
                                    }`}
                                >
                                    <div className="relative z-10 flex items-center gap-3">
                                        {isCompleted ? <CheckCircle size={18} /> : <Zap size={18} />}
                                        <span>{isCompleted ? 'Progreso Sincronizado' : 'Sincronizar Progreso'}</span>
                                    </div>
                                </button>
                            </div>
                        </footer>
                    )}
                </div>
            </main>
        </div>
    );
}
