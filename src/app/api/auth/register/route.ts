import { NextRequest, NextResponse } from 'next/server';
import { queryRow, query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { generateToken } from '@/lib/jwt';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, role = 'reviewer' } = body;

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

        // Check if user already exists
        const existingUser = await queryRow<User>(
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
        const hashedPassword = await hashPassword(password);

        // Create user
        const result = await query(
            'INSERT INTO users (email, password, name, role, status) VALUES (?, ?, ?, ?, ?)',
            [email, hashedPassword, name, role, 'active']
        ) as any;

        const userId = result.insertId;

        // Get created user
        const user = await queryRow<User>(
            'SELECT id, email, name, role, status FROM users WHERE id = ?',
            [userId]
        );

        // Generate JWT token
        const token = generateToken({
            userId: user!.id,
            email: user!.email,
            role: user!.role,
        });

        // Return user data and token
        return NextResponse.json({
            token,
            user: {
                id: user!.id,
                email: user!.email,
                name: user!.name,
                role: user!.role,
                status: user!.status,
            },
        }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {
                error: 'Failed to register',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

