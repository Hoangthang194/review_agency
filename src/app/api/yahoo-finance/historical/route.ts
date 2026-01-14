import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const symbol = searchParams.get("symbol");
        const days = parseInt(searchParams.get("days") || "30");

        if (!symbol) {
            return NextResponse.json(
                { error: "Symbol parameter is required" },
                { status: 400 }
            );
        }

        // Calculate date range based on days
        const period2 = new Date(); // Today
        const period1 = new Date(Date.now() - days * 24 * 60 * 60 * 1000); // X days ago

        const yahooFinance = new YahooFinance();
        const historicalData = await yahooFinance.historical(symbol, {
            period1,
            period2,
            interval: "1d", // Daily intervals
        });

        if (!historicalData || historicalData.length === 0) {
            return NextResponse.json(
                { error: `No historical data found for symbol ${symbol}` },
                { status: 404 }
            );
        }

        // Convert to chart data format
        const chartData = historicalData
            .map((item) => {
                const date = new Date(item.date);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const timeLabel = `${month}/${day}`;

                return {
                    time: timeLabel,
                    price: item.close || item.adjClose || 0,
                    timestamp: date.getTime(),
                };
            })
            .sort((a, b) => a.timestamp - b.timestamp);

        return NextResponse.json(chartData);
    } catch (error) {
        console.error("Yahoo Finance historical error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch historical data" },
            { status: 500 }
        );
    }
}

