"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketAnalysisContent } from "@/components/MarketAnalysisContent";
import { useCryptoMarketDataFromCoinGecko } from "@/hooks/useCryptoMarketData";
import { marketData } from "@/data/marketData";
import { useMemo } from "react";

export default function CryptoAnalysis() {
    // Memoize coinIds to prevent infinite loops
    const coinIds = useMemo(() => [
        "bitcoin",
        "ethereum",
        "binancecoin",
        "solana",
        "cardano",
        "ripple",
    ], []);

    // Fetch crypto data from CoinGecko API
    // You can specify coin IDs: ["bitcoin", "ethereum", "binancecoin"]
    // Or leave undefined to fetch top coins by market cap
    const { data: cryptoData, loading, error } = useCryptoMarketDataFromCoinGecko(coinIds);

    // Fallback to mock data if API fails
    const displayData = error || cryptoData.length === 0 
        ? marketData.filter(item => item.type === "crypto")
        : cryptoData;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading crypto data...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title="Crypto Analysis"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Crypto Analysis" },
                    ]}
                    backgroundImage="/market.jpg"
                />
                <MarketAnalysisContent
                    marketData={displayData}
                    title="Cryptocurrency"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Crypto Analysis" },
                    ]}
                    type="crypto"
                    headerIcon="currency_bitcoin"
                    headerColor="from-yellow-500 to-yellow-600"
                    showMarketCap={true}
                />
            </main>
            <Footer />
        </div>
    );
}

