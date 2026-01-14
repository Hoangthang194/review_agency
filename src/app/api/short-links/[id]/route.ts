import { NextRequest, NextResponse } from 'next/server';
import { queryRows, query } from '@/lib/db';

interface ShortLink {
    id: number;
    original_url: string;
    short_code: string;
    click_count: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

// GET /api/short-links/[id] - Get short link by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const linkId = parseInt(id);

        if (isNaN(linkId)) {
            return NextResponse.json(
                { error: 'Invalid link ID' },
                { status: 400 }
            );
        }

        const links = await queryRows<ShortLink>(
            `SELECT 
                id,
                original_url,
                short_code,
                click_count,
                is_deleted,
                created_at,
                updated_at
            FROM short_links
            WHERE id = ? AND is_deleted = 0`,
            [linkId]
        );

        if (links.length === 0) {
            return NextResponse.json(
                { error: 'Short link not found' },
                { status: 404 }
            );
        }

        const link = links[0];

        // Get base URL from request
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;

        const shortUrl = `${baseUrl}/go?link=${encodeURIComponent(link.original_url)}`;

        // Format dates
        const formattedLink = {
            ...link,
            short_url: shortUrl,
            created_at: new Date(link.created_at).toISOString().split('T')[0],
            updated_at: new Date(link.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedLink);
    } catch (error: any) {
        console.error('Error fetching short link:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch short link',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// DELETE /api/short-links/[id] - Delete short link (soft delete)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const linkId = parseInt(id);

        if (isNaN(linkId)) {
            return NextResponse.json(
                { error: 'Invalid link ID' },
                { status: 400 }
            );
        }

        // Soft delete
        await query(
            'UPDATE short_links SET is_deleted = 1 WHERE id = ?',
            [linkId]
        );

        return NextResponse.json({ message: 'Short link deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting short link:', error);
        return NextResponse.json(
            {
                error: 'Failed to delete short link',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

