import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { MarketSidebar } from "@/components/MarketSidebar";
import Link from "next/link";
import Image from "next/image";

interface Article {
    title: string;
    slug: string;
    image: string;
    date: string;
    category: string;
    excerpt: string;
}

const articles: Article[] = [
    {
        title: "Weekly Cryptocurrency Trends",
        slug: "weekly-cryptocurrency-trends",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAJv3_6G5ci1XBQYHtf8xEiKUBevUp0y66ohqpviv6VikBgHNCvSJ8xlyY65avg27RJFoEbUSv8fkcKMYrpVn9eAl1oM7ZQVpztxlJ_Qx9tXMM3GLNRT2cGbS23XwZ9cx1Jfvc5LJjzFJqy6gL3lybcre8JpZBxUb5DI_ST8Yko3UagiP8g5c1WiXy9v7driNMDS0VLRqg3cMuYdmGvumVxDhKydkhcPgrBLpjAIUb0IzVQPXLFWuHy9635VFQNZ_OAM4J7MI7PQmg",
        date: "August 24, 2024",
        category: "Crypto Market",
        excerpt:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution...",
    },
    {
        title: "Stock Market Weekly Recap",
        slug: "stock-market-recap",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDwt21mm-bKrvservJfe0Djes7al57sPK17cD02Pg8d1eD3N-zoImzbRem4c4AW4pmphMvtZGbXokBwX6HULoTbjduOItLYxPJNGvitGgeFVx2tQ_n1SgfVqwBoqIUkcPBeYX8cvQJlRj-0FCqa0DQgOf2ShY-53n44MIM99urWFANSvNFfG4tpCPTEGefh8MQkZTREohH7Q2dful3vK_c7tqOuaDVAvpd9ZnzO3zXH5DW2GZgSs5Xwc5LEl-oyvpy_udnlWtyriUE",
        date: "August 24, 2024",
        category: "Stock Market",
        excerpt:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution...",
    },
    {
        title: "Weekly Forex Market Insights",
        slug: "weekly-forex-insights",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOwo-y4r1IFVgPgT7iin9SviOUrS-78hJnx7nS8J3tVtChl7EW2ZMEAFOLpRgaZaaxqVDzqZP1O01_sAYoU1Xaw3ExT86mVVl1PBEwsw_PojXUU6A08w-FmpxcwnRyZUSK8I07Lr5hf_YCL2ULsYwBmkYMj0TBEz5Af8cvrSzsWT_EljYs9_iJZFl1PyrS4xyYs4hbCrIPXlFoxNexGfkC7dU5fkqgBZGp9Xa3DBzW1CSZ6zCou9bnqbSCV3p4Lf3vqY3FHUBNjEQ",
        date: "August 24, 2024",
        category: "Forex Trading",
        excerpt:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution...",
    },
    {
        title: "Top Social Traders of the Week",
        slug: "top-social-traders",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAYJnyyVP1P9uNTxJXg-NLgcQPiaenVNCp0RGWzIqFQjbBfzEx8hwXUfj3-B5sg-xKPnO0W4OoWjkhpOGBff3scF5eBf5qtDBm5Oj99DodhkAZpLOHbuIiT2C9kEhW-oJgiKTjoe1YMnkxI-u1HlBtHqYKr5KtWX9vNn40DHKoBYPQ-qMIifRpysAioU2iyzmNfF9lokvQZJmPzYFHG_3GkuNaFdkUeZ4ntSl-qTTmuXkq06Rw9Ms8dvZKdZ9nDfsU8PThbnblefDE",
        date: "August 24, 2024",
        category: "Social Trading",
        excerpt:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution...",
    },
];

export default function MarketAnalysis() {
    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <PageHero
                    title="Market Analysis"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Market Analysis" },
                    ]}
                    backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAG6-sjPEcLmgaxu8ezZ5eJtQVNzyweQdggD12oqacJEg6xS-Kr79BM31kk6qgCy-jCGW9eraYuA_UaNEPXflAJlDz-hquN6DGutwVtG450VyN6ekzrid4Bv08sUmCGjEm7oSdzykcK-BEVLIXuoOB-P6Eu1_wBP7T8lcYgRE65bNN8Fo514Vr0Ri0LH9oHH3RsU3UA8Lf9bar9_hdaKIbiCxtAy1DhEjHzhEzXNSaztoMn5uNzNk_2FxuSJhuR-ITzM-kJY5_fG9U"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 xl:w-3/4">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-muted-light dark:text-muted-dark mb-4 sm:mb-0">
                                    Showing 1 - 4 of 4 results
                                </p>
                                <div className="flex space-x-2">
                                    <button className="p-2 text-primary bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                                        <span className="material-icons text-xl">grid_view</span>
                                    </button>
                                    <button className="p-2 text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-white transition">
                                        <span className="material-icons text-xl">view_list</span>
                                    </button>
                                </div>
                            </div>

                            {articles.map((article, index) => (
                                <article
                                    key={index}
                                    className="bg-card-light dark:bg-card-dark rounded-lg shadow-card hover-lift p-6 mb-8 border border-gray-100 dark:border-gray-700 hover:shadow-card-hover transition-smooth"
                                >
                                    <div className="mb-6 rounded-lg overflow-hidden h-64 md:h-80 relative group">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-light dark:text-muted-dark mb-3">
                                        <div className="flex items-center">
                                            <span className="material-icons text-sm mr-1">person</span>
                                            <span>by tradery</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="material-icons text-sm mr-1">
                                                schedule
                                            </span>
                                            <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="material-icons text-sm mr-1">label</span>
                                            <span className="text-primary">{article.category}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary transition-colors">
                                        <Link href={`/market-analysis/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h2>
                                    <p className="text-muted-light dark:text-muted-dark mb-6 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <Link
                                        href={`/market-analysis/${article.slug}`}
                                        className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded shadow-sm transition-colors group"
                                    >
                                        Read More
                                        <span className="material-icons text-sm ml-2 group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                        <MarketSidebar />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
