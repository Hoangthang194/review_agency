"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getCachedData, setCachedData } from "@/utils/cache";

export interface XauPriceItem {
    name: string;
    buy: number;
    sell: number;
    day_change_buy: number;
    day_change_sell: number;
    updates: number;
}

export interface XauHistoryItem {
    date: string; // YYYY-MM-DD
    prices: {
        XAUUSD: XauPriceItem;
    };
}

export interface XauApiResponse {
    success: boolean;
    days: number;
    type: string;
    history: XauHistoryItem[];
}

export interface XauChartDataPoint {
    date: string; // YYYY-MM-DD
    time: string; // Display format
    price: number;
    timestamp: number;
}

interface UseXauApiReturn {
    data: XauChartDataPoint[] | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    currentPrice: number | null;
}

/**
 * Hook to fetch XAU (Gold) price data from vang.today API
 * @param type - XAU type (default: "XAUUSD")
 * @param days - Number of days to fetch (default: 30)
 */
export function useXauApi(
    type: string = "XAUUSD",
    days: number = 30
): UseXauApiReturn {
    const [data, setData] = useState<XauChartDataPoint[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    // Use refs to prevent infinite loops
    const prevTypeRef = useRef<string>(type);
    const prevDaysRef = useRef<number>(days);
    const hasFetchedRef = useRef<boolean>(false);
    const forceRefetchRef = useRef<number>(0); // Increment to force refetch

    useEffect(() => {
        // Only fetch if type or days actually changed, or force refetch
        const typeChanged = type !== prevTypeRef.current;
        const daysChanged = days !== prevDaysRef.current;
        const forceRefetch = forceRefetchRef.current > 0;

        if (!typeChanged && !daysChanged && !forceRefetch && hasFetchedRef.current) {
            return;
        }

        // Update refs
        prevTypeRef.current = type;
        prevDaysRef.current = days;
        if (forceRefetch) {
            forceRefetchRef.current = 0; // Reset after use
        }
        hasFetchedRef.current = true;

        // Fetch data
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Check cache first
                const cacheKey = `xau_${type}_${days}`;
                const cachedData = getCachedData<XauChartDataPoint[]>(cacheKey, days);
                
                if (cachedData && cachedData.length > 0) {
                    console.log(`Using cached XAU data for ${type}`);
                    setData(cachedData);
                    setLoading(false);
                    return;
                }

                // If no cache, fetch from API
                console.log(`Fetching XAU data from API for ${type}`);
                const url = `https://www.vang.today/api/prices?type=${type}&days=${days}`;
                const response = await fetch(url);

                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error("Rate limit exceeded. Please try again later or wait a few minutes.");
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result: XauApiResponse = await response.json();

                // Convert API format to chart data format
                // API returns: { success, days, type, history: [{ date, prices: { XAUUSD: { buy, sell, ... } } }] }
                const chartData: XauChartDataPoint[] = result.history
                    .map((item) => {
                        const xauData = item.prices.XAUUSD;
                        const price = xauData.buy; // Use buy price
                        const date = new Date(item.date);
                        
                        // Format date for display
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const timeLabel = `${month}/${day}`;

                        return {
                            date: item.date,
                            time: timeLabel,
                            price: price,
                            timestamp: date.getTime(),
                        };
                    })
                    .sort((a, b) => a.timestamp - b.timestamp); // Sort by date

                // Cache the data
                setCachedData(cacheKey, days, chartData);

                setData(chartData);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Failed to fetch XAU data");
                setError(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, days]);

    // Get current price (latest rate)
    const currentPrice = useMemo(() => {
        if (!data || data.length === 0) return null;
        return data[data.length - 1].price;
    }, [data]);

    const refetch = useCallback(async () => {
        forceRefetchRef.current += 1; // Trigger re-fetch
        hasFetchedRef.current = false;
    }, []);

    return {
        data,
        loading,
        error,
        refetch,
        currentPrice,
    };
}

