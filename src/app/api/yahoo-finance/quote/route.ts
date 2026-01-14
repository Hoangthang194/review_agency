import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const symbol = searchParams.get("symbol");

        if (!symbol) {
            return NextResponse.json(
                { error: "Symbol parameter is required" },
                { status: 400 }
            );
        }

        const yahooFinance = new YahooFinance();
        const quote = await yahooFinance.quote(symbol);

        if (!quote || !quote.regularMarketPrice) {
            return NextResponse.json(
                { error: `No data found for symbol ${symbol}` },
                { status: 404 }
            );
        }

        const quoteData = {
            symbol: quote.symbol || symbol,
            regularMarketPrice: quote.regularMarketPrice || 0,
            regularMarketChange: quote.regularMarketChange || 0,
            regularMarketChangePercent: quote.regularMarketChangePercent || 0,
            regularMarketVolume: quote.regularMarketVolume || 0,
            marketCap: quote.marketCap,
            shortName: quote.shortName,
            longName: quote.longName,
        };

        return NextResponse.json(quoteData);
    } catch (error) {
        console.error("Yahoo Finance quote error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch quote" },
            { status: 500 }
        );
    }
}

