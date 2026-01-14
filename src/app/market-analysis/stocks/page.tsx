"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketAnalysisContent } from "@/components/MarketAnalysisContent";
import { useStockMarketDataFromYahoo } from "@/hooks/useStockData";
import { marketData } from "@/data/marketData";
import { useMemo } from "react";

export default function StockAnalysis() {
    // Memoize stock symbols to prevent infinite loops
    const stockSymbols = useMemo(() => [
        "AAPL",
        "MSFT",
        "GOOGL",
    ], []);

    // Fetch stock data from Yahoo Finance API
    const { data: stockData, loading, error } = useStockMarketDataFromYahoo(stockSymbols);

    // Fallback to mock data if API fails
    const displayData = error || stockData.length === 0 
        ? marketData.filter(item => item.type === "stock")
        : stockData;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading stock data...</p>
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
                    title="Stock Analysis"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Stock Analysis" },
                    ]}
                    backgroundImage="/market.jpg"
                />
                <MarketAnalysisContent
                    marketData={displayData}
                    title="Stock Market"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Stock Analysis" },
                    ]}
                    type="stock"
                    headerIcon="bar_chart"
                    headerColor="from-green-500 to-green-600"
                    showMarketCap={true}
                />
            </main>
            <Footer />
        </div>
    );
}

