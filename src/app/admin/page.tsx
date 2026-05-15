'use client';

import { useState, useEffect } from 'react';
import {
    Upload, FileText, CheckCircle, Loader2, ArrowLeft, Plus,
    BarChart3, Users, Euro, BookOpen, Trash2, LayoutDashboard,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import AuthWrapper from './AuthWrapper';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Module {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
}

function AdminDashboard() {
    const [view, setView] = useState<'dashboard' | 'upload' | 'answers'>('dashboard');
    const [uploadMode, setUploadMode] = useState<'pdf' | 'text'>('pdf');
    const [file, setFile] = useState<File | null>(null);
    const [textContent, setTextContent] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [modules, setModules] = useState<Module[]>([]);

    // Estados para respuestas
    const [selectedModuleForAnswer, setSelectedModuleForAnswer] = useState<string>('');
    const [answerFile, setAnswerFile] = useState<File | null>(null);
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    const [answerMessage, setAnswerMessage] = useState('');
    const [pdfAnswers, setPdfAnswers] = useState<any[]>([]);


    // Cargar módulos al inicio
    const fetchModules = async () => {
        try {
            const res = await fetch('/api/modules');
            if (res.ok) {
                const data = await res.json();
                setModules(data);
            }
        } catch (err) {
            console.error('Error cargando módulos');
        }
    };

    // Cargar registro de PDFs de respuestas
    const fetchPdfAnswers = async () => {
        try {
            const res = await fetch('/api/answers/pdf');
            if (res.ok) {
                const data = await res.json();
                setPdfAnswers(data);
            }
        } catch (err) {
            console.error('Error cargando respuestas PDF');
        }
    };

    useEffect(() => {
        fetchModules();
        fetchPdfAnswers();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uploadMode === 'pdf' && !file) return;
        if (uploadMode === 'text' && !textContent) return;
        if (!title) return;

        setLoading(true);
        setMessage('');

        try {
            let res;
            if (uploadMode === 'pdf') {
                const formData = new FormData();
                formData.append('file', file!);
                formData.append('title', title);
                formData.append('description', description);
                res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
            } else {
                res = await fetch('/api/modules', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title,
                        description,
                        content: textContent
                    }),
                });
            }

            if (res.ok) {
                setMessage('¡Módulo creado con éxito!');
                setTitle('');
                setDescription('');
                setFile(null);
                setTextContent('');
                fetchModules();
                setTimeout(() => setView('dashboard'), 2000);
            } else {
                setMessage('Error al procesar el contenido.');
            }
        } catch (err) {
            setMessage('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este contenido?')) return;

        try {
            const res = await fetch(`/api/modules/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchModules();
            }
        } catch (err) {
            console.error('Error eliminando módulo');
        }
    };

    // Manejar subida de PDF de respuesta
    const handleSaveAnswer = async () => {
        if (!selectedModuleForAnswer || !answerFile) {
            setAnswerMessage('Selecciona un módulo y un archivo PDF');
            return;
        }

        setLoadingAnswer(true);
        setAnswerMessage('');

        try {
            const formData = new FormData();
            formData.append('file', answerFile);
            formData.append('moduleId', selectedModuleForAnswer);

            const res = await fetch('/api/answers/pdf', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setAnswerMessage('✅ PDF de respuestas subido correctamente');
                setAnswerFile(null);
                fetchPdfAnswers();
                setTimeout(() => setAnswerMessage(''), 3000);
            } else {
                setAnswerMessage('❌ Error al subir el PDF');
            }
        } catch (err) {
            setAnswerMessage('❌ Error de conexión');
        } finally {
            setLoadingAnswer(false);
        }
    };

    // Eliminar PDF de respuesta
    const handleDeleteAnswer = async (moduleId: string) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar el PDF de respuestas del módulo ${moduleId}?`)) {
            return;
        }

        setLoadingAnswer(true);

        try {
            const res = await fetch(`/api/answers/pdf?moduleId=${moduleId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setAnswerMessage('✅ Eliminado correctamente');
                fetchPdfAnswers();
                setTimeout(() => setAnswerMessage(''), 3000);
            } else {
                setAnswerMessage('❌ Error al eliminar');
            }
        } catch (err) {
            setAnswerMessage('❌ Error de conexión');
        } finally {
            setLoadingAnswer(false);
        }
    };



    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Sidebar Simple */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-white/5 p-8 flex flex-col gap-10">
                <div className="text-2xl font-black tracking-tighter text-primary">ADMIN<span className="text-secondary">PRO</span></div>

                <nav className="flex flex-col gap-4">
                    <button
                        onClick={() => setView('dashboard')}
                        className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${view === 'dashboard' ? 'bg-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'text-slate-500 hover:bg-white/5'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </button>
                    <button
                        onClick={() => setView('upload')}
                        className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${view === 'upload' ? 'bg-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'text-slate-500 hover:bg-white/5'}`}
                    >
                        <Plus className="w-5 h-5" /> Nuevo Módulo
                    </button>
                    <button
                        onClick={() => setView('answers')}
                        className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${view === 'answers' ? 'bg-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'text-slate-500 hover:bg-white/5'}`}
                    >
                        <CheckCircle className="w-5 h-5" /> Respuestas
                    </button>
                </nav>


                <div className="mt-auto">
                    <Link href="/" className="flex items-center gap-3 p-4 text-slate-500 font-bold hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" /> Ver Portal
                    </Link>
                </div>
            </aside>

            <main className="pl-72 pr-10 py-12 max-w-7xl">
                {view === 'dashboard' ? (
                    <div className="animate-fade-in">
                        <header className="mb-12">
                            <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Panel de <span className="text-secondary">Gestión</span></h1>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Resumen del rendimiento del Master</p>
                        </header>

                        {/* Metrics Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="breaking-card p-8 bg-slate-900/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-green-500/20 text-green-500 rounded-xl"><Euro /></div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase">Ventas Brutas</div>
                                </div>
                                <div className="text-3xl font-black tracking-tighter">0.00€</div>
                                <div className="mt-2 text-xs text-slate-500 font-bold">+0% vs mes anterior</div>
                            </div>
                            <div className="breaking-card p-8 bg-slate-900/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-secondary/20 text-secondary rounded-xl"><Users /></div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase">Alumnos Activos</div>
                                </div>
                                <div className="text-3xl font-black tracking-tighter">0</div>
                                <div className="mt-2 text-xs text-slate-500 font-bold">+0 esta semana</div>
                            </div>
                            <div className="breaking-card p-8 bg-slate-900/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary/20 text-primary rounded-xl"><BarChart3 /></div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase">Tasa Finalización</div>
                                </div>
                                <div className="text-3xl font-black tracking-tighter">0%</div>
                                <div className="mt-2 text-xs text-slate-500 font-bold">Sin datos de actividad</div>
                            </div>
                        </section>

                        {/* Modules Management */}
                        <section>
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <BookOpen className="text-secondary" /> Módulos Publicados ({modules.length})
                            </h2>
                            <div className="space-y-4">
                                {modules.map((m) => (
                                    <div key={m.id} className="breaking-card p-6 bg-slate-900/30 flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                                                <FileText />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{m.title}</h4>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Publicado: {new Date(m.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Link href={`/modulo/${m.id}`} className="p-3 text-slate-500 hover:text-white transition-colors" title="Ver contenido">
                                                <ExternalLink />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(m.id)}
                                                className="p-3 text-slate-500 hover:text-accent transition-colors" title="Eliminar definitivamente"
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {modules.length === 0 && (
                                    <div className="p-20 border-2 border-dashed border-white/5 rounded-3xl text-center">
                                        <p className="text-slate-500 font-bold">No hay contenidos publicados todavía.</p>
                                        <button onClick={() => setView('upload')} className="mt-6 text-primary font-black uppercase text-xs hover:underline">Subir primer PDF</button>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Respuestas Section (NUEVO SISTEMA PDF) */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <CheckCircle className="text-accent" /> Biblioteca de PDFs de Respuestas ({pdfAnswers.length})
                            </h2>
                            <div className="space-y-3">
                                {pdfAnswers.length === 0 ? (
                                    <div className="p-20 border-2 border-dashed border-white/5 rounded-3xl text-center">
                                        <p className="text-slate-500 font-bold">No hay PDFs de respuestas subidos todavía.</p>
                                        <button onClick={() => setView('answers')} className="mt-6 text-accent font-black uppercase text-xs hover:underline">Subir primer PDF</button>
                                    </div>
                                ) : (
                                    pdfAnswers.map((pdf) => (
                                        <div key={pdf.moduleId} className="breaking-card p-5 bg-slate-900/30 flex items-center justify-between group hover:border-accent/30 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-sm uppercase tracking-wide">
                                                        {pdf.fileName}
                                                    </h4>
                                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                                                        Módulo: {pdf.moduleId} • Subido: {new Date(pdf.uploadedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-500 hover:text-white transition-colors" title="Ver PDF">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteAnswer(pdf.moduleId)}
                                                    className="p-3 text-slate-500 hover:text-red-500 transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                ) : view === 'answers' ? (
                    <div className="animate-fade-in max-w-4xl">
                        <header className="mb-12 flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Biblioteca de <span className="text-primary">PDFs</span></h1>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Sube tus propios archivos PDF con las respuestas oficiales</p>
                            </div>
                            <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-white font-bold flex items-center gap-2">
                                <ArrowLeft className="w-5 h-5" /> Volver
                            </button>
                        </header>

                        <div className="breaking-card p-12 bg-slate-900/50 flex flex-col gap-10">
                            <section>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black">1</span>
                                    Seleccionar Módulo Asociado
                                </h3>
                                <select
                                    value={selectedModuleForAnswer}
                                    onChange={(e) => setSelectedModuleForAnswer(e.target.value)}
                                    className="input-field !bg-slate-950/50 border-white/5"
                                >
                                    <option value="">-- Selecciona un módulo --</option>
                                    {modules.map((m) => (
                                        <option key={m.id} value={m.id}>{m.title} ({m.id})</option>
                                    ))}
                                </select>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black">2</span>
                                    Archivo PDF de Respuestas
                                </h3>
                                <div className={`relative border-2 border-dashed rounded-[2.5rem] p-20 text-center transition-all duration-300 ${answerFile ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-accent/50 bg-slate-950/50'}`}>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setAnswerFile(e.target.files?.[0] || null)}
                                    />
                                    <div className="flex flex-col items-center">
                                        <div className={`p-8 rounded-3xl mb-6 ${answerFile ? 'bg-accent text-white' : 'bg-slate-800 text-slate-600 shadow-xl'}`}>
                                            <Upload className="w-12 h-12" />
                                        </div>
                                        <h4 className="text-2xl font-black text-white mb-2 tracking-tight">
                                            {answerFile ? answerFile.name : 'Suelta el PDF de respuestas aquí'}
                                        </h4>
                                        <p className="text-slate-500 font-bold text-sm">Este archivo será el que descarguen los alumnos</p>
                                    </div>
                                </div>
                            </section>

                            <button
                                onClick={handleSaveAnswer}
                                disabled={loadingAnswer || !selectedModuleForAnswer || !answerFile}
                                className="commercial-button w-full justify-center text-xl py-6 disabled:opacity-30 flex items-center gap-4"
                            >
                                {loadingAnswer ? (
                                    <Loader2 className="animate-spin w-8 h-8" />
                                ) : (
                                    <>
                                        <CheckCircle className="w-7 h-7" />
                                        SUBIR A LA BIBLIOTECA
                                    </>
                                )}
                            </button>

                            {answerMessage && (
                                <div className={`p-6 rounded-3xl flex items-center gap-4 animate-fade-in ${answerMessage.includes('✅') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    <span className="font-black italic text-lg">{answerMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in max-w-4xl">
                        <header className="mb-12 flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">Cargar <span className="text-primary">Contenido</span></h1>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Añade nuevo material al Master Pro</p>
                            </div>
                            <button onClick={() => setView('dashboard')} className="text-slate-500 hover:text-white font-bold flex items-center gap-2">
                                <ArrowLeft className="w-5 h-5" /> Cancelar
                            </button>
                        </header>

                        <div className="breaking-card p-12 bg-slate-900/50 flex flex-col gap-10">
                            <section>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black">1</span>
                                    Metadatos del Módulo
                                </h3>
                                <div className="grid gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Título Estratégico</label>
                                        <input
                                            type="text"
                                            className="input-field !bg-slate-950/50 border-white/5"
                                            placeholder="Ej: Growth Hacking Avanzado"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Resumen para Alumnos</label>
                                        <textarea
                                            className="input-field !bg-slate-950/50 border-white/5 min-h-[140px]"
                                            placeholder="Describe el valor de este módulo..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black">2</span>
                                        Contenido del Curso
                                    </h3>
                                    <div className="bg-slate-950 p-1.5 rounded-2xl border border-white/5 flex gap-2">
                                        <button
                                            onClick={() => setUploadMode('pdf')}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${uploadMode === 'pdf' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            PDF Maestro
                                        </button>
                                        <button
                                            onClick={() => setUploadMode('text')}
                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${uploadMode === 'text' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            Texto Directo
                                        </button>
                                    </div>
                                </div>

                                {uploadMode === 'pdf' ? (
                                    <div className={`relative border-2 border-dashed rounded-[2.5rem] p-20 text-center transition-all duration-300 ${file ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-primary/50 bg-slate-950/50'}`}>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        />
                                        <div className="flex flex-col items-center">
                                            <div className={`p-8 rounded-3xl mb-6 ${file ? 'bg-primary text-white' : 'bg-slate-800 text-slate-600 shadow-xl'}`}>
                                                <Upload className="w-12 h-12" />
                                            </div>
                                            <h4 className="text-2xl font-black text-white mb-2 tracking-tight">
                                                {file ? file.name : 'Suelta el documento aquí'}
                                            </h4>
                                            <p className="text-slate-500 font-bold text-sm">El sistema extraerá el texto automáticamente para lectura nativa</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <textarea
                                            className="input-field !bg-slate-950/50 border-white/5 min-h-[400px] font-mono text-sm leading-relaxed"
                                            placeholder="# Título de la Lección&#10;&#10;Escribe o pega aquí tu contenido en Markdown...&#10;&#10;| Tabla | Ejemplo |&#10;|-------|---------|&#10;| Dato 1 | Valor 1 |&#10;&#10;```javascript&#10;console.log('Código aquí');&#10;```"
                                            value={textContent}
                                            onChange={(e) => setTextContent(e.target.value)}
                                        />
                                        <div className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Soporta Markdown: tablas, códigos y formato enriquecido.
                                        </div>
                                    </div>
                                )}
                            </section>

                            <button
                                onClick={handleUpload}
                                disabled={loading || !title || (uploadMode === 'pdf' && !file) || (uploadMode === 'text' && !textContent)}
                                className="commercial-button w-full justify-center text-xl py-6 disabled:opacity-30 flex items-center gap-4"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin w-8 h-8" />
                                ) : (
                                    <>
                                        <CheckCircle className="w-7 h-7" />
                                        PROCESAR Y PUBLICAR AHORA
                                    </>
                                )}
                            </button>

                            {message && (
                                <div className={`p-6 rounded-3xl flex items-center gap-4 animate-fade-in ${message.includes('éxito') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    <CheckCircle className="w-8 h-8" />
                                    <span className="font-black italic text-lg">{message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function ProtectedAdminDashboard() {
    return (
        <AuthWrapper>
            <AdminDashboard />
        </AuthWrapper>
    );
}
