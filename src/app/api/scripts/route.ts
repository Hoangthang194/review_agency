import { NextRequest, NextResponse } from 'next/server';
import { queryRows, query } from '@/lib/db';

interface HeadScript {
    id: number;
    name: string;
    script_content: string;
    position: number;
    is_active: number;
    created_at: string;
    updated_at: string;
}

// GET /api/scripts - Get all scripts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const activeOnly = searchParams.get('activeOnly') === 'true';

        let sql = 'SELECT id, name, script_content, position, is_active, created_at, updated_at FROM head_scripts';
        const params: any[] = [];

        if (activeOnly) {
            sql += ' WHERE is_active = 1';
        }

        sql += ' ORDER BY position ASC, created_at ASC';

        const scripts = await queryRows<HeadScript>(sql, params);

        // Format dates and convert is_active to boolean
        const formattedScripts = scripts.map(script => ({
            ...script,
            is_active: script.is_active === 1,
            created_at: new Date(script.created_at).toISOString().split('T')[0],
            updated_at: new Date(script.updated_at).toISOString().split('T')[0],
        }));

        return NextResponse.json(formattedScripts);
    } catch (error: any) {
        console.error('Error fetching scripts:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch scripts',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// POST /api/scripts - Create new script
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, scriptContent, position = 0, isActive = true } = body;

        // Validation
        if (!name || !scriptContent) {
            return NextResponse.json(
                {
                    error: 'Missing required fields: name and scriptContent are required',
                },
                { status: 400 }
            );
        }

        // Insert new script
        const insertSql = `
            INSERT INTO head_scripts (name, script_content, position, is_active)
            VALUES (?, ?, ?, ?)
        `;

        const result = await query(insertSql, [
            name,
            scriptContent,
            position,
            isActive ? 1 : 0,
        ]) as any;

        const insertId = result.insertId;

        // Fetch the created script
        const scripts = await queryRows<HeadScript>(
            'SELECT id, name, script_content, position, is_active, created_at, updated_at FROM head_scripts WHERE id = ?',
            [insertId]
        );

        if (!scripts || scripts.length === 0) {
            return NextResponse.json(
                {
                    error: 'Failed to create script',
                },
                { status: 500 }
            );
        }

        const createdScript = scripts[0];

        // Format dates and convert is_active to boolean
        const formattedScript = {
            ...createdScript,
            is_active: createdScript.is_active === 1,
            created_at: new Date(createdScript.created_at).toISOString().split('T')[0],
            updated_at: new Date(createdScript.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedScript, { status: 201 });
    } catch (error: any) {
        console.error('Error creating script:', error);
        return NextResponse.json(
            {
                error: 'Failed to create script',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

