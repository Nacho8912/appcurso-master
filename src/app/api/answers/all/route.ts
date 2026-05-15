import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ANSWERS_FILE = path.join(process.cwd(), 'src', 'lib', 'answers.json');

export async function GET() {
    try {
        const data = fs.readFileSync(ANSWERS_FILE, 'utf-8');
        const answers = JSON.parse(data);
        return NextResponse.json(answers);
    } catch (err) {
        return NextResponse.json([], { status: 200 });
    }
}
