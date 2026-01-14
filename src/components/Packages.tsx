"use client";

import { useState, useRef, useEffect } from "react";

export function Packages() {
    const packages = [
        {
            icon: "trending_up",
            title: "Licensed & Regulated Brokers",
            description: "We only review brokers regulated by top-tier authorities such as ASIC, FCA, CySEC, and FSCA.",
        },
        {
            icon: "analytics",
            title: "Tested with Real Accounts",
            description: "Our reviews are based on real account testing including spreads, execution speed, and withdrawals.",
        },
        {
            icon: "psychology",
            title: "Honest Broker Comparison",
            description: "We compare brokers side-by-side so traders can easily choose what fits their strategy.",
        },
        {
            icon: "speed",
            title: "100% Transparent Reviews",
            description: "Some links may earn us a commission at no extra cost to you. Our opinions remain unbiased.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const packageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        // Scroll to the package if it exists
        if (packageRefs.current[index]) {
            packageRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    };

    return (
        <section className="py-20 bg-white dark:bg-card-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="material-icons-outlined text-secondary">
                            category
                        </span>
                        <span className="font-bold text-primary text-sm uppercase">
                            Our Packages
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Trust Our Broker Reviews
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        We are committed to providing honest, thorough, and transparent reviews
                        to help you make informed trading decisions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                packageRefs.current[index] = el;
                            }}
                            className="group p-8 bg-background-light dark:bg-background-dark rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-primary/5 transition duration-300"
                        >
                            <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-icons-outlined text-primary group-hover:text-white text-2xl">
                                    {pkg.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                                {pkg.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {pkg.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10 gap-2">
                    {packages.map((_, index) => {
                        const isActive = index === currentSlide;
                        return (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`rounded-full cursor-pointer transition-all duration-300 ${
                                    isActive 
                                        ? "w-8 h-2 bg-primary" 
                                        : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-primary"
                                }`}
                                aria-label={`Go to package ${index + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
