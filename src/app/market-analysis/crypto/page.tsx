"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketAnalysisContent } from "@/components/MarketAnalysisContent";
import { marketData } from "@/data/marketData";

export default function CryptoAnalysis() {
    const cryptoData = marketData.filter(item => item.type === "crypto");

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
                    marketData={cryptoData}
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

