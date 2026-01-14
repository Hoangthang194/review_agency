import { useState, useEffect, useCallback } from 'react';

export interface Contact {
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

export interface UseContactsOptions {
    status?: string;
    limit?: number;
    offset?: number;
    immediate?: boolean;
}

export interface UseContactsReturn {
    data: Contact[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage contacts
 */
export function useContacts(options: UseContactsOptions = {}): UseContactsReturn {
    const { status, limit, offset, immediate = true } = options;

    const [data, setData] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const fetchContacts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (limit) params.append('limit', limit.toString());
            if (offset) params.append('offset', offset.toString());

            const url = `/api/contacts${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || `Failed to fetch contacts: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err);
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    }, [status, limit, offset]);

    useEffect(() => {
        if (immediate) {
            fetchContacts();
        }
    }, [immediate, fetchContacts]);

    return {
        data,
        loading,
        error,
        refetch: fetchContacts,
    };
}

/**
 * Function to update contact status
 */
export async function updateContactStatus(
    contactId: number,
    status: 'new' | 'read' | 'replied' | 'archived'
): Promise<Contact> {
    try {
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to update contact status: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error updating contact status:', error);
        throw error;
    }
}

