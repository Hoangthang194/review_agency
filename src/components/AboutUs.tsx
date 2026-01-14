import Image from "next/image";
import Link from "next/link";

export function AboutUs() {
    return (
        <section className="py-20 bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons-outlined text-secondary">
                                groups
                            </span>
                            <span className="font-bold text-primary text-sm uppercase">
                                About Us
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Trusted by Over 66,000 Traders Worldwide, TRADEXY Excels.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
                        We provide independent Forex & CFD broker reviews based on real account testing, transparent comparison, and hands-on market experience.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-icons-outlined text-primary text-2xl">
                                        school
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                        Expert Knowledge
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        He has many years of foreign exchange trading experience.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-icons-outlined text-primary text-2xl">
                                        support_agent
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                        Well-received Service
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        We have a dedicated and friendly service team to provide
                                        you.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-icons-outlined text-primary text-2xl">
                                        rocket_launch
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                        Leading Technology
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        We are involved in all aspects of the foreign exchange
                                        field.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-icons-outlined text-primary text-2xl">
                                        lightbulb
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                        Innovative &amp; Studious
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Everyone here is honest and eager to learn, never
                                        discouraged.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 inline-flex items-center gap-2"
                        >
                            Contact Us
                            <span className="material-icons-outlined text-sm">
                                north_east
                            </span>
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative rounded-full bg-gradient-to-tr from-blue-100 to-orange-100 dark:from-blue-900/20 dark:to-orange-900/20 p-8">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiVCIOFq8PHXTxFCoX6oDm4MltN-fCtRv9BT1JcprZj0ovqui8kqSLabSfpcoyQceUO4NvDBuQXU70PKoKvqFcLB3hB8Bz5jDGkmboOZZ0pXk060SDy14UsaH6Cr590nIslYrDRlVFqtYn-9PJS_nT52kK60A628hfrW5Nx1sazTLzZFu5rN1C3XmGnDBsydgI-vdiyBoTxS0h-WmsSAydk35G8htB8lJOzHgSGdgvUjw32aQi2Ax1xNnerSzcDVoPEF-PpvcVaas"
                                alt="Digital art of a trader achieving success"
                                width={600}
                                height={600}
                                className="relative z-10 w-full rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500"
                            />
                            <div className="absolute top-10 right-0 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 animate-bounce">
                                <span className="font-bold text-primary">BUY</span>
                            </div>
                            <div className="absolute bottom-20 left-10 p-3 bg-secondary text-white rounded-lg shadow-lg z-20 animate-pulse">
                                <span className="font-bold">SELL</span>
                            </div>
                            <div className="absolute -right-4 top-1/3 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-20">
                                <span className="text-white font-bold text-2xl">$</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
