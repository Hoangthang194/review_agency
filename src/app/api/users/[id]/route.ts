import { NextRequest, NextResponse } from 'next/server';
import { queryRow, query } from '@/lib/db';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    last_login: string | null;
    created_at: string;
}

// GET /api/users/[id] - Get user by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            );
        }

        const user = await queryRow<User>(
            'SELECT id, email, name, role, status, last_login, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Format dates
        const formattedUser = {
            ...user,
            last_login: user.last_login ? new Date(user.last_login).toISOString().split('T')[0] : null,
            created_at: new Date(user.created_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedUser);
    } catch (error: any) {
        console.error('Get user error:', error);
        return NextResponse.json(
            {
                error: 'Failed to get user',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/users/[id] - Update user
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { email, name, role, status } = body;

        // Check if user exists
        const existingUser = await queryRow<User>(
            'SELECT id, email FROM users WHERE id = ?',
            [userId]
        );

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Validate role if provided
        if (role) {
            const validRoles = ['admin', 'editor', 'writer', 'reviewer'];
            if (!validRoles.includes(role)) {
                return NextResponse.json(
                    { error: 'Invalid role' },
                    { status: 400 }
                );
            }
        }

        // Validate status if provided
        if (status) {
            const validStatuses = ['active', 'locked', 'suspended'];
            if (!validStatuses.includes(status)) {
                return NextResponse.json(
                    { error: 'Invalid status' },
                    { status: 400 }
                );
            }
        }

        // Check email uniqueness if email is being changed
        if (email && email !== existingUser.email) {
            const emailExists = await queryRow(
                'SELECT id FROM users WHERE email = ? AND id != ?',
                [email, userId]
            );

            if (emailExists) {
                return NextResponse.json(
                    { error: 'Email already exists' },
                    { status: 409 }
                );
            }
        }

        // Build update query dynamically
        const updates: string[] = [];
        const queryParams: any[] = [];

        if (email !== undefined) {
            updates.push('email = ?');
            queryParams.push(email);
        }

        if (name !== undefined) {
            updates.push('name = ?');
            queryParams.push(name);
        }

        if (role !== undefined) {
            updates.push('role = ?');
            queryParams.push(role);
        }

        if (status !== undefined) {
            updates.push('status = ?');
            queryParams.push(status);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { error: 'No fields to update' },
                { status: 400 }
            );
        }

        queryParams.push(userId);

        await query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            queryParams
        );

        // Get updated user
        const user = await queryRow<User>(
            'SELECT id, email, name, role, status, last_login, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (!user) {
            return NextResponse.json(
                { error: 'Failed to update user' },
                { status: 500 }
            );
        }

        // Format dates
        const formattedUser = {
            ...user,
            last_login: user.last_login ? new Date(user.last_login).toISOString().split('T')[0] : null,
            created_at: new Date(user.created_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedUser);
    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            {
                error: 'Failed to update user',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

