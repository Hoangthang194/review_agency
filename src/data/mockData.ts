export interface BrokerData {
    slug: string;
    name: string;
    rating: number;
    reviews: number;
    description: string;
    logo?: string;
    logoBg?: string;
    tags: string[];
    stats: {
        icon: string;
        title: string;
        value: string;
    }[];
    terms: {
        label: string;
        value: string;
    }[];
    keyInfo: {
        label: string;
        value: string;
    }[];
    overview: string;
    pros: string[];
    cons: string[];
    features: {
        title: string;
        description: string;
    }[];
    averageRating: number;
    ratingBreakdown: {
        stars: number;
        pct: string;
    }[];
    comments: {
        author: string;
        initials: string;
        date: string;
        rating: number;
        comment: string;
    }[];
    advantages: string[];
    disadvantages: string[];
}

export const forexBrokersData: Record<string, BrokerData> = {
    binance: {
        slug: "binance",
        name: "Binance",
        rating: 5,
        reviews: 25000,
        description: "Binance is the world's largest crypto exchange by trading volume. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Yts5TU2eZMfPcCJaorDJ7a0L2f9AWHfDVkU1ArIfgilQ8wAO4YU2ExTcfI_84-aP4tzfqhqUngra5Te7EuKF7HBV6VqILbpXKUjjA9QGEqXGWqCpnz1nft0YKmV8gEC-kDS6SJrofw5PoVJrn4-AJjfWm_junml8oYcgV_XwA3ZTq9lhfrRySl5B4ex8ipx1UI957p-APWD_nkc_wOXtrE_i33E2jmojqgoOiRxjW3T-zEm-MvQqonT61oyL3-DLrRFCyPoVDhk",
        logoBg: "bg-black",
        tags: ["Forex Trading", "Verified", "Global"],
        stats: [
            { icon: "payments", title: "Min Deposit", value: "$100 - $600,000" },
            { icon: "percent", title: "Effective Interest", value: "From 6.90 - 24.40%" },
            { icon: "schedule", title: "Running Time", value: "1.5 Years" },
            { icon: "person", title: "My Age", value: "25 Years" },
            { icon: "account_balance_wallet", title: "Max Funding", value: "$120,000" },
        ],
        terms: [
            { label: "Loan Amount:", value: "$100 - $600,000" },
            { label: "Repayment Period:", value: "1 - 18 years" },
            { label: "Effective Interest:", value: "8.01 - 24.4%" },
            { label: "Age Limit:", value: "21 - 75" },
        ],
        keyInfo: [
            { label: "Effective Interest from:", value: "8.01%" },
            { label: "Minimum Loan Amount:", value: "10,000" },
            { label: "Maximum Loan Amount:", value: "600,000" },
            { label: "Maturity:", value: "18 years" },
        ],
        overview: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        pros: [
            "Competitive Interest Rates",
            "Flexible Repayment Options",
            "Quick Approval and Disbursement",
            "No Collateral Required",
            "Favorable Terms and Conditions",
        ],
        cons: [
            "Higher Interest Rates",
            "Strict Eligibility Criteria",
            "Prepayment Penalties",
            "Fees and Charges",
            "Potential Impact on Credit",
        ],
        features: [
            { title: "Low Spreads", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters." },
            { title: "Fast Execution", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters." },
            { title: "Multiple Platforms", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters." },
            { title: "Regulation", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters." },
        ],
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "85%" },
            { stars: 4, pct: "60%" },
            { stars: 3, pct: "15%" },
            { stars: 2, pct: "5%" },
            { stars: 1, pct: "8%" },
        ],
        comments: [
            {
                author: "John Doe",
                initials: "JD",
                date: "August 12, 2024 at 10:30 am",
                rating: 5,
                comment: "Binance has been my go-to exchange for years. The sheer volume of coins available and the liquidity is unmatched. The fees are also very reasonable, especially if you hold BNB. The mobile app is feature-rich but can be a bit overwhelming for beginners initially.",
            },
            {
                author: "Sarah Anderson",
                initials: "SA",
                date: "July 28, 2024 at 3:15 pm",
                rating: 4,
                comment: "Good platform overall with great tools for technical analysis. However, customer support can be slow to respond during peak times. The P2P market is excellent for funding your account in regions where direct bank transfers are restricted.",
            },
        ],
        advantages: [
            "Flexible account types",
            "Advanced Trading Platform",
            "Diverse technical research tools",
            "Under multiple supervision",
            "Very fast order execution",
        ],
        disadvantages: [
            "No third party social trading tools",
            "Stock CFDs are expensive",
            "Desktop platform is not friendly enough",
        ],
    },
    bitstamp: {
        slug: "bitstamp",
        name: "Bitstamp",
        rating: 4.5,
        reviews: 25000,
        description: "Bitstamp is one of the longest-running cryptocurrency exchanges, known for its security and reliability. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
        logoBg: "bg-[#064234]",
        tags: ["Crypto Exchange", "Verified", "European"],
        stats: [
            { icon: "payments", title: "Min Deposit", value: "$50 - $500,000" },
            { icon: "percent", title: "Trading Fees", value: "0.25% - 0.50%" },
            { icon: "schedule", title: "Established", value: "2011" },
            { icon: "security", title: "Security", value: "High" },
            { icon: "account_balance_wallet", title: "Max Funding", value: "$500,000" },
        ],
        terms: [
            { label: "Trading Fees:", value: "0.25% - 0.50%" },
            { label: "Deposit Methods:", value: "Bank, Card, Crypto" },
            { label: "Withdrawal Time:", value: "1-3 business days" },
            { label: "Supported Countries:", value: "100+" },
        ],
        keyInfo: [
            { label: "Minimum Deposit:", value: "$50" },
            { label: "Maximum Deposit:", value: "$500,000" },
            { label: "Trading Pairs:", value: "50+" },
            { label: "Regulation:", value: "EU Licensed" },
        ],
        overview: "Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.",
        pros: [
            "Long-established and trusted",
            "Strong security measures",
            "Regulatory compliance",
            "User-friendly interface",
            "Good customer support",
        ],
        cons: [
            "Limited cryptocurrency selection",
            "Higher fees than some competitors",
            "Slower withdrawal times",
            "Limited advanced trading features",
        ],
        features: [
            { title: "Security", description: "Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits." },
            { title: "Regulation", description: "As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind." },
            { title: "Trading Platform", description: "The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management." },
            { title: "Customer Support", description: "Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently." },
        ],
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "70%" },
            { stars: 4, pct: "20%" },
            { stars: 3, pct: "5%" },
            { stars: 2, pct: "3%" },
            { stars: 1, pct: "2%" },
        ],
        comments: [
            {
                author: "Michael Chen",
                initials: "MC",
                date: "September 5, 2024 at 2:45 pm",
                rating: 5,
                comment: "Bitstamp has been my primary exchange for years. The security and regulatory compliance give me confidence. The interface is clean and easy to use, though I wish they had more trading pairs available.",
            },
            {
                author: "Emma Wilson",
                initials: "EW",
                date: "August 20, 2024 at 11:20 am",
                rating: 4,
                comment: "Solid exchange with good security. The fees are a bit higher than some competitors, but the peace of mind is worth it. Customer support has been helpful whenever I've needed assistance.",
            },
        ],
        advantages: [
            "Regulated and licensed",
            "Strong security measures",
            "User-friendly platform",
            "Good customer support",
            "Long track record",
        ],
        disadvantages: [
            "Limited cryptocurrency selection",
            "Higher trading fees",
            "Slower withdrawal processing",
        ],
    },
    roboforex: {
        slug: "roboforex",
        name: "RoboForex",
        rating: 5,
        reviews: 25000,
        description: "RoboForex is known for its innovative tools, multiple account types, and attractive bonuses for traders of all levels. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#001D5F]",
        tags: ["Forex Broker", "Verified", "Global"],
        stats: [
            { icon: "payments", title: "Min Deposit", value: "$10 - $1,000,000" },
            { icon: "percent", title: "Spread", value: "From 0.0 pips" },
            { icon: "schedule", title: "Established", value: "2009" },
            { icon: "trending_up", title: "Leverage", value: "Up to 1:2000" },
            { icon: "account_balance_wallet", title: "Max Funding", value: "$1,000,000" },
        ],
        terms: [
            { label: "Minimum Deposit:", value: "$10" },
            { label: "Maximum Leverage:", value: "1:2000" },
            { label: "Spread:", value: "From 0.0 pips" },
            { label: "Account Types:", value: "5 types" },
        ],
        keyInfo: [
            { label: "Trading Instruments:", value: "12,000+" },
            { label: "Platforms:", value: "MT4, MT5, cTrader" },
            { label: "Regulation:", value: "CySEC, IFSC" },
            { label: "Bonus:", value: "Up to 120%" },
        ],
        overview: "RoboForex has been serving traders since 2009, offering a comprehensive trading experience with multiple account types, advanced platforms, and a wide range of trading instruments. The broker is known for its competitive spreads, high leverage options, and generous bonus programs that cater to traders of all experience levels.",
        pros: [
            "Low minimum deposit",
            "High leverage options",
            "Multiple trading platforms",
            "Wide range of instruments",
            "Attractive bonus programs",
        ],
        cons: [
            "Complex fee structure",
            "Limited educational resources",
            "Customer support varies by region",
        ],
        features: [
            { title: "Account Types", description: "RoboForex offers five different account types to suit various trading styles and experience levels, from beginner-friendly options to advanced ECN accounts." },
            { title: "Trading Platforms", description: "Traders can choose from industry-leading platforms including MetaTrader 4, MetaTrader 5, and cTrader, each offering unique features and tools." },
            { title: "Trading Instruments", description: "Access to over 12,000 trading instruments including forex pairs, stocks, indices, commodities, and cryptocurrencies." },
            { title: "Bonus Programs", description: "RoboForex offers various bonus programs including welcome bonuses, deposit bonuses, and cashback programs to enhance trading opportunities." },
        ],
        averageRating: 4.8,
        ratingBreakdown: [
            { stars: 5, pct: "80%" },
            { stars: 4, pct: "15%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
        ],
        comments: [
            {
                author: "David Martinez",
                initials: "DM",
                date: "September 10, 2024 at 9:15 am",
                rating: 5,
                comment: "RoboForex has been excellent for my trading needs. The low minimum deposit allowed me to start small, and the variety of account types means I can upgrade as I grow. The bonus programs are a nice touch too.",
            },
            {
                author: "Lisa Thompson",
                initials: "LT",
                date: "August 25, 2024 at 4:30 pm",
                rating: 5,
                comment: "Great broker with excellent platform options. I use MT5 and love the advanced features. The spreads are competitive and execution is fast. Highly recommend for serious traders.",
            },
        ],
        advantages: [
            "Low minimum deposit",
            "High leverage available",
            "Multiple platform options",
            "Wide instrument selection",
            "Generous bonuses",
        ],
        disadvantages: [
            "Complex fee structure",
            "Limited educational content",
            "Regional support differences",
        ],
    },
};

export const cryptoExchangesData: Record<string, BrokerData> = {
    binance: {
        slug: "binance",
        name: "Binance",
        rating: 5,
        reviews: 25000,
        description: "Binance is the world's largest cryptocurrency exchange by trading volume. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Yts5TU2eZMfPcCJaorDJ7a0L2f9AWHfDVkU1ArIfgilQ8wAO4YU2ExTcfI_84-aP4tzfqhqUngra5Te7EuKF7HBV6VqILbpXKUjjA9QGEqXGWqCpnz1nft0YKmV8gEC-kDS6SJrofw5PoVJrn4-AJjfWm_junml8oYcgV_XwA3ZTq9lhfrRySl5B4ex8ipx1UI957p-APWD_nkc_wOXtrE_i33E2jmojqgoOiRxjW3T-zEm-MvQqonT61oyL3-DLrRFCyPoVDhk",
        logoBg: "bg-black",
        tags: ["Centralized Exchange", "Verified", "Global"],
        stats: [
            { icon: "payments", title: "Trading Fees", value: "0.1% - 0.02%" },
            { icon: "percent", title: "BNB Discount", value: "25% off fees" },
            { icon: "schedule", title: "Established", value: "2017" },
            { icon: "trending_up", title: "Trading Pairs", value: "600+" },
            { icon: "account_balance_wallet", title: "Daily Volume", value: "$10B+" },
        ],
        terms: [
            { label: "Trading Fees:", value: "0.1% - 0.02%" },
            { label: "Withdrawal Fees:", value: "Varies by coin" },
            { label: "Minimum Trade:", value: "0.001 BTC" },
            { label: "Supported Coins:", value: "600+" },
        ],
        keyInfo: [
            { label: "Spot Trading:", value: "Available" },
            { label: "Futures Trading:", value: "Available" },
            { label: "Staking:", value: "Available" },
            { label: "NFT Marketplace:", value: "Available" },
        ],
        overview: "Binance is the world's largest cryptocurrency exchange by trading volume, serving millions of users worldwide. The platform offers a comprehensive suite of trading services including spot trading, futures, margin trading, staking, and more. With over 600 trading pairs and advanced trading tools, Binance caters to both beginners and professional traders.",
        pros: [
            "Largest trading volume",
            "Low trading fees",
            "Wide selection of coins",
            "Advanced trading features",
            "BNB fee discount",
        ],
        cons: [
            "Complex interface for beginners",
            "Regulatory concerns in some regions",
            "Customer support can be slow",
        ],
        features: [
            { title: "Spot Trading", description: "Binance offers one of the largest selections of cryptocurrency trading pairs with competitive fees and high liquidity for optimal trading execution." },
            { title: "Futures Trading", description: "Advanced futures trading platform with up to 125x leverage, allowing traders to profit from both rising and falling markets." },
            { title: "Staking", description: "Earn passive income by staking various cryptocurrencies directly on the Binance platform with flexible and locked staking options." },
            { title: "Security", description: "Binance employs industry-leading security measures including SAFU fund, two-factor authentication, and cold storage for user funds." },
        ],
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "85%" },
            { stars: 4, pct: "10%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
        ],
        comments: [
            {
                author: "John Doe",
                initials: "JD",
                date: "August 12, 2024 at 10:30 am",
                rating: 5,
                comment: "Binance has been my go-to exchange for years. The sheer volume of coins available and the liquidity is unmatched. The fees are also very reasonable, especially if you hold BNB. The mobile app is feature-rich but can be a bit overwhelming for beginners initially.",
            },
            {
                author: "Sarah Anderson",
                initials: "SA",
                date: "July 28, 2024 at 3:15 pm",
                rating: 4,
                comment: "Good platform overall with great tools for technical analysis. However, customer support can be slow to respond during peak times. The P2P market is excellent for funding your account in regions where direct bank transfers are restricted.",
            },
        ],
        advantages: [
            "Largest trading volume",
            "Low fees with BNB discount",
            "Wide coin selection",
            "Advanced trading tools",
            "Mobile app available",
        ],
        disadvantages: [
            "Complex for beginners",
            "Regulatory issues",
            "Slow customer support",
        ],
    },
    bitstamp: {
        slug: "bitstamp",
        name: "Bitstamp",
        rating: 4.5,
        reviews: 25000,
        description: "Bitstamp is one of the longest-running cryptocurrency exchanges, known for its security and reliability. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#064234]",
        tags: ["Centralized Exchange", "Verified", "European"],
        stats: [
            { icon: "payments", title: "Trading Fees", value: "0.25% - 0.50%" },
            { icon: "percent", title: "Volume Discount", value: "Up to 0.1%" },
            { icon: "schedule", title: "Established", value: "2011" },
            { icon: "security", title: "Security", value: "High" },
            { icon: "account_balance_wallet", title: "Daily Volume", value: "$100M+" },
        ],
        terms: [
            { label: "Trading Fees:", value: "0.25% - 0.50%" },
            { label: "Deposit Methods:", value: "Bank, Card, Crypto" },
            { label: "Withdrawal Time:", value: "1-3 business days" },
            { label: "Supported Countries:", value: "100+" },
        ],
        keyInfo: [
            { label: "Minimum Deposit:", value: "$50" },
            { label: "Trading Pairs:", value: "50+" },
            { label: "Regulation:", value: "EU Licensed" },
            { label: "Security:", value: "Cold Storage" },
        ],
        overview: "Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.",
        pros: [
            "Long-established and trusted",
            "Strong security measures",
            "Regulatory compliance",
            "User-friendly interface",
            "Good customer support",
        ],
        cons: [
            "Limited cryptocurrency selection",
            "Higher fees than some competitors",
            "Slower withdrawal times",
            "Limited advanced trading features",
        ],
        features: [
            { title: "Security", description: "Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits." },
            { title: "Regulation", description: "As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind." },
            { title: "Trading Platform", description: "The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management." },
            { title: "Customer Support", description: "Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently." },
        ],
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "70%" },
            { stars: 4, pct: "20%" },
            { stars: 3, pct: "5%" },
            { stars: 2, pct: "3%" },
            { stars: 1, pct: "2%" },
        ],
        comments: [
            {
                author: "Michael Chen",
                initials: "MC",
                date: "September 5, 2024 at 2:45 pm",
                rating: 5,
                comment: "Bitstamp has been my primary exchange for years. The security and regulatory compliance give me confidence. The interface is clean and easy to use, though I wish they had more trading pairs available.",
            },
            {
                author: "Emma Wilson",
                initials: "EW",
                date: "August 20, 2024 at 11:20 am",
                rating: 4,
                comment: "Solid exchange with good security. The fees are a bit higher than some competitors, but the peace of mind is worth it. Customer support has been helpful whenever I've needed assistance.",
            },
        ],
        advantages: [
            "Regulated and licensed",
            "Strong security measures",
            "User-friendly platform",
            "Good customer support",
            "Long track record",
        ],
        disadvantages: [
            "Limited cryptocurrency selection",
            "Higher trading fees",
            "Slower withdrawal processing",
        ],
    },
    coinbase: {
        slug: "coinbase",
        name: "Coinbase",
        rating: 5,
        reviews: 25000,
        description: "Coinbase is known for its user-friendly interface, secure platform, and wide range of supported cryptocurrencies. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#0052FF]",
        tags: ["Centralized Exchange", "Verified", "US Licensed"],
        stats: [
            { icon: "payments", title: "Trading Fees", value: "0.50% - 1.50%" },
            { icon: "percent", title: "Coinbase Pro", value: "0.00% - 0.50%" },
            { icon: "schedule", title: "Established", value: "2012" },
            { icon: "security", title: "Insurance", value: "FDIC Insured" },
            { icon: "account_balance_wallet", title: "Daily Volume", value: "$2B+" },
        ],
        terms: [
            { label: "Trading Fees:", value: "0.50% - 1.50%" },
            { label: "Deposit Methods:", value: "Bank, Card, Wire" },
            { label: "Withdrawal Time:", value: "1-5 business days" },
            { label: "Supported Coins:", value: "200+" },
        ],
        keyInfo: [
            { label: "Minimum Deposit:", value: "$2" },
            { label: "Trading Pairs:", value: "200+" },
            { label: "Regulation:", value: "US Licensed" },
            { label: "Insurance:", value: "FDIC Insured" },
        ],
        overview: "Coinbase is one of the most trusted cryptocurrency exchanges in the United States, known for its user-friendly interface and strong regulatory compliance. The platform makes it easy for beginners to buy, sell, and store cryptocurrencies while also offering advanced trading features through Coinbase Pro for experienced traders.",
        pros: [
            "User-friendly interface",
            "Strong regulatory compliance",
            "FDIC insurance",
            "Wide coin selection",
            "Excellent mobile app",
        ],
        cons: [
            "Higher fees than competitors",
            "Limited advanced features",
            "Slower customer support",
        ],
        features: [
            { title: "User-Friendly Interface", description: "Coinbase's intuitive interface makes it easy for beginners to buy, sell, and manage their cryptocurrency portfolio with just a few clicks." },
            { title: "Security", description: "Coinbase stores 98% of customer funds in cold storage and provides FDIC insurance for USD balances, offering peace of mind to users." },
            { title: "Coinbase Pro", description: "Advanced traders can use Coinbase Pro for lower fees and more sophisticated trading tools while maintaining access to the same secure infrastructure." },
            { title: "Educational Resources", description: "Coinbase offers extensive educational content through Coinbase Earn, helping users learn about cryptocurrencies while earning rewards." },
        ],
        averageRating: 4.7,
        ratingBreakdown: [
            { stars: 5, pct: "75%" },
            { stars: 4, pct: "18%" },
            { stars: 3, pct: "4%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "1%" },
        ],
        comments: [
            {
                author: "Robert Johnson",
                initials: "RJ",
                date: "September 8, 2024 at 1:20 pm",
                rating: 5,
                comment: "Coinbase is perfect for beginners. The interface is so easy to use, and I feel secure knowing my funds are insured. The mobile app is excellent too. The fees are a bit high, but the peace of mind is worth it.",
            },
            {
                author: "Jennifer Lee",
                initials: "JL",
                date: "August 30, 2024 at 10:45 am",
                rating: 4,
                comment: "Great platform for getting started with crypto. The educational resources are helpful, and I appreciate the regulatory compliance. I do wish the fees were lower, but overall it's a solid exchange.",
            },
        ],
        advantages: [
            "Easy to use",
            "Regulated and insured",
            "Wide coin selection",
            "Great mobile app",
            "Educational resources",
        ],
        disadvantages: [
            "Higher fees",
            "Limited advanced features",
            "Slower support response",
        ],
    },
};

export const propFirmsData: Record<string, BrokerData> = {
    ftmo: {
        slug: "ftmo",
        name: "FTMO",
        rating: 5,
        reviews: 25000,
        description: "FTMO is one of the most popular prop trading firms, offering traders the opportunity to trade with company capital. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#1a1a1a]",
        tags: ["Prop Firm", "Verified", "Global"],
        stats: [
            { icon: "payments", title: "Challenge Fee", value: "$155 - $1,089" },
            { icon: "percent", title: "Profit Split", value: "Up to 90%" },
            { icon: "schedule", title: "Established", value: "2015" },
            { icon: "trending_up", title: "Max Capital", value: "$400,000" },
            { icon: "account_balance_wallet", title: "Payouts", value: "Weekly" },
        ],
        terms: [
            { label: "Challenge Types:", value: "Normal, Aggressive" },
            { label: "Profit Target:", value: "10% - 20%" },
            { label: "Daily Loss:", value: "5%" },
            { label: "Max Drawdown:", value: "10%" },
        ],
        keyInfo: [
            { label: "Minimum Challenge:", value: "$10,000" },
            { label: "Maximum Challenge:", value: "$400,000" },
            { label: "Profit Split:", value: "80% - 90%" },
            { label: "Payout Frequency:", value: "Weekly" },
        ],
        overview: "FTMO (Funded Trading Markets Organization) is one of the leading proprietary trading firms, allowing traders to prove their skills through challenges and trade with company capital. With over 400,000 registered traders and millions in payouts, FTMO has established itself as a trusted name in the prop trading industry.",
        pros: [
            "High profit split (up to 90%)",
            "Weekly payouts",
            "No time limit on challenges",
            "Multiple account sizes",
            "Transparent rules",
        ],
        cons: [
            "Challenge fees required",
            "Strict trading rules",
            "Limited trading styles",
        ],
        features: [
            { title: "Challenge System", description: "FTMO's two-step challenge system allows traders to prove their skills and gain access to funded accounts with company capital." },
            { title: "Profit Split", description: "Traders can earn up to 90% of their profits, with the first payout available after just 4 trading days." },
            { title: "Account Sizes", description: "Choose from account sizes ranging from $10,000 to $400,000, with the option to scale up after consistent performance." },
            { title: "Trading Rules", description: "Clear and transparent trading rules with daily loss limits, maximum drawdown, and profit targets that are achievable for skilled traders." },
        ],
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "88%" },
            { stars: 4, pct: "8%" },
            { stars: 3, pct: "2%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
        ],
        comments: [
            {
                author: "Alex Rodriguez",
                initials: "AR",
                date: "September 12, 2024 at 3:30 pm",
                rating: 5,
                comment: "FTMO has changed my trading career. The challenge was fair, and once I passed, the payouts have been consistent and on time. The profit split is excellent, and the support team is always helpful. Highly recommend!",
            },
            {
                author: "Maria Garcia",
                initials: "MG",
                date: "August 28, 2024 at 11:15 am",
                rating: 5,
                comment: "Best prop firm I've tried. The rules are clear, the platform is easy to use, and the weekly payouts are a game-changer. The scaling plan is also great - I've already increased my account size twice.",
            },
        ],
        advantages: [
            "High profit split",
            "Weekly payouts",
            "No time limits",
            "Multiple account sizes",
            "Scaling plan available",
        ],
        disadvantages: [
            "Challenge fees",
            "Strict rules",
            "Limited trading styles",
        ],
    },
    the5ers: {
        slug: "the5ers",
        name: "The5ers",
        rating: 4.5,
        reviews: 25000,
        description: "The5ers offers a unique prop trading experience with a focus on gradual growth and risk management. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#0066CC]",
        tags: ["Prop Firm", "Verified", "Global"],
        stats: [
            { icon: "payments", title: "Challenge Fee", value: "$95 - $485" },
            { icon: "percent", title: "Profit Split", value: "Up to 80%" },
            { icon: "schedule", title: "Established", value: "2016" },
            { icon: "trending_up", title: "Max Capital", value: "$4,000,000" },
            { icon: "account_balance_wallet", title: "Payouts", value: "Monthly" },
        ],
        terms: [
            { label: "Challenge Types:", value: "Bootcamp" },
            { label: "Profit Target:", value: "6% - 12%" },
            { label: "Daily Loss:", value: "5%" },
            { label: "Max Drawdown:", value: "12%" },
        ],
        keyInfo: [
            { label: "Minimum Challenge:", value: "$4,000" },
            { label: "Maximum Challenge:", value: "$4,000,000" },
            { label: "Profit Split:", value: "50% - 80%" },
            { label: "Payout Frequency:", value: "Monthly" },
        ],
        overview: "The5ers is a proprietary trading firm that focuses on gradual account growth and risk management. The firm's unique Bootcamp program allows traders to start with smaller accounts and gradually scale up as they prove their consistency and profitability.",
        pros: [
            "Lower challenge fees",
            "Gradual scaling system",
            "Focus on risk management",
            "Flexible trading rules",
            "Good educational resources",
        ],
        cons: [
            "Lower profit split than competitors",
            "Monthly payouts only",
            "Longer scaling process",
        ],
        features: [
            { title: "Bootcamp Program", description: "The5ers' Bootcamp program allows traders to start with smaller accounts and gradually scale up, focusing on consistent growth rather than quick profits." },
            { title: "Risk Management", description: "The firm emphasizes proper risk management with clear rules and guidelines to help traders develop sustainable trading strategies." },
            { title: "Scaling System", description: "Traders can scale their accounts from $4,000 to $4,000,000 through consistent performance and meeting specific milestones." },
            { title: "Educational Support", description: "The5ers provides educational resources and support to help traders improve their skills and succeed in the program." },
        ],
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "72%" },
            { stars: 4, pct: "18%" },
            { stars: 3, pct: "6%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "2%" },
        ],
        comments: [
            {
                author: "James Wilson",
                initials: "JW",
                date: "September 5, 2024 at 2:00 pm",
                rating: 4,
                comment: "The5ers is great for traders who want to focus on gradual growth. The lower fees are nice, and the scaling system is fair. The only downside is the monthly payouts, but overall it's a solid prop firm.",
            },
            {
                author: "Sophie Brown",
                initials: "SB",
                date: "August 22, 2024 at 9:30 am",
                rating: 5,
                comment: "I love the gradual scaling approach. It's helped me become a more disciplined trader. The educational resources are also very helpful. Would recommend for traders who are patient and focused on long-term growth.",
            },
        ],
        advantages: [
            "Lower challenge fees",
            "Gradual scaling",
            "Risk management focus",
            "Educational resources",
            "Flexible rules",
        ],
        disadvantages: [
            "Lower profit split",
            "Monthly payouts",
            "Slower scaling",
        ],
    },
    topstep: {
        slug: "topstep",
        name: "TopStep",
        rating: 5,
        reviews: 25000,
        description: "TopStep is known for its innovative tools, multiple account types, and attractive bonuses for traders of all levels. There are many variations of passages of Lorem Ipsum available.",
        logoBg: "bg-[#FF6B00]",
        tags: ["Prop Firm", "Verified", "US Based"],
        stats: [
            { icon: "payments", title: "Challenge Fee", value: "$165 - $499" },
            { icon: "percent", title: "Profit Split", value: "Up to 90%" },
            { icon: "schedule", title: "Established", value: "2012" },
            { icon: "trending_up", title: "Max Capital", value: "$150,000" },
            { icon: "account_balance_wallet", title: "Payouts", value: "Weekly" },
        ],
        terms: [
            { label: "Challenge Types:", value: "Trading Combine" },
            { label: "Profit Target:", value: "6% - 12%" },
            { label: "Daily Loss:", value: "5%" },
            { label: "Max Drawdown:", value: "6%" },
        ],
        keyInfo: [
            { label: "Minimum Challenge:", value: "$50,000" },
            { label: "Maximum Challenge:", value: "$150,000" },
            { label: "Profit Split:", value: "90%" },
            { label: "Payout Frequency:", value: "Weekly" },
        ],
        overview: "TopStep is a leading proprietary trading firm specializing in futures trading. The firm's Trading Combine program allows traders to prove their skills and gain access to funded accounts. With a focus on futures markets, TopStep provides traders with the tools and capital needed to succeed in professional trading.",
        pros: [
            "High profit split (90%)",
            "Weekly payouts",
            "Futures specialization",
            "Good trading tools",
            "Strong community support",
        ],
        cons: [
            "Limited to futures",
            "Stricter drawdown rules",
            "Higher challenge fees",
        ],
        features: [
            { title: "Trading Combine", description: "TopStep's Trading Combine program allows traders to demonstrate their skills through simulated trading before receiving funded accounts." },
            { title: "Futures Focus", description: "Specializing in futures markets, TopStep provides traders with access to a wide range of futures contracts and trading opportunities." },
            { title: "Trading Tools", description: "TopStep provides innovative trading tools and analytics to help traders improve their performance and make informed decisions." },
            { title: "Community Support", description: "The firm offers a strong community of traders with forums, webinars, and educational resources to support trader development." },
        ],
        averageRating: 4.8,
        ratingBreakdown: [
            { stars: 5, pct: "82%" },
            { stars: 4, pct: "12%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "1%" },
        ],
        comments: [
            {
                author: "Daniel Kim",
                initials: "DK",
                date: "September 15, 2024 at 4:45 pm",
                rating: 5,
                comment: "TopStep is excellent for futures traders. The tools are great, and the 90% profit split is fantastic. The weekly payouts are reliable, and the community support is very helpful. Highly recommend for serious futures traders.",
            },
            {
                author: "Rachel Green",
                initials: "RG",
                date: "September 1, 2024 at 1:20 pm",
                rating: 5,
                comment: "Love the futures focus and the trading tools provided. The drawdown rules are strict but fair. The community is very supportive, and I've learned a lot from the webinars and forums.",
            },
        ],
        advantages: [
            "High profit split",
            "Weekly payouts",
            "Futures specialization",
            "Great trading tools",
            "Strong community",
        ],
        disadvantages: [
            "Futures only",
            "Strict drawdown",
            "Higher fees",
        ],
    },
};

export function getBrokerData(type: "forex" | "crypto" | "prop", slug: string): BrokerData | null {
    if (type === "forex") {
        return forexBrokersData[slug] || null;
    } else if (type === "crypto") {
        return cryptoExchangesData[slug] || null;
    } else if (type === "prop") {
        return propFirmsData[slug] || null;
    }
    return null;
}

