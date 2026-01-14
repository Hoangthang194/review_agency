"use client";

import { useState, useEffect, useCallback } from 'react';

export interface ShortLink {
    id: number;
    original_url: string;
    short_code: string;
    short_url?: string;
    click_count: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface UseLinksOptions {
    search?: string;
    immediate?: boolean;
}

export interface UseLinksReturn {
    data: ShortLink[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage short links
 */
export function useLinks(options: UseLinksOptions = {}): UseLinksReturn {
    const { search, immediate = true } = options;

    const [data, setData] = useState<ShortLink[]>([]);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const fetchLinks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (search) params.append('search', search);

            const url = `/api/short-links${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || `Failed to fetch links: ${response.statusText}`);
            }

            const result = await response.json();
            
            // Generate short URLs for each link
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const linksWithShortUrl = result.map((link: ShortLink) => ({
                ...link,
                short_url: `${baseUrl}/go?link=${encodeURIComponent(link.original_url)}`,
            }));

            setData(linksWithShortUrl);
        } catch (err: any) {
            setError(err);
            console.error('Error fetching links:', err);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        if (immediate) {
            fetchLinks();
        }
    }, [immediate, fetchLinks]);

    return {
        data,
        loading,
        error,
        refetch: fetchLinks,
    };
}

/**
 * Function to create a new short link
 */
export async function createShortLink(originalUrl: string): Promise<ShortLink> {
    try {
        const response = await fetch('/api/short-links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalUrl }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to create short link: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error('Error creating short link:', error);
        throw error;
    }
}

/**
 * Function to delete a short link
 */
export async function deleteShortLink(linkId: number): Promise<void> {
    try {
        const response = await fetch(`/api/short-links/${linkId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to delete short link: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting short link:', error);
        throw error;
    }
}

