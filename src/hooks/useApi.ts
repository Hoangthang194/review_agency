"use client";

import { useState, useEffect, useCallback } from "react";

interface UseApiOptions {
    immediate?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    mutate: (newData: T) => void;
}

export function useApi<T>(
    url: string | null,
    options: UseApiOptions = {}
): UseApiReturn<T> {
    const { immediate = true, onSuccess, onError } = options;
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            
            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error("An unknown error occurred");
            setError(error);
            
            if (onError) {
                onError(error);
            }
        } finally {
            setLoading(false);
        }
    }, [url, onSuccess, onError]);

    useEffect(() => {
        if (immediate && url) {
            fetchData();
        }
    }, [immediate, url, fetchData]);

    const mutate = useCallback((newData: T) => {
        setData(newData);
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        mutate,
    };
}

