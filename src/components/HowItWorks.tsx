import Image from "next/image";

export function HowItWorks() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-orange-50/50 dark:from-card-dark dark:to-background-dark transition-colors duration-300 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="material-icons-outlined text-secondary">
                            tips_and_updates
                        </span>
                        <span className="font-bold text-primary text-sm uppercase">
                            How to copy trades
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Start trading with expert-provided
                        <br />
                        signals
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Kickstart your forex trading journey with confidence by leveraging
                        expert-provided trading signals. These signals guide you through the
                        market.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    <div className="text-center p-6 bg-background-light dark:bg-gray-800 rounded-xl hover:translate-y-[-5px] transition duration-300">
                        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-dashed border-primary/30">
                            <span className="material-icons-outlined text-4xl text-primary">
                                person_add
                            </span>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                01
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Open Account
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Choose a good forex broker and open a trading account.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-background-light dark:bg-gray-800 rounded-xl hover:translate-y-[-5px] transition duration-300">
                        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-dashed border-primary/30">
                            <span className="material-icons-outlined text-4xl text-primary">
                                touch_app
                            </span>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                02
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Choose Package
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Contact customer service to choose the copy trading package
                            service.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-background-light dark:bg-gray-800 rounded-xl hover:translate-y-[-5px] transition duration-300">
                        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-dashed border-primary/30">
                            <span className="material-icons-outlined text-4xl text-primary">
                                account_balance_wallet
                            </span>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                03
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Select a fund account
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Product packaging refers to the materials and design used to
                            protect.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-background-light dark:bg-gray-800 rounded-xl hover:translate-y-[-5px] transition duration-300">
                        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-dashed border-primary/30">
                            <span className="material-icons-outlined text-4xl text-primary">
                                savings
                            </span>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                04
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Profit Sharing
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            If you choose to follow the orders by yourself through the push
                            signal.
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-0">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9Zh-UmEH9lUU2VLAp9Y7v7g6k_H7BFtN8qrPUOdFqfTvxna_RyO80V-p9guA5SM9h9jnmCpTE_umFb6ZZOEnFiDnx03iFN7x1LnW5BbyKhUoc_7SJv1fVXxRTgtZTlNT1OEKMesSkWKpqhlW-MYTZfOE4v0jWyqwFTVvIWX49YgX_jSgr5JUaRzOvpv36oKFGetwLvi4aa9P0ipiMFcIik-ZambuAFWkMlcqDbeqNtmbgYEektHXVMl84aXNSyAwM624AzA_SEQ"
                        alt="Abstract business person pointing"
                        width={500}
                        height={500}
                        className="w-96 h-auto mix-blend-multiply dark:mix-blend-luminosity"
                    />
                </div>
            </div>
        </section>
    );
}
