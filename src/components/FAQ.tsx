"use client";

import { useState } from "react";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Which broker is best for beginners?",
            answer:
                "There is no single best broker for everyone. Beginners should look for strong regulation, low minimum deposits, and user-friendly platforms.",
        },
        {
            question: "How do you review Forex brokers?",
            answer:
                "We evaluate brokers based on regulation, trading costs, execution quality, platform reliability, and withdrawal experience.",
        },
        {
            question: "Can I trust the brokers you recommend?",
            answer:
                "We only review brokers that are properly regulated and have passed our internal safety and performance checks.",
        },
        {
            question: "Can I open an account directly through your website?",
            answer:
                "Yes. By clicking our broker links, you'll be redirected to the broker's official website to open an account securely.",
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
