import { NextRequest, NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';

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

// POST /api/contact - Create a new contact submission
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    error: 'Name, email, subject, and message are required',
                },
                {
                    status: 400,
                }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    error: 'Invalid email format',
                },
                {
                    status: 400,
                }
            );
        }

        // Insert contact submission
        const result = await query(
            'INSERT INTO contacts (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone || null, subject, message, 'new']
        ) as any;

        const contactId = result.insertId;

        // Get created contact
        const contact = await queryRow<Contact>(
            'SELECT id, name, email, phone, subject, message, status, created_at, updated_at FROM contacts WHERE id = ?',
            [contactId]
        );

        if (!contact) {
            return NextResponse.json(
                {
                    error: 'Failed to create contact submission',
                },
                {
                    status: 500,
                }
            );
        }

        // Format dates
        const formattedContact = {
            ...contact,
            created_at: new Date(contact.created_at).toISOString(),
            updated_at: new Date(contact.updated_at).toISOString(),
        };

        return NextResponse.json(
            {
                message: 'Contact submission received successfully',
                contact: formattedContact,
            },
            {
                status: 201,
            }
        );
    } catch (error: any) {
        console.error('Error creating contact submission:', error);
        return NextResponse.json(
            {
                error: 'Failed to create contact submission',
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

