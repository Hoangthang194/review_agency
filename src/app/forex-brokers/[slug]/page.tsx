import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function BrokerDetail({ params }: { params: { slug: string } }) {
    // In a real app, you would fetch data based on params.slug
    const brokerName = "Binance"; // Placeholder

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title={`${brokerName} Review 2024`}
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Forex Brokers", href: "/forex-brokers" },
                        { label: brokerName },
                    ]}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 bg-black rounded-xl flex items-center justify-center p-2 shadow-inner">
                                    <div className="flex items-center gap-1 text-[#F0B90B]">
                                        <span className="material-icons-outlined text-4xl">
                                            token
                                        </span>
                                        <span className="text-xl font-bold text-white">
                                            Binance
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-center text-yellow-400 text-sm">
                                    <span className="material-icons-outlined text-sm">star</span>
                                    <span className="material-icons-outlined text-sm">star</span>
                                    <span className="material-icons-outlined text-sm">star</span>
                                    <span className="material-icons-outlined text-sm">star</span>
                                    <span className="material-icons-outlined text-sm text-gray-300">
                                        star
                                    </span>
                                </div>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                                    24K+ Reviews
                                </p>
                            </div>
                            <div className="flex-grow">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Binance Review 2024
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                    Binance is the world's largest crypto exchange by trading
                                    volume. There are many variations of passages of Lorem Ipsum
                                    available, but the majority have suffered alteration in some
                                    form, by injected humour, or randomised words which don't look
                                    even slightly believable.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-100 dark:border-blue-800">
                                        Crypto Exchange
                                    </span>
                                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded border border-green-100 dark:border-green-800">
                                        Verified
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600">
                                        Global
                                    </span>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col justify-center items-center gap-3">
                                <button className="w-full md:w-48 bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                                    Visit Site{" "}
                                    <span className="material-icons-outlined text-sm">
                                        open_in_new
                                    </span>
                                </button>
                                <span className="text-xs text-gray-400 text-center">
                                    T&amp;Cs Apply
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                            {[
                                { icon: "payments", title: "Min Deposit", value: "$100 - $600,000" },
                                {
                                    icon: "percent",
                                    title: "Effective Interest",
                                    value: "From 6.90 - 24.40%",
                                },
                                { icon: "schedule", title: "Running Time", value: "1.5 Years" },
                                { icon: "person", title: "My Age", value: "25 Years" },
                                {
                                    icon: "account_balance_wallet",
                                    title: "Max Funding",
                                    value: "$120,000",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center p-2 text-center ${index === 4
                                        ? "col-span-2 md:col-span-1 border-t md:border-t-0 border-gray-100 dark:border-gray-700 mt-2 md:mt-0 pt-4 md:pt-0"
                                        : ""
                                        }`}
                                >
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full mb-2">
                                        <span className="material-icons-outlined text-blue-600 dark:text-blue-400">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                        {item.title}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider">
                                        Terms
                                    </h3>
                                    <ul className="space-y-3 text-sm">
                                        {[
                                            { label: "Loan Amount:", value: "$100 - $600,000" },
                                            { label: "Repayment Period:", value: "1 - 18 years" },
                                            { label: "Effective Interest:", value: "8.01 - 24.4%" },
                                            { label: "Age Limit:", value: "21 - 75" },
                                        ].map((item, i) => (
                                            <li key={i} className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    {item.label}
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {item.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider">
                                        Key Info
                                    </h3>
                                    <ul className="space-y-3 text-sm">
                                        {[
                                            { label: "Effective Interest from:", value: "8.01%" },
                                            { label: "Minimum Loan Amount:", value: "10,000" },
                                            { label: "Maximum Loan Amount:", value: "600,000" },
                                            { label: "Maturity:", value: "18 years" },
                                        ].map((item, i) => (
                                            <li key={i} className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    {item.label}
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {item.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Overview
                                </h2>
                                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                    <p className="mb-4">
                                        There are many variations of passages of Lorem Ipsum
                                        available, but the majority have suffered alteration in some
                                        form, by injected humour, or randomised words which don't
                                        look even slightly believable. If you are going to use a
                                        passage of Lorem Ipsum, you need to be sure there isn't
                                        anything embarrassing hidden in the middle of text. All the
                                        Lorem Ipsum generators on the Internet tend to repeat
                                        predefined chunks as necessary.
                                    </p>
                                    <p>
                                        There are many variations of passages of Lorem Ipsum
                                        available, but the majority have suffered alteration in some
                                        form, by injected humour, or randomised words which don't
                                        look even slightly believable.
                                    </p>
                                </div>
                            </section>

                            <div className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="material-icons-outlined text-green-500">
                                                check_circle
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                Pros
                                            </h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "Competitive Interest Rates",
                                                "Flexible Repayment Options",
                                                "Quick Approval and Disbursement",
                                                "No Collateral Required",
                                                "Favorable Terms and Conditions",
                                            ].map((pro, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                                                >
                                                    <span className="material-icons-outlined text-blue-500 text-base mt-0.5">
                                                        done
                                                    </span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="material-icons-outlined text-red-500">
                                                cancel
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                Cons
                                            </h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "Higher Interest Rates",
                                                "Strict Eligibility Criteria",
                                                "Prepayment Penalties",
                                                "Fees and Charges",
                                                "Potential Impact on Credit",
                                            ].map((con, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                                                >
                                                    <span className="material-icons-outlined text-red-500 text-base mt-0.5">
                                                        close
                                                    </span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Key Features
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        "Low Spreads",
                                        "Fast Execution",
                                        "Multiple Platforms",
                                        "Regulation",
                                    ].map((feature, i) => (
                                        <div key={i}>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                                0{i + 1}. {feature} :
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 pl-4 border-l-2 border-primary">
                                                It is a long established fact that a reader will be
                                                distracted by the readable content of a page when
                                                looking at its layout. The point of using Lorem Ipsum is
                                                that it has a more-or-less normal distribution of
                                                letters.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Average Reviews
                                </h2>
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="bg-primary text-white rounded-lg p-6 w-full md:w-48 flex flex-col items-center justify-center shadow-lg shadow-blue-500/20">
                                        <span className="text-4xl font-bold mb-1">
                                            4.9<span className="text-xl font-normal text-blue-200">/5</span>
                                        </span>
                                        <div className="flex text-yellow-300 text-lg mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="material-icons-outlined"
                                                >
                                                    {i < 4 ? "star" : "star_half"}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-blue-100">26 Rating</span>
                                    </div>
                                    <div className="flex-grow w-full space-y-3">
                                        {[
                                            { stars: 5, pct: "85%" },
                                            { stars: 4, pct: "60%" },
                                            { stars: 3, pct: "15%" },
                                            { stars: 2, pct: "5%" },
                                            { stars: 1, pct: "8%" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm">
                                                <span className="w-4 font-medium text-gray-600 dark:text-gray-300">
                                                    {item.stars}
                                                </span>
                                                <span className="material-icons-outlined text-yellow-400 text-base">
                                                    star
                                                </span>
                                                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-secondary h-2 rounded-full"
                                                        style={{ width: item.pct }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                    User Comments (2)
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                                JD
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                                                    John Doe
                                                </h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    August 12, 2024 at 10:30 am
                                                </span>
                                            </div>
                                            <div className="flex text-yellow-400 text-sm mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className="material-icons-outlined text-sm"
                                                    >
                                                        star
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                                                Binance has been my go-to exchange for years. The sheer
                                                volume of coins available and the liquidity is
                                                unmatched. The fees are also very reasonable, especially
                                                if you hold BNB. The mobile app is feature-rich but can
                                                be a bit overwhelming for beginners initially.
                                            </p>
                                            <button className="text-xs font-medium text-primary hover:text-blue-700 flex items-center gap-1 transition">
                                                <span className="material-icons-outlined text-sm">
                                                    reply
                                                </span>{" "}
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                                                AS
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                                                    Sarah Anderson
                                                </h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    July 28, 2024 at 3:15 pm
                                                </span>
                                            </div>
                                            <div className="flex text-yellow-400 text-sm mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`material-icons-outlined text-sm ${i === 4 ? "text-gray-300" : ""
                                                            }`}
                                                    >
                                                        star
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                                                Good platform overall with great tools for technical
                                                analysis. However, customer support can be slow to
                                                respond during peak times. The P2P market is excellent
                                                for funding your account in regions where direct bank
                                                transfers are restricted.
                                            </p>
                                            <button className="text-xs font-medium text-primary hover:text-blue-700 flex items-center gap-1 transition">
                                                <span className="material-icons-outlined text-sm">
                                                    reply
                                                </span>{" "}
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Leave a Reply
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Your email address will not be published. Required fields are
                                    marked *
                                </p>
                                <form className="space-y-4">
                                    <div>
                                        <input
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white placeholder-gray-400"
                                            placeholder="Name*"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white placeholder-gray-400"
                                            placeholder="Email*"
                                            type="email"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white placeholder-gray-400"
                                            placeholder="Comment"
                                            rows={4}
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <input
                                            className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                                            id="save-info"
                                            type="checkbox"
                                        />
                                        <label
                                            className="text-xs text-gray-500 dark:text-gray-400"
                                            htmlFor="save-info"
                                        >
                                            Save my name, email, and website in this browser for the
                                            next time I comment.
                                        </label>
                                    </div>
                                    <button
                                        className="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
                                        type="submit"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            </section>
                        </div>

                        <aside className="lg:col-span-4 space-y-6">
                            <div className="bg-secondary rounded-xl p-8 text-center text-white shadow-lg shadow-orange-500/30">
                                <div className="text-5xl font-bold mb-2">
                                    4.9<span className="text-2xl font-normal opacity-80">/5</span>
                                </div>
                                <div className="flex justify-center text-white mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-icons-outlined text-2xl">
                                            {i < 4 ? "star" : "star_half"}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm font-medium opacity-90">26 Ratings</p>
                            </div>

                            <div className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Advantages
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        "Flexible account types",
                                        "Advanced Trading Platform",
                                        "Diverse technical research tools",
                                        "Under multiple supervision",
                                        "Very fast order execution",
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <Link
                                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition group"
                                                href="#"
                                            >
                                                <span className="material-icons-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">
                                                    chevron_right
                                                </span>
                                                {item}
                                            </Link>
                                            {i < 4 && (
                                                <div className="h-px bg-gray-100 dark:bg-gray-700 border-t border-dashed w-full mt-2"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-surface-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Disadvantages
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        "No third party social trading tools",
                                        "Stock CFDs are expensive",
                                        "Desktop platform is not friendly enough",
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <Link
                                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition group"
                                                href="#"
                                            >
                                                <span className="material-icons-outlined text-secondary text-sm group-hover:translate-x-1 transition-transform">
                                                    chevron_right
                                                </span>
                                                {item}
                                            </Link>
                                            {i < 2 && (
                                                <div className="h-px bg-gray-100 dark:bg-gray-700 border-t border-dashed w-full mt-2"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
