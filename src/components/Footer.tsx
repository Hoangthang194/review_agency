import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background-light dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons-outlined text-primary text-3xl">
                                currency_exchange
                            </span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                Trade<span className="text-primary">XY</span>
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            Your trusted partner in the world of forex trading. Providing
                            reliable signals and expert reviews since 2020.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-500 hover:text-primary transition"
                            >
                                <span className="material-icons-outlined text-lg">facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-500 hover:text-primary transition"
                            >
                                <span className="material-icons-outlined text-lg">
                                    smart_display
                                </span>
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-500 hover:text-primary transition"
                            >
                                <span className="material-icons-outlined text-lg">
                                    alternate_email
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Resources
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Broker Reviews
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Trading Signals
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Market News
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Economic Calendar
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Newsletter
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button className="bg-primary text-white p-2.5 rounded-lg hover:bg-blue-700 transition">
                                <span className="material-icons-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © 2023 TRADEXY. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="#" className="hover:text-primary transition">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
