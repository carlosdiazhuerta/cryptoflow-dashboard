export interface CoinMarketData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    last_updated: string;
    sparkline_in_7d?: {
        price: number[];
    };
}

export interface CoinHistoryData {
    prices: [number, number][]; // [timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface ChartDataPoint {
    time: string;
    price: number;
}

export type TimePeriod = '24h' | '7d' | '30d' | '1y';

export interface DashboardState {
    selectedCoin: string;
    currency: 'usd' | 'eur';
    period: TimePeriod;
    isLoading: boolean;
    error: string | null;
}
