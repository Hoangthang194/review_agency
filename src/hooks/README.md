# Custom Hooks for API Data Fetching

This directory contains custom React hooks for fetching data from APIs.

## Hooks Available

### `useApi<T>`
Generic hook for making API calls.

```typescript
const { data, loading, error, refetch, mutate } = useApi<YourDataType>(
  "/api/endpoint",
  { immediate: true, onSuccess: (data) => {}, onError: (err) => {} }
);
```

### `useBrokerData`
Hook to fetch a single broker's data.

```typescript
const { data, loading, error, refetch } = useBrokerData("forex", "broker-slug");
```

### `useBrokersList`
Hook to fetch list of brokers by type.

```typescript
const { data, loading, error } = useBrokersList("crypto");
```

### `useMarketData`
Hook to fetch market data with filtering capabilities.

```typescript
const { data, loading, error, refetch, filterByType } = useMarketData();
const cryptoData = filterByType("crypto");
```

### `useMarketSymbol`
Hook to fetch data for a specific market symbol.

```typescript
const { data, loading, error, refetch } = useMarketSymbol("BTC/USD");
```

### `useTechnicalAnalysis`
Hook to fetch technical analysis data for a symbol.

```typescript
const { data, loading, error, refetch } = useTechnicalAnalysis("BTC/USD");
```

### `useCoinGeckoChart`
Hook to fetch historical price chart data from CoinGecko API.

```typescript
const { data, loading, error, refetch } = useCoinGeckoChart("ethereum", "usd", 30);
// Returns: ChartDataPoint[] with time, price, timestamp
```

### `useCoinGeckoMarket`
Hook to fetch current market data from CoinGecko API.

```typescript
const { data, loading, error, refetch } = useCoinGeckoMarket("ethereum", "usd");
// Returns: CoinGeckoMarketData with current_price, price_change_24h, etc.
```

### `useCryptoChartData`
Hook to fetch chart data for crypto symbols (automatically maps to CoinGecko IDs).

```typescript
const { data, loading, error, refetch } = useCryptoChartData("ETH/USD", 30);
```

### `useCryptoMarketData`
Hook to fetch market data for crypto symbols (automatically maps to CoinGecko IDs).

```typescript
const { data, loading, error, refetch } = useCryptoMarketData("BTC/USD");
```

## Usage Examples

### Broker Data
```typescript
import { useBrokerData } from "@/hooks";

export default function BrokerPage({ slug }: { slug: string }) {
  const { data, loading, error } = useBrokerData("forex", slug);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return <div>{data.name}</div>;
}
```

### CoinGecko Chart Data
```typescript
import { useCoinGeckoChart } from "@/hooks";

export default function CryptoChart({ coinId }: { coinId: string }) {
  const { data, loading, error } = useCoinGeckoChart(coinId, "usd", 30);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No chart data</div>;

  // data is ChartDataPoint[] with format:
  // [{ time: "00:00", price: 3179.44, timestamp: 1765472492657 }, ...]
  
  return (
    <div>
      {data.map((point, i) => (
        <div key={i}>
          {point.time}: ${point.price}
        </div>
      ))}
    </div>
  );
}
```

### Crypto Market Data with Symbol Mapping
```typescript
import { useCryptoChartData, useCryptoMarketData } from "@/hooks";

export default function EthereumChart() {
  // Automatically maps "ETH/USD" to "ethereum" CoinGecko ID
  const { data: chartData, loading: chartLoading } = useCryptoChartData("ETH/USD", 30);
  const { data: marketData, loading: marketLoading } = useCryptoMarketData("ETH/USD");

  if (chartLoading || marketLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{marketData?.name}</h2>
      <p>Current Price: ${marketData?.current_price}</p>
      <p>24h Change: {marketData?.price_change_percentage_24h}%</p>
      {/* Use chartData for rendering charts */}
    </div>
  );
}
```

## API Configuration

Update `src/hooks/apiConfig.ts` to configure your API base URL and endpoints.

