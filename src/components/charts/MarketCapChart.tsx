"use client";

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from 'recharts';
import { CoinMarketData } from '@/types/crypto';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/i18n';
import { Info } from 'lucide-react';

interface MarketCapChartProps {
    data: CoinMarketData[];
    loading?: boolean;
}

// Paleta de colores para las barras del gráfico
const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#f472b6'];

export default function MarketCapChart({ data, loading }: MarketCapChartProps) {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const { t } = useLanguage();

    // Si los datos están cargando, mostramos un indicador visual (spinner)
    if (loading) {
        return (
            <div className="glass-card p-6 h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground text-sm font-medium">{t.dashboard.loadingMarketCap}</p>
                </div>
            </div>
        );
    }

    // Preparamos los datos: Tomamos solo el top 6 para no saturar el gráfico
    const chartData = data.slice(0, 6).map(coin => ({
        name: coin.name,
        marketCap: coin.market_cap,
        symbol: coin.symbol.toUpperCase(),
    }));

    // Renderizamos el contenedor y el gráfico de barras horizontales usando Recharts
    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-foreground tracking-tight">{t.dashboard.marketCapChartTitle}</h3>
                    <div className="relative group flex items-center">
                        <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-56 p-2 bg-popover border border-border text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center pointer-events-none">
                            {t.dashboard.marketCapChartInfo}
                        </div>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{t.dashboard.marketCapChartSubtitle}</p>
            </div>

            <div
                className="flex-1 min-h-[300px]"
                // Soporte de accesibilidad para que el gráfico puda tomar foco por teclado
                tabIndex={0}
                role="figure"
                aria-label={t.charts.marketCapBarLabel}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="symbol"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#f8fafc' : '#0f172a', fontWeight: 'bold', fontSize: 11 }}
                        />
                        <Tooltip
                            cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.05)' }}
                            contentStyle={{
                                backgroundColor: 'var(--popover)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'var(--popover-foreground)',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                backdropFilter: 'blur(8px)', // Updated blur from 10px to 8px
                            }}
                            labelStyle={{ color: 'var(--muted-foreground)', fontSize: '10px', marginBottom: '4px' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--popover-foreground)' }}
                            labelFormatter={(label) => `${t.charts.asset}: ${label}`}
                            // Formateamos el valor para mostrarlo en Billones (B) e ignoramos tipos estrictos de Recharts aquí
                            formatter={(value: any) => [`$${(Number(value) / 1000000000).toFixed(2)}B USD`, t.charts.globalMarketCap]}
                        />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
                        />
                        <Bar dataKey="marketCap" name={t.charts.globalMarketCap} radius={[0, 4, 4, 0]} barSize={32}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
