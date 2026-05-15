'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lock, ChevronRight, Search, CheckCircle, ArrowLeft, LayoutDashboard, Database } from 'lucide-react';

export default function BibliotecaPage() {
    const [answers, setAnswers] = useState<any[]>([]);
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const userEmail = 'nachofl35@gmail.com'; // En producción esto vendría del auth

    useEffect(() => {
        async function loadData() {
            try {
                // Cargar respuestas
                const res = await fetch('/api/answers_library');
                const answersData = await res.json();
                setAnswers(answersData);

                // Cargar módulos completados por el usuario
                const compRes = await fetch(`/api/completed?userEmail=${userEmail}`);
                if (compRes.ok) {
                    const compData = await compRes.json();
                    // Extraemos solo los IDs de los módulos completados
                    setCompletedModules(compData.map((c: any) => c.moduleId));
                }
            } catch (error) {
                console.error("Error loading library data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Función para verificar si una respuesta está desbloqueada
    const isAnswerUnlocked = (ansId: string) => {
        // ans-0 -> "0"
        const targetModuleNum = ansId.replace('ans-', '');
        
        return completedModules.some(id => {
            // "0.1" -> startsWith("0.")
            // "submodulo-0-1" -> contains "-0-"
            // "modulo-0" -> endsWith("-0")
            return id === targetModuleNum || 
                   id.startsWith(`${targetModuleNum}.`) || 
                   id.includes(`-${targetModuleNum}-`) ||
                   id.split('-').includes(targetModuleNum);
        });
    };

    const filteredAnswers = answers.filter(ans => 
        ans.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-indigo-500 font-black animate-pulse uppercase tracking-[0.3em]">Cargando Bóveda de Datos...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 overflow-x-hidden">
            {/* Background Decorativo */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#4338ca,transparent)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <header className="mb-20">
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/dashboard" className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">Volver al Dashboard</span>
                        </Link>
                        <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${completedModules.length > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                            {completedModules.length > 0 ? `${completedModules.length} Módulos Sincronizados` : 'Acceso Restringido'}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-4 text-indigo-400 mb-4">
                                <Database className="w-8 h-8" />
                                <span className="text-xs font-black uppercase tracking-[0.4em]">Core Knowledge Base</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                                Biblioteca de<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400">Respuestas</span>
                            </h1>
                        </div>

                        <div className="relative group w-full md:w-96">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Buscar en la base de datos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                            />
                        </div>
                    </div>
                </header>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredAnswers.map((ans, idx) => {
                            const unlocked = isAnswerUnlocked(ans.id);
                            return (
                                <motion.div
                                    key={ans.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="relative group"
                                >
                                    <Link 
                                        href={unlocked ? `/modulo/${ans.id}` : '#'}
                                        onClick={(e) => !unlocked && e.preventDefault()}
                                        className={`block h-full p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden relative ${
                                            !unlocked 
                                            ? 'bg-slate-900/40 border-white/5 opacity-50 grayscale cursor-not-allowed' 
                                            : 'bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10 hover:-translate-y-2 shadow-2xl shadow-indigo-500/5'
                                        }`}
                                    >
                                        {/* Decoración de Tarjeta */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all" />
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className={`p-3 rounded-2xl ${unlocked ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-600'}`}>
                                                    {unlocked ? <BookOpen className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Doc ID: {idx + 100}</span>
                                            </div>

                                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">
                                                {ans.title}
                                            </h3>
                                            
                                            <p className="text-slate-500 text-sm mb-10 flex-grow leading-relaxed">
                                                {unlocked 
                                                    ? `Archivo de soluciones maestras. Incluye metodologías, frameworks y resultados esperados.` 
                                                    : `CONTENIDO ENCRIPTADO. Completa el módulo correspondiente para desbloquear esta respuesta.`}
                                            </p>

                                            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${unlocked ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                        {unlocked ? 'Desbloqueado' : 'Bloqueado'}
                                                    </span>
                                                </div>
                                                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${unlocked ? 'text-indigo-500' : 'text-slate-700'}`} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
