"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { MarketData } from "./MarketAnalysisContent";
import { useMemo } from "react";

interface MarketChartProps {
    marketData: MarketData[];
    selectedSymbol?: string;
}

interface ChartDataPoint {
    time: string;
    [key: string]: string | number;
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

export function MarketChart({ marketData, selectedSymbol }: MarketChartProps) {
    // Generate chart data for all or selected symbol
    const chartData = useMemo(() => {
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
    }, [marketData, selectedSymbol]);

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

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
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
                    />
                    <YAxis 
                        stroke="#6b7280"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        className="dark:[&>text]:fill-gray-400"
                        tickFormatter={(value) => {
                            if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
                            return `$${value.toFixed(0)}`;
                        }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            color: '#374151',
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                        formatter={(value: number) => {
                            return [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price'];
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

