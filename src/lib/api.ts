import axios from 'axios';
import { CoinMarketData, CoinHistoryData } from '../types/crypto';

// URL base de la API pública gratuita de CoinGecko
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Configuramos una instancia de Axios con la URL base y un timeout para evitar peticiones colgadas
const api = axios.create({
    baseURL: COINGECKO_BASE_URL,
    timeout: 10000,
});

/**
 * Obtiene la lista de las criptomonedas con mayor capitalización de mercado.
 * Docs: https://www.coingecko.com/en/api/documentation
 */
export const getCoinsMarkets = async (
    currency: string = 'usd',
    perPage: number = 20,
    page: number = 1
): Promise<CoinMarketData[]> => {
    const response = await api.get('/coins/markets', {
        params: {
            vs_currency: currency,
            order: 'market_cap_desc', // Ordenamos por capitalización (las más importantes primero)
            per_page: perPage,
            page,
            sparkline: true, // Solicita el mini-gráfico incluido
            price_change_percentage: '24h',
        },
    });
    return response.data;
};

/**
 * Obtiene el historial de precios y volúmenes de una moneda específica a lo largo del tiempo.
 */
export const getCoinHistory = async (
    coinId: string,
    currency: string = 'usd',
    days: string = '7' // Días de historial a consultar ('1', '7', '30', '365')
): Promise<CoinHistoryData> => {
    const response = await api.get(`/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: currency,
            days,
        },
    });
    return response.data;
};

// Exportamos la instancia para posibles usos futuros con interceptores
export default api;
