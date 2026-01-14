/**
 * Cache utility for storing API responses
 * Uses localStorage to persist data across page reloads
 */

interface CacheItem<T> {
    data: T;
    timestamp: number;
    date: string; // YYYY-MM-DD format
}

const CACHE_PREFIX = "crypto_cache_";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cache key for a symbol
 */
function getCacheKey(symbol: string, days: number): string {
    return `${CACHE_PREFIX}${symbol}_${days}`;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Check if cache item is still valid (same day)
 */
function isCacheValid(cacheItem: CacheItem<any>): boolean {
    const today = getTodayDate();
    return cacheItem.date === today;
}

/**
 * Get cached data if available and valid
 */
export function getCachedData<T>(symbol: string, days: number): T | null {
    try {
        const cacheKey = getCacheKey(symbol, days);
        const cached = localStorage.getItem(cacheKey);
        
        if (!cached) {
            return null;
        }

        const cacheItem: CacheItem<T> = JSON.parse(cached);
        
        // Check if cache is from today
        if (!isCacheValid(cacheItem)) {
            // Remove old cache
            localStorage.removeItem(cacheKey);
            return null;
        }

        // Check if cache is not expired (within 24 hours)
        const now = Date.now();
        const age = now - cacheItem.timestamp;
        
        if (age > CACHE_DURATION) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        return cacheItem.data;
    } catch (error) {
        console.error("Error reading cache:", error);
        return null;
    }
}

/**
 * Store data in cache
 */
export function setCachedData<T>(symbol: string, days: number, data: T): void {
    try {
        const cacheKey = getCacheKey(symbol, days);
        const cacheItem: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            date: getTodayDate(),
        };
        
        localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
        console.error("Error writing cache:", error);
        // If localStorage is full, try to clear old cache
        clearOldCache();
        
        // Try again
        try {
            const cacheKey = getCacheKey(symbol, days);
            const cacheItem: CacheItem<T> = {
                data,
                timestamp: Date.now(),
                date: getTodayDate(),
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
        } catch (retryError) {
            console.error("Error writing cache after cleanup:", retryError);
        }
    }
}

/**
 * Clear old cache entries (not from today)
 */
function clearOldCache(): void {
    try {
        const today = getTodayDate();
        const keysToRemove: string[] = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(CACHE_PREFIX)) {
                try {
                    const cached = localStorage.getItem(key);
                    if (cached) {
                        const cacheItem: CacheItem<any> = JSON.parse(cached);
                        if (cacheItem.date !== today) {
                            keysToRemove.push(key);
                        }
                    }
                } catch (e) {
                    // Invalid cache entry, remove it
                    keysToRemove.push(key);
                }
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.error("Error clearing old cache:", error);
    }
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
    try {
        const keysToRemove: string[] = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(CACHE_PREFIX)) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.error("Error clearing cache:", error);
    }
}

/**
 * Get cache size (number of cached items)
 */
export function getCacheSize(): number {
    let count = 0;
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(CACHE_PREFIX)) {
                count++;
            }
        }
    } catch (error) {
        console.error("Error getting cache size:", error);
    }
    return count;
}

