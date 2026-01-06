"use client";

import { AnimateIn } from "./AnimateIn";
import { useState } from "react";
import Link from "next/link";

type ReviewType = "forex" | "crypto" | "prop";

interface ReviewItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    rating: number;
    reviews: string;
    logoBg: string;
    logoText: string;
    logoTextSize?: string;
    path: string;
}

const reviewData: Record<ReviewType, ReviewItem[]> = {
    forex: [
        {
            id: 1,
            name: "Binance",
            slug: "binance",
            description: "25K+ Reviews Binance There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-black",
            logoText: "Binance",
            logoTextSize: "text-xs",
            path: "/forex-brokers/binance",
        },
        {
            id: 2,
            name: "bitstamp",
            slug: "bitstamp",
            description: "25K+ Reviews bitstamp There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
            rating: 4.5,
            reviews: "40k+",
            logoBg: "bg-green-900",
            logoText: "bitstamp",
            logoTextSize: "text-xs",
            path: "/forex-brokers/bitstamp",
        },
        {
            id: 3,
            name: "RoboForex",
            slug: "roboforex",
            description: "RoboForex is known for its innovation tools, multiple account types, and attractive bonuses for traders of all levels.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-blue-900",
            logoText: "R",
            logoTextSize: "text-3xl",
            path: "/forex-brokers/roboforex",
        },
    ],
    crypto: [
        {
            id: 1,
            name: "Binance",
            slug: "binance",
            description: "25K+ Reviews Binance There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-black",
            logoText: "Binance",
            logoTextSize: "text-xs",
            path: "/crypto-exchanges/binance",
        },
        {
            id: 2,
            name: "Bitstamp",
            slug: "bitstamp",
            description: "25K+ Reviews bitstamp There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
            rating: 4.5,
            reviews: "40k+",
            logoBg: "bg-green-900",
            logoText: "bitstamp",
            logoTextSize: "text-xs",
            path: "/crypto-exchanges/bitstamp",
        },
        {
            id: 3,
            name: "Coinbase",
            slug: "coinbase",
            description: "Coinbase is known for its user-friendly interface, secure platform, and wide range of supported cryptocurrencies.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-[#0052FF]",
            logoText: "Coinbase",
            logoTextSize: "text-xs",
            path: "/crypto-exchanges/coinbase",
        },
    ],
    prop: [
        {
            id: 1,
            name: "FTMO",
            slug: "ftmo",
            description: "FTMO is one of the most popular prop trading firms, offering traders the opportunity to trade with up to $200,000 in capital.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-blue-900",
            logoText: "FTMO",
            logoTextSize: "text-xs",
            path: "/prop-firms/ftmo",
        },
        {
            id: 2,
            name: "The5ers",
            slug: "the5ers",
            description: "The5ers offers a unique funding program with progressive scaling, allowing traders to grow their accounts systematically.",
            rating: 4.5,
            reviews: "40k+",
            logoBg: "bg-purple-900",
            logoText: "5",
            logoTextSize: "text-2xl",
            path: "/prop-firms/the5ers",
        },
        {
            id: 3,
            name: "TopStep",
            slug: "topstep",
            description: "TopStep is a leading prop trading firm specializing in futures trading with comprehensive educational resources.",
            rating: 5,
            reviews: "44k+",
            logoBg: "bg-indigo-900",
            logoText: "TS",
            logoTextSize: "text-xs",
            path: "/prop-firms/topstep",
        },
    ],
};

const tabConfig: Record<ReviewType, { label: string; path: string }> = {
    forex: { label: "Forex Brokers", path: "/forex-brokers" },
    crypto: { label: "Crypto Exchanges", path: "/crypto-exchanges" },
    prop: { label: "Prop Firms", path: "/prop-firms" },
};

export function BrokerReviews() {
    const [activeTab, setActiveTab] = useState<ReviewType>("forex");
    const currentReviews = reviewData[activeTab];
    const currentTabConfig = tabConfig[activeTab];

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={i} className="material-icons-outlined text-sm">star</span>
                ))}
                {hasHalfStar && (
                    <span className="material-icons-outlined text-sm">star_half</span>
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <span key={`empty-${i}`} className="material-icons-outlined text-sm text-gray-300 dark:text-gray-600">star</span>
                ))}
            </>
        );
    };

    return (
        <section className="py-20 bg-background-light dark:bg-background-dark relative transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn animation="fade-up">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="material-icons-outlined text-secondary">
                                reviews
                            </span>
                            <span className="font-bold text-primary text-sm uppercase">
                                Brokerage Reviews
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Compare Brokers, Trade Safely,
                            <br /> Securely
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
                            Finding the right broker is crucial for a secure and profitable
                            trading experience. We've done the hard work for you by reviewing.
                        </p>
                    </div>
                </AnimateIn>

                {/* Tabs */}
                <AnimateIn animation="fade-up" delay={50}>
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
                            {(["forex", "crypto", "prop"] as ReviewType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                                        activeTab === tab
                                            ? "bg-primary text-white shadow-md"
                                            : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                                    }`}
                                >
                                    {tabConfig[tab].label}
                                </button>
                            ))}
                        </div>
                    </div>
                </AnimateIn>

                <div className="space-y-4">
                    {currentReviews.map((review, index) => (
                        <AnimateIn key={review.id} animation="fade-up" delay={100 * (index + 1)}>
                            <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-card hover-lift border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-card-hover transition-smooth">
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="relative">
                                        <span className="absolute -top-3 -left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                            {String(review.id).padStart(2, "0")}
                                        </span>
                                        <div className={`w-16 h-16 rounded-full ${review.logoBg} flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600`}>
                                            <span className={`text-yellow-400 font-bold ${review.logoTextSize || "text-xs"}`}>
                                                {review.logoText}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                            {review.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-2">
                                            {review.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                                    <div className="text-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div className="flex justify-center text-orange-400 text-sm mb-1">
                                            {renderStars(review.rating)}
                                        </div>
                                        <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                            {review.reviews}{" "}
                                            <span className="font-normal text-gray-400">
                                                Customer Reviews
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={review.path}
                                        className="text-primary text-sm font-semibold flex items-center hover:underline whitespace-nowrap group"
                                    >
                                        Read More{" "}
                                        <span className="material-icons-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
                <AnimateIn animation="fade-in" delay={400}>
                    <div className="mt-12 text-center">
                        <Link
                            href={currentTabConfig.path}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            See All Reviews
                            <span className="material-icons-outlined text-sm">north_east</span>
                        </Link>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
