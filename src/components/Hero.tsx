import Image from "next/image";

export function Hero() {
    return (
        <section className="relative hero-bg overflow-hidden py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-icons-outlined text-secondary animate-pulse">
                                auto_graph
                            </span>
                            <span className="font-semibold text-primary tracking-wide text-sm uppercase">
                                Trading Signals And Get Stable Profits
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6">
                            Follow Top <span className="text-secondary">Traders</span> And Lead In
                            Forex Trading
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                            Welcome to TRADEXY, your trusted partner in forex trading. Whether
                            you're a beginner or an expert, we simplify your journey to
                            financial freedom.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-xl shadow-blue-500/30 flex items-center gap-2">
                                Start Trading Now
                                <span className="material-icons-outlined text-sm">
                                    north_east
                                </span>
                            </button>
                            <button className="px-8 py-3.5 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-full font-semibold hover:border-primary hover:text-primary dark:hover:border-primary transition flex items-center gap-2">
                                Explore Reviews
                                <span className="material-icons-outlined text-sm">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="relative z-0">
                        <div className="relative w-full aspect-square md:aspect-[4/3]">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB6WZlWRssL_LuOaHV0D238JGjjshj4QbJTBELI0EtR7xd9_wvoryBPkZnL3kDnSdzvI0sxcmKw9dmQH8ujXxbHGj822BAsf5iSHBwTTvRklHgpMEdcL1s2kOyXfAaQNeDUohutUbL3jhScsdJH1ZKelcOnfwPidU95JfZBjcZXtAHyX_xgavmaZ-kG56bG3JQDHuH2kafA8_T_DNmG07sTBBKXVfYCfcewAMvTH7SiQdVl7gTpDOz4QrXo3FNyuMq_JtCvRFBqUo"
                                alt="3D illustration of a trader analyzing charts on multiple screens with floating crypto coins"
                                fill
                                className="object-cover rounded-2xl shadow-2xl transform hover:scale-[1.01] transition duration-500"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
