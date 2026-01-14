"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface MarketSidebarProps {
    onSearch?: (searchTerm: string) => void;
    searchTerm?: string;
}

export function MarketSidebar({ onSearch, searchTerm = "" }: MarketSidebarProps) {
    const router = useRouter();
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [email, setEmail] = useState("");

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (onSearch && localSearchTerm.trim()) {
            onSearch(localSearchTerm.trim());
        }
    };

    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                alert(`Thank you for subscribing! We'll send market insights to ${email}`);
                setEmail("");
            } else {
                alert("Please enter a valid email address");
            }
        }
    };

    return (
        <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Search
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <form className="flex" onSubmit={handleSearch}>
                    <input
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-400"
                        placeholder="Search symbols..."
                        type="text"
                        value={localSearchTerm}
                        onChange={(e) => {
                            setLocalSearchTerm(e.target.value);
                            if (onSearch) {
                                onSearch(e.target.value);
                            }
                        }}
                    />
                    <button
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-r transition-colors flex items-center justify-center"
                        type="submit"
                    >
                        <span className="material-icons text-sm">search</span>
                    </button>
                </form>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Categories
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <ul className="space-y-3">
                    {[
                        { name: "Crypto Market", href: "/market-analysis/crypto", count: 3 },
                        { name: "Forex Trading", href: "/market-analysis/forex", count: 4 },
                        { name: "Stock Market", href: "/market-analysis/stocks", count: 3 },
                        { name: "All Markets", href: "/market-analysis", count: 10 },
                    ].map((cat, index) => (
                        <li
                            key={index}
                            className={
                                index > 0
                                    ? "border-t border-gray-100 dark:border-gray-800 pt-3"
                                    : ""
                            }
                        >
                            <Link
                                className="flex justify-between items-center text-sm text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors group"
                                href={cat.href}
                            >
                                <span>{cat.name}</span>
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-primary transition-colors">
                                    ({cat.count})
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Popular Tags
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { name: "Bitcoin", href: "/market-analysis/crypto?search=BTC" },
                        { name: "Ethereum", href: "/market-analysis/crypto?search=ETH" },
                        { name: "EUR/USD", href: "/market-analysis/forex?search=EUR" },
                        { name: "Gold", href: "/market-analysis/forex?search=XAU" },
                        { name: "Apple", href: "/market-analysis/stocks?search=AAPL" },
                        { name: "Microsoft", href: "/market-analysis/stocks?search=MSFT" },
                    ].map((tag, index) => (
                        <Link
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-muted-light dark:text-muted-dark hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded transition-colors border border-gray-200 dark:border-gray-700"
                            href={tag.href}
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Subscribe
                </h3>
                <p className="text-xs text-muted-light dark:text-muted-dark mb-4">
                    Get the latest market insights delivered directly to your inbox.
                </p>
                <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                    <input
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Your Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </aside>
    );
}
