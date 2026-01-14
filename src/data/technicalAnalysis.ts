import type { TechnicalAnalysisData } from "@/components/TechnicalAnalysis";

// Generate technical analysis data for each symbol
export const technicalAnalysisData: Record<string, TechnicalAnalysisData> = {
    "BTC/USD": {
        symbol: "BTC/USD",
        support: 42000,
        resistance: 45000,
        trend: "bullish",
        rsi: 62.5,
        macd: "+125.30",
        recommendation: "buy",
        summary: "Bitcoin is in a strong uptrend with RSI at neutral levels. Price is approaching the resistance zone at $45,000. Recommend buying on pullback to support zone at $42,000."
    },
    "ETH/USD": {
        symbol: "ETH/USD",
        support: 2600,
        resistance: 2750,
        trend: "bearish",
        rsi: 45.8,
        macd: "-15.20",
        recommendation: "hold",
        summary: "Ethereum is in a correction phase after the previous rally. RSI at neutral levels. Recommend holding or waiting for breakout signal above $2,750."
    },
    "BNB/USD": {
        symbol: "BNB/USD",
        support: 305,
        resistance: 325,
        trend: "bullish",
        rsi: 58.3,
        macd: "+8.15",
        recommendation: "buy",
        summary: "Binance Coin is showing positive upward momentum. RSI indicates no overbought signs. Recommend buying at support zone $305 with target $325."
    },
    "EUR/USD": {
        symbol: "EUR/USD",
        support: 1.0820,
        resistance: 1.0920,
        trend: "neutral",
        rsi: 52.1,
        macd: "+0.0012",
        recommendation: "hold",
        summary: "EUR/USD pair is in a sideways trading range. RSI neutral. Recommend trading within range 1.0820 - 1.0920, buy at support and sell at resistance."
    },
    "GBP/USD": {
        symbol: "GBP/USD",
        support: 1.2580,
        resistance: 1.2680,
        trend: "bearish",
        rsi: 48.5,
        macd: "-0.0015",
        recommendation: "sell",
        summary: "GBP/USD pair is in a slight downtrend. MACD shows sell signal. Recommend selling at resistance zone 1.2680 with target at support 1.2580."
    },
    "USD/JPY": {
        symbol: "USD/JPY",
        support: 149.00,
        resistance: 150.50,
        trend: "bullish",
        rsi: 55.8,
        macd: "+0.35",
        recommendation: "buy",
        summary: "USD/JPY is in an uptrend with strong momentum. RSI not yet in overbought territory. Recommend buying at support 149.00 with target 150.50."
    },
    "AAPL": {
        symbol: "AAPL",
        support: 175.00,
        resistance: 182.00,
        trend: "bullish",
        rsi: 60.2,
        macd: "+2.15",
        recommendation: "buy",
        summary: "Apple is in a positive uptrend. RSI shows strong buying momentum but not overbought. Recommend buying on pullback to $175 with target $182."
    },
    "MSFT": {
        symbol: "MSFT",
        support: 375.00,
        resistance: 385.00,
        trend: "bearish",
        rsi: 48.3,
        macd: "-2.50",
        recommendation: "hold",
        summary: "Microsoft is in a correction phase after the rally. RSI neutral. Recommend holding or waiting for breakout signal above $385 to confirm continuation of trend."
    },
    "GOOGL": {
        symbol: "GOOGL",
        support: 140.00,
        resistance: 146.00,
        trend: "bullish",
        rsi: 56.7,
        macd: "+1.65",
        recommendation: "buy",
        summary: "Alphabet is showing upward momentum with positive MACD. RSI at healthy levels. Recommend buying at support zone $140 with target $146."
    },
    "XAU/USD": {
        symbol: "XAU/USD",
        support: 2600.00,
        resistance: 2700.00,
        trend: "bullish",
        rsi: 58.5,
        macd: "+12.50",
        recommendation: "buy",
        summary: "Gold is showing positive upward momentum with RSI at neutral levels. Price is approaching the resistance zone. Recommend buying on pullback to support zone."
    },
};

