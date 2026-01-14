import { NextRequest, NextResponse } from 'next/server';
import { queryRows } from '@/lib/db';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    created_at: string;
    updated_at: string;
}

// GET /api/contacts - Get all contacts with optional filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = parseInt(searchParams.get('offset') || '0');

        let sql = 'SELECT id, name, email, phone, subject, message, status, created_at, updated_at FROM contacts WHERE 1=1';
        const params: any[] = [];

        if (status && status !== 'all') {
            sql += ' AND status = ?';
            params.push(status);
        }

        sql += ' ORDER BY created_at DESC';

        // Add limit and offset
        sql += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const contacts = await queryRows<Contact>(sql, params);

        // Format dates
        const formattedContacts = contacts.map(contact => ({
            ...contact,
            created_at: new Date(contact.created_at).toISOString().split('T')[0],
            updated_at: new Date(contact.updated_at).toISOString().split('T')[0],
        }));

        return NextResponse.json(formattedContacts);
    } catch (error: any) {
        console.error('Get contacts error:', error);
        return NextResponse.json(
            {
                error: 'Failed to get contacts',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

