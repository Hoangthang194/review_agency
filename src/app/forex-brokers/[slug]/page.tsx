"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrokerDetailPage } from "@/components/BrokerDetailPage";
import { useReview, Review } from "@/hooks";
import { use } from "react";
import { BrokerData } from "@/data/mockData";

// Helper function to convert Review to BrokerData
function convertReviewToBrokerData(review: Review): BrokerData {
    return {
        slug: review.slug,
        name: review.name,
        rating: review.rating,
        reviews: review.reviews,
        description: review.description,
        logo: review.logo || undefined,
        logoBg: review.logo_bg || undefined,
        tags: review.tags || [],
        stats: review.stats || [],
        terms: review.terms || [],
        keyInfo: review.key_info || [],
        content: review.content || "",
        pros: review.pros || [],
        cons: review.cons || [],
        averageRating: review.average_rating,
        ratingBreakdown: review.rating_breakdown || [],
        advantages: review.advantages || [],
        disadvantages: review.disadvantages || [],
    };
}

export default function BrokerDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { data: review, loading, error } = useReview("forex", slug);
    
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </main>
                <Footer />
            </div>
        );
    }
    
    if (error || !review) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review Not Found</h1>
                        <p className="text-gray-600 dark:text-gray-400">The review you are looking for does not exist.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    
    const data = convertReviewToBrokerData(review);
    
    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <BrokerDetailPage
                    data={data}
                    type="forex"
                    backgroundImage="/forex.jpg"
                />
            </main>
            <Footer />
        </div>
    );
}
