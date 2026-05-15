import { NextResponse } from 'next/server';
import { deleteModule, updateModule } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        deleteModule(resolvedParams.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar el módulo' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const updates = await request.json();
        const updated = updateModule(resolvedParams.id, updates);

        if (updated) {
            return NextResponse.json({ success: true, module: updated });
        } else {
            return NextResponse.json({ error: 'Módulo no encontrado' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el módulo' }, { status: 500 });
    }
}
