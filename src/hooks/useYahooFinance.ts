"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getCachedData, setCachedData } from "@/utils/cache";

export interface YahooQuoteData {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketVolume: number;
    marketCap?: number;
    shortName?: string;
    longName?: string;
}

export interface YahooChartDataPoint {
    date: number; // timestamp
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface StockChartDataPoint {
    time: string; // Display format
    price: number;
    timestamp: number;
}

interface UseYahooQuoteReturn {
    data: YahooQuoteData | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

interface UseYahooChartReturn {
    data: StockChartDataPoint[] | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch stock quote data from Yahoo Finance
 */
export function useYahooQuote(symbol: string | null): UseYahooQuoteReturn {
    const [data, setData] = useState<YahooQuoteData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    const prevSymbolRef = useRef<string | null>(null);
    const hasFetchedRef = useRef<boolean>(false);
    const forceRefetchRef = useRef<number>(0);

    const fetchData = useCallback(async () => {
        if (!symbol) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cacheKey = `yahoo_quote_${symbol}`;
            const cachedData = getCachedData<YahooQuoteData>(cacheKey, 1); // Cache for 1 day
            
            if (cachedData) {
                console.log(`Using cached Yahoo Finance quote for ${symbol}`);
                setData(cachedData);
                setLoading(false);
                return;
            }

            // Fetch from Next.js API route (server-side)
            console.log(`Fetching Yahoo Finance quote for ${symbol}`);
            const response = await fetch(`/api/yahoo-finance/quote?symbol=${encodeURIComponent(symbol)}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const quoteData: YahooQuoteData = await response.json();

            // Cache the data
            setCachedData(cacheKey, 1, quoteData);

            setData(quoteData);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch Yahoo Finance quote");
            setError(error);
            setData(null);
            console.error("Yahoo Finance quote error:", error);
        } finally {
            setLoading(false);
        }
    }, [symbol]);

    useEffect(() => {
        const symbolChanged = symbol !== prevSymbolRef.current;
        const forceRefetch = forceRefetchRef.current > 0;

        if (!symbolChanged && !forceRefetch && hasFetchedRef.current) {
            return;
        }

        prevSymbolRef.current = symbol;
        if (forceRefetch) {
            forceRefetchRef.current = 0;
        }
        hasFetchedRef.current = true;

        fetchData();
    }, [symbol, fetchData]);

    const refetch = useCallback(async () => {
        forceRefetchRef.current += 1;
        hasFetchedRef.current = false;
    }, []);

    return {
        data,
        loading,
        error,
        refetch,
    };
}

/**
 * Hook to fetch historical stock chart data from Yahoo Finance
 */
export function useYahooChart(symbol: string | null, period: string = "1mo"): UseYahooChartReturn {
    const [data, setData] = useState<StockChartDataPoint[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    const prevSymbolRef = useRef<string | null>(null);
    const prevPeriodRef = useRef<string>(period);
    const hasFetchedRef = useRef<boolean>(false);
    const forceRefetchRef = useRef<number>(0);

    const fetchData = useCallback(async () => {
        if (!symbol) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cacheKey = `yahoo_chart_${symbol}_${period}`;
            const cachedData = getCachedData<StockChartDataPoint[]>(cacheKey, 1); // Cache for 1 day
            
            if (cachedData && cachedData.length > 0) {
                console.log(`Using cached Yahoo Finance chart for ${symbol}`);
                setData(cachedData);
                setLoading(false);
                return;
            }

            // Calculate days based on period
            let days = 30;
            if (period === "5d") days = 5;
            else if (period === "1mo") days = 30;
            else if (period === "3mo") days = 90;
            else if (period === "1y") days = 365;

            // Fetch from Next.js API route (server-side)
            console.log(`Fetching Yahoo Finance chart for ${symbol} (${period})`);
            const response = await fetch(`/api/yahoo-finance/historical?symbol=${encodeURIComponent(symbol)}&days=${days}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            // API returns already formatted chart data
            const chartData: StockChartDataPoint[] = await response.json();

            // Cache the data
            setCachedData(cacheKey, 1, chartData);

            setData(chartData);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch Yahoo Finance chart");
            setError(error);
            setData(null);
            console.error("Yahoo Finance chart error:", error);
        } finally {
            setLoading(false);
        }
    }, [symbol, period]);

    useEffect(() => {
        const symbolChanged = symbol !== prevSymbolRef.current;
        const periodChanged = period !== prevPeriodRef.current;
        const forceRefetch = forceRefetchRef.current > 0;

        if (!symbolChanged && !periodChanged && !forceRefetch && hasFetchedRef.current) {
            return;
        }

        prevSymbolRef.current = symbol;
        prevPeriodRef.current = period;
        if (forceRefetch) {
            forceRefetchRef.current = 0;
        }
        hasFetchedRef.current = true;

        fetchData();
    }, [symbol, period, fetchData]);

    const refetch = useCallback(async () => {
        forceRefetchRef.current += 1;
        hasFetchedRef.current = false;
    }, []);

    return {
        data,
        loading,
        error,
        refetch,
    };
}

