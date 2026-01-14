import { ChartDataPoint } from "@/hooks/useCoinGecko";
import { TechnicalAnalysisData } from "@/components/TechnicalAnalysis";

/**
 * Calculate RSI (Relative Strength Index)
 */
function calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) {
        return 50; // Default neutral RSI
    }

    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);
    }

    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    return Math.round(rsi * 10) / 10;
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 */
function calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    if (prices.length < 26) {
        return { macd: 0, signal: 0, histogram: 0 };
    }

    // EMA 12
    const ema12 = calculateEMA(prices, 12);
    // EMA 26
    const ema26 = calculateEMA(prices, 26);
    
    const macd = ema12 - ema26;
    
    // Signal line (EMA 9 of MACD)
    const macdValues = prices.slice(25).map((_, i) => {
        const price12 = calculateEMA(prices.slice(i), 12);
        const price26 = calculateEMA(prices.slice(i), 26);
        return price12 - price26;
    });
    
    const signal = macdValues.length >= 9 ? calculateEMA(macdValues.slice(-9), 9) : macd;
    const histogram = macd - signal;

    return { macd, signal, histogram };
}

/**
 * Calculate EMA (Exponential Moving Average)
 */
function calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) {
        return prices.reduce((a, b) => a + b, 0) / prices.length;
    }

    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;

    for (let i = period; i < prices.length; i++) {
        ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }

    return ema;
}

/**
 * Calculate Support and Resistance levels
 */
function calculateSupportResistance(prices: number[], currentPrice: number): { support: number; resistance: number } {
    if (prices.length === 0) {
        return { support: currentPrice * 0.95, resistance: currentPrice * 1.05 };
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    
    // Support is typically 2-3% below current price or near recent low
    const support = Math.min(
        currentPrice * 0.97, // 3% below current
        min + (range * 0.2)  // Near recent low
    );
    
    // Resistance is typically 2-3% above current price or near recent high
    const resistance = Math.max(
        currentPrice * 1.03, // 3% above current
        max - (range * 0.2)  // Near recent high
    );

    return {
        support: Math.round(support * 100) / 100,
        resistance: Math.round(resistance * 100) / 100,
    };
}

/**
 * Determine trend from price data
 */
function determineTrend(prices: number[]): "bullish" | "bearish" | "neutral" {
    if (prices.length < 2) return "neutral";

    const shortTerm = prices.slice(-5); // Last 5 points
    const longTerm = prices.slice(-20, -5); // Previous 5 points before last 5

    if (shortTerm.length < 2 || longTerm.length < 2) return "neutral";

    const shortAvg = shortTerm.reduce((a, b) => a + b, 0) / shortTerm.length;
    const longAvg = longTerm.reduce((a, b) => a + b, 0) / longTerm.length;

    const difference = ((shortAvg - longAvg) / longAvg) * 100;

    if (difference > 1) return "bullish";
    if (difference < -1) return "bearish";
    return "neutral";
}

/**
 * Generate recommendation based on technical indicators
 */
function generateRecommendation(
    rsi: number,
    macd: number,
    trend: "bullish" | "bearish" | "neutral",
    currentPrice: number,
    support: number,
    resistance: number
): "buy" | "sell" | "hold" {
    let score = 0;

    // RSI signals
    if (rsi < 30) score += 2; // Oversold - buy signal
    if (rsi > 70) score -= 2; // Overbought - sell signal

    // MACD signals
    if (macd > 0) score += 1; // Positive MACD - buy signal
    if (macd < 0) score -= 1; // Negative MACD - sell signal

    // Trend signals
    if (trend === "bullish") score += 1;
    if (trend === "bearish") score -= 1;

    // Price position
    const priceRange = resistance - support;
    const pricePosition = (currentPrice - support) / priceRange;
    if (pricePosition < 0.3) score += 1; // Near support - buy
    if (pricePosition > 0.7) score -= 1; // Near resistance - sell

    if (score >= 2) return "buy";
    if (score <= -2) return "sell";
    return "hold";
}

/**
 * Format price for display based on asset type
 */
function formatPriceForSummary(price: number, assetType?: "crypto" | "forex" | "stock"): string {
    if (assetType === "forex") {
        // For forex pairs (except XAU/USD which is actually a commodity), don't use $ sign
        // XAU/USD is actually gold, so we can use $ for it
        if (price < 100) {
            // Regular forex pairs like EUR/USD (around 1.08)
            return price.toFixed(4);
        } else {
            // XAU/USD (gold) is usually > 2000
            return `$${price.toFixed(2)}`;
        }
    }
    // For crypto and stocks, use $ sign
    return `$${price.toFixed(2)}`;
}

/**
 * Generate summary text
 */
function generateSummary(
    symbol: string,
    trend: "bullish" | "bearish" | "neutral",
    rsi: number,
    macd: number,
    currentPrice: number,
    support: number,
    resistance: number,
    recommendation: "buy" | "sell" | "hold",
    assetType?: "crypto" | "forex" | "stock"
): string {
    const trendText = trend === "bullish" ? "uptrend" : trend === "bearish" ? "downtrend" : "sideways movement";
    
    let summary = `${symbol} is currently showing ${trendText}. `;
    
    if (rsi > 70) {
        summary += "RSI indicates overbought conditions. ";
    } else if (rsi < 30) {
        summary += "RSI indicates oversold conditions, potential buying opportunity. ";
    } else {
        summary += `RSI is at ${rsi.toFixed(1)}, indicating neutral momentum. `;
    }

    if (macd > 0) {
        summary += "MACD is positive, suggesting bullish momentum. ";
    } else {
        summary += "MACD is negative, suggesting bearish momentum. ";
    }

    const priceText = formatPriceForSummary(currentPrice, assetType);
    const supportText = formatPriceForSummary(support, assetType);
    const resistanceText = formatPriceForSummary(resistance, assetType);
    
    summary += `Current price is ${priceText}. `;
    summary += `Support level at ${supportText} and resistance at ${resistanceText}. `;
    
    if (recommendation === "buy") {
        summary += "Recommend buying on pullback to support zone or breakout above resistance.";
    } else if (recommendation === "sell") {
        summary += "Recommend selling at resistance zone or if price breaks below support.";
    } else {
        summary += "Recommend holding and waiting for clearer signals.";
    }

    return summary;
}

/**
 * Calculate technical analysis from real-time price data
 */
export function calculateTechnicalAnalysis(
    chartData: ChartDataPoint[],
    symbol: string,
    currentPrice: number,
    dataDate?: Date,
    assetType?: "crypto" | "forex" | "stock"
): TechnicalAnalysisData {
    if (chartData.length === 0) {
        // Fallback data
        return {
            symbol,
            support: currentPrice * 0.97,
            resistance: currentPrice * 1.03,
            trend: "neutral",
            rsi: 50,
            macd: "0.00",
            recommendation: "hold",
            summary: `Insufficient data for ${symbol} technical analysis.`,
        };
    }

    const prices = chartData.map(point => point.price);
    
    // Calculate indicators
    const rsi = calculateRSI(prices);
    const { macd, signal, histogram } = calculateMACD(prices);
    const { support, resistance } = calculateSupportResistance(prices, currentPrice);
    const trend = determineTrend(prices);
    const recommendation = generateRecommendation(rsi, macd, trend, currentPrice, support, resistance);

    // Format MACD - for forex, adjust precision
    let macdString: string;
    if (assetType === "forex" && Math.abs(macd) < 1) {
        // For forex pairs, MACD is usually very small (e.g., 0.0012)
        macdString = macd >= 0 
            ? `+${macd.toFixed(4)}` 
            : macd.toFixed(4);
    } else {
        // For crypto/stocks, use 2 decimal places
        macdString = macd >= 0 
            ? `+${macd.toFixed(2)}` 
            : macd.toFixed(2);
    }

    const summary = generateSummary(symbol, trend, rsi, macd, currentPrice, support, resistance, recommendation, assetType);

    return {
        symbol,
        support,
        resistance,
        trend,
        rsi,
        macd: macdString,
        recommendation,
        summary,
    };
}

/**
 * Format date for display
 */
export function formatChartDate(timestamp: number | Date): string {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

