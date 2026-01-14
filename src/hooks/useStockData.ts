"use client";

import { useYahooQuote, useYahooChart, StockChartDataPoint } from "./useYahooFinance";
import { MarketData } from "@/components/MarketAnalysisContent";
import { useMemo } from "react";

/**
 * Format large numbers for display
 */
function formatLargeNumber(num: number): string {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
}

/**
 * Hook to fetch stock market data from Yahoo Finance and convert to MarketData format
 */
export function useStockMarketDataFromYahoo(symbols: string[] = ["AAPL", "MSFT", "GOOGL"]) {
    // Fetch quotes for all symbols (this will be done sequentially or we can batch them)
    // For now, let's fetch them individually and combine
    const quotes = symbols.map(symbol => useYahooQuote(symbol));
    
    const loading = quotes.some(q => q.loading);
    const errors = quotes.filter(q => q.error).map(q => q.error);
    const error = errors.length > 0 ? errors[0] : null;

    // Convert quotes to MarketData format
    const marketData = useMemo(() => {
        const data: MarketData[] = [];
        
        quotes.forEach((quote, index) => {
            if (quote.data) {
                const q = quote.data;
                data.push({
                    symbol: q.symbol,
                    name: q.longName || q.shortName || q.symbol,
                    price: q.regularMarketPrice,
                    change: q.regularMarketChange,
                    changePercent: q.regularMarketChangePercent,
                    volume: formatLargeNumber(q.regularMarketVolume),
                    marketCap: q.marketCap ? formatLargeNumber(q.marketCap) : undefined,
                    type: "stock",
                });
            }
        });
        
        return data;
    }, [quotes]);

    return {
        data: marketData,
        loading,
        error,
    };
}

/**
 * Hook to fetch stock chart data for a specific symbol
 */
export function useStockChartData(symbol: string | null, days: number = 30) {
    // Yahoo Finance uses period strings like "1mo" (1 month), "3mo", "1y", etc.
    // For days, we'll use "1mo" for ~30 days
    const period = days <= 7 ? "5d" : days <= 30 ? "1mo" : days <= 90 ? "3mo" : "1y";
    
    const { data, loading, error, refetch } = useYahooChart(symbol, period);

    // Get current price from latest data point
    const currentPrice = useMemo(() => {
        if (!data || data.length === 0) return null;
        return data[data.length - 1].price;
    }, [data]);

    return {
        data,
        rawData: data,
        loading,
        error,
        refetch,
        currentPrice,
    };
}

