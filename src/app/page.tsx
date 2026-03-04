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
import { CoinMarketData, ChartDataPoint, TimePeriod } from '@/types/crypto';
import { useLanguage } from '@/lib/i18n';
import { useCryptoStore } from '@/store/useCryptoStore';

export default function Dashboard() {
  // Integramos el Global Store de Zustand
  const {
    coins,
    selectedCoinId,
    setSelectedCoinId,
    historyData,
    period,
    setPeriod,
    currency,
    loading,
    historyLoading,
    error,
    fetchCoins,
    fetchHistory
  } = useCryptoStore();

  const { t } = useLanguage();

  // Efecto 1: Cargar mercados globales
  // fetchCoins internamente verifica si necesita tirar red o usar la caché in-memory
  useEffect(() => {
    fetchCoins();
  }, [currency, fetchCoins]);

  // Efecto 2: Cargar historial del gráfico
  // Igual, fetchHistory cachea las respuestas por id, moneda y periodo
  useEffect(() => {
    fetchHistory();
  }, [selectedCoinId, period, currency, fetchHistory]);

  // Refresco manual forza que ignoremos la caché
  const handleRefresh = async () => {
    await fetchCoins(true);
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
