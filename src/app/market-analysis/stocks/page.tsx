"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketAnalysisContent } from "@/components/MarketAnalysisContent";
import { marketData } from "@/data/marketData";

export default function StockAnalysis() {
    const stockData = marketData.filter(item => item.type === "stock");

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
                    marketData={stockData}
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

