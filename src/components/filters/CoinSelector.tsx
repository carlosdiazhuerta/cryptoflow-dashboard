"use client";

import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { CoinMarketData } from '@/types/crypto';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '@/lib/i18n';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Props para el componente Selector de Monedas
interface CoinSelectorProps {
    coins: CoinMarketData[];        // Lista completa de monedas disponibles
    selectedId: string;             // ID de la moneda actualmente seleccionada
    onSelect: (id: string) => void; // Función callback para cuando el usuario escoge otra moneda
    loading?: boolean;              // Para deshabilitar el botón mientras carga
}

export default function CoinSelector({ coins, selectedId, onSelect, loading }: CoinSelectorProps) {
    // Estado local para saber si el menú del dropdown está abierto o cerrado
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedCoin = coins.find(c => c.id === selectedId);
    const { t } = useLanguage();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                // Atributos ARIA para accesibilidad
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="coin-listbox"
                className="flex items-center space-x-3 px-4 py-2 bg-muted border border-border rounded-xl hover:border-brand-primary/50 transition-all text-sm font-medium text-foreground w-48 justify-between disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
                <div className="flex items-center space-x-2">
                    {selectedCoin && (
                        <img src={selectedCoin.image} alt="" className="w-5 h-5 rounded-full" />
                    )}
                    <span>{selectedCoin?.name || t.coinSelector.selectCoin}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <>
                    {/* Elemento invisible que ocupa toda la pantalla para cerrar el menú si se hace clic fuera */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

                    <div
                        role="listbox"
                        className="absolute top-full mt-2 w-full glass-card overflow-hidden z-20 max-h-64 overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200"
                    >
                        {coins.map(coin => (
                            <button
                                key={coin.id}
                                role="option"
                                aria-selected={coin.id === selectedId}
                                onClick={() => {
                                    onSelect(coin.id); // Avisa al componente Dashboard sobre el cambio
                                    setIsOpen(false);  // Cierra el menú al elegir
                                }}
                                className={cn(
                                    "flex items-center justify-between w-full px-4 py-3 text-sm transition-colors",
                                    coin.id === selectedId ? "bg-brand-primary/20 text-brand-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center space-x-3">
                                    <img src={coin.image} alt="" className="w-6 h-6 rounded-full" />
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="font-bold">{coin.name}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase mt-0.5">{coin.symbol}</span>
                                    </div>
                                </div>
                                {coin.id === selectedId && <Check className="w-4 h-4" />}
                            </button>

                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
