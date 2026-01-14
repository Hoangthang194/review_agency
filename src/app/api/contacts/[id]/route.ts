import { NextRequest, NextResponse } from 'next/server';
import { queryRow, query } from '@/lib/db';

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

// GET /api/contacts/[id] - Get contact by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const contactId = parseInt(id);

        if (isNaN(contactId)) {
            return NextResponse.json(
                { error: 'Invalid contact ID' },
                { status: 400 }
            );
        }

        const contact = await queryRow<Contact>(
            'SELECT id, name, email, phone, subject, message, status, created_at, updated_at FROM contacts WHERE id = ?',
            [contactId]
        );

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        // Format dates
        const formattedContact = {
            ...contact,
            created_at: new Date(contact.created_at).toISOString().split('T')[0],
            updated_at: new Date(contact.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedContact);
    } catch (error: any) {
        console.error('Get contact error:', error);
        return NextResponse.json(
            {
                error: 'Failed to get contact',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/contacts/[id] - Update contact status
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const contactId = parseInt(id);

        if (isNaN(contactId)) {
            return NextResponse.json(
                { error: 'Invalid contact ID' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        // Validate status if provided
        if (status) {
            const validStatuses = ['new', 'read', 'replied', 'archived'];
            if (!validStatuses.includes(status)) {
                return NextResponse.json(
                    { error: 'Invalid status' },
                    { status: 400 }
                );
            }
        }

        // Check if contact exists
        const existingContact = await queryRow<Contact>(
            'SELECT id FROM contacts WHERE id = ?',
            [contactId]
        );

        if (!existingContact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        // Update status
        if (status) {
            await query(
                'UPDATE contacts SET status = ? WHERE id = ?',
                [status, contactId]
            );
        }

        // Get updated contact
        const contact = await queryRow<Contact>(
            'SELECT id, name, email, phone, subject, message, status, created_at, updated_at FROM contacts WHERE id = ?',
            [contactId]
        );

        if (!contact) {
            return NextResponse.json(
                { error: 'Failed to update contact' },
                { status: 500 }
            );
        }

        // Format dates
        const formattedContact = {
            ...contact,
            created_at: new Date(contact.created_at).toISOString().split('T')[0],
            updated_at: new Date(contact.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedContact);
    } catch (error: any) {
        console.error('Update contact error:', error);
        return NextResponse.json(
            {
                error: 'Failed to update contact',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

