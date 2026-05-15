const fs = require('fs');

let content = fs.readFileSync('src/app/modulo/[id]/page.tsx', 'utf8');

// 1. Add Icons
content = content.replace(
    "import { ArrowLeft, ChevronRight, Edit2, Save, X, Loader2, CheckCircle } from 'lucide-react';",
    "import { ArrowLeft, ChevronRight, Edit2, Save, X, Loader2, CheckCircle, LayoutDashboard, Map, BookOpen, ChevronDown, Folder, BarChart, FileText, MessageSquare, Settings, HelpCircle, LogOut } from 'lucide-react';"
);

// 2. Add State for allModules and leccionesOpen
content = content.replace(
    "const [allModuleSessions, setAllModuleSessions] = useState<Module[]>([]);",
    "const [allModuleSessions, setAllModuleSessions] = useState<Module[]>([]);\n    const [allModules, setAllModules] = useState<Module[]>([]);\n    const [leccionesOpen, setLeccionesOpen] = useState(true);"
);

// 3. Save allModules in fetch
content = content.replace(
    "const data = await res.json();",
    "const data = await res.json();\n                setAllModules(data);"
);

// 4. Update the layout: add sidebar and wrap with main
const sidebarCode = `
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
                    <Link href="/ruta" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <Map className="w-5 h-5" />
                        <span className="text-sm font-bold">Ruta del Master</span>
                    </Link>
                    
                    {/* Lecciones - Collapsible */}
                    <div className="flex flex-col mt-2">
                        <button 
                            onClick={() => setLeccionesOpen(!leccionesOpen)}
                            className={\`flex items-center justify-between px-4 py-3 rounded-xl transition-colors \${leccionesOpen ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}\`}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-sm font-bold">Lecciones</span>
                            </div>
                            {leccionesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        {leccionesOpen && (
                            <div className="flex flex-col pl-12 pr-4 py-2 gap-1">
                                {allModules.map((m) => (
                                    <Link key={m.id} href={\`/modulo/\${m.id}\`} className="text-[11px] font-bold text-slate-500 hover:text-indigo-400 py-2 truncate transition-colors uppercase tracking-wider">
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
                    <Link href="/recursos" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
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
                    <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-bold">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="ml-72 flex-1 relative min-h-screen">
`;

content = content.replace(
    '<div className="fixed top-0 left-0 w-full h-1 z-[100]">',
    sidebarCode + '\n                <div className="fixed top-0 left-72 right-0 h-1 z-[100]">'
);

// Close the main tag before the last two closing divs of the component
// The component ends with:
//         </div>
//     );
// }
// We need to add </main>
content = content.replace(
    '        </div>\n    );\n}',
    '            </main>\n        </div>\n    );\n}'
);

fs.writeFileSync('src/app/modulo/[id]/page.tsx', content);
