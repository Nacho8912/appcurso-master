'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Video, MessageSquare, Star, ArrowRight, UserCircle, LogOut, Zap, BookMarked, Lock, CheckCircle2, FileText, Download, LayoutDashboard, Map, Folder, BarChart, ChevronDown, ChevronRight, Settings, HelpCircle, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Module {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
}

interface ModuleCompletion {
    moduleNumber: number;
    moduleName: string;
    totalSessions: number;
    completedSessions: number;
    completed: boolean;
    progress: number;
}

export default function StudentDashboard() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [moduleCompletions, setModuleCompletions] = useState<ModuleCompletion[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);
    const [leccionesOpen, setLeccionesOpen] = useState(true);

    useEffect(() => {
        const storedEmail = localStorage.getItem('user_email') || 'nachofl35@gmail.com';
        setEmail(storedEmail);
        localStorage.setItem('user_email', storedEmail);

        // Cargamos los módulos reales desde nuestra API/DB
        async function fetchModules() {
            try {
                const res = await fetch('/api/modules'); // Necesitaremos crear este endpoint simple
                if (res.ok) {
                    const data = await res.json();
                    setModules(data);

                    // Fetch completion status for each module
                    if (storedEmail) {
                        await fetchModuleCompletions(storedEmail, data);
                    }
                }
            } catch (error) {
                console.error("Error al cargar módulos:", error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchAnswers() {
            try {
                const res = await fetch('/api/answers/all');
                if (res.ok) {
                    const data = await res.json();
                    setAnswers(data);
                }
            } catch (error) {
                console.error('Error cargando biblioteca de respuestas:', error);
            }
        }

        fetchModules();
        fetchAnswers();
    }, [router]);

    const fetchModuleCompletions = async (userEmail: string, serverModules: Module[]) => {
        const completions: ModuleCompletion[] = [];

        for (const mod of serverModules) {
            let modNumber = -1;
            if (mod.id === 'modulo-introductorio') {
                modNumber = -1; // intro
            } else {
                modNumber = parseInt(mod.id.replace('modulo-', ''));
            }
            if (isNaN(modNumber)) continue;
            
            try {
                const res = await fetch(`/api/module-completion?userEmail=${userEmail}&moduleNumber=${modNumber}`);
                if (res.ok) {
                    const data = await res.json();
                    completions.push({
                        moduleNumber: modNumber,
                        moduleName: mod.title,
                        totalSessions: data.totalSessions,
                        completedSessions: data.completedSessions,
                        completed: data.completed,
                        progress: data.progress
                    });
                }
            } catch (error) {
                console.error(`Error fetching completion for module ${modNumber}:`, error);
            }
        }

        setModuleCompletions(completions);
    };

    const unlockedModules = modules.filter((mod, index) => {
        if (index === 0) return true; // Intro always unlocked
        if (index === 1) return true; // Module 0 always unlocked
        
        // For other modules, check if the PREVIOUS module is completed
        const prevMod = modules[index - 1];
        let prevModNumber = -1;
        if (prevMod.id !== 'modulo-introductorio') {
            prevModNumber = parseInt(prevMod.id.replace('modulo-', ''));
        }
        
        const prevCompletion = moduleCompletions.find(c => c.moduleNumber === prevModNumber);
        return prevCompletion?.completed === true;
    });

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
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-bold">Dashboard</span>
                    </Link>
                    <Link href="/ruta" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
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
                                {unlockedModules.map((m) => (
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

            <main className="ml-72 pl-10 pr-10 py-12 max-w-6xl">
                <header className="flex justify-between items-center mb-16">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">MI PORTAL <span className="text-primary">ACADÉMICO</span></h1>
                        <p className="text-slate-500 font-bold">{email}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900 px-6 py-3 rounded-2xl border border-white/5">
                        <UserCircle className="w-8 h-8 text-secondary" />
                        <div className="text-xs">
                            <div className="font-bold text-white uppercase">Nivel 1</div>
                            <div className="text-slate-500">Alumno Elite</div>
                        </div>
                    </div>
                </header>

                {/* Hero del Dashboard */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2 breaking-card p-10 bg-gradient-to-br from-primary/20 via-slate-900 to-transparent flex flex-col md:flex-row items-center gap-10">
                        <div className="space-y-4">
                            <div className="inline-block px-3 py-1 bg-secondary text-black text-[10px] font-black uppercase rounded">Próxima Sesión Live</div>
                            <h2 className="text-3xl font-black italic">DOMINIO DE HERRAMIENTAS IA</h2>
                            <p className="text-slate-400 font-medium">Mañana a las 20:00h (Sesión de dudas con el tutor)</p>
                            <button className="commercial-button !py-3 !px-6 !text-sm">Reservar plaza en Zoom</button>
                        </div>
                        <div className="hidden md:flex flex-shrink-0 w-32 h-32 bg-slate-800 rounded-3xl items-center justify-center border border-white/10 shadow-2xl">
                            <Video className="w-12 h-12 text-secondary animate-pulse" />
                        </div>
                    </div>

                    <div className="breaking-card p-8 bg-slate-900/80">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter">
                            <Star className="text-secondary fill-current w-5 h-5" /> Mi Progreso
                        </h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-[10px] font-black mb-2 uppercase text-slate-400">
                                    <span>Módulos Completos</span>
                                    <span>{moduleCompletions.filter(m => m.completed).length}/{moduleCompletions.length}</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary shadow-[0_0_10px_#a855f7]" style={{ width: `${(moduleCompletions.filter(m => m.completed).length / Math.max(moduleCompletions.length, 1)) * 100}%` }} />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                                Completa todas las sesiones de un módulo para desbloquear sus respuestas.
                            </p>
                        </div>
                    </div>
                </section>

                
                {/* Grilla Real de Módulos */}
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <BookMarked className="text-secondary" /> MIS MÓDULOS DEL MASTER
                </h3>

                {loading ? (
                    <div className="text-slate-500 font-bold animate-pulse text-xl">Cargando material exclusivo...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {unlockedModules.map((m, i) => (
                            <Link href={`/modulo/${m.id}`} key={m.id}>
                                <div className="breaking-card p-6 border-white/5 hover:border-primary/50 group cursor-pointer transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-primary/20 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs">
                                            {i + 1}
                                        </div>
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Nativo</div>
                                    </div>
                                    <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{m.title}</h4>
                                    <p className="text-slate-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
                                        {m.description}
                                    </p>
                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase">
                                        <span>Empezar Lectura</span>
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {modules.length === 0 && (
                            <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-3xl text-center">
                                <p className="text-slate-500 font-bold">Aún no se han publicado módulos de estudio.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Nueva Sección: Biblioteca de Respuestas de Texto */}
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 mt-20">
                    <BookMarked className="text-accent" /> BIBLIOTECA DE RESPUESTAS (MÉTODO FEYNMAN)
                </h3>

                <div className="breaking-card p-10 bg-slate-900/30 border-white/5">
                    {answers.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">No hay respuestas disponibles en este momento</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {answers.map((answer, index) => {
                                const modNumberStr = answer.id.replace('modulo-', '').replace('submodulo-', '');
                                const modNumber = parseFloat(modNumberStr);
                                const isCompleted = isNaN(modNumber) ? true : moduleCompletions.some(c => c.moduleNumber === modNumber && c.completed);

                                return (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-3xl border transition-all flex flex-col gap-4 group ${isCompleted
                                            ? 'bg-slate-950/50 border-white/10 hover:border-accent/30'
                                            : 'bg-slate-950/20 border-white/5 opacity-50 grayscale'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex flex-shrink-0 items-center justify-center shadow-xl ${isCompleted ? 'bg-green-500/10 text-green-500' : 'bg-slate-800 text-slate-600'
                                                }`}>
                                                <FileText className="w-7 h-7" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-black text-sm uppercase tracking-wide group-hover:text-accent transition-colors">
                                                    {answer.title.replace(/[\[\]]/g, '')}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                                                    Módulo: {answer.id}
                                                </p>
                                            </div>
                                            {!isCompleted && (
                                                <div className="ml-auto flex items-center gap-2 text-slate-600">
                                                    <Lock className="w-4 h-4" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">Bloqueado</span>
                                                </div>
                                            )}
                                        </div>

                                        {isCompleted && (
                                            <div className="mt-4 p-6 bg-slate-900 border border-white/5 rounded-2xl">
                                                <p className="text-slate-300 whitespace-pre-wrap font-medium leading-relaxed">{answer.text}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 text-slate-500">
                        <Zap className="w-4 h-4 text-accent" />
                        <p className="text-[9px] font-bold uppercase tracking-widest">Completa cada sesión para desbloquear las respuestas del Método Feynman.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
