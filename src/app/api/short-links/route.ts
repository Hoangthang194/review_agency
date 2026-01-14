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

// GET /api/short-links - Get all short links
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get('search') || '';

        let sql = `
            SELECT 
                id,
                original_url,
                short_code,
                click_count,
                is_deleted,
                created_at,
                updated_at
            FROM short_links
            WHERE is_deleted = 0
        `;
        const params: any[] = [];

        if (search) {
            sql += ` AND (original_url LIKE ? OR short_code LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        sql += ` ORDER BY created_at DESC`;

        const links = await queryRows<ShortLink>(sql, params);

        // Format dates
        const formattedLinks = links.map(link => ({
            ...link,
            created_at: new Date(link.created_at).toISOString().split('T')[0],
            updated_at: new Date(link.updated_at).toISOString().split('T')[0],
        }));

        return NextResponse.json(formattedLinks);
    } catch (error: any) {
        console.error('Error fetching short links:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch short links',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// POST /api/short-links - Create new short link
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { originalUrl } = body;

        if (!originalUrl || typeof originalUrl !== 'string') {
            return NextResponse.json(
                {
                    error: 'originalUrl is required',
                },
                { status: 400 }
            );
        }

        // Validate URL format
        let normalizedUrl = originalUrl.trim();
        
        // Add protocol if missing
        if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
            normalizedUrl = `https://${normalizedUrl}`;
        }

        // Validate URL
        try {
            new URL(normalizedUrl);
        } catch {
            return NextResponse.json(
                {
                    error: 'Invalid URL format',
                },
                { status: 400 }
            );
        }

        // Generate short code (6 characters)
        const generateShortCode = (): string => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        };

        // Ensure unique short code
        let shortCode = generateShortCode();
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const existing = await queryRows(
                'SELECT id FROM short_links WHERE short_code = ? AND is_deleted = 0',
                [shortCode]
            );

            if (existing.length === 0) {
                break;
            }

            shortCode = generateShortCode();
            attempts++;
        }

        if (attempts >= maxAttempts) {
            return NextResponse.json(
                {
                    error: 'Failed to generate unique short code',
                },
                { status: 500 }
            );
        }

        // Insert into database
        const result = await query(
            `INSERT INTO short_links (original_url, short_code, click_count, is_deleted)
             VALUES (?, ?, 0, 0)`,
            [normalizedUrl, shortCode]
        ) as any;

        const insertId = result.insertId;

        // Get base URL from request
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;

        const shortUrl = `${baseUrl}/go?link=${encodeURIComponent(normalizedUrl)}`;

        // Get created link
        const link = await queryRows<ShortLink>(
            'SELECT id, original_url, short_code, click_count, is_deleted, created_at, updated_at FROM short_links WHERE id = ?',
            [insertId]
        );

        if (!link || link.length === 0) {
            return NextResponse.json(
                {
                    error: 'Failed to create short link',
                },
                { status: 500 }
            );
        }

        const createdLink = link[0];

        // Format dates
        const formattedLink = {
            ...createdLink,
            short_url: shortUrl,
            created_at: new Date(createdLink.created_at).toISOString().split('T')[0],
            updated_at: new Date(createdLink.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedLink, { status: 201 });
    } catch (error: any) {
        console.error('Error creating short link:', error);
        return NextResponse.json(
            {
                error: 'Failed to create short link',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

