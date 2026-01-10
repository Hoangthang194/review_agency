"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketAnalysisContent } from "@/components/MarketAnalysisContent";
import { marketData } from "@/data/marketData";

export default function ForexAnalysis() {
    const forexData = marketData.filter(item => item.type === "forex");

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title="Forex Analysis"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Forex Analysis" },
                    ]}
                    backgroundImage="/market.jpg"
                />
                <MarketAnalysisContent
                    marketData={forexData}
                    title="Forex Pairs"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: "Forex Analysis" },
                    ]}
                    type="forex"
                    headerIcon="trending_up"
                    headerColor="from-blue-500 to-blue-600"
                    showMarketCap={false}
                />
            </main>
            <Footer />
        </div>
    );
}

