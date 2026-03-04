"use client";

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    ArrowRight,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Globe,
    BarChart3,
    Zap,
    MoreHorizontal
} from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/lib/i18n';
import { useCryptoStore } from '@/store/useCryptoStore';
import { useEffect } from 'react';

const COINS_MOCK = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$65,240.50', change: '+2.45%', positive: true, marketCap: '$1.28T', vol: '$32.1B', color: 'bg-orange-500/10', text: 'text-orange-500', char: 'B' },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,420.15', change: '-1.20%', positive: false, marketCap: '$410.5B', vol: '$15.8B', color: 'bg-blue-500/10', text: 'text-blue-500', char: 'E' },
    { name: 'Solana', symbol: 'SOL', price: '$145.80', change: '+8.42%', positive: true, marketCap: '$64.2B', vol: '$4.2B', color: 'bg-purple-500/10', text: 'text-purple-500', char: 'S' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+0.85%', positive: true, marketCap: '$16.1B', vol: '$0.8B', color: 'bg-indigo-500/10', text: 'text-indigo-500', char: 'A' },
    { name: 'Polkadot', symbol: 'DOT', price: '$7.20', change: '-2.15%', positive: false, marketCap: '$10.2B', vol: '$0.4B', color: 'bg-rose-500/10', text: 'text-rose-500', char: 'P' },
];

export default function MarketsPage() {
    const { t } = useLanguage();
    const { coins, currency, fetchCoins } = useCryptoStore();

    // Reutilizar la caché almacenada por Dashboard o fetchear si entra directo
    useEffect(() => {
        fetchCoins();
    }, [currency, fetchCoins]);

    const displayCoins = coins.length > 0 ? coins.map(c => {
        const isPositive = c.price_change_percentage_24h >= 0;
        return {
            name: c.name,
            symbol: c.symbol.toUpperCase(),
            price: `${currency === 'usd' ? '$' : '€'}${c.current_price.toLocaleString()}`,
            change: `${isPositive ? '+' : ''}${c.price_change_percentage_24h?.toFixed(2)}%`,
            positive: isPositive,
            marketCap: `${currency === 'usd' ? '$' : '€'}${(c.market_cap / 1e9).toFixed(2)}B`,
            vol: `${currency === 'usd' ? '$' : '€'}${(c.total_volume / 1e9).toFixed(2)}B`,
            char: c.symbol[0].toUpperCase(),
            color: isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10',
            text: isPositive ? 'text-emerald-500' : 'text-rose-500',
        };
    }).slice(0, 10) : COINS_MOCK.map(c => ({
        ...c,
        price: c.price.replace('$', currency === 'usd' ? '$' : '€'),
        marketCap: c.marketCap.replace('$', currency === 'usd' ? '$' : '€')
    }));

    const MARKET_STATS = [
        { label: t.markets.globalStats.marketCap, value: `${currency === 'usd' ? '$' : '€'}2.64T`, change: '+2.4%', positive: true, icon: Globe },
        { label: t.markets.globalStats.volume24h, value: `${currency === 'usd' ? '$' : '€'}84.2B`, change: '-5.1%', positive: false, icon: BarChart3 },
        { label: t.markets.globalStats.btcDominance, value: '52.1%', change: '+0.2%', positive: true, icon: Activity },
    ];

    return (
        <div className="space-y-6 fade-in h-full w-full pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{t.sidebar.markets}</h1>
                    <p className="text-muted-foreground mt-1">{t.markets.subtitle}</p>
                </div>
                <div className="flex space-x-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={t.markets.searchPlaceholder}
                            className="bg-muted/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Global Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MARKET_STATS.map((stat, i) => (
                    <div key={i} className="glass-card p-4 flex items-center justify-between group hover:border-brand-primary/30 transition-all cursor-default">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                                <stat.icon className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                <p className="text-lg font-black text-foreground">{stat.value}</p>
                            </div>
                        </div>
                        <div className={clsx(
                            "text-xs font-bold px-2 py-1 rounded-lg",
                            stat.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        )}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Markets Table */}
                <div className="glass-card lg:col-span-8 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                        <h3 className="text-sm font-bold text-foreground flex items-center uppercase tracking-wider">
                            <Zap className="w-4 h-4 mr-2 text-brand-accent" /> {t.markets.assetsByCap}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors border border-transparent hover:border-border">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.markets.tableHeaders.asset}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">{t.markets.tableHeaders.price}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">{t.markets.tableHeaders.change24h}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right hidden md:table-cell">{t.markets.tableHeaders.marketCap}</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {displayCoins.map((coin, i) => (
                                    <tr key={i} className="hover:bg-muted/20 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-[10px] font-black text-muted-foreground w-4">{i + 1}</span>
                                                <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-sm", coin.color, coin.text)}>
                                                    {coin.char}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{coin.name}</p>
                                                    <p className="text-[10px] font-medium text-muted-foreground">{coin.symbol}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="text-sm font-black text-foreground">{coin.price}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={clsx(
                                                "text-xs font-black inline-flex items-center px-2 py-0.5 rounded-md",
                                                coin.positive ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                                            )}>
                                                {coin.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                                {coin.change}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right hidden md:table-cell">
                                            <p className="text-sm font-medium text-muted-foreground">{coin.marketCap}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-border/50 text-center">
                        <button className="text-xs font-bold text-brand-primary hover:underline">{t.markets.viewAllCryptos('12,453')}</button>
                    </div>
                </div>

                {/* Sidebar: Winners & Losers */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Winners */}
                    <div className="glass-card p-6 border-l-4 border-l-emerald-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-foreground flex items-center uppercase tracking-wider">
                                <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> {t.markets.winners24h}
                            </h3>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Solana', symbol: 'SOL', change: '+12.4%', color: 'text-emerald-500' },
                                { name: 'Pepe', symbol: 'PEPE', change: '+8.2%', color: 'text-emerald-500' },
                                { name: 'Render', symbol: 'RNDR', change: '+5.7%', color: 'text-emerald-500' },
                            ].map((c, i) => (
                                <div key={i} className="flex justify-between items-center p-2 hover:bg-muted/40 rounded-lg transition-all cursor-pointer">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{c.symbol[0]}</div>
                                        <span className="text-xs font-bold">{c.name}</span>
                                    </div>
                                    <span className={clsx("text-xs font-black", c.color)}>{c.change}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending News/Insight */}
                    <div className="glass-card p-6 bg-brand-primary/5 border-dashed">
                        <h3 className="text-sm font-black text-brand-primary mb-3 flex items-center uppercase tracking-widest">
                            <Activity className="w-4 h-4 mr-2" /> {t.markets.marketInsight}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {t.markets.insightText}
                        </p>
                        <button className="mt-4 text-[10px] font-black uppercase text-foreground hover:text-brand-primary transition-colors flex items-center">
                            {t.markets.readTechReport} <ArrowRight size={12} className="ml-1" />
                        </button>
                    </div>

                    {/* New Listings */}
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center uppercase tracking-wider">
                            <Zap className="w-4 h-4 mr-2 text-brand-accent" /> {t.markets.newListings}
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Jupiter', symbol: 'JUP', time: t.markets.hoursAgo(2) },
                                { name: 'Manta Net', symbol: 'MANTA', time: t.markets.hoursAgo(5) },
                            ].map((c, i) => (
                                <div key={i} className="flex items-center space-x-3 p-2">
                                    <div className="w-8 h-8 rounded-xl bg-muted border border-border flex items-center justify-center font-black text-xs">{c.symbol[0]}</div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">{c.name}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase">{c.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

