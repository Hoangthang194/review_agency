"use client";

import { MarketData } from "./MarketAnalysisContent";

export interface TechnicalAnalysisData {
    symbol: string;
    support: number;
    resistance: number;
    trend: "bullish" | "bearish" | "neutral";
    rsi: number;
    macd: string;
    recommendation: "buy" | "sell" | "hold";
    summary: string;
}

interface TechnicalAnalysisProps {
    marketData: MarketData;
    analysisData: TechnicalAnalysisData;
}

export function TechnicalAnalysis({ marketData, analysisData }: TechnicalAnalysisProps) {
    const formatPrice = (price: number) => {
        if (price < 1) {
            return price.toFixed(4);
        }
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case "bullish":
                return "text-green-600 dark:text-green-400";
            case "bearish":
                return "text-red-600 dark:text-red-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    };

    const getRecommendationColor = (recommendation: string) => {
        switch (recommendation) {
            case "buy":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700";
            case "sell":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700";
            default:
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700";
        }
    };

    const getRSIColor = (rsi: number) => {
        if (rsi > 70) return "text-red-600 dark:text-red-400";
        if (rsi < 30) return "text-green-600 dark:text-green-400";
        return "text-gray-600 dark:text-gray-400";
    };

    return (
        <div className="space-y-4">
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">Technical Analysis</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRecommendationColor(analysisData.recommendation)}`}>
                        {analysisData.recommendation === "buy" ? "Buy" : analysisData.recommendation === "sell" ? "Sell" : "Hold"}
                    </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{analysisData.summary}</p>
            </div>

            {/* Key Levels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Support Level */}
                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-outlined text-green-500 text-sm">arrow_downward</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Support</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {marketData.type === "forex" 
                            ? formatPrice(analysisData.support) 
                            : `$${formatPrice(analysisData.support)}`}
                    </p>
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-500" 
                            style={{ 
                                width: `${Math.max(0, Math.min(100, ((marketData.price - analysisData.support) / (analysisData.resistance - analysisData.support)) * 100))}%` 
                            }}
                        />
                    </div>
                </div>

                {/* Current Price */}
                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-outlined text-blue-500 text-sm">trending_up</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Current Price</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {marketData.type === "forex" 
                            ? formatPrice(marketData.price) 
                            : `$${formatPrice(marketData.price)}`}
                    </p>
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500" 
                            style={{ 
                                width: `${Math.max(0, Math.min(100, ((marketData.price - analysisData.support) / (analysisData.resistance - analysisData.support)) * 100))}%` 
                            }}
                        />
                    </div>
                </div>

                {/* Resistance Level */}
                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-outlined text-red-500 text-sm">arrow_upward</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Resistance</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {marketData.type === "forex" 
                            ? formatPrice(analysisData.resistance) 
                            : `$${formatPrice(analysisData.resistance)}`}
                    </p>
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-500" 
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Technical Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Trend</span>
                        <span className={`text-sm font-bold ${getTrendColor(analysisData.trend)}`}>
                            {analysisData.trend === "bullish" ? "Bullish" : analysisData.trend === "bearish" ? "Bearish" : "Neutral"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {analysisData.trend === "bullish" && (
                            <span className="material-icons-outlined text-green-500 text-sm">trending_up</span>
                        )}
                        {analysisData.trend === "bearish" && (
                            <span className="material-icons-outlined text-red-500 text-sm">trending_down</span>
                        )}
                        {analysisData.trend === "neutral" && (
                            <span className="material-icons-outlined text-gray-500 text-sm">remove</span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {analysisData.trend === "bullish" 
                                ? "Market is in an uptrend"
                                : analysisData.trend === "bearish"
                                ? "Market is in a downtrend"
                                : "Market is moving sideways"}
                        </span>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">RSI (14)</span>
                        <span className={`text-sm font-bold ${getRSIColor(analysisData.rsi)}`}>
                            {analysisData.rsi.toFixed(1)}
                        </span>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Oversold</span>
                            <span>Overbought</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                            <div 
                                className={`h-full ${analysisData.rsi > 70 ? 'bg-red-500' : analysisData.rsi < 30 ? 'bg-green-500' : 'bg-gray-400'}`}
                                style={{ width: `${analysisData.rsi}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>0</span>
                            <span>30</span>
                            <span>70</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-card-dark rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">MACD</span>
                        <span className={`text-sm font-bold ${analysisData.macd.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {analysisData.macd}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {analysisData.macd.startsWith('+') 
                            ? "Buy signal (MACD above signal line)"
                            : "Sell signal (MACD below signal line)"}
                    </p>
                </div>
            </div>
        </div>
    );
}

