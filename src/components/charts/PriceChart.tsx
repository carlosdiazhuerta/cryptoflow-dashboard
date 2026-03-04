"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { ChartDataPoint, TimePeriod } from '@/types/crypto';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/i18n';
import { Info } from 'lucide-react';

// Interfaz para las propiedades que recibe el componente del gráfico
interface PriceChartProps {
    data: ChartDataPoint[]; // Los datos del historial de precios
    coinName: string;       // El nombre de la moneda seleccionada
    loading?: boolean;      // Estado de carga para mostrar el spinner
    period: TimePeriod;     // El periodo de tiempo actual seleccionado (ej. '7d')
    onPeriodChange: (period: TimePeriod) => void; // Función para cambiar el periodo
}

export default function PriceChart({ data, coinName, loading, period, onPeriodChange }: PriceChartProps) {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const { t } = useLanguage();

    // Si los datos están cargando, mostramos un indicador visual (spinner)
    if (loading) {
        return (
            <div className="glass-card p-6 w-full h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground text-sm font-medium">{t.dashboard.loadingHistory}</p>
                </div>
            </div>
        );
    }

    // Renderizamos el contenedor principal y el gráfico usando Recharts
    return (
        <div className="glass-card p-6 w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-foreground tracking-tight">{t.dashboard.priceChartTitle} {coinName}</h3>
                        <div className="relative group flex items-center">
                            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                            <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-56 p-2 bg-popover border border-border text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center pointer-events-none">
                                {t.dashboard.priceChartInfo}
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{t.dashboard.priceChartSubtitle}</p>
                </div>
                {/* Selector de periodo de tiempo interactivo accesible */}
                <div
                    className="flex bg-muted/50 rounded-lg p-1"
                    role="group"
                    aria-label={t.charts.selectPeriod}
                >
                    {(['24h', '7d', '30d', '1y'] as TimePeriod[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => onPeriodChange(p)}
                            // Anuncia a lectores de pantalla si este botón está activo
                            aria-pressed={period === p}
                            className={clsx(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                                // Aplicamos estilos diferentes si el botón es el periodo seleccionado actualmente
                                period === p
                                    ? "bg-brand-primary text-foreground shadow-lg"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {p.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="w-full mt-4 flex-1 min-h-[300px]"
                // Soporte de accesibilidad para lectura
                tabIndex={0}
                role="figure"
                aria-label={t.charts.priceAreaLabel(coinName, period)}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#64748b' : '#475569', fontSize: 10 }}
                            minTickGap={30}
                        />
                        <YAxis
                            hide={true}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--popover)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'var(--popover-foreground)',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                backdropFilter: 'blur(8px)'
                            }}
                            labelStyle={{ color: 'var(--muted-foreground)', fontSize: '10px', marginBottom: '4px' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--popover-foreground)' }}
                            labelFormatter={(label) => `${t.charts.date}: ${label}`}
                            formatter={(value: any) => [`$${Number(value).toLocaleString()} USD`, t.charts.unitValue]}
                        />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="plainline"
                            wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            name={t.charts.priceOf(coinName)}
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
