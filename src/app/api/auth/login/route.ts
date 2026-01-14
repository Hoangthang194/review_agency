import { NextRequest, NextResponse } from 'next/server';
import { queryRow, query } from '@/lib/db';
import { comparePassword } from '@/lib/auth';
import { generateToken } from '@/lib/jwt';

interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await queryRow<User>(
            'SELECT id, email, password, name, role, status FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check user status
        if (user.status !== 'active') {
            return NextResponse.json(
                { error: 'Account is locked or suspended' },
                { status: 403 }
            );
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Update last login
        await query(
            'UPDATE users SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Return user data (without password) and token
        return NextResponse.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            {
                error: 'Failed to login',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

