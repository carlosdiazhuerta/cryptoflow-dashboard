import { create } from 'zustand';
import { getCoinsMarkets, getCoinHistory } from '@/lib/api';
import { CoinMarketData, ChartDataPoint, TimePeriod } from '@/types/crypto';

// Tiempos de expiración de caché (en milisegundos)
const CACHE_EXPIRATION_MARKETS = 2 * 60 * 1000; // 2 minutos para precios actuales
const CACHE_EXPIRATION_HISTORY = 15 * 60 * 1000; // 15 minutos para gráficos históricos

// Estructura de un item en caché
interface CacheItem<T> {
    data: T;
    timestamp: number;
}

// Configuración de los días para la API según el periodo
const daysMap: Record<TimePeriod, string> = {
    '24h': '1',
    '7d': '7',
    '30d': '30',
    '1y': '365'
};

interface CryptoStore {
    // Estado: Filtros Globales
    currency: 'usd' | 'eur';
    selectedCoinId: string;
    period: TimePeriod;

    // Acciones sobre Filtros
    setCurrency: (currency: 'usd' | 'eur') => void;
    setSelectedCoinId: (id: string) => void;
    setPeriod: (period: TimePeriod) => void;

    // Estado: Interfaz & Data
    coins: CoinMarketData[];
    historyData: ChartDataPoint[];
    loading: boolean;
    historyLoading: boolean;
    error: string | null;

    // Caché in-memory
    cacheMarkets: Record<string, CacheItem<CoinMarketData[]>>;
    cacheHistory: Record<string, CacheItem<ChartDataPoint[]>>;

    // Thunks / Acciones Complejas
    fetchCoins: (forceRefresh?: boolean) => Promise<void>;
    fetchHistory: () => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
    // Valores iniciales
    currency: 'usd',
    selectedCoinId: 'bitcoin',
    period: '7d',

    coins: [],
    historyData: [],
    loading: true,
    historyLoading: true,
    error: null,

    cacheMarkets: {},
    cacheHistory: {},

    // Setters puros
    setCurrency: (currency) => set({ currency }),
    setSelectedCoinId: (id) => set({ selectedCoinId: id }),
    setPeriod: (period) => set({ period }),

    // Thunks
    fetchCoins: async (forceRefresh = false) => {
        const state = get();
        const cacheKey = state.currency;
        const now = Date.now();

        // Verificamos si tenemos una caché válida para la moneda actual
        const cachedData = state.cacheMarkets[cacheKey];
        if (!forceRefresh && cachedData && (now - cachedData.timestamp < CACHE_EXPIRATION_MARKETS)) {
            // Usar datos en caché
            set({ coins: cachedData.data, loading: false, error: null });
            return;
        }

        // Si no hay caché o expiró / fue forzado, hacemos el fetch
        set({ loading: true, error: null });
        try {
            const data = await getCoinsMarkets(state.currency);
            // Guardamos en estado local y actualizamos la caché compartida
            set((prev) => ({
                coins: data,
                loading: false,
                cacheMarkets: {
                    ...prev.cacheMarkets,
                    [cacheKey]: { data, timestamp: now }
                }
            }));
        } catch (err) {
            console.error('Error fetching coins:', err);
            // En caso de error, si tenemos algo viejo en caché, lo seguimos mostrando (Stale-while-revalidate pattern)
            if (cachedData) {
                set({ coins: cachedData.data, loading: false, error: 'Hubo un problema actualizando en tiempo real, mostrando datos previos.' });
            } else {
                set({ loading: false, error: 'No se pudieron cargar los datos del mercado.' });
            }
        }
    },

    fetchHistory: async () => {
        const state = get();
        // La llave de caché del historial depende de la moneda, moneda fíat y periodo
        const cacheKey = `${state.selectedCoinId}_${state.currency}_${state.period}`;
        const now = Date.now();

        const cachedData = state.cacheHistory[cacheKey];
        if (cachedData && (now - cachedData.timestamp < CACHE_EXPIRATION_HISTORY)) {
            set({ historyData: cachedData.data, historyLoading: false });
            return;
        }

        set({ historyLoading: true });
        try {
            const history = await getCoinHistory(state.selectedCoinId, state.currency, daysMap[state.period]);

            const formattedData: ChartDataPoint[] = history.prices.map(([timestamp, price]) => ({
                time: new Date(timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: state.period === '24h' ? '2-digit' : undefined
                }),
                price: Number(price.toFixed(2))
            }));

            set((prev) => ({
                historyData: formattedData,
                historyLoading: false,
                cacheHistory: {
                    ...prev.cacheHistory,
                    [cacheKey]: { data: formattedData, timestamp: now }
                }
            }));
        } catch (err) {
            console.error('Error fetching history:', err);
            if (cachedData) {
                set({ historyData: cachedData.data, historyLoading: false });
            } else {
                set({ historyLoading: false });
            }
        }
    }
}));
