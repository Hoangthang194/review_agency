"use client";

import { useState, useEffect, useCallback } from "react";
import { TechnicalAnalysisData } from "@/components/TechnicalAnalysis";
import { technicalAnalysisData as initialAnalysisData } from "@/data/technicalAnalysis";
// import { buildApiUrl, API_CONFIG } from "./apiConfig";

interface UseTechnicalAnalysisReturn {
    data: TechnicalAnalysisData | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useTechnicalAnalysis(symbol: string | null): UseTechnicalAnalysisReturn {
    const [data, setData] = useState<TechnicalAnalysisData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(() => {
        if (!symbol) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual API call
            // const response = await fetch(buildApiUrl(API_CONFIG.endpoints.technicalAnalysis.get(symbol)));
            // const result = await response.json();
            // setData(result);
            
            // Simulate API call delay
            setTimeout(() => {
                const analysis = initialAnalysisData[symbol];
                
                if (!analysis) {
                    throw new Error(`Technical analysis for symbol "${symbol}" not found`);
                }
                
                setData(analysis);
                setLoading(false);
            }, 150);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch technical analysis");
            setError(error);
            setLoading(false);
        }
    }, [symbol]);

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

