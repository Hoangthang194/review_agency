// API Configuration
export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    endpoints: {
        brokers: {
            list: (type: string) => `/brokers?type=${type}`,
            detail: (type: string, slug: string) => `/brokers/${type}/${slug}`,
        },
        market: {
            list: "/market-data",
            symbol: (symbol: string) => `/market-data/${symbol}`,
        },
        technicalAnalysis: {
            get: (symbol: string) => `/technical-analysis/${symbol}`,
        },
    },
    timeout: 10000, // 10 seconds
};

// Helper function to build API URL
export function buildApiUrl(endpoint: string): string {
    const baseUrl = API_CONFIG.baseUrl.replace(/\/$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
}

