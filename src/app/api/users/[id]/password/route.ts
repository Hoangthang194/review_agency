import { NextRequest, NextResponse } from 'next/server';
import { queryRow, query } from '@/lib/db';

// PUT /api/users/[id]/password - Change user password
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
        const { password } = body;

        // Validate input
        if (!password) {
            return NextResponse.json(
                { error: 'Password is required' },
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

        // Check if user exists
        const existingUser = await queryRow(
            'SELECT id FROM users WHERE id = ?',
            [userId]
        );

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Hash password
        const { hashPassword } = await import('@/lib/auth');
        const hashedPassword = await hashPassword(password);

        // Update password
        await query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        );

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error: any) {
        console.error('Change password error:', error);
        return NextResponse.json(
            {
                error: 'Failed to change password',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

