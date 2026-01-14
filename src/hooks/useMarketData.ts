"use client";

import { useState, useEffect, useCallback } from "react";
import { MarketData } from "@/components/MarketAnalysisContent";
import { marketData as initialMarketData } from "@/data/marketData";
import { useCoinGeckoChart, useCoinGeckoMarket } from "./useCoinGecko";
// import { buildApiUrl, API_CONFIG } from "./apiConfig";

interface UseMarketDataReturn {
    data: MarketData[];
    loading: boolean;
    error: Error | null;
    refetch: () => void;
    filterByType: (type: "crypto" | "forex" | "stock" | "all") => MarketData[];
}

export function useMarketData(): UseMarketDataReturn {
    const [data, setData] = useState<MarketData[]>(initialMarketData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual API call for all market data
            // For now, using mock data but can integrate CoinGecko for crypto
            // const response = await fetch(buildApiUrl(API_CONFIG.endpoints.market.list));
            // const result = await response.json();
            // setData(result);
            
            // Simulate API call delay
            setTimeout(() => {
                // For now, using mock data
                setData(initialMarketData);
                setLoading(false);
            }, 200);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch market data");
            setError(error);
            setLoading(false);
        }
    }, []);

    const filterByType = useCallback((type: "crypto" | "forex" | "stock" | "all") => {
        if (type === "all") {
            return data;
        }
        return data.filter((item) => item.type === type);
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        filterByType,
    };
}

// Hook to fetch single market symbol data
export function useMarketSymbol(symbol: string | null) {
    const { data: allData, loading, error, refetch } = useMarketData();
    const [symbolData, setSymbolData] = useState<MarketData | null>(null);

    useEffect(() => {
        if (symbol && allData.length > 0) {
            const found = allData.find((item) => item.symbol === symbol);
            setSymbolData(found || null);
        } else {
            setSymbolData(null);
        }
    }, [symbol, allData]);

    return {
        data: symbolData,
        loading,
        error,
        refetch,
    };
}

/**
 * Hook to fetch chart data for a crypto coin from CoinGecko
 * Maps common symbols to CoinGecko coin IDs
 */
const COIN_ID_MAP: Record<string, string> = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "BNB": "binancecoin",
    "SOL": "solana",
    "ADA": "cardano",
    "XRP": "ripple",
    "BTC/USD": "bitcoin",
    "ETH/USD": "ethereum",
    "BNB/USD": "binancecoin",
    "SOL/USD": "solana",
    "ADA/USD": "cardano",
    "XRP/USD": "ripple",
};

function getCoinGeckoId(symbol: string): string | null {
    // Extract base symbol (e.g., "BTC/USD" -> "BTC")
    const baseSymbol = symbol.split("/")[0].toUpperCase();
    return COIN_ID_MAP[baseSymbol] || COIN_ID_MAP[symbol] || null;
}

/**
 * Hook to fetch chart data for a specific crypto symbol using CoinGecko
 */
export function useCryptoChartData(
    symbol: string | null,
    days: number = 30
) {
    const coinId = symbol ? getCoinGeckoId(symbol) : null;
    return useCoinGeckoChart(coinId, "usd", days);
}

/**
 * Hook to fetch market data for a specific crypto symbol using CoinGecko
 */
export function useCryptoMarketData(symbol: string | null) {
    const coinId = symbol ? getCoinGeckoId(symbol) : null;
    return useCoinGeckoMarket(coinId, "usd");
}

