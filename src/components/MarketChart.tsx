"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { MarketData } from "./MarketAnalysisContent";
import { useMemo } from "react";
import { ChartDataPoint as CoinGeckoChartDataPoint } from "@/hooks/useCoinGecko";

interface MarketChartProps {
    marketData: MarketData[];
    selectedSymbol?: string;
    coinGeckoData?: CoinGeckoChartDataPoint[] | null; // Optional CoinGecko chart data
    days?: number; // Number of days for chart (default: 30)
}

interface ChartDataPoint {
    time: string;
    date?: string; // For daily charts
    [key: string]: string | number | undefined;
}

// Generate sample 24h data points
const generate24hData = (initialPrice: number, symbol: string): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    const hours = 24;
    const variance = initialPrice * 0.05; // 5% variance
    
    for (let i = 0; i <= hours; i++) {
        const hour = i;
        const timeLabel = hour === 0 ? "00:00" : hour < 10 ? `0${hour}:00` : `${hour}:00`;
        
        // Simulate price movement
        const randomChange = (Math.random() - 0.5) * variance;
        const trend = Math.sin((i / hours) * Math.PI * 2) * (variance * 0.3);
        const price = initialPrice + randomChange + trend;
        
        data.push({
            time: timeLabel,
            [symbol]: Math.max(0, price),
        });
    }
    
    return data;
};

// Convert CoinGecko data to chart format (hourly or daily based on days parameter)
function convertCoinGeckoToChartData(
    coinGeckoData: CoinGeckoChartDataPoint[],
    symbol: string,
    days?: number
): ChartDataPoint[] {
    return coinGeckoData.map((point) => {
        const date = new Date(point.timestamp);
        let timeLabel: string;
        
        if (days === 1) {
            // Format as HH:MM AM/PM for hourly charts
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12; // Convert to 12-hour format
            timeLabel = `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
        } else {
            // Format as MM/DD for daily charts
            const month = date.getMonth() + 1;
            const day = date.getDate();
            timeLabel = `${month}/${day}`;
        }
        
        return {
            time: timeLabel,
            date: timeLabel,
            [symbol]: point.price,
        };
    });
}

export function MarketChart({ marketData, selectedSymbol, coinGeckoData, days = 30 }: MarketChartProps) {
    // Generate chart data for all or selected symbol
    const chartData = useMemo(() => {
        // If CoinGecko data is provided, use it
        if (coinGeckoData && coinGeckoData.length > 0 && selectedSymbol) {
            return convertCoinGeckoToChartData(coinGeckoData, selectedSymbol, days);
        }
        
        // Fallback to generated data
        if (selectedSymbol) {
            const selected = marketData.find(item => item.symbol === selectedSymbol);
            if (selected) {
                return generate24hData(selected.price, selected.symbol);
            }
        }
        
        // If marketData has only one item, show that one
        if (marketData.length === 1) {
            return generate24hData(marketData[0].price, marketData[0].symbol);
        }
        
        // If no selection or all data, show top 3 by volume
        const topData = marketData
            .sort((a, b) => {
                const aVol = parseFloat(a.volume.replace(/[^0-9.]/g, ''));
                const bVol = parseFloat(b.volume.replace(/[^0-9.]/g, ''));
                return bVol - aVol;
            })
            .slice(0, 3);
        
        if (topData.length === 0) return [];
        
        // Generate data for each symbol
        const allData: ChartDataPoint[] = [];
        const hours = 24;
        
        for (let i = 0; i <= hours; i++) {
            const hour = i;
            const timeLabel = hour === 0 ? "00:00" : hour < 10 ? `0${hour}:00` : `${hour}:00`;
            
            const dataPoint: ChartDataPoint = { time: timeLabel };
            
            topData.forEach(item => {
                const variance = item.price * 0.05;
                const randomChange = (Math.random() - 0.5) * variance;
                const trend = Math.sin((i / hours) * Math.PI * 2) * (variance * 0.3);
                const price = item.price + randomChange + trend;
                dataPoint[item.symbol] = Math.max(0, price);
            });
            
            allData.push(dataPoint);
        }
        
        return allData;
    }, [marketData, selectedSymbol, coinGeckoData, days]);

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    if (chartData.length === 0) {
        return (
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <span className="material-icons-outlined text-5xl mb-2 block">show_chart</span>
                    <p className="text-sm">No data to display</p>
                </div>
            </div>
        );
    }

    // Get symbols to display
    const symbols = selectedSymbol 
        ? [selectedSymbol]
        : Object.keys(chartData[0]).filter(key => key !== 'time').slice(0, 3);

    // Calculate Y-axis domain to show volatility better (not starting from 0)
    const yAxisDomain = useMemo(() => {
        if (chartData.length === 0) return [0, 100];
        
        const allValues: number[] = [];
        symbols.forEach(symbol => {
            chartData.forEach(point => {
                const value = point[symbol];
                if (typeof value === 'number' && !isNaN(value)) {
                    allValues.push(value);
                }
            });
        });

        if (allValues.length === 0) return [0, 100];

        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const range = max - min;
        
        // Add padding: 5% below min and 5% above max to show volatility better
        const padding = range * 0.05;
        const domainMin = Math.max(0, min - padding); // Don't go below 0 for prices
        const domainMax = max + padding;
        
        return [domainMin, domainMax];
    }, [chartData, symbols]);

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                    data={chartData} 
                    margin={{ top: 10, right: 10, left: 0, bottom: coinGeckoData && coinGeckoData.length > 0 ? 50 : 20 }}
                >
                    <defs>
                        {symbols.map((symbol, index) => (
                            <linearGradient key={symbol} id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0}/>
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <XAxis 
                        dataKey="time" 
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        className="dark:[&>text]:fill-gray-400"
                        interval={coinGeckoData && coinGeckoData.length > 0 && days && days > 1 ? Math.floor(coinGeckoData.length / 7) : (coinGeckoData && coinGeckoData.length > 0 ? Math.floor(coinGeckoData.length / 12) : 0)}
                        angle={coinGeckoData && coinGeckoData.length > 0 && days && days > 1 ? -45 : 0}
                        textAnchor={coinGeckoData && coinGeckoData.length > 0 && days && days > 1 ? "end" : "middle"}
                        height={coinGeckoData && coinGeckoData.length > 0 && days && days > 1 ? 60 : 30}
                    />
                    <YAxis 
                        domain={yAxisDomain}
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        className="dark:[&>text]:fill-gray-400"
                        tickFormatter={(value) => {
                            if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
                            if (value >= 1) return `$${value.toFixed(2)}`;
                            return `$${value.toFixed(4)}`;
                        }}
                        allowDataOverflow={false}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            color: '#374151',
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                        formatter={(value: number | undefined, name: string) => {
                            if (value === undefined || value === null) {
                                return ['N/A', name];
                            }
                            // Format with appropriate decimal places based on value
                            let formattedValue: string;
                            if (value >= 1000) {
                                formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                            } else if (value >= 1) {
                                formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
                            } else {
                                formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`;
                            }
                            return [formattedValue, name];
                        }}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: '10px' }}
                        iconType="line"
                    />
                    {symbols.map((symbol, index) => {
                        const item = marketData.find(m => m.symbol === symbol);
                        const isPositive = item && item.changePercent >= 0;
                        const strokeColor = isPositive ? '#10b981' : '#ef4444';
                        
                        return (
                            <Area
                                key={symbol}
                                type="monotone"
                                dataKey={symbol}
                                stroke={strokeColor}
                                strokeWidth={2}
                                fill={`url(#color${symbol})`}
                                name={symbol}
                            />
                        );
                    })}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

