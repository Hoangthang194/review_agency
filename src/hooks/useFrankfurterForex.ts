"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getCachedData, setCachedData } from "@/utils/cache";

export interface FrankfurterRate {
    [date: string]: {
        [currency: string]: number;
    };
}

export interface FrankfurterForexData {
    amount: number;
    base: string;
    start_date: string;
    end_date: string;
    rates: FrankfurterRate;
}

export interface ForexChartDataPoint {
    date: string; // YYYY-MM-DD
    time: string; // Display format
    price: number;
    timestamp: number;
}

interface UseFrankfurterForexReturn {
    data: ForexChartDataPoint[] | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    currentPrice: number | null;
}

/**
 * Hook to fetch forex exchange rate data from Frankfurter API
 * @param from - Base currency (e.g., "USD")
 * @param to - Target currency (e.g., "EUR")
 * @param days - Number of days to fetch (default: 30)
 */
export function useFrankfurterForex(
    from: string | null,
    to: string | null,
    days: number = 30
): UseFrankfurterForexReturn {
    const [data, setData] = useState<ForexChartDataPoint[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!from || !to) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cacheKey = `forex_${from}_${to}_${days}`;
            const cachedData = getCachedData<ForexChartDataPoint[]>(cacheKey, days);
            
            if (cachedData && cachedData.length > 0) {
                console.log(`Using cached forex data for ${from}/${to}`);
                setData(cachedData);
                setLoading(false);
                return;
            }

            // Calculate date range
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);

            const startDateStr = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
            const endDateStr = endDate.toISOString().split('T')[0]; // YYYY-MM-DD

            // If no cache, fetch from API
            console.log(`Fetching forex data from API for ${from}/${to}`);
            const url = `https://api.frankfurter.app/${startDateStr}..${endDateStr}?from=${from}&to=${to}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Rate limit exceeded. Please try again later or wait a few minutes.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: FrankfurterForexData = await response.json();

            // Convert Frankfurter format to chart data format
            const chartData: ForexChartDataPoint[] = Object.entries(result.rates)
                .map(([dateStr, rates]) => {
                    const date = new Date(dateStr);
                    const price = rates[to];
                    
                    // Format date for display
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const timeLabel = `${month}/${day}`;

                    return {
                        date: dateStr,
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
            const error = err instanceof Error ? err : new Error("Failed to fetch forex data");
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [from, to, days]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Get current price (latest rate)
    const currentPrice = useMemo(() => {
        if (!data || data.length === 0) return null;
        return data[data.length - 1].price;
    }, [data]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        currentPrice,
    };
}

