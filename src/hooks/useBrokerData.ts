"use client";

import { useState, useEffect, useCallback } from "react";
import { BrokerData, getBrokerData } from "@/data/mockData";

interface UseBrokerDataReturn {
    data: BrokerData | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useBrokerData(
    type: "forex" | "crypto" | "prop",
    slug: string | null
): UseBrokerDataReturn {
    const [data, setData] = useState<BrokerData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(() => {
        if (!slug) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Simulate API call delay
            setTimeout(() => {
                const brokerData = getBrokerData(type, slug);
                
                if (!brokerData) {
                    throw new Error(`Broker with slug "${slug}" not found`);
                }
                
                setData(brokerData);
                setLoading(false);
            }, 100);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch broker data");
            setError(error);
            setLoading(false);
        }
    }, [type, slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
}

// Hook to fetch multiple brokers
export function useBrokersList(type: "forex" | "crypto" | "prop") {
    const [data, setData] = useState<BrokerData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call - replace with actual API endpoint
            setTimeout(() => {
                // This would be an API call like: fetch(`/api/brokers?type=${type}`)
                // For now, using mock data structure
                setData([]);
                setLoading(false);
            }, 200);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch brokers list");
            setError(error);
            setLoading(false);
        }
    }, [type]);

    return { data, loading, error };
}

