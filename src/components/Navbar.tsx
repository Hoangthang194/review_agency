"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    const [isMarketAnalysisOpen, setIsMarketAnalysisOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const marketAnalysisTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (marketAnalysisTimeoutRef.current) {
                clearTimeout(marketAnalysisTimeoutRef.current);
            }
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsReviewsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsReviewsOpen(false);
        }, 200); // Delay 200ms trước khi đóng
    };

    const handleMarketAnalysisEnter = () => {
        if (marketAnalysisTimeoutRef.current) {
            clearTimeout(marketAnalysisTimeoutRef.current);
        }
        setIsMarketAnalysisOpen(true);
    };

    const handleMarketAnalysisLeave = () => {
        marketAnalysisTimeoutRef.current = setTimeout(() => {
            setIsMarketAnalysisOpen(false);
        }, 200); // Delay 200ms trước khi đóng
    };

    return (
        <nav className="sticky top-0 z-50 bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-2">
                        <span className="material-icons-outlined text-primary text-3xl">
                            currency_exchange
                        </span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            Trade<span className="text-primary">XY</span>
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center font-medium">
                        <Link
                            href="/"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                        >
                            Home
                        </Link>
                        <div
                            className="relative group"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition flex items-center gap-1"
                            >
                                Brokerage Reviews
                                <span
                                    className={`material-icons-outlined text-base transition-transform duration-300 ${
                                        isReviewsOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    expand_more
                                </span>
                            </button>
                            <div
                                className={`absolute top-full left-0 mt-2 w-56 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-300 ease-out ${
                                    isReviewsOpen
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 -translate-y-2 pointer-events-none"
                                }`}
                            >
                                <Link
                                    href="/forex-brokers"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Forex Brokers
                                </Link>
                                <Link
                                    href="/crypto-exchanges"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Crypto Exchanges
                                </Link>
                                <Link
                                    href="/prop-firms"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Prop Firms
                                </Link>
                            </div>
                        </div>
                        <div
                            className="relative group"
                            onMouseEnter={handleMarketAnalysisEnter}
                            onMouseLeave={handleMarketAnalysisLeave}
                        >
                            <button
                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition flex items-center gap-1"
                            >
                                Market Analysis
                                <span
                                    className={`material-icons-outlined text-base transition-transform duration-300 ${
                                        isMarketAnalysisOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    expand_more
                                </span>
                            </button>
                            <div
                                className={`absolute top-full left-0 mt-2 w-56 bg-card-light dark:bg-card-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-300 ease-out ${
                                    isMarketAnalysisOpen
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 -translate-y-2 pointer-events-none"
                                }`}
                            >
                                <Link
                                    href="/market-analysis"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    All Analysis
                                </Link>
                                <Link
                                    href="/market-analysis/forex"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Forex Analysis
                                </Link>
                                <Link
                                    href="/market-analysis/crypto"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Crypto Analysis
                                </Link>
                                <Link
                                    href="/market-analysis/stocks"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition transform hover:translate-x-1"
                                >
                                    Stock Analysis
                                </Link>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            onClick={toggleTheme}
                            aria-label="Toggle Dark Mode"
                        >
                            {mounted ? (
                                <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
                                    {theme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            ) : (
                                <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
                                    dark_mode
                                </span>
                            )}
                        </button>
                        <Link
                            href="/contact"
                            className="hidden md:flex items-center gap-1 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                        >
                            Contact Us
                            <span className="material-icons-outlined text-sm">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
