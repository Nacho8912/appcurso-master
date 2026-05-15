import fs from 'fs';
import path from 'path';

// Content Block Types
export type ContentBlock =
    | { type: 'heading'; level: 1 | 2 | 3; text: string }
    | { type: 'text'; text: string }
    | { type: 'code'; language: string; code: string; caption?: string }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'diagram'; ascii: string }
    | { type: 'list'; ordered: boolean; items: string[] }
    | { type: 'alert'; variant: 'info' | 'warning' | 'success'; text: string };

export interface Module {
    id: string;
    title: string;
    description: string;
    // Support both old (string) and new (blocks) formats for backward compatibility
    content: string | ContentBlock[];
    createdAt: string;
}

const DATA_PATH = path.join(process.cwd(), 'src/lib/modules.json');

export function getModules(): Module[] {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            fs.writeFileSync(DATA_PATH, '[]');
            return [];
        }
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading modules:', error);
        return [];
    }
}

export function saveModule(module: Module) {
    const modules = getModules();
    modules.push(module);
    fs.writeFileSync(DATA_PATH, JSON.stringify(modules, null, 2));
}

export function deleteModule(id: string) {
    const modules = getModules();
    const filtered = modules.filter(m => m.id !== id);
    fs.writeFileSync(DATA_PATH, JSON.stringify(filtered, null, 2));
}

export function updateModule(id: string, updates: Partial<Module>) {
    const modules = getModules();
    const index = modules.findIndex(m => m.id === id);
    if (index !== -1) {
        modules[index] = { ...modules[index], ...updates };
        fs.writeFileSync(DATA_PATH, JSON.stringify(modules, null, 2));
        return modules[index];
    }
    return null;
}
