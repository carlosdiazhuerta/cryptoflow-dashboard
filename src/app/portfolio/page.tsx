"use client";

import React from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    RefreshCw,
    Send,
    PieChart as PieIcon,
    History,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';
import AllocationChart from '@/components/charts/AllocationChart';
import { useLanguage } from '@/lib/i18n';
import { clsx } from 'clsx';

const ASSETS = [
    { name: 'Bitcoin', symbol: 'BTC', amount: '1.25', value: '$81,250.00', change: '+5.45%', positive: true, char: 'B', color: 'bg-orange-500/10', text: 'text-orange-500' },
    { name: 'Ethereum', symbol: 'ETH', amount: '12.40', value: '$32,240.00', change: '-1.20%', positive: false, char: 'E', color: 'bg-blue-500/10', text: 'text-blue-500' },
    { name: 'Solana', symbol: 'SOL', amount: '150.00', value: '$11,250.00', change: '+12.4%', positive: true, char: 'S', color: 'bg-purple-500/10', text: 'text-purple-500' },
    { name: 'Cardano', symbol: 'ADA', amount: '5000.00', value: '$2,250.00', change: '+0.8%', positive: true, char: 'A', color: 'bg-indigo-500/10', text: 'text-indigo-500' },
];

export default function PortfolioPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 fade-in h-full w-full pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{t.sidebar.portfolio}</h1>
                    <p className="text-muted-foreground mt-1">{t.portfolio.subtitle}</p>
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2.5 bg-muted border border-border hover:bg-muted/80 text-foreground text-sm font-bold rounded-xl transition-all flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        {t.portfolio.transfer}
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-foreground text-sm font-black rounded-xl transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.portfolio.deposit}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Total Balance Card */}
                <div className="glass-card p-6 md:p-8 lg:col-span-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-brand-primary/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-bold text-muted-foreground mb-2 flex items-center uppercase tracking-wider">
                                    <Wallet className="w-4 h-4 mr-2 text-brand-primary" /> {t.portfolio.estimatedBalance}
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-6">
                                    <span className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">$124,563.00</span>
                                    <span className="flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md text-xs font-black mt-2 md:mt-0 w-fit">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        +12.5% ($13,840)
                                    </span>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <span className="px-3 py-1 bg-muted border border-border rounded-full text-[10px] font-bold text-muted-foreground uppercase">{t.portfolio.updated('2m')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/50">
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t.portfolio.investment}</p>
                                <p className="text-lg font-black text-foreground">$100k</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t.portfolio.profit}</p>
                                <p className="text-lg font-black text-emerald-500">+$24.5k</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t.portfolio.assetsCount}</p>
                                <p className="text-lg font-black text-foreground">8</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">{t.portfolio.risk}</p>
                                <p className="text-lg font-black text-brand-primary">{t.portfolio.riskLevels.medium}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asset Allocation Chart */}
                <div className="glass-card p-6 lg:col-span-4 flex flex-col">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center uppercase tracking-wider">
                        <PieIcon className="w-4 h-4 mr-2 text-brand-secondary" /> {t.portfolio.distribution}
                    </h3>
                    <div className="flex-1 flex items-center justify-center">
                        <AllocationChart />
                    </div>
                </div>

                {/* Assets Table */}
                <div className="glass-card overflow-hidden lg:col-span-8 flex flex-col">
                    <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                        <h3 className="text-sm font-bold text-foreground flex items-center uppercase tracking-wider">
                            <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> {t.portfolio.mainAssets}
                        </h3>
                        <button className="text-xs font-bold text-brand-primary hover:underline">{t.portfolio.viewAll}</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.portfolio.asset}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.portfolio.balance}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">{t.portfolio.value}</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">{t.portfolio.change}</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {ASSETS.map((asset, i) => (
                                    <tr key={i} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-sm", asset.color, asset.text)}>
                                                    {asset.char}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{asset.name}</p>
                                                    <p className="text-[10px] font-medium text-muted-foreground">{asset.symbol}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-foreground">{asset.amount} <span className="text-[10px] text-muted-foreground">{asset.symbol}</span></p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="text-sm font-black text-foreground">{asset.value}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={clsx(
                                                "text-xs font-black inline-flex items-center px-2 py-0.5 rounded-md",
                                                asset.positive ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                                            )}>
                                                {asset.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                                {asset.change}
                                            </span>
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
                </div>

                {/* Activity / Swap */}
                <div className="glass-card p-6 lg:col-span-4 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-foreground text-sm uppercase tracking-widest flex items-center">
                            <History className="w-4 h-4 mr-2 text-brand-primary" /> {t.portfolio.transactions}
                        </h3>
                        <button className="p-1.5 hover:bg-muted rounded-md transition-colors"><RefreshCw className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {[
                            { type: t.portfolio.received, from: 'Wallet Ext', amount: '+0.5 BTC', date: `${t.portfolio.today}, 12:45 PM`, status: t.portfolio.completed },
                            { type: t.portfolio.swap, from: 'BTC → ETH', amount: '1.2 BTC', date: `${t.portfolio.yesterday}, 09:20 AM`, status: t.portfolio.completed },
                            { type: t.portfolio.sent, from: 'Exchange', amount: '-45.0 SOL', date: 'Mar 2, 2024', status: t.portfolio.completed },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        tx.type === t.portfolio.received ? "bg-emerald-500/10 text-emerald-500" :
                                            tx.type === t.portfolio.sent ? "bg-rose-500/10 text-rose-500" : "bg-brand-primary/10 text-brand-primary"
                                    )}>
                                        {tx.type === t.portfolio.received ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">{tx.type} {tx.from}</p>
                                        <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={clsx("text-xs font-black", tx.amount.startsWith('+') ? "text-emerald-500" : "text-foreground")}>{tx.amount}</p>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 border border-border hover:bg-muted text-foreground text-xs font-bold rounded-xl transition-all">
                        {t.portfolio.viewFullHistory}
                    </button>
                </div>
            </div>
        </div>
    );
}

