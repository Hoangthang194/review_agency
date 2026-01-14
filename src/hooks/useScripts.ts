"use client";

import { useState, useEffect, useCallback } from 'react';

export interface HeadScript {
    id: number;
    name: string;
    script_content: string;
    position: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UseScriptsOptions {
    activeOnly?: boolean;
    immediate?: boolean;
}

export interface UseScriptsReturn {
    data: HeadScript[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage head scripts
 */
export function useScripts(options: UseScriptsOptions = {}): UseScriptsReturn {
    const { activeOnly, immediate = true } = options;

    const [data, setData] = useState<HeadScript[]>([]);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const fetchScripts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (activeOnly) params.append('activeOnly', 'true');

            const url = `/api/scripts${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || `Failed to fetch scripts: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err);
            console.error('Error fetching scripts:', err);
        } finally {
            setLoading(false);
        }
    }, [activeOnly]);

    useEffect(() => {
        if (immediate) {
            fetchScripts();
        }
    }, [immediate, fetchScripts]);

    return {
        data,
        loading,
        error,
        refetch: fetchScripts,
    };
}

/**
 * Function to create a new script
 */
export async function createScript(scriptData: {
    name: string;
    scriptContent: string;
    position?: number;
    isActive?: boolean;
}): Promise<HeadScript> {
    try {
        const response = await fetch('/api/scripts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scriptData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to create script: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error creating script:', error);
        throw error;
    }
}

/**
 * Function to update a script
 */
export async function updateScript(
    scriptId: number,
    scriptData: Partial<{
        name: string;
        scriptContent: string;
        position: number;
        isActive: boolean;
    }>
): Promise<HeadScript> {
    try {
        const response = await fetch(`/api/scripts/${scriptId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scriptData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to update script: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error updating script:', error);
        throw error;
    }
}

/**
 * Function to delete a script
 */
export async function deleteScript(scriptId: number): Promise<void> {
    try {
        const response = await fetch(`/api/scripts/${scriptId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to delete script: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting script:', error);
        throw error;
    }
}

