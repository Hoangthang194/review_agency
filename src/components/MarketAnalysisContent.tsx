"use client";

import { MarketSidebar } from "./MarketSidebar";
import { MarketChart } from "./MarketChart";
import { TechnicalAnalysis } from "./TechnicalAnalysis";
import { technicalAnalysisData as fallbackTechnicalAnalysis } from "@/data/technicalAnalysis";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useCryptoChartData } from "@/hooks/useMarketData";
import { useForexChartData } from "@/hooks/useForexData";
import { useStockChartData } from "@/hooks/useStockData";
import { calculateTechnicalAnalysis, formatChartDate } from "@/utils/technicalAnalysis";
import { ChartDataPoint as CoinGeckoChartDataPoint } from "@/hooks/useCoinGecko";
import React from "react";

// Component to manage crypto chart and real-time analysis
function CryptoSectionWithAnalysis({ item }: { item: MarketData }) {
    const [realTimeAnalysis, setRealTimeAnalysis] = useState<any | null>(null);
    const fallbackAnalysis = fallbackTechnicalAnalysis[item.symbol];
    
    const handleAnalysisReady = (analysis: any) => {
        setRealTimeAnalysis(analysis);
    };
    
    return (
        <>
            <CryptoChartWrapper 
                symbol={item.symbol} 
                marketItem={item}
                onAnalysisReady={handleAnalysisReady}
            />
            <div className="p-6">
                {realTimeAnalysis ? (
                    <TechnicalAnalysis marketData={item} analysisData={realTimeAnalysis} />
                ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Calculating technical analysis...</p>
                    </div>
                )}
            </div>
        </>
    );
}

// Component to fetch and display crypto chart data
function CryptoChartWrapper({ 
    symbol, 
    marketItem, 
    onAnalysisReady 
}: { 
    symbol: string; 
    marketItem: MarketData;
    onAnalysisReady?: (analysis: any) => void;
}) {
    // Fetch 24 hours of hourly data (days=1 gives hourly data from CoinGecko)
    const days = 1; // 1 day = hourly data
    const { data: chartData, loading: chartLoading } = useCryptoChartData(symbol, days);
    
    // Calculate technical analysis from real-time data
    const realTimeAnalysis = useMemo(() => {
        if (!chartData || chartData.length === 0) {
            return fallbackTechnicalAnalysis[symbol] || null;
        }
        
        // Get latest price and date
        const latestData = chartData[chartData.length - 1];
        const dataDate = new Date(latestData.timestamp);
        
        return calculateTechnicalAnalysis(
            chartData,
            symbol,
            marketItem.price,
            dataDate,
            marketItem.type // Pass type to handle formatting correctly
        );
    }, [chartData, symbol, marketItem.price, marketItem.type]);
    
    // Notify parent component when analysis is ready
    useEffect(() => {
        if (realTimeAnalysis && onAnalysisReady) {
            onAnalysisReady(realTimeAnalysis);
        }
    }, [realTimeAnalysis, onAnalysisReady]);
    
    // Get data date range for display
    const dataDateRange = useMemo(() => {
        if (!chartData || chartData.length === 0) return null;
        
        const firstDate = new Date(chartData[0].timestamp);
        const lastDate = new Date(chartData[chartData.length - 1].timestamp);
        
        return {
            from: formatChartDate(firstDate.getTime()),
            to: formatChartDate(lastDate.getTime()),
        };
    }, [chartData]);
    
    return (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    24h Price Chart
                </h3>
                {dataDateRange && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="material-icons-outlined text-xs align-middle mr-1">schedule</span>
                        Data: {dataDateRange.from.split(',')[0]} - {dataDateRange.to.split(',')[0]}
                        <span className="ml-2 text-green-500">●</span> Live
                    </div>
                )}
            </div>
            {chartLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Loading chart...</p>
                    </div>
                </div>
            ) : (
                <MarketChart 
                    marketData={[marketItem]} 
                    selectedSymbol={symbol}
                    coinGeckoData={marketItem.type === "crypto" ? chartData : undefined}
                    days={marketItem.type === "crypto" ? days : undefined}
                />
            )}
        </div>
    );
}

// Component to fetch and display forex chart data
function ForexChartWrapper({ 
    symbol, 
    marketItem, 
    onAnalysisReady 
}: { 
    symbol: string; 
    marketItem: MarketData;
    onAnalysisReady?: (analysis: any, currentPrice?: number | null) => void;
}) {
    // Fetch 30 days of forex data
    const days = 30;
    const { data: chartData, rawData, loading: chartLoading, currentPrice } = useForexChartData(symbol, days);
    
    // Calculate technical analysis from real-time data
    const realTimeAnalysis = useMemo(() => {
        if (!rawData || rawData.length === 0) {
            return fallbackTechnicalAnalysis[symbol] || null;
        }
        
        // Convert forex data to CoinGecko format for technical analysis
        const chartDataForAnalysis: CoinGeckoChartDataPoint[] = rawData.map(point => ({
            time: point.time,
            price: point.price,
            timestamp: point.timestamp,
        }));
        
        // Use latest price from API data, or currentPrice from hook, or fallback to marketItem.price
        const latestData = rawData[rawData.length - 1];
        const price = latestData?.price || currentPrice || marketItem.price;
        const dataDate = latestData ? new Date(latestData.timestamp) : new Date();
        
        return calculateTechnicalAnalysis(
            chartDataForAnalysis,
            symbol,
            price,
            dataDate,
            marketItem.type // Pass type to handle formatting correctly
        );
    }, [rawData, symbol, currentPrice, marketItem.price, marketItem.type]);
    
    // Notify parent component when analysis is ready
    useEffect(() => {
        if (realTimeAnalysis && onAnalysisReady) {
            // Pass both analysis and currentPrice so parent can update the price
            const latestData = rawData && rawData.length > 0 ? rawData[rawData.length - 1] : null;
            const priceToPass = latestData?.price || currentPrice || null;
            onAnalysisReady(realTimeAnalysis, priceToPass);
        }
    }, [realTimeAnalysis, onAnalysisReady, currentPrice, rawData]);
    
    // Get data date range for display
    const dataDateRange = useMemo(() => {
        if (!rawData || rawData.length === 0) return null;
        
        const firstDate = new Date(rawData[0].timestamp);
        const lastDate = new Date(rawData[rawData.length - 1].timestamp);
        
        return {
            from: formatChartDate(firstDate),
            to: formatChartDate(lastDate),
        };
    }, [rawData]);
    
    // Memoize coinGeckoData to prevent infinite re-renders
    const memoizedCoinGeckoData = useMemo(() => {
        if (!rawData) return undefined;
        return rawData.map(p => ({
            time: p.time,
            price: p.price,
            timestamp: p.timestamp,
        }));
    }, [rawData]);
    
    return (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {days} Days Price Chart
                </h3>
                {dataDateRange && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="material-icons-outlined text-xs align-middle mr-1">schedule</span>
                        Data: {dataDateRange.from.split(',')[0]} - {dataDateRange.to.split(',')[0]}
                        <span className="ml-2 text-green-500">●</span> Live
                    </div>
                )}
            </div>
            {chartLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Loading chart...</p>
                    </div>
                </div>
            ) : (
                <MarketChart 
                    marketData={[marketItem]} 
                    selectedSymbol={symbol}
                    coinGeckoData={memoizedCoinGeckoData}
                    days={days}
                />
            )}
        </div>
    );
}

// Component to fetch and display stock chart data
function StockChartWrapper({ 
    symbol, 
    marketItem, 
    onAnalysisReady 
}: { 
    symbol: string; 
    marketItem: MarketData;
    onAnalysisReady?: (analysis: any, currentPrice?: number | null) => void;
}) {
    // Fetch 30 days of stock data
    const days = 30;
    const { data: chartData, rawData, loading: chartLoading, currentPrice } = useStockChartData(symbol, days);
    
    // Calculate technical analysis from real-time data
    const realTimeAnalysis = useMemo(() => {
        if (!rawData || rawData.length === 0) {
            return fallbackTechnicalAnalysis[symbol] || null;
        }
        
        // Convert stock data to CoinGecko format for technical analysis
        const chartDataForAnalysis: CoinGeckoChartDataPoint[] = rawData.map(point => ({
            time: point.time,
            price: point.price,
            timestamp: point.timestamp,
        }));
        
        // Use latest price from API data, or currentPrice from hook, or fallback to marketItem.price
        const latestData = rawData[rawData.length - 1];
        const price = latestData?.price || currentPrice || marketItem.price;
        const dataDate = latestData ? new Date(latestData.timestamp) : new Date();
        
        return calculateTechnicalAnalysis(
            chartDataForAnalysis,
            symbol,
            price,
            dataDate,
            marketItem.type // Pass type to handle formatting correctly
        );
    }, [rawData, symbol, currentPrice, marketItem.price, marketItem.type]);
    
    // Notify parent component when analysis is ready
    useEffect(() => {
        if (realTimeAnalysis && onAnalysisReady) {
            // Pass both analysis and currentPrice so parent can update the price
            const latestData = rawData && rawData.length > 0 ? rawData[rawData.length - 1] : null;
            const priceToPass = latestData?.price || currentPrice || null;
            onAnalysisReady(realTimeAnalysis, priceToPass);
        }
    }, [realTimeAnalysis, onAnalysisReady, currentPrice, rawData]);
    
    // Get data date range for display
    const dataDateRange = useMemo(() => {
        if (!rawData || rawData.length === 0) return null;
        
        const firstDate = new Date(rawData[0].timestamp);
        const lastDate = new Date(rawData[rawData.length - 1].timestamp);
        
        return {
            from: formatChartDate(firstDate),
            to: formatChartDate(lastDate),
        };
    }, [rawData]);
    
    // Memoize coinGeckoData to prevent infinite re-renders
    const memoizedCoinGeckoData = useMemo(() => {
        if (!rawData) return undefined;
        return rawData.map(p => ({
            time: p.time,
            price: p.price,
            timestamp: p.timestamp,
        }));
    }, [rawData]);
    
    return (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {days} Days Price Chart
                </h3>
                {dataDateRange && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="material-icons-outlined text-xs align-middle mr-1">schedule</span>
                        Data: {dataDateRange.from.split(',')[0]} - {dataDateRange.to.split(',')[0]}
                        <span className="ml-2 text-green-500">●</span> Live
                    </div>
                )}
            </div>
            {chartLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Loading chart...</p>
                    </div>
                </div>
            ) : (
                <MarketChart 
                    marketData={[marketItem]} 
                    selectedSymbol={symbol}
                    coinGeckoData={memoizedCoinGeckoData}
                    days={days}
                />
            )}
        </div>
    );
}

// Component to manage stock chart and real-time analysis
function StockSectionWithAnalysis({ item }: { item: MarketData }) {
    const [realTimeAnalysis, setRealTimeAnalysis] = useState<any | null>(null);
    const [updatedMarketItem, setUpdatedMarketItem] = useState<MarketData>(item);
    const fallbackAnalysis = fallbackTechnicalAnalysis[item.symbol];
    
    // Memoize callback to prevent infinite loops
    const handleAnalysisReady = useCallback((analysis: any, currentPrice?: number | null) => {
        setRealTimeAnalysis(analysis);
        // Update marketItem price if we have real-time price from API
        if (currentPrice !== null && currentPrice !== undefined) {
            setUpdatedMarketItem(prev => ({
                ...prev,
                price: currentPrice
            }));
        }
    }, []);
    
    return (
        <>
            <StockChartWrapper 
                symbol={item.symbol} 
                marketItem={item}
                onAnalysisReady={handleAnalysisReady}
            />
            <div className="p-6">
                {realTimeAnalysis ? (
                    <TechnicalAnalysis 
                        marketData={updatedMarketItem} 
                        analysisData={realTimeAnalysis} 
                    />
                ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Calculating technical analysis...</p>
                    </div>
                )}
            </div>
        </>
    );
}

// Component to manage forex chart and real-time analysis
function ForexSectionWithAnalysis({ item }: { item: MarketData }) {
    const [realTimeAnalysis, setRealTimeAnalysis] = useState<any | null>(null);
    const [updatedMarketItem, setUpdatedMarketItem] = useState<MarketData>(item);
    const fallbackAnalysis = fallbackTechnicalAnalysis[item.symbol];
    
    // Memoize callback to prevent infinite loops
    const handleAnalysisReady = useCallback((analysis: any, currentPrice?: number | null) => {
        setRealTimeAnalysis(analysis);
        // Update marketItem price if we have real-time price from API
        if (currentPrice !== null && currentPrice !== undefined) {
            setUpdatedMarketItem(prev => ({
                ...prev,
                price: currentPrice
            }));
        }
    }, []);
    
    return (
        <>
            <ForexChartWrapper 
                symbol={item.symbol} 
                marketItem={item}
                onAnalysisReady={handleAnalysisReady}
            />
            <div className="p-6">
                {realTimeAnalysis ? (
                    <TechnicalAnalysis 
                        marketData={updatedMarketItem} 
                        analysisData={realTimeAnalysis} 
                    />
                ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Calculating technical analysis...</p>
                    </div>
                )}
            </div>
        </>
    );
}

export interface MarketData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: string;
    marketCap?: string;
    type: "crypto" | "forex" | "stock";
}

interface MarketAnalysisContentProps {
    marketData: MarketData[];
    title: string;
    breadcrumbs: Array<{ label: string; href?: string }>;
    type: "crypto" | "forex" | "stock" | "all";
    headerIcon: string;
    headerColor: string;
    showMarketCap?: boolean;
}

export function MarketAnalysisContent({
    marketData,
    title,
    breadcrumbs,
    type,
    headerIcon,
    headerColor,
    showMarketCap = false,
}: MarketAnalysisContentProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSidebarSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Filter function
    const filterData = (data: MarketData[]) => {
        return data.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    const filteredData = filterData(marketData);

    const formatPrice = (price: number) => {
        if (price < 1) {
            return price.toFixed(4);
        }
        // Sử dụng locale cố định 'en-US' để tránh hydration error
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Component để render bảng dữ liệu
    const renderMarketTable = (data: MarketData[], showMarketCap: boolean) => {
        if (data.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No data available
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Symbol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Change
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                % Change
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Volume
                            </th>
                            {showMarketCap && (
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Market Cap
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {item.symbol}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {item.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {item.type === "forex" ? formatPrice(item.price) : `$${formatPrice(item.price)}`}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className={`text-sm font-medium ${
                                        item.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}>
                                        {item.change >= 0 ? "+" : ""}
                                        {item.type === "forex" ? formatPrice(item.change) : `$${formatPrice(item.change)}`}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className={`text-sm font-medium flex items-center justify-end gap-1 ${
                                        item.changePercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                    }`}>
                                        {item.changePercent >= 0 ? (
                                            <span className="material-icons-outlined text-xs">arrow_upward</span>
                                        ) : (
                                            <span className="material-icons-outlined text-xs">arrow_downward</span>
                                        )}
                                        {Math.abs(item.changePercent).toFixed(2)}%
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        {item.volume}
                                    </div>
                                </td>
                                {showMarketCap && item.marketCap && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {item.marketCap}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
                    {/* Summary Cards - chỉ hiển thị cho trang all */}
                    {type === "all" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm opacity-90">Total Market Cap</span>
                                    <span className="material-icons-outlined">trending_up</span>
                                </div>
                                <p className="text-2xl font-bold">$2.45T</p>
                                <p className="text-xs opacity-75 mt-1">+2.34% (24h)</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm opacity-90">24h Volume</span>
                                    <span className="material-icons-outlined">swap_vert</span>
                                </div>
                                <p className="text-2xl font-bold">$156.8B</p>
                                <p className="text-xs opacity-75 mt-1">+5.67% (24h)</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm opacity-90">Active Markets</span>
                                    <span className="material-icons-outlined">bar_chart</span>
                                </div>
                                <p className="text-2xl font-bold">{marketData.length}</p>
                                <p className="text-xs opacity-75 mt-1">Live updates</p>
                            </div>
                        </div>
                    )}

                    {/* Search Filter */}
                    <div className="bg-surface-light dark:bg-card-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="relative">
                            <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Individual Symbol Sections with Chart and Analysis */}
                    {filteredData.map((item) => {
                        const fallbackAnalysis = fallbackTechnicalAnalysis[item.symbol];
                        
                        if (!fallbackAnalysis && item.type !== "crypto") return null;

                        const getHeaderColor = () => {
                            if (item.type === "crypto") return "from-yellow-500 to-yellow-600";
                            if (item.type === "forex") return "from-blue-500 to-blue-600";
                            return "from-green-500 to-green-600";
                        };

                        const getHeaderIcon = () => {
                            if (item.type === "crypto") return "currency_bitcoin";
                            if (item.type === "forex") return "trending_up";
                            return "bar_chart";
                        };

                        return (
                            <div key={item.symbol} className="bg-surface-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${getHeaderColor()} px-6 py-4 border-b border-gray-200 dark:border-gray-700`}>
                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-outlined text-white text-2xl">{getHeaderIcon()}</span>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">{item.symbol}</h2>
                                                <p className="text-sm text-white/80">{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-white">
                                                    {item.type === "forex" 
                                                        ? formatPrice(item.price) 
                                                        : `$${formatPrice(item.price)}`}
                                                </p>
                                                <p className={`text-xs ${item.changePercent >= 0 ? "text-green-200" : "text-red-200"}`}>
                                                    {item.changePercent >= 0 ? "+" : ""}
                                                    {item.changePercent.toFixed(2)}%
                                                </p>
                                            </div>
                                            {item.marketCap && (
                                                <div className="text-right border-l border-white/20 pl-4">
                                                    <p className="text-xs text-white/60">Market Cap</p>
                                                    <p className="text-sm font-semibold text-white">{item.marketCap}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Chart and Technical Analysis */}
                                {item.type === "crypto" ? (
                                    <CryptoSectionWithAnalysis item={item} />
                                ) : item.type === "forex" ? (
                                    <ForexSectionWithAnalysis item={item} />
                                ) : (
                                    <>
                                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                                24h Price Chart
                                            </h3>
                                            <MarketChart marketData={[item]} selectedSymbol={item.symbol} />
                                        </div>
                                        {fallbackAnalysis && (
                                            <div className="p-6">
                                                <TechnicalAnalysis marketData={item} analysisData={fallbackAnalysis} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                <MarketSidebar />
            </div>
        </div>
    );
}

