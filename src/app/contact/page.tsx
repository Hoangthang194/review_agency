"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";
import { submitContact, ContactFormData } from "@/hooks";

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess(false);

        try {
            await submitContact(formData);

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title="Contact Us"
                    breadcrumbs={[
                        { label: "Tradexy", href: "/" },
                        { label: "Contact Us" },
                    ]}
                    backgroundImage="/contact.jpg"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <AnimateIn animation="fade-up" delay={100}>
                                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8">
                                    <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Get in touch with us.
                                        </h2>
                                    </div>

                                    {/* Success Message */}
                                    {success && (
                                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                            <p className="text-sm text-green-800 dark:text-green-400">
                                                Thank you for your message! We'll get back to you soon.
                                            </p>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                                        </div>
                                    )}

                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                                    htmlFor="name"
                                                >
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition"
                                                    id="name"
                                                    placeholder="Enter Your Name..."
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    disabled={submitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                                    htmlFor="email"
                                                >
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition"
                                                    id="email"
                                                    placeholder="Enter Your Email..."
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    disabled={submitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                                    htmlFor="phone"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition"
                                                    id="phone"
                                                    placeholder="Enter Your Number..."
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    disabled={submitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                                    htmlFor="subject"
                                                >
                                                    Subject <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition"
                                                    id="subject"
                                                    placeholder="Subject"
                                                    type="text"
                                                    required
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    disabled={submitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                                htmlFor="message"
                                            >
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition resize-none"
                                                id="message"
                                                placeholder="Enter Your Message..."
                                                rows={6}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                disabled={submitting}
                                            ></textarea>
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                className="px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold transition duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                {submitting ? "Sending..." : "Send Message"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </AnimateIn>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-5">
                            <AnimateIn animation="fade-up" delay={200}>
                                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 h-full">
                                    <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Need more help?
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        {/* Call */}
                                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex items-start gap-5 transition hover:shadow-md">
                                            <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary">
                                                <span className="material-icons-outlined">call</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                    Call Now
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    (907) 555-0101
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    (252) 555-0126
                                                </p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex items-start gap-5 transition hover:shadow-md">
                                            <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary">
                                                <span className="material-icons-outlined">email</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                    Email Address
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    info@example.com
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    support@tradexy.com
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex items-start gap-5 transition hover:shadow-md">
                                            <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary">
                                                <span className="material-icons-outlined">
                                                    location_on
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                    Location
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    Royal Ln. Mesa, New Jersey
                                                    <br />
                                                    45463
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimateIn>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

