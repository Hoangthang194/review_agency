"use client";

import { useState } from "react";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What Is Forex Trading?",
            answer:
                "A Forex broker is a company that provides a platform for you to trade currencies, often offering tools, signals, and support for successful trading.",
        },
        {
            question: "Is Forex Trading Safe?",
            answer:
                "Forex trading involves risk, but with proper knowledge and a regulated broker, it can be a safe investment vehicle when managed correctly.",
        },
        {
            question: "How Do I Start Trading Forex?",
            answer:
                "You can start by choosing a broker, opening an account, and learning the basics through demo trading.",
        },
        {
            question: "What Is Leverage In Forex?",
            answer:
                "Leverage allows you to control a larger position with a smaller amount of capital. It amplifies both profits and losses.",
        },
        {
            question: "What Is A Forex Broker?",
            answer:
                "A Forex broker is an intermediary that provides traders with access to a platform for buying and selling foreign currencies.",
        },
        {
            question: "Can I Trade Forex On My Mobile?",
            answer:
                "Yes, most brokers offer mobile apps that allow you to trade on the go.",
        },
        {
            question: "How Can I Profit From Forex Trading?",
            answer:
                "Profits are made by correctly predicting currency price movements—buying low and selling high, or selling high and buying low.",
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-card-dark transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="material-icons-outlined text-secondary">
                            help_outline
                        </span>
                        <span className="font-bold text-primary text-sm uppercase">
                            Frequently Asked Questions
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Find Answers to Common Questions
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        We've compiled a list of frequently asked questions to provide you
                        with quick and helpful answers. If you have a question that is not
                        addressed below.
                    </p>
                </div>
                <div className="grid gap-4">
                    <FAQItem
                        item={faqs[0]}
                        isOpen={openIndex === 0}
                        onClick={() => toggle(0)}
                    />
                    <FAQItem
                        item={faqs[1]}
                        isOpen={openIndex === 1}
                        onClick={() => toggle(1)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FAQItem
                            item={faqs[2]}
                            isOpen={openIndex === 2}
                            onClick={() => toggle(2)}
                        />
                        <FAQItem
                            item={faqs[3]}
                            isOpen={openIndex === 3}
                            onClick={() => toggle(3)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FAQItem
                            item={faqs[4]}
                            isOpen={openIndex === 4}
                            onClick={() => toggle(4)}
                        />
                        <FAQItem
                            item={faqs[5]}
                            isOpen={openIndex === 5}
                            onClick={() => toggle(5)}
                        />
                    </div>

                    <FAQItem
                        item={faqs[6]}
                        isOpen={openIndex === 6}
                        onClick={() => toggle(6)}
                    />
                </div>
            </div>
        </section>
    );
}

function FAQItem({
    item,
    isOpen,
    onClick,
}: {
    item: any;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="bg-background-light dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 h-fit">
            <button
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClick}
            >
                <span>{item.question}</span>
                <span
                    className={`material-icons-outlined ${isOpen ? "text-secondary" : "text-primary"
                        }`}
                >
                    {isOpen ? "remove_circle" : "add_circle"}
                </span>
            </button>
            <div
                className={`px-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}
            >
                {item.answer}
            </div>
        </div>
    );
}
