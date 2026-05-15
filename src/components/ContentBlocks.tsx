import React from 'react';
import { 
    AlertCircle, 
    Code as CodeIcon, 
    Info, 
    CheckCircle2, 
    HelpCircle, 
    Zap, 
    Brain, 
    Lightbulb, 
    Compass, 
    Target, 
    AlertTriangle 
} from 'lucide-react';

export type ContentBlock =
    | { type: 'heading'; level: 1 | 2 | 3; text: string }
    | { type: 'text'; text: string }
    | { type: 'code'; language: string; code: string; caption?: string }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'list'; ordered: boolean; items: string[] }
    | { type: 'alert'; variant: 'info' | 'warning' | 'success'; text: string }
    | { type: 'feynman'; text: string; concept: string }
    | { type: 'socratic'; question: string; hint?: string }
    | { type: 'polymath'; connection: string; field: string }
    | { type: 'friction'; challenge: string; goal: string };

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="space-y-16 max-w-4xl mx-auto">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'heading':
                        if (block.level === 1) return <h1 key={index} className="text-5xl md:text-7xl font-black text-white mt-24 mb-12 tracking-tighter uppercase leading-[0.85] italic">{block.text}</h1>;
                        if (block.level === 2) return <h2 key={index} className="text-3xl md:text-4xl font-black text-indigo-400 mt-20 mb-8 tracking-tight uppercase italic">{block.text}</h2>;
                        return <h3 key={index} className="text-xl font-bold text-white mt-12 mb-6 flex items-center gap-3 uppercase tracking-widest italic"><div className="w-3 h-3 bg-indigo-500 rounded-full" /> {block.text}</h3>;

                    case 'text':
                        return <p key={index} className="text-lg text-slate-300/90 leading-[1.8] font-light mb-10 tracking-wide">{block.text}</p>;

                    case 'feynman':
                        return (
                            <div key={index} className="relative p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 my-20 group backdrop-blur-sm">
                                <div className="absolute -top-4 left-10 px-5 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-xl shadow-indigo-500/40">
                                    Método Feynman
                                </div>
                                <h4 className="text-white text-2xl font-black mb-6 tracking-tighter uppercase italic">{block.concept}</h4>
                                <p className="text-indigo-100/70 text-lg leading-relaxed italic">"{block.text}"</p>
                            </div>
                        );

                    case 'socratic':
                        return (
                            <div key={index} className="p-12 rounded-[3.5rem] bg-amber-500/[0.03] border border-amber-500/20 my-20 border-dashed">
                                <div className="flex items-center gap-3 mb-6">
                                    <HelpCircle className="w-5 h-5 text-amber-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/70">Mayéutica: Pregunta de Poder</span>
                                </div>
                                <p className="text-2xl font-bold text-amber-100 mb-6 leading-tight italic tracking-tight">{block.question}</p>
                                {block.hint && (
                                    <div className="flex items-center gap-2 opacity-40">
                                        <Lightbulb className="w-3 h-3 text-amber-500" />
                                        <p className="text-amber-500 text-[10px] uppercase font-black tracking-widest">Pista: {block.hint}</p>
                                    </div>
                                )}
                            </div>
                        );

                    case 'polymath':
                        return (
                            <div key={index} className="p-12 rounded-[3.5rem] bg-emerald-500/[0.03] border border-emerald-500/20 my-20">
                                <div className="flex items-center gap-3 mb-6">
                                    <Compass className="w-5 h-5 text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/70">Síntesis Maestros: {block.field}</span>
                                </div>
                                <p className="text-emerald-100/80 text-lg leading-[1.8] italic">"{block.connection}"</p>
                            </div>
                        );

                    case 'friction':
                        return (
                            <div key={index} className="p-12 rounded-[3.5rem] bg-red-500/[0.03] border border-red-500/20 my-20 shadow-2xl shadow-red-500/5">
                                <div className="flex items-center gap-3 mb-8">
                                    <Target className="w-5 h-5 text-red-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/70">Fricción Estructurada: Desafío</span>
                                </div>
                                <p className="text-red-100 text-2xl font-black mb-8 leading-none tracking-tighter uppercase italic">{block.challenge}</p>
                                <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/10">
                                    <p className="text-[10px] text-red-400 font-black uppercase tracking-widest mb-2">Objetivo de la Misión:</p>
                                    <p className="text-base text-red-200/60 italic leading-relaxed">{block.goal}</p>
                                </div>
                            </div>
                        );

                    case 'code':
                        return (
                            <div key={index} className="my-12 rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 shadow-2xl group backdrop-blur-xl">
                                <div className="flex items-center justify-between px-8 py-4 bg-white/[0.03] border-b border-white/5">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{block.language}</span>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <pre className="p-10 text-sm overflow-x-auto custom-scrollbar">
                                    <code className="text-indigo-300/90 font-mono leading-relaxed">{block.code}</code>
                                </pre>
                            </div>
                        );

                    case 'list':
                        return (
                            <ul key={index} className="space-y-6 my-12 pl-4">
                                {block.items.map((item, i) => (
                                    <li key={i} className="flex gap-6 text-slate-300">
                                        <div className="mt-3 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_10px_#6366f1]" />
                                        <span className="text-xl leading-relaxed font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
