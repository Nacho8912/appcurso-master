import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const pdfAnswersPath = path.join(process.cwd(), 'src', 'lib', 'pdf_answers.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'answers');

// Asegurar que el directorio de subidas existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export async function GET() {
    try {
        if (!fs.existsSync(pdfAnswersPath)) {
            return NextResponse.json([]);
        }
        const data = fs.readFileSync(pdfAnswersPath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const moduleId = formData.get('moduleId') as string;

        if (!file || !moduleId) {
            return NextResponse.json({ error: 'File and moduleId are required' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `respuestas_${moduleId}_${Date.now()}.pdf`;
        const filePath = path.join(uploadDir, fileName);

        // Guardar el archivo físico
        fs.writeFileSync(filePath, buffer);

        // Actualizar el registro JSON
        let pdfAnswers = [];
        if (fs.existsSync(pdfAnswersPath)) {
            pdfAnswers = JSON.parse(fs.readFileSync(pdfAnswersPath, 'utf8'));
        }

        // Eliminar registro anterior si existía para el mismo módulo
        const filtered = pdfAnswers.filter((a: any) => a.moduleId !== moduleId);

        const newEntry = {
            moduleId,
            fileName: file.name,
            serverFileName: fileName,
            url: `/uploads/answers/${fileName}`,
            uploadedAt: new Date().toISOString()
        };

        filtered.push(newEntry);
        fs.writeFileSync(pdfAnswersPath, JSON.stringify(filtered, null, 2));

        return NextResponse.json({ success: true, entry: newEntry });
    } catch (error) {
        console.error('Error uploading PDF:', error);
        return NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const moduleId = searchParams.get('moduleId');

        if (!moduleId) {
            return NextResponse.json({ error: 'ModuleId is required' }, { status: 400 });
        }

        if (!fs.existsSync(pdfAnswersPath)) {
            return NextResponse.json({ success: true });
        }

        const pdfAnswers = JSON.parse(fs.readFileSync(pdfAnswersPath, 'utf8'));
        const entry = pdfAnswers.find((a: any) => a.moduleId === moduleId);

        if (entry) {
            const filePath = path.join(uploadDir, entry.serverFileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const filtered = pdfAnswers.filter((a: any) => a.moduleId !== moduleId);
        fs.writeFileSync(pdfAnswersPath, JSON.stringify(filtered, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete PDF' }, { status: 500 });
    }
}
