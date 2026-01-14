import { MarketData } from "@/components/MarketAnalysisContent";

export const marketData: MarketData[] = [
    { symbol: "BTC/USD", name: "Bitcoin", price: 43250.50, change: 1250.30, changePercent: 2.98, volume: "$28.5B", marketCap: "$845B", type: "crypto" },
    { symbol: "ETH/USD", name: "Ethereum", price: 2650.75, change: -45.20, changePercent: -1.68, volume: "$12.3B", marketCap: "$318B", type: "crypto" },
    { symbol: "BNB/USD", name: "Binance Coin", price: 312.40, change: 8.15, changePercent: 2.68, volume: "$1.2B", marketCap: "$47B", type: "crypto" },
    { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.0856, change: 0.0023, changePercent: 0.21, volume: "$45.2B", type: "forex" },
    { symbol: "GBP/USD", name: "British Pound / US Dollar", price: 1.2624, change: -0.0015, changePercent: -0.12, volume: "$28.7B", type: "forex" },
    { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: 149.85, change: 0.52, changePercent: 0.35, volume: "$35.4B", type: "forex" },
    { symbol: "XAU/USD", name: "Gold / US Dollar", price: 2650.50, change: 15.30, changePercent: 0.58, volume: "$2.5B", type: "forex" },
    { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 2.30, changePercent: 1.31, volume: "$8.9B", marketCap: "$2.8T", type: "stock" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.92, change: -3.45, changePercent: -0.90, volume: "$4.2B", marketCap: "$2.8T", type: "stock" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.67, change: 1.85, changePercent: 1.31, volume: "$2.1B", marketCap: "$1.8T", type: "stock" },
];

