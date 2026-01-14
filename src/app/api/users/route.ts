import { NextRequest, NextResponse } from 'next/server';
import { queryRows, queryRow, query } from '@/lib/db';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    last_login: string | null;
    created_at: string;
}

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const role = searchParams.get('role');

        let sql = 'SELECT id, email, name, role, status, last_login, created_at FROM users WHERE 1=1';
        const params: any[] = [];

        if (status && status !== 'all') {
            sql += ' AND status = ?';
            params.push(status);
        }

        if (role && role !== 'all') {
            sql += ' AND role = ?';
            params.push(role);
        }

        sql += ' ORDER BY created_at DESC';

        const users = await queryRows<User>(sql, params);

        // Format dates
        const formattedUsers = users.map(user => ({
            ...user,
            last_login: user.last_login ? new Date(user.last_login).toISOString().split('T')[0] : null,
            created_at: new Date(user.created_at).toISOString().split('T')[0],
        }));

        return NextResponse.json(formattedUsers);
    } catch (error: any) {
        console.error('Get users error:', error);
        return NextResponse.json(
            {
                error: 'Failed to get users',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, role = 'reviewer', status = 'active' } = body;

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Validate role
        const validRoles = ['admin', 'editor', 'writer', 'reviewer'];
        if (!validRoles.includes(role)) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ['active', 'locked', 'suspended'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await queryRow(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const { hashPassword } = await import('@/lib/auth');
        const hashedPassword = await hashPassword(password);

        // Create user
        const result = await query(
            'INSERT INTO users (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)',
            [email, hashedPassword, name, role, status]
        ) as any;

        const userId = result.insertId;

        // Get created user
        const user = await queryRow<User>(
            'SELECT id, email, name, role, status, last_login, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (!user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        // Format dates
        const formattedUser = {
            ...user,
            last_login: user.last_login ? new Date(user.last_login).toISOString().split('T')[0] : null,
            created_at: new Date(user.created_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedUser, { status: 201 });
    } catch (error: any) {
        console.error('Create user error:', error);
        return NextResponse.json(
            {
                error: 'Failed to create user',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

