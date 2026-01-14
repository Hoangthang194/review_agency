"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCachedData, setCachedData } from "@/utils/cache";

export interface CoinGeckoChartData {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface ChartDataPoint {
    time: string;
    price: number;
    timestamp: number;
}

interface UseCoinGeckoChartReturn {
    data: ChartDataPoint[] | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch market chart data from CoinGecko API
 * @param coinId - CoinGecko coin ID (e.g., "ethereum", "bitcoin")
 * @param vsCurrency - Currency to compare against (default: "usd")
 * @param days - Number of days of historical data (default: 30)
 */
export function useCoinGeckoChart(
    coinId: string | null,
    vsCurrency: string = "usd",
    days: number = 30
): UseCoinGeckoChartReturn {
    const [data, setData] = useState<ChartDataPoint[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!coinId) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cacheKey = `${coinId}_${vsCurrency}_${days}`;
            const cachedData = getCachedData<ChartDataPoint[]>(cacheKey, days);
            
            if (cachedData && cachedData.length > 0) {
                console.log(`Using cached data for ${coinId}`);
                setData(cachedData);
                setLoading(false);
                return;
            }

            // If no cache, fetch from API
            console.log(`Fetching from API for ${coinId}`);
            const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Rate limit exceeded. Please try again later or wait a few minutes.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: CoinGeckoChartData = await response.json();

            // Convert CoinGecko format to chart data format
            // Format by hour when days=1, otherwise by day
            const chartData: ChartDataPoint[] = result.prices.map(([timestamp, price]) => {
                const date = new Date(timestamp);
                
                let timeLabel: string;
                if (days === 1) {
                    // Format as HH:MM AM/PM for hourly charts (24h data)
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const period = hours >= 12 ? 'PM' : 'AM';
                    const displayHours = hours % 12 || 12; // Convert to 12-hour format
                    timeLabel = `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
                } else if (days <= 7) {
                    // Format as MM/DD for weekly charts
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    timeLabel = `${month}/${day}`;
                } else {
                    // Format as MM/DD for monthly charts
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    timeLabel = `${month}/${day}`;
                }

                return {
                    time: timeLabel,
                    price: price,
                    timestamp: timestamp,
                };
            });

            // Cache the data
            setCachedData(cacheKey, days, chartData);

            setData(chartData);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch CoinGecko data");
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [coinId, vsCurrency, days]);

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

/**
 * Hook to fetch current price and market data from CoinGecko
 */
export interface CoinGeckoMarketData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}

interface UseCoinGeckoMarketReturn {
    data: CoinGeckoMarketData | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useCoinGeckoMarket(
    coinId: string | null,
    vsCurrency: string = "usd"
): UseCoinGeckoMarketReturn {
    const [data, setData] = useState<CoinGeckoMarketData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!coinId) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cacheKey = `market_${coinId}_${vsCurrency}`;
            const cachedData = getCachedData<CoinGeckoMarketData>(cacheKey, 1);
            
            if (cachedData) {
                console.log(`Using cached market data for ${coinId}`);
                setData(cachedData);
                setLoading(false);
                return;
            }

            // If no cache, fetch from API
            console.log(`Fetching market data from API for ${coinId}`);
            const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Rate limit exceeded. Please try again later or wait a few minutes.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const marketData: CoinGeckoMarketData = {
                id: result.id,
                symbol: result.symbol.toUpperCase(),
                name: result.name,
                current_price: result.market_data.current_price[vsCurrency],
                price_change_24h: result.market_data.price_change_24h_in_currency[vsCurrency],
                price_change_percentage_24h: result.market_data.price_change_percentage_24h_in_currency[vsCurrency],
                market_cap: result.market_data.market_cap[vsCurrency],
                total_volume: result.market_data.total_volume[vsCurrency],
                high_24h: result.market_data.high_24h[vsCurrency],
                low_24h: result.market_data.low_24h[vsCurrency],
            };

            // Cache the data
            setCachedData(cacheKey, 1, marketData);

            setData(marketData);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to fetch CoinGecko market data");
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [coinId, vsCurrency]);

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

/**
 * Hook to fetch list of crypto coins from CoinGecko
 */
export interface CoinGeckoCoinListItem {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    image: string;
}

interface UseCoinGeckoCoinsListReturn {
    data: CoinGeckoCoinListItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch list of cryptocurrency coins from CoinGecko
 * @param coinIds - Array of CoinGecko coin IDs (e.g., ["bitcoin", "ethereum", "binancecoin"])
 * @param vsCurrency - Currency to compare against (default: "usd")
 * @param perPage - Number of results per page (default: 250, max: 250)
 */
export function useCoinGeckoCoinsList(
    coinIds?: string[],
    vsCurrency: string = "usd",
    perPage: number = 250
): UseCoinGeckoCoinsListReturn {
    const [data, setData] = useState<CoinGeckoCoinListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    
    // Convert coinIds array to string for comparison to avoid infinite loops
    const coinIdsString = coinIds ? [...coinIds].sort().join(",") : "";
    const prevCoinIdsStringRef = useRef<string>("");
    const prevVsCurrencyRef = useRef<string>(vsCurrency);
    const prevPerPageRef = useRef<number>(perPage);
    const hasFetchedRef = useRef<boolean>(false);

    useEffect(() => {
        // Only fetch if coinIds, vsCurrency, or perPage actually changed
        const coinIdsChanged = coinIdsString !== prevCoinIdsStringRef.current;
        const vsCurrencyChanged = vsCurrency !== prevVsCurrencyRef.current;
        const perPageChanged = perPage !== prevPerPageRef.current;

        if (!coinIdsChanged && !vsCurrencyChanged && !perPageChanged && hasFetchedRef.current) {
            return;
        }

        // Update refs
        prevCoinIdsStringRef.current = coinIdsString;
        prevVsCurrencyRef.current = vsCurrency;
        prevPerPageRef.current = perPage;
        hasFetchedRef.current = true;

        // Fetch data
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let url: string;
                
                if (coinIdsString && coinIdsString.length > 0) {
                    // Fetch specific coins
                    url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${coinIdsString}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
                } else {
                    // Fetch top coins by market cap
                    url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result: any[] = await response.json();

                const coinsList: CoinGeckoCoinListItem[] = result.map((coin) => ({
                    id: coin.id,
                    symbol: coin.symbol.toUpperCase(),
                    name: coin.name,
                    current_price: coin.current_price || 0,
                    price_change_24h: coin.price_change_24h || 0,
                    price_change_percentage_24h: coin.price_change_percentage_24h || 0,
                    market_cap: coin.market_cap || 0,
                    total_volume: coin.total_volume || 0,
                    high_24h: coin.high_24h || 0,
                    low_24h: coin.low_24h || 0,
                    image: coin.image || "",
                }));

                setData(coinsList);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Failed to fetch CoinGecko coins list");
                setError(error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinIdsString, vsCurrency, perPage]);

    const refetch = useCallback(async () => {
        hasFetchedRef.current = false;
        prevCoinIdsStringRef.current = "";
        prevVsCurrencyRef.current = "";
        prevPerPageRef.current = 0;
        // Trigger re-fetch by forcing re-render with a state change
        setLoading(true);
        // Small delay to ensure state updates before re-fetch
        setTimeout(() => {
            hasFetchedRef.current = false;
            // Trigger useEffect by updating a dependency
            setLoading(false);
        }, 50);
    }, []);

    return {
        data,
        loading,
        error,
        refetch,
    };
}
