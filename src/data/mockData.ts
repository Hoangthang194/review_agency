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
    content: string;
    pros: string[];
    cons: string[];
    averageRating: number;
    ratingBreakdown: {
        stars: number;
        pct: string;
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
        content: `<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>

<h3>Low Spreads</h3>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>

<h3>Fast Execution</h3>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>

<h3>Multiple Platforms</h3>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>

<h3>Regulation</h3>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>`,
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
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "85%" },
            { stars: 4, pct: "60%" },
            { stars: 3, pct: "15%" },
            { stars: 2, pct: "5%" },
            { stars: 1, pct: "8%" },
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
        content: `<p>Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.</p>

<h3>Security</h3>
<p>Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits.</p>

<h3>Regulation</h3>
<p>As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind.</p>

<h3>Trading Platform</h3>
<p>The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management.</p>

<h3>Customer Support</h3>
<p>Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently.</p>`,
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
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "70%" },
            { stars: 4, pct: "20%" },
            { stars: 3, pct: "5%" },
            { stars: 2, pct: "3%" },
            { stars: 1, pct: "2%" },
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
        content: `<p>RoboForex has been serving traders since 2009, offering a comprehensive trading experience with multiple account types, advanced platforms, and a wide range of trading instruments. The broker is known for its competitive spreads, high leverage options, and generous bonus programs that cater to traders of all experience levels.</p>

<h3>Account Types</h3>
<p>RoboForex offers five different account types to suit various trading styles and experience levels, from beginner-friendly options to advanced ECN accounts.</p>

<h3>Trading Platforms</h3>
<p>Traders can choose from industry-leading platforms including MetaTrader 4, MetaTrader 5, and cTrader, each offering unique features and tools.</p>

<h3>Trading Instruments</h3>
<p>Access to over 12,000 trading instruments including forex pairs, stocks, indices, commodities, and cryptocurrencies.</p>

<h3>Bonus Programs</h3>
<p>RoboForex offers various bonus programs including welcome bonuses, deposit bonuses, and cashback programs to enhance trading opportunities.</p>`,
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
        averageRating: 4.8,
        ratingBreakdown: [
            { stars: 5, pct: "80%" },
            { stars: 4, pct: "15%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
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
        content: `<p>Binance is the world's largest cryptocurrency exchange by trading volume, serving millions of users worldwide. The platform offers a comprehensive suite of trading services including spot trading, futures, margin trading, staking, and more. With over 600 trading pairs and advanced trading tools, Binance caters to both beginners and professional traders.</p>

<h3>Spot Trading</h3>
<p>Binance offers one of the largest selections of cryptocurrency trading pairs with competitive fees and high liquidity for optimal trading execution.</p>

<h3>Futures Trading</h3>
<p>Advanced futures trading platform with up to 125x leverage, allowing traders to profit from both rising and falling markets.</p>

<h3>Staking</h3>
<p>Earn passive income by staking various cryptocurrencies directly on the Binance platform with flexible and locked staking options.</p>

<h3>Security</h3>
<p>Binance employs industry-leading security measures including SAFU fund, two-factor authentication, and cold storage for user funds.</p>`,
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
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "85%" },
            { stars: 4, pct: "10%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
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
        content: `<p>Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.</p>

<h3>Security</h3>
<p>Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits.</p>

<h3>Regulation</h3>
<p>As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind.</p>

<h3>Trading Platform</h3>
<p>The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management.</p>

<h3>Customer Support</h3>
<p>Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently.</p>`,
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
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "70%" },
            { stars: 4, pct: "20%" },
            { stars: 3, pct: "5%" },
            { stars: 2, pct: "3%" },
            { stars: 1, pct: "2%" },
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
        content: `<p>Coinbase is one of the most trusted cryptocurrency exchanges in the United States, known for its user-friendly interface and strong regulatory compliance. The platform makes it easy for beginners to buy, sell, and store cryptocurrencies while also offering advanced trading features through Coinbase Pro for experienced traders.</p>

<h3>User-Friendly Interface</h3>
<p>Coinbase's intuitive interface makes it easy for beginners to buy, sell, and manage their cryptocurrency portfolio with just a few clicks.</p>

<h3>Security</h3>
<p>Coinbase stores 98% of customer funds in cold storage and provides FDIC insurance for USD balances, offering peace of mind to users.</p>

<h3>Coinbase Pro</h3>
<p>Advanced traders can use Coinbase Pro for lower fees and more sophisticated trading tools while maintaining access to the same secure infrastructure.</p>

<h3>Educational Resources</h3>
<p>Coinbase offers extensive educational content through Coinbase Earn, helping users learn about cryptocurrencies while earning rewards.</p>`,
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
        averageRating: 4.7,
        ratingBreakdown: [
            { stars: 5, pct: "75%" },
            { stars: 4, pct: "18%" },
            { stars: 3, pct: "4%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "1%" },
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
        content: `<p>FTMO (Funded Trading Markets Organization) is one of the leading proprietary trading firms, allowing traders to prove their skills through challenges and trade with company capital. With over 400,000 registered traders and millions in payouts, FTMO has established itself as a trusted name in the prop trading industry.</p>

<h3>Challenge System</h3>
<p>FTMO's two-step challenge system allows traders to prove their skills and gain access to funded accounts with company capital.</p>

<h3>Profit Split</h3>
<p>Traders can earn up to 90% of their profits, with the first payout available after just 4 trading days.</p>

<h3>Account Sizes</h3>
<p>Choose from account sizes ranging from $10,000 to $400,000, with the option to scale up after consistent performance.</p>

<h3>Trading Rules</h3>
<p>Clear and transparent trading rules with daily loss limits, maximum drawdown, and profit targets that are achievable for skilled traders.</p>`,
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
        averageRating: 4.9,
        ratingBreakdown: [
            { stars: 5, pct: "88%" },
            { stars: 4, pct: "8%" },
            { stars: 3, pct: "2%" },
            { stars: 2, pct: "1%" },
            { stars: 1, pct: "1%" },
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
        content: `<p>The5ers is a proprietary trading firm that focuses on gradual account growth and risk management. The firm's unique Bootcamp program allows traders to start with smaller accounts and gradually scale up as they prove their consistency and profitability.</p>

<h3>Bootcamp Program</h3>
<p>The5ers' Bootcamp program allows traders to start with smaller accounts and gradually scale up, focusing on consistent growth rather than quick profits.</p>

<h3>Risk Management</h3>
<p>The firm emphasizes proper risk management with clear rules and guidelines to help traders develop sustainable trading strategies.</p>

<h3>Scaling System</h3>
<p>Traders can scale their accounts from $4,000 to $4,000,000 through consistent performance and meeting specific milestones.</p>

<h3>Educational Support</h3>
<p>The5ers provides educational resources and support to help traders improve their skills and succeed in the program.</p>`,
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
        averageRating: 4.5,
        ratingBreakdown: [
            { stars: 5, pct: "72%" },
            { stars: 4, pct: "18%" },
            { stars: 3, pct: "6%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "2%" },
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
        content: `<p>TopStep is a leading proprietary trading firm specializing in futures trading. The firm's Trading Combine program allows traders to prove their skills and gain access to funded accounts. With a focus on futures markets, TopStep provides traders with the tools and capital needed to succeed in professional trading.</p>

<h3>Trading Combine</h3>
<p>TopStep's Trading Combine program allows traders to demonstrate their skills through simulated trading before receiving funded accounts.</p>

<h3>Futures Focus</h3>
<p>Specializing in futures markets, TopStep provides traders with access to a wide range of futures contracts and trading opportunities.</p>

<h3>Trading Tools</h3>
<p>TopStep provides innovative trading tools and analytics to help traders improve their performance and make informed decisions.</p>

<h3>Community Support</h3>
<p>The firm offers a strong community of traders with forums, webinars, and educational resources to support trader development.</p>`,
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
        averageRating: 4.8,
        ratingBreakdown: [
            { stars: 5, pct: "82%" },
            { stars: 4, pct: "12%" },
            { stars: 3, pct: "3%" },
            { stars: 2, pct: "2%" },
            { stars: 1, pct: "1%" },
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
