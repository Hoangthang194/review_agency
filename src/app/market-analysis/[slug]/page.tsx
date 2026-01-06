import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketSidebar } from "@/components/MarketSidebar";
import Image from "next/image";
import Link from "next/link";

export default function MarketDetail({ params }: { params: { slug: string } }) {
    // In a real app, fetch data based on params.slug
    const articleTitle = "Weekly Cryptocurrency Trends";

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title={articleTitle}
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis", href: "/market-analysis" },
                        { label: articleTitle },
                    ]}
                    backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBsWB7dMk-upRhKpuFIHdAmXqC3dQrKjKzKZGd-lhKR-k22FvQ8qaJ070Xc5zrkPALMQBjU2iOhGROswFtAKyQB-_gjMFRzrm_L18NNTekH3VXjSQ4Cuglu6UqN3wu66tT1_1AlC3pikMT9nQjOOubzcZbM3sjQmJCzMxWvDpxsAyeGQV1xPWstK9aeBqElVmoVtwYn7KA0jns5ryIKAkNHdVQ23j5WOjww6w_owH_-loDlEAhfNKjpYpDucxaKPty6-CZUkJSwfxk"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 xl:w-3/4 space-y-8">
                            <article className="bg-card-light dark:bg-card-dark rounded shadow-sm p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                                <div className="mb-6 rounded overflow-hidden relative h-[400px]">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4DosYu_WdxF10PNf-UdQiXykD2HMoDCLb5DCD9hR5oRVTM4msn2464-KbU5bd01GyVvDP4e5wgqff52QagmfkbLOoPqtCyHF22V5mhigwE584U_5SilGUySehQxAaxXEJtS5EOhnlSDeiibgap9qt1ZIysVSczyjs6RwkOd8625kbwakI1AiwvPj-3DwABI_bQ8sv8yrW9B2ejGGD8HpD3s9xGvyY3Gbr5EXRfYqMePFXqVxTrDJ1sIOz5Yk1YHzf9N0wCiXzPU"
                                        alt="Detailed Cryptocurrency Chart Analysis"
                                        fill
                                        className="object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-secondary-text dark:text-secondary-text-dark mb-6">
                                    <div className="flex items-center">
                                        <span className="material-icons text-base mr-1">person</span>
                                        <span>by tradezy</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-icons text-base mr-1">
                                            schedule
                                        </span>
                                        <span>August 24, 2025</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-icons text-base mr-1">
                                            folder
                                        </span>
                                        <span>Crypto Market</span>
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {articleTitle}
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-secondary-text dark:text-secondary-text-dark text-sm leading-relaxed mb-8">
                                    <p className="mb-4">
                                        It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its
                                        layout. The point of using Lorem Ipsum is that it has a
                                        more-or-less normal distribution of letters, as opposed to
                                        using 'Content here, content here', making it look like
                                        readable English. Many desktop publishing packages and web
                                        page editors now use Lorem Ipsum as their default model
                                        text.
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
                                        Streamlined Repayment
                                    </h3>
                                    <p className="mb-4">
                                        It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its
                                        layout. The point of using Lorem Ipsum is that it has a
                                        more-or-less normal distribution of letters, as opposed to
                                        using 'Content here, content here', making it look like
                                        readable English.
                                    </p>
                                    <div className="my-6 relative h-48 w-full md:w-2/3">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUtYyclk-9IykU7vNrCYLVBCHCH8yYp1dAVWVxtUiJ8QNWG-PGoe90HbwjCDinC2fnncOIyBWL2_AvEzkqG4bnV6XsSVK5DKa0vLbNeTc2A8xL2y-fKYdGhLAlB0CZY_gBpocv6ZcfKM6aqHW_zvaVpxsCoFsZcVXNKWuuoVy3YE_EGgEmEzutkZCsc5YDp9J7ioFIE4k9YHfX1mFZInrUn_LgLKTZo22xHP3wAtt4vobKuAb2CgbWVRaxxdMrOsPvJImkq9AmVfU"
                                            alt="Market Volatility Chart"
                                            fill
                                            className="rounded object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
                                        Lower Monthly Payments
                                    </h3>
                                    <p className="mb-4">
                                        It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its
                                        layout. The point of using Lorem Ipsum is that it has a
                                        more-or-less normal distribution of letters, as opposed to
                                        using 'Content here, content here', making it look like
                                        readable English.
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
                                        Fixed Interest Rate
                                    </h3>
                                    <p className="mb-6">
                                        It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its
                                        layout. The point of using Lorem Ipsum is that it has a
                                        more-or-less normal distribution of letters, as opposed to
                                        using 'Content here, content here', making it look like
                                        readable English.
                                    </p>
                                    <div className="relative w-full h-64 md:h-80 bg-slate-900 rounded overflow-hidden group cursor-pointer">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOTujF_junO-81i489IZjS4ZlJ85nwU9ugB4RcvRLlUPw1G86a9oQPZa_HdrOgJdF5IO7GzU_y7-DOzLIBO8JMjCm--DC0KVOxIQx_8MrfU9USUDNp6K1RxFIPyNZ6Knm8rbHVqxvHvQFspzuC69b4zS5SeddUaa1ACSNDQe171bTogFBujT_1IzfYYST1Xj4gwOqH8vgSYdCj7lXZk_n-gquI1Obpt2i-FULJpOV-Gjr83IWqjiRAi5WVS-UBtShR2ao_m2f7A4"
                                            alt="Video Analysis Thumbnail"
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                                <span className="material-icons text-white text-4xl ml-1">
                                                    play_arrow
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
                                        Extended Repayment Term
                                    </h3>
                                    <p className="mb-4">
                                        It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its
                                        layout. Many desktop publishing packages and web page
                                        editors now use Lorem Ipsum as their default model text.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                                        Tags:
                                    </span>
                                    {[
                                        "Crypto Market",
                                        "Bitcoin",
                                        "Technical Analysis",
                                        "Trading",
                                    ].map((tag, i) => (
                                        <Link
                                            key={i}
                                            className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                                            href="#"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </article>

                            <div className="bg-card-light dark:bg-card-dark rounded shadow-sm p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Leave a Reply
                                </h3>
                                <p className="text-xs text-secondary-text dark:text-secondary-text-dark mb-6">
                                    Your email address will not be published. Required fields are
                                    marked *
                                </p>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            className="w-full bg-background-light dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-colors"
                                            placeholder="Name*"
                                            type="text"
                                        />
                                        <input
                                            className="w-full bg-background-light dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-colors"
                                            placeholder="Email*"
                                            type="email"
                                        />
                                    </div>
                                    <textarea
                                        className="w-full bg-background-light dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-colors resize-y"
                                        placeholder="Comment"
                                        rows={4}
                                    ></textarea>
                                    <button
                                        className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-6 rounded text-sm transition-colors duration-200 shadow-sm"
                                        type="submit"
                                    >
                                        Post Comment
                                    </button>
                                </form>

                                <div className="mt-12">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
                                        3 Comments
                                    </h4>
                                    <div className="space-y-8">
                                        {[
                                            {
                                                name: "John Doe",
                                                date: "Aug 25, 2025",
                                                initials: "JD",
                                                color: "indigo",
                                                content:
                                                    "Great analysis on the crypto trends! I've been watching the resistance levels on BTC closely. Do you think the upcoming fed announcement will trigger a larger sell-off?",
                                            },
                                            {
                                                name: "Tradezy",
                                                date: "Aug 25, 2025",
                                                initials: "TZ",
                                                color: "blue",
                                                isAuthor: true,
                                                content:
                                                    'Thanks John! The Fed announcement is definitely a key risk event. We cover the potential scenarios in the "Fixed Interest Rate" section above, suggesting caution.',
                                                isReply: true,
                                            },
                                            {
                                                name: "Sarah Smith",
                                                date: "Aug 26, 2025",
                                                avatar:
                                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_JGqdX_mdfzIP0xxAJDxFjPlcU9gODhY8TmUdBRbfEq_11Xki6oXJoA-vfMdRXPP3OPgUJrHOViBYD6mlBGLs_UECgfWyi4_LOhHDMdV2ldrfW36hJgFLCDKb-Oqo3F9Cgu36L7AugcT4-BmfXbGQcX4vfJJx56T9babgD0zjHuMkjlkZV-RhGAFpJcmIZ2zR2AQgwXrRbyB-8yrXt5RfY6VYBRk1ufBTS0ORb_yZCMg7XlMU-BWTIdSUxFmZHpm5k6DPJiW5PGo",
                                                content:
                                                    "The visualization of the volatility chart really helped clarify the current market sentiment. I'm looking forward to next week's recap.",
                                            },
                                        ].map((comment, i) => (
                                            <div
                                                key={i}
                                                className={`flex space-x-4 ${comment.isReply
                                                        ? "pl-12 md:pl-14 border-l-2 border-gray-100 dark:border-slate-700"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="flex-shrink-0">
                                                    {comment.avatar ? (
                                                        <Image
                                                            src={comment.avatar}
                                                            alt={comment.name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`w-10 h-10 rounded-full bg-${comment.color
                                                                }-100 dark:bg-slate-700 flex items-center justify-center text-${comment.color
                                                                }-500 dark:text-${comment.color === "indigo"
                                                                    ? "indigo"
                                                                    : "blue"
                                                                }-300 font-bold`}
                                                        >
                                                            {comment.initials}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h5 className="font-bold text-gray-900 dark:text-white text-sm">
                                                            {comment.name}
                                                            {comment.isAuthor && (
                                                                <span className="ml-2 px-1.5 py-0.5 bg-primary text-white text-[10px] rounded">
                                                                    Author
                                                                </span>
                                                            )}
                                                        </h5>
                                                        <span className="text-xs text-secondary-text dark:text-secondary-text-dark">
                                                            {comment.date}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-secondary-text dark:text-secondary-text-dark leading-relaxed">
                                                        {comment.content}
                                                    </p>
                                                    <button className="text-xs text-primary font-medium mt-2 hover:underline">
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MarketSidebar />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
