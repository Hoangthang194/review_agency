"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ExternalImage } from "@/components/ExternalImage";
import { useReviews, Review } from "@/hooks";

// Helper function to render stars
const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0 && rating % 1 >= 0.5;
    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <span key={i} className="material-icons-outlined text-lg">
                    star
                </span>
            ))}
            {hasHalfStar && (
                <span className="material-icons-outlined text-lg">
                    star_half
                </span>
            )}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <span key={`empty-${i}`} className="material-icons-outlined text-lg text-gray-300 dark:text-gray-600">
                    star_outline
                </span>
            ))}
        </>
    );
};

// Helper function to get route path based on review type and slug
const getRoutePath = (type: string, slug: string) => {
    switch (type) {
        case "prop":
            return `/prop-firms/${slug}`;
        case "forex":
            return `/forex-brokers/${slug}`;
        case "crypto":
            return `/crypto-exchanges/${slug}`;
        default:
            return `#`;
    }
};

export default function PropFirms() {
    const { data: reviews, loading, error } = useReviews({ type: "prop" });

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title="Prop Firm Reviews"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Prop Firms" },
                    ]}
                    backgroundImage="/market.jpg"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="w-full lg:w-1/4 flex-shrink-0">
                            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-6 text-text-light dark:text-text-dark">
                                    Filter
                                </h2>
                                <div className="relative mb-8">
                                    <input
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-text-light dark:text-text-dark placeholder-gray-400"
                                        placeholder="Search prop firms..."
                                        type="text"
                                    />
                                </div>
                                <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                                    <h3 className="font-semibold mb-4 text-text-light dark:text-text-dark">
                                        Types of Firms
                                    </h3>
                                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                        {[
                                            { label: "Forex Prop Firm", count: 1 },
                                            { label: "Stock Prop Firm", count: 1 },
                                            { label: "Crypto Prop Firm", count: 4 },
                                            { label: "Futures Prop Firm", count: 2 },
                                            { label: "One-Step Challenge", count: 2 },
                                            { label: "Two-Step Challenge", count: 2 },
                                        ].map((item, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center">
                                                    <input
                                                        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary"
                                                        type="checkbox"
                                                    />
                                                    <span className="ml-3 group-hover:text-primary transition-colors">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {item.count}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h3 className="font-semibold mb-4 text-text-light dark:text-text-dark">
                                        Star Rating
                                    </h3>
                                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                        {[5, 4, 3, 2].map((stars, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center">
                                                    <input
                                                        className="form-radio h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary"
                                                        name="rating"
                                                        type="radio"
                                                    />
                                                    <div className="ml-3 flex text-orange-400 text-xs space-x-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span
                                                                key={i}
                                                                className={`material-icons-outlined text-base ${i < stars
                                                                    ? ""
                                                                    : "text-gray-300 dark:text-gray-600"
                                                                    }`}
                                                            >
                                                                {i < stars ? "star" : "star"}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {stars === 5 ? 4 : stars === 4 ? 2 : 0}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full py-2.5 px-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium">
                                    Reset Filters
                                </button>
                            </div>
                        </aside>
                        <div className="w-full lg:w-3/4 space-y-6">
                            {loading && (
                                <div className="flex items-center justify-center min-h-[400px]">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                    <p className="text-red-700 dark:text-red-400">
                                        Error loading reviews: {error.message}
                                    </p>
                                </div>
                            )}
                            {!loading && !error && reviews.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">No prop firms found.</p>
                                </div>
                            )}
                            {!loading && !error && reviews.map((review) => {
                                const routePath = getRoutePath(review.review_type, review.slug);
                                const logoBg = review.logo_bg || "bg-gray-800";
                                const pros = review.pros || review.advantages || [];
                                
                                return (
                                    <div key={review.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm hover:shadow-md p-6 lg:p-8 flex flex-col md:flex-row gap-8 transition-smooth">
                                        <div className="w-full md:w-1/4 flex flex-col items-center justify-center space-y-4">
                                            <div className={`w-full h-32 ${logoBg} rounded-lg flex items-center justify-center overflow-hidden`}>
                                                {review.logo ? (
                                                    review.logo.startsWith("http://") || review.logo.startsWith("https://") ? (
                                                        <ExternalImage
                                                            src={review.logo}
                                                            alt={`${review.name} Logo`}
                                                            width={120}
                                                            height={60}
                                                            className="h-12 object-contain"
                                                        />
                                                    ) : (
                                                        <Image
                                                            alt={`${review.name} Logo`}
                                                            width={120}
                                                            height={60}
                                                            className="h-12 object-contain"
                                                            src={review.logo}
                                                        />
                                                    )
                                                ) : (
                                                    <span className="text-white font-bold text-2xl">
                                                        {review.name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-3 w-full justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary text-primary font-bold text-lg">
                                                    {review.rating}
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="flex text-orange-400 text-sm">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                                                        Customer Reviews
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 flex flex-col justify-between border-r-0 md:border-r border-gray-100 dark:border-gray-700 pr-0 md:pr-6">
                                            <div>
                                                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                                                    {review.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                                                    {review.reviews.toLocaleString('en-US')}+ Reviews {review.description}
                                                </p>
                                                {pros.length > 0 && (
                                                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
                                                        {pros.slice(0, 4).map((pro, index) => (
                                                            <li key={index} className="flex items-center">
                                                                <span className="material-icons-outlined text-primary text-lg mr-2">
                                                                    check_circle_outline
                                                                </span>
                                                                {pro}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/4 flex flex-col justify-center gap-4 pl-0 md:pl-2">
                                            {review.url_site && (
                                                <Link
                                                    className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 rounded-full text-center transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center"
                                                    href={review.url_site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Visit Site{" "}
                                                    <span className="material-icons-outlined text-sm ml-2">
                                                        arrow_forward
                                                    </span>
                                                </Link>
                                            )}
                                            <Link
                                                className="w-full bg-white dark:bg-transparent border border-primary text-primary hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2.5 rounded-full text-center transition-colors flex items-center justify-center"
                                                href={routePath}
                                            >
                                                Read More{" "}
                                                <span className="material-icons-outlined text-sm ml-2">
                                                    arrow_forward
                                                </span>
                                            </Link>
                                            <p className="text-[10px] text-gray-400 text-center mt-1">
                                                * Terms &amp; Conditions Apply
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <Link
                href="#"
                className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition z-50"
            >
                <span className="material-icons-outlined">keyboard_arrow_up</span>
            </Link>
        </div>
    );
}
