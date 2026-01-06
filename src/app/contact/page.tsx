"use client";

import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";

export default function Contact() {
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
                    backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAYEIgIZQNBior-I8IZF1hVsW694xR6dpNt_KAZ1N5E_T8B9T8pyPKldR7P79fMyVM5JR1pK8Irzuxo_Nt8YNGhjx6UUwemIurpBOpin2sFALWkaLy9jB1IvESzMl48YZHykAhpon28ceYhJmmXvCcieX70d-LTebrKnRUEpvC5DxV8UB0FfPcPzhG1TIpyIenAGV5s2h8qxIdYefblu8IxwIL-GGvkc6YYQT-1uA5fONKwzGOjrM3zhodXwKyt_DJa74RZV9cqZKQ"
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
                                    <form className="space-y-6">
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
                                            ></textarea>
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                className="px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 font-semibold transition duration-300 text-sm"
                                                type="submit"
                                            >
                                                Send Message
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

