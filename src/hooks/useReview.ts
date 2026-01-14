"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Review type definition (matching API response)
export interface Review {
    id: number;
    review_type: 'forex' | 'crypto' | 'prop';
    name: string;
    slug: string;
    rating: number;
    reviews: number;
    description: string;
    url_site: string | null;
    logo: string | null;
    logo_bg: string | null;
    tags: string[] | null;
    stats: Array<{ icon: string; title: string; value: string }> | null;
    terms: Array<{ label: string; value: string }> | null;
    key_info: Array<{ label: string; value: string }> | null;
    content: string | null;
    pros: string[] | null;
    cons: string[] | null;
    average_rating: number;
    rating_breakdown: Array<{ stars: number; pct: string }> | null;
    advantages: string[] | null;
    disadvantages: string[] | null;
    created_at: Date | string;
    updated_at: Date | string;
}

interface UseReviewReturn {
    data: Review | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

interface UseReviewsReturn {
    data: Review[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

interface UseReviewsOptions {
    type?: 'forex' | 'crypto' | 'prop';
    limit?: number;
    offset?: number;
    immediate?: boolean;
}

/**
 * Hook to fetch a single review by slug
 * @param type - Review type ('forex' | 'crypto' | 'prop')
 * @param slug - Review slug
 */
export function useReview(
    type: 'forex' | 'crypto' | 'prop' | null,
    slug: string | null
): UseReviewReturn {
    const [data, setData] = useState<Review | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    const prevTypeRef = useRef<string | null>(type);
    const prevSlugRef = useRef<string | null>(slug);
    const hasFetchedRef = useRef<boolean>(false);
    const forceRefetchRef = useRef<number>(0);

    const fetchData = useCallback(async () => {
        if (!type || !slug) {
            setLoading(false);
            setData(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                type,
                slug,
            });

            const response = await fetch(`/api/reviews?${params.toString()}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Review with slug "${slug}" not found`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const review: Review = await response.json();
            setData(review);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch review");
            setError(error);
            setData(null);
            console.error("Review fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [type, slug]);

    useEffect(() => {
        const typeChanged = type !== prevTypeRef.current;
        const slugChanged = slug !== prevSlugRef.current;
        const forceRefetch = forceRefetchRef.current > 0;

        if (!typeChanged && !slugChanged && !forceRefetch && hasFetchedRef.current) {
            return;
        }

        prevTypeRef.current = type;
        prevSlugRef.current = slug;
        if (forceRefetch) {
            forceRefetchRef.current = 0;
        }
        hasFetchedRef.current = true;

        fetchData();
    }, [type, slug, fetchData]);

    const refetch = useCallback(async () => {
        forceRefetchRef.current += 1;
        hasFetchedRef.current = false;
        await fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch,
    };
}

/**
 * Hook to fetch multiple reviews with optional filters
 * @param options - Options for fetching reviews
 */
export function useReviews(options: UseReviewsOptions = {}): UseReviewsReturn {
    const { type, limit = 100, offset = 0, immediate = true } = options;
    const [data, setData] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const prevTypeRef = useRef<string | undefined>(type);
    const prevLimitRef = useRef<number>(limit);
    const prevOffsetRef = useRef<number>(offset);
    const hasFetchedRef = useRef<boolean>(false);
    const forceRefetchRef = useRef<number>(0);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (type) {
                params.append('type', type);
            }
            params.append('limit', limit.toString());
            params.append('offset', offset.toString());

            const response = await fetch(`/api/reviews?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reviews: Review[] = await response.json();
            setData(reviews);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch reviews");
            setError(error);
            setData([]);
            console.error("Reviews fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [type, limit, offset]);

    useEffect(() => {
        const typeChanged = type !== prevTypeRef.current;
        const limitChanged = limit !== prevLimitRef.current;
        const offsetChanged = offset !== prevOffsetRef.current;
        const forceRefetch = forceRefetchRef.current > 0;

        if (!typeChanged && !limitChanged && !offsetChanged && !forceRefetch && hasFetchedRef.current && !immediate) {
            return;
        }

        prevTypeRef.current = type;
        prevLimitRef.current = limit;
        prevOffsetRef.current = offset;
        if (forceRefetch) {
            forceRefetchRef.current = 0;
        }
        hasFetchedRef.current = true;

        if (immediate) {
            fetchData();
        }
    }, [type, limit, offset, immediate, fetchData]);

    const refetch = useCallback(async () => {
        forceRefetchRef.current += 1;
        hasFetchedRef.current = false;
        await fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch,
    };
}

/**
 * Function to update a review
 * @param type - Review type ('forex' | 'crypto' | 'prop')
 * @param slug - Review slug
 * @param data - Review data to update
 */
export async function updateReview(
    type: 'forex' | 'crypto' | 'prop',
    slug: string,
    data: Partial<Review>
): Promise<Review> {
    const params = new URLSearchParams({
        type,
        slug,
    });

    const response = await fetch(`/api/reviews?${params.toString()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }

    const updatedReview: Review = await response.json();
    return updatedReview;
}

/**
 * Function to delete a review.
 * @param type - The type of the review ('forex' | 'crypto' | 'prop').
 * @param slug - The slug of the review to delete.
 */
export async function deleteReview(
    type: 'forex' | 'crypto' | 'prop',
    slug: string
): Promise<void> {
    const params = new URLSearchParams({
        type,
        slug,
    });

    const response = await fetch(`/api/reviews?${params.toString()}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }
}
