"use client";

import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import PriceChart from '@/components/charts/PriceChart';
import MarketCapChart from '@/components/charts/MarketCapChart';
import CoinSelector from '@/components/filters/CoinSelector';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { getCoinsMarkets, getCoinHistory } from '@/lib/api';
import { CoinMarketData, ChartDataPoint, TimePeriod } from '@/types/crypto';
import { useLanguage } from '@/lib/i18n';

export default function Dashboard() {
  // Estados para manejar los datos del dashboard
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin'); // Moneda seleccionada por defecto
  const [historyData, setHistoryData] = useState<ChartDataPoint[]>([]);
  const [period, setPeriod] = useState<TimePeriod>('7d'); // Periodo de tiempo para el gráfico de histórico
  const [currency, setCurrency] = useState<'usd' | 'eur'>('usd'); // Moneda fiat de referencia

  // Estados para manejar la experiencia de usuario (UI/UX)
  const [loading, setLoading] = useState(true); // Carga inicial de datos de mercado
  const [historyLoading, setHistoryLoading] = useState(true); // Carga de datos históricos para el gráfico
  const [error, setError] = useState<string | null>(null); // Manejo de errores de la API

  const { t } = useLanguage();

  // Efecto 1: Carga Inicial de Datos.
  // Se ejecuta al montar el componente o cuando cambia la moneda fiat (USD/EUR)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Llamada a nuestro servicio API para obtener del endpoint de CoinGecko las top monedas
        const data = await getCoinsMarkets(currency);
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('Error al obtener criptomonedas:', err);
        setError(t.dashboard.fetchError);
      } finally {
        setLoading(false); // Siempre quitamos el estado de carga al terminar
      }
    };
    fetchInitialData();
  }, [currency]);

  // Efecto 2: Carga del Historial de Precios.
  // Se ejecuta cuando el usuario selecciona OTRA moneda en el filtro, cambia el periodo, o cambia USD/EUR
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        // Mapeamos nuestro tipo de periodo a los días que requiere la API de CoinGecko
        const daysMap: Record<TimePeriod, string> = {
          '24h': '1',
          '7d': '7',
          '30d': '30',
          '1y': '365'
        };
        const history = await getCoinHistory(selectedCoinId, currency, daysMap[period]);

        // Formateamos los datos para que Recharts los pueda leer fácilmente
        const formattedData: ChartDataPoint[] = history.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            // Si el periodo es de 24h, mostramos también la hora para mayor detalle
            hour: period === '24h' ? '2-digit' : undefined
          }),
          price: Number(price.toFixed(2))
        }));

        setHistoryData(formattedData);
      } catch (err) {
        console.error('Error obteniendo el historial:', err);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [selectedCoinId, period, currency]);

  // Función para refrescar los datos manualmente si el usuario hace clic en el botón
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await getCoinsMarkets(currency);
      setCoins(data);
    } catch (err) {
      setError(t.dashboard.refreshError);
    } finally {
      setLoading(false);
    }
  };

  const selectedCoinData = coins.find(c => c.id === selectedCoinId);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">

      {/* Top Section: Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{t.dashboard.title}</h1>
          <p className="text-muted-foreground mt-1">{t.dashboard.subtitle}</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Botón de refresco manual con accesibilidad para teclado */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            aria-label={t.dashboard.refreshAria}
            className="p-2 rounded-xl glass-card hover:bg-muted transition-all text-muted-foreground hover:text-foreground disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <RefreshCw className={clsx("w-5 h-5", loading && "animate-spin")} />
          </button>
          <CoinSelector
            coins={coins}
            selectedId={selectedCoinId}
            onSelect={setSelectedCoinId}
            loading={loading}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <StatCard
          title={t.dashboard.currentPrice}
          value={selectedCoinData ? `${currency === 'usd' ? '$' : '€'}${selectedCoinData.current_price.toLocaleString()}` : '---'}
          change={selectedCoinData?.price_change_percentage_24h}
          icon={Coins}
          loading={loading}
          tooltipText={t.dashboard.currentPriceInfo}
        />
        <StatCard
          title={t.dashboard.marketCap}
          value={selectedCoinData ? `${currency === 'usd' ? '$' : '€'}${(selectedCoinData.market_cap / 1000000000).toFixed(2)}B` : '---'}
          icon={BarChart3}
          loading={loading}
          tooltipText={t.dashboard.marketCapInfo}
        />
        <StatCard
          title={t.dashboard.volume24h}
          value={selectedCoinData ? `${currency === 'usd' ? '$' : '€'}${(selectedCoinData.total_volume / 1000000000).toFixed(2)}B` : '---'}
          icon={TrendingUp}
          loading={loading}
          tooltipText={t.dashboard.volume24hInfo}
        />
        <StatCard
          title={t.dashboard.marketRank}
          value={selectedCoinData ? `#${selectedCoinData.market_cap_rank}` : '---'}
          icon={BarChart3}
          trend="neutral"
          loading={loading}
          tooltipText={t.dashboard.marketRankInfo}
        />
        <StatCard
          title={t.dashboard.high24h}
          value={selectedCoinData ? `${currency === 'usd' ? '$' : '€'}${selectedCoinData.high_24h.toLocaleString()}` : '---'}
          icon={TrendingUp}
          trend="neutral"
          loading={loading}
          tooltipText={t.dashboard.high24hInfo}
        />
        <StatCard
          title={t.dashboard.low24h}
          value={selectedCoinData ? `${currency === 'usd' ? '$' : '€'}${selectedCoinData.low_24h.toLocaleString()}` : '---'}
          icon={TrendingDown}
          trend="neutral"
          loading={loading}
          tooltipText={t.dashboard.low24hInfo}
        />
      </div>

      {/* Charts Section: Sección de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-h-[450px]">
          {/* Gráfico principal de historial de precio (Ocupa 2 de 3 columnas en desktop) */}
          <PriceChart
            data={historyData}
            coinName={selectedCoinData?.name || t.charts.asset}
            loading={historyLoading}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        <div className="min-h-[450px]">
          {/* Gráfico de distribución de mercado (Ocupa 1 de 3 columnas en desktop) */}
          <MarketCapChart data={coins} loading={loading} />
        </div>
      </div>
    </div>
  );
}

// Helper for dynamic class joining (simplified since we aren't importing from DashboardShell)
function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
