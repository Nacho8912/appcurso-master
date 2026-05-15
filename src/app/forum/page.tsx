'use client';

import { useState } from 'react';
import { MessageSquare, Send, UserCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Post {
    id: string;
    user: string;
    content: string;
    date: string;
    replies: number;
}

export default function forumPage() {
    const [posts, setPosts] = useState<Post[]>([
        { id: '1', user: 'nacho_alv@email.com', content: '¿Alguien ha podido terminar la práctica del módulo 2? Tengo dudas con la API.', date: 'Hoy, 10:45', replies: 3 },
        { id: '2', user: 'admin@masterpro.com', content: 'Recordad que mañana hay tutoría en directo a las 20:00.', date: 'Ayer, 18:00', replies: 12 },
    ]);
    const [newPost, setNewPost] = useState('');

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost) return;
        const post: Post = {
            id: Math.random().toString(),
            user: 'mi_usuario@email.com',
            content: newPost,
            date: 'Ahora mismo',
            replies: 0
        };
        setPosts([post, ...posts]);
        setNewPost('');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-32">
            <nav className="p-8 max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 font-bold hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Regresar al Dashboard
                </Link>
                <div className="flex items-center gap-3">
                    <MessageCircle className="text-primary w-8 h-8" />
                    <h1 className="text-3xl font-black">COMUNIDAD <span className="text-secondary">ELITE</span></h1>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-8">
                <header className="mb-12">
                    <p className="text-slate-400 font-medium">Expón tus dudas, comparte tus logros e interactúa con otros alumnos y profesores en tiempo real.</p>
                </header>

                {/* Input de consulta */}
                <div className="breaking-card p-6 mb-12 bg-slate-900/50 border-primary/30">
                    <form onSubmit={handlePost} className="flex flex-col gap-4">
                        <textarea
                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-6 outline-none focus:border-primary/50 transition-all font-medium placeholder:text-slate-700"
                            placeholder="¿Qué quieres preguntar a la comunidad?"
                            rows={3}
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button className="commercial-button !py-3 !px-8">
                                Publicar Consulta <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Feed de mensajes */}
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="breaking-card p-8 bg-slate-900/30 hover:bg-slate-900/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <UserCircle className={`w-10 h-10 ${post.user.includes('admin') ? 'text-primary' : 'text-secondary'}`} />
                                    <div>
                                        <div className="text-sm font-black">{post.user}</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.date}</div>
                                    </div>
                                </div>
                                {post.user.includes('admin') && (
                                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded uppercase">Team MasterPro</span>
                                )}
                            </div>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed italic">
                                "{post.content}"
                            </p>
                            <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                    <MessageSquare className="w-4 h-4" /> {post.replies} Respuestas
                                </div>
                                <div className="cursor-pointer hover:text-primary transition-colors uppercase tracking-widest">Responder</div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
