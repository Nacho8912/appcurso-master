'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RespuestasRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-accent font-black animate-pulse uppercase tracking-[0.2em]">
            Redirigiendo a la nueva biblioteca de respuestas...
        </div>
    );
}
