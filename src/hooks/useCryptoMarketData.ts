"use client";

import { useCoinGeckoCoinsList, CoinGeckoCoinListItem } from "./useCoinGecko";
import { MarketData } from "@/components/MarketAnalysisContent";
import { useMemo } from "react";

/**
 * Map CoinGecko coin IDs to symbols
 */
const COIN_ID_TO_SYMBOL: Record<string, string> = {
    bitcoin: "BTC/USD",
    ethereum: "ETH/USD",
    binancecoin: "BNB/USD",
    solana: "SOL/USD",
    cardano: "ADA/USD",
    ripple: "XRP/USD",
    polkadot: "DOT/USD",
    dogecoin: "DOGE/USD",
    avalanche: "AVAX/USD",
    polygon: "MATIC/USD",
};

/**
 * Helper function to format large numbers
 */
function formatLargeNumber(num: number): string {
    if (num >= 1e12) {
        return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
        return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
}

/**
 * Convert CoinGecko data to MarketData format
 */
function convertToMarketData(coin: CoinGeckoCoinListItem): MarketData {
    const symbol = COIN_ID_TO_SYMBOL[coin.id] || `${coin.symbol}/USD`;
    
    return {
        symbol: symbol,
        name: coin.name,
        price: coin.current_price,
        change: coin.price_change_24h,
        changePercent: coin.price_change_percentage_24h,
        volume: formatLargeNumber(coin.total_volume),
        marketCap: formatLargeNumber(coin.market_cap),
        type: "crypto" as const,
    };
}

/**
 * Hook to fetch crypto market data from CoinGecko and convert to MarketData format
 * @param coinIds - Optional array of CoinGecko coin IDs (e.g., ["bitcoin", "ethereum"])
 *                  If not provided, fetches top coins by market cap
 */
export function useCryptoMarketDataFromCoinGecko(coinIds?: string[]) {
    const { data: coinsList, loading, error, refetch } = useCoinGeckoCoinsList(coinIds);

    // Convert to MarketData format
    const marketData = useMemo(() => {
        return coinsList.map(convertToMarketData);
    }, [coinsList]);

    return {
        data: marketData,
        loading,
        error,
        refetch,
    };
}

