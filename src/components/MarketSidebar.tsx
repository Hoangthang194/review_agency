import Link from "next/link";

export function MarketSidebar() {
    return (
        <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Search
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <form className="flex">
                    <input
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-400"
                        placeholder="Searching..."
                        type="text"
                    />
                    <button
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-r transition-colors flex items-center justify-center"
                        type="submit"
                    >
                        <span className="material-icons text-sm">search</span>
                    </button>
                </form>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Categories
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <ul className="space-y-3">
                    {[
                        { name: "Crypto Market", count: 1 },
                        { name: "EUR/USD Technical Analysis", count: 2 },
                        { name: "Forex Trading", count: 1 },
                        { name: "Stock Market", count: 1 },
                    ].map((cat, index) => (
                        <li
                            key={index}
                            className={
                                index > 0
                                    ? "border-t border-gray-100 dark:border-gray-800 pt-3"
                                    : ""
                            }
                        >
                            <Link
                                className="flex justify-between items-center text-sm text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary transition-colors group"
                                href="#"
                            >
                                <span>{cat.name}</span>
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-primary transition-colors">
                                    ({cat.count})
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Popular Tag
                </h3>
                <div className="border-b-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 w-full"></div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { name: "Crypto Market", count: 12 },
                        { name: "Forex Trading", count: 54 },
                        { name: "Gold", count: 6 },
                        { name: "MFA", count: 9 },
                        { name: "Stock Market", count: 8 },
                        { name: "Technical Analysis", count: 4 },
                    ].map((tag, index) => (
                        <Link
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-muted-light dark:text-muted-dark hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white rounded transition-colors border border-gray-200 dark:border-gray-700"
                            href="#"
                        >
                            {tag.name} ({tag.count})
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Subscribe
                </h3>
                <p className="text-xs text-muted-light dark:text-muted-dark mb-4">
                    Get the latest market insights delivered directly to your inbox.
                </p>
                <form className="flex flex-col gap-2">
                    <input
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Your Email Address"
                        type="email"
                    />
                    <button
                        className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </aside>
    );
}
