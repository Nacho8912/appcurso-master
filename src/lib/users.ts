import fs from 'fs';
import path from 'path';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'student' | 'admin';
    createdAt: string;
}

const USERS_PATH = path.join(process.cwd(), 'src/lib/users.json');

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

export function getUsers(): User[] {
    try {
        if (!fs.existsSync(USERS_PATH)) {
            fs.writeFileSync(USERS_PATH, '[]');
            return [];
        }
        const data = fs.readFileSync(USERS_PATH, 'utf8');
        return JSON.parse(data) as User[];
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

export function getUserByEmail(email: string): User | null {
    const normalized = normalizeEmail(email);
    return getUsers().find((user) => normalizeEmail(user.email) === normalized) ?? null;
}
