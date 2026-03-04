"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info, LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Interfaz de propiedades esperadas por la tarjeta de estadísticas
interface StatCardProps {
    title: string;          // Título de la métrica (ej. "Precio Actual")
    value: string;          // Valor de la métrica formateado
    change?: number;        // Porcentaje de cambio (opcional)
    icon: LucideIcon;       // Componente de ícono pre-renderizado de Lucide
    trend?: 'up' | 'down' | 'neutral'; // Tendencia forzada (opcional)
    loading?: boolean;      // Estado de carga para el skeleton UI
    tooltipText?: string;   // Texto de explicación descriptivo para la tarjeta
}

export default function StatCard({
    title,
    value,
    change,
    icon: Icon,
    trend,
    loading = false,
    tooltipText
}: StatCardProps) {
    // Estado para controlar la visibilidad del tooltip en dispositivos móviles (touch)
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    // Cierra el tooltip al hacer tap/click fuera de él
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setIsTooltipOpen(false);
            }
        };

        if (isTooltipOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isTooltipOpen]);

    // Si la data está cargando, retornamos un "Skeleton" animado para mejorar UX en vez de pantalla en blanco
    if (loading) {
        return (
            <div className="glass-card p-4 sm:p-6 min-w-0 animate-pulse h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-muted shrink-0"></div>
                    <div className="w-12 h-5 sm:w-16 sm:h-6 rounded bg-muted"></div>
                </div>
                <div className="mt-auto">
                    <div className="w-16 h-3 sm:w-24 sm:h-4 rounded bg-muted mb-2"></div>
                    <div className="w-20 h-6 sm:w-32 sm:h-8 rounded bg-muted"></div>
                </div>
            </div>
        );
    }

    // Lógica para determinar si el porcentaje es positivo o negativo y dar color adecuado al badge
    const isPositive = trend === 'up' || (change !== undefined && change > 0);
    const isNegative = trend === 'down' || (change !== undefined && change < 0);

    return (
        // Aplicamos estilos de "glassmorphism" (cristal) y efecto hover y aseguramos altura completa
        <div className="glass-card p-4 sm:p-6 min-w-0 group hover:border-brand-primary/40 transition-all h-full flex flex-col">
            <div className="flex justify-between items-start mb-4 text-glow">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary/30 transition-colors shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                </div>
                {/* Renderizado condicional del badge de porcentaje basado en si existe o no el dato */}
                {change !== undefined && (
                    <div className={cn(
                        "flex items-center space-x-0.5 sm:space-x-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold shrink-0 ml-2",
                        isPositive ? "bg-emerald-500/10 text-emerald-500" :
                            isNegative ? "bg-rose-500/10 text-rose-500" : "bg-slate-500/10 text-muted-foreground"
                    )}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : isNegative ? <ArrowDownRight className="w-3 h-3" /> : null}
                        <span>{Math.abs(change).toFixed(2)}%</span>
                    </div>
                )}
            </div>
            <div className="mt-auto">
                <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</h3>
                    {tooltipText && (
                        <div
                            ref={tooltipRef}
                            className="relative flex items-center"
                            onMouseEnter={() => setIsTooltipOpen(true)}
                            onMouseLeave={() => setIsTooltipOpen(false)}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsTooltipOpen(!isTooltipOpen);
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver más información"
                        >
                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-pointer md:cursor-help" />
                            <div className={cn(
                                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover border border-border text-popover-foreground text-xs rounded-lg shadow-lg transition-all z-20 text-center pointer-events-none",
                                isTooltipOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1"
                            )}>
                                {tooltipText}
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-lg sm:text-2xl font-bold text-foreground tracking-tight truncate">{value}</p>
            </div>
        </div>
    );
}
