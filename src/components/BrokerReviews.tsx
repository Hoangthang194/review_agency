"use client";

import { AnimateIn } from "./AnimateIn";

export function BrokerReviews() {
    return (
        <section className="py-20 bg-background-light dark:bg-background-dark relative transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateIn animation="fade-up">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="material-icons-outlined text-secondary">
                                reviews
                            </span>
                            <span className="font-bold text-primary text-sm uppercase">
                                Forex Broker Reviews
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Compare Brokers, Trade Safely,
                            <br /> Securely
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
                            Finding the right forex broker is crucial for a secure and profitable
                            trading experience. We've done the hard work for you by reviewing.
                        </p>
                    </div>
                </AnimateIn>
                <div className="space-y-4">
                    {/* Review 1 */}
                    <AnimateIn animation="fade-up" delay={100}>
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-card hover-lift border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-card-hover transition-smooth">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative">
                                    <span className="absolute -top-3 -left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        01
                                    </span>
                                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                                        <span className="text-yellow-400 font-bold text-xs">
                                            Binance
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                        Binance
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-2">
                                        25K+ Reviews Binance There are many variations of passages of
                                        Lorem Ipsum available, but the majority have suffered
                                        alteration.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                                <div className="text-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                                    <div className="flex justify-center text-orange-400 text-sm mb-1">
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                        44k+{" "}
                                        <span className="font-normal text-gray-400">
                                            Customer Reviews
                                        </span>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-semibold flex items-center hover:underline whitespace-nowrap">
                                    View More{" "}
                                    <span className="material-icons-outlined text-sm ml-1">
                                        expand_more
                                    </span>
                                </button>
                            </div>
                        </div>
                    </AnimateIn>

                    {/* Review 2 */}
                    <AnimateIn animation="fade-up" delay={200}>
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-card hover-lift border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-card-hover transition-smooth">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative">
                                    <span className="absolute -top-3 -left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        02
                                    </span>
                                    <div className="w-16 h-16 rounded-full bg-green-900 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                                        <span className="text-white font-bold text-xs">
                                            bitstamp
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                        bitstamp
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-2">
                                        25K+ Reviews bitstamp There are many variations of passages of
                                        Lorem Ipsum available, but the majority have suffered
                                        alteration.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                                <div className="text-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                                    <div className="flex justify-center text-orange-400 text-sm mb-1">
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">
                                            star_half
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                        40k+{" "}
                                        <span className="font-normal text-gray-400">
                                            Customer Reviews
                                        </span>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-semibold flex items-center hover:underline whitespace-nowrap">
                                    View More{" "}
                                    <span className="material-icons-outlined text-sm ml-1">
                                        expand_more
                                    </span>
                                </button>
                            </div>
                        </div>
                    </AnimateIn>

                    {/* Review 3 */}
                    <AnimateIn animation="fade-up" delay={300}>
                        <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-card hover-lift border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-card-hover transition-smooth">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative">
                                    <span className="absolute -top-3 -left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        03
                                    </span>
                                    <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                                        <span className="text-white font-bold text-3xl">R</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                        RoboForex
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-2">
                                        RoboForex is known for its innovation tools, multiple account
                                        types, and attractive bonuses for traders of all levels.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-700">
                                <div className="text-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                                    <div className="flex justify-center text-orange-400 text-sm mb-1">
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                        <span className="material-icons-outlined text-sm">star</span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                        44k+{" "}
                                        <span className="font-normal text-gray-400">
                                            Customer Reviews
                                        </span>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-semibold flex items-center hover:underline whitespace-nowrap">
                                    View More{" "}
                                    <span className="material-icons-outlined text-sm ml-1">
                                        expand_more
                                    </span>
                                </button>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
                <AnimateIn animation="fade-in" delay={400}>
                    <div className="mt-12 text-center">
                        <button className="px-8 py-3 bg-transparent border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition inline-flex items-center gap-2">
                            See All Reviews
                            <span className="material-icons-outlined text-sm">north_east</span>
                        </button>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
