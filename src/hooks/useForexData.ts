"use client";

import { useFrankfurterForex, ForexChartDataPoint } from "./useFrankfurterForex";
import { useXauApi, XauChartDataPoint } from "./useXauApi";
import { MarketData } from "@/components/MarketAnalysisContent";
import { useMemo } from "react";

/**
 * Map forex symbols to currency codes for Frankfurter API
 * Frankfurter API format: from=X&to=Y means 1 X = ? Y
 * For EUR/USD, we want 1 EUR = ? USD, so we use from=EUR&to=USD
 * For USD/JPY, we want 1 USD = ? JPY, so we use from=USD&to=JPY
 */
const FOREX_SYMBOL_MAP: Record<string, { from: string; to: string; isXau?: boolean }> = {
    "EUR/USD": { from: "EUR", to: "USD" },
    "GBP/USD": { from: "GBP", to: "USD" },
    "USD/JPY": { from: "USD", to: "JPY" },
    "USD/CHF": { from: "USD", to: "CHF" },
    "AUD/USD": { from: "AUD", to: "USD" },
    "USD/CAD": { from: "USD", to: "CAD" },
    "XAU/USD": { from: "XAU", to: "USD", isXau: true }, // Gold
};

/**
 * Convert ForexChartDataPoint or XauChartDataPoint to ChartDataPoint format
 */
function convertForexToChartData(
    forexData: ForexChartDataPoint[] | XauChartDataPoint[],
    symbol: string
): Array<{ time: string; date?: string; [key: string]: string | number | undefined }> {
    return forexData.map((point) => ({
        time: point.time,
        date: point.date,
        [symbol]: point.price,
    }));
}

/**
 * Hook to fetch forex market data from Frankfurter API or XAU API
 */
export function useForexChartData(symbol: string | null, days: number = 30) {
    const forexPair = symbol ? FOREX_SYMBOL_MAP[symbol] : null;
    
    // Use XAU API for gold
    const { 
        data: xauData, 
        loading: xauLoading, 
        error: xauError, 
        refetch: xauRefetch,
        currentPrice: xauCurrentPrice 
    } = useXauApi(
        forexPair?.isXau ? "XAUUSD" : undefined,
        days
    );
    
    // Use Frankfurter API for regular forex pairs
    const { 
        data: forexData, 
        loading: forexLoading, 
        error: forexError, 
        refetch: forexRefetch,
        currentPrice: forexCurrentPrice 
    } = useFrankfurterForex(
        forexPair && !forexPair.isXau ? forexPair.from : null,
        forexPair && !forexPair.isXau ? forexPair.to : null,
        days
    );

    // Use XAU data if available, otherwise use forex data
    const data = forexPair?.isXau ? xauData : forexData;
    const loading = forexPair?.isXau ? xauLoading : forexLoading;
    const error = forexPair?.isXau ? xauError : forexError;
    const refetch = forexPair?.isXau ? xauRefetch : forexRefetch;
    const currentPrice = forexPair?.isXau ? xauCurrentPrice : forexCurrentPrice;

    // Convert to chart format - memoize to prevent recreating arrays
    const chartData = useMemo(() => {
        return symbol && data ? convertForexToChartData(data, symbol) : null;
    }, [symbol, data]);

    // Convert to CoinGecko format for technical analysis
    const rawDataForAnalysis = useMemo(() => {
        if (!data) return null;
        return data.map(p => ({
            time: p.time,
            price: p.price,
            timestamp: p.timestamp,
        }));
    }, [data]);

    return {
        data: chartData,
        rawData: rawDataForAnalysis || data,
        loading,
        error,
        refetch,
        currentPrice,
    };
}

