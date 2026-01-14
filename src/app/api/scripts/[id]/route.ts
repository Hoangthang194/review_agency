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

// GET /api/scripts/[id] - Get script by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const scriptId = parseInt(id);

        if (isNaN(scriptId)) {
            return NextResponse.json(
                { error: 'Invalid script ID' },
                { status: 400 }
            );
        }

        const scripts = await queryRows<HeadScript>(
            'SELECT id, name, script_content, position, is_active, created_at, updated_at FROM head_scripts WHERE id = ?',
            [scriptId]
        );

        if (!scripts || scripts.length === 0) {
            return NextResponse.json(
                { error: 'Script not found' },
                { status: 404 }
            );
        }

        const script = scripts[0];

        // Format dates and convert is_active to boolean
        const formattedScript = {
            ...script,
            is_active: script.is_active === 1,
            created_at: new Date(script.created_at).toISOString().split('T')[0],
            updated_at: new Date(script.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedScript);
    } catch (error: any) {
        console.error('Error fetching script:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch script',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/scripts/[id] - Update script
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const scriptId = parseInt(id);

        if (isNaN(scriptId)) {
            return NextResponse.json(
                { error: 'Invalid script ID' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name, scriptContent, position, isActive } = body;

        // Check if script exists
        const existingScripts = await queryRows(
            'SELECT id FROM head_scripts WHERE id = ?',
            [scriptId]
        );

        if (!existingScripts || existingScripts.length === 0) {
            return NextResponse.json(
                { error: 'Script not found' },
                { status: 404 }
            );
        }

        // Build update query dynamically
        const updates: string[] = [];
        const values: any[] = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (scriptContent !== undefined) {
            updates.push('script_content = ?');
            values.push(scriptContent);
        }
        if (position !== undefined) {
            updates.push('position = ?');
            values.push(position);
        }
        if (isActive !== undefined) {
            updates.push('is_active = ?');
            values.push(isActive ? 1 : 0);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { error: 'No fields to update' },
                { status: 400 }
            );
        }

        values.push(scriptId);

        const updateSql = `UPDATE head_scripts SET ${updates.join(', ')} WHERE id = ?`;
        await query(updateSql, values);

        // Fetch updated script
        const scripts = await queryRows<HeadScript>(
            'SELECT id, name, script_content, position, is_active, created_at, updated_at FROM head_scripts WHERE id = ?',
            [scriptId]
        );

        if (!scripts || scripts.length === 0) {
            return NextResponse.json(
                { error: 'Failed to update script' },
                { status: 500 }
            );
        }

        const updatedScript = scripts[0];

        // Format dates and convert is_active to boolean
        const formattedScript = {
            ...updatedScript,
            is_active: updatedScript.is_active === 1,
            created_at: new Date(updatedScript.created_at).toISOString().split('T')[0],
            updated_at: new Date(updatedScript.updated_at).toISOString().split('T')[0],
        };

        return NextResponse.json(formattedScript);
    } catch (error: any) {
        console.error('Error updating script:', error);
        return NextResponse.json(
            {
                error: 'Failed to update script',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// DELETE /api/scripts/[id] - Delete script
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const scriptId = parseInt(id);

        if (isNaN(scriptId)) {
            return NextResponse.json(
                { error: 'Invalid script ID' },
                { status: 400 }
            );
        }

        // Check if script exists
        const existingScripts = await queryRows(
            'SELECT id FROM head_scripts WHERE id = ?',
            [scriptId]
        );

        if (!existingScripts || existingScripts.length === 0) {
            return NextResponse.json(
                { error: 'Script not found' },
                { status: 404 }
            );
        }

        // Delete script
        await query('DELETE FROM head_scripts WHERE id = ?', [scriptId]);

        return NextResponse.json({ message: 'Script deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting script:', error);
        return NextResponse.json(
            {
                error: 'Failed to delete script',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

