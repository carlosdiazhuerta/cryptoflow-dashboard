"use client";

import React from 'react';
import {
    LayoutDashboard,
    TrendingUp,
    Settings,
    Bell,
    Search,
    PanelLeft,
    X,
    Wallet,
    ChevronLeft,
    ChevronRight,
    LineChart,
    Activity
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '@/lib/i18n';

// ... (se mantiene el cn)
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DashboardShellProps {
    children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const pathname = usePathname(); // Hook de Next.js para saber en qué ruta estamos
    const { t } = useLanguage();

    // Función auxiliar para cerrar el sidebar al navegar (en móviles)
    const handleNavigate = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar Desktop */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 glass-card transition-all duration-300 lg:relative lg:translate-x-0 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r-0 flex flex-col",
                isCollapsed ? "w-20" : "w-64",
                !isSidebarOpen ? "-translate-x-full shadow-none" : "translate-x-0",
                "lg:translate-x-0 lg:shadow-xl"
            )}>
                <div className="flex flex-col h-full">
                    <div className={cn("flex items-center p-6 h-20", isCollapsed ? "justify-center px-0" : "justify-between")}>
                        <Link href="/" className="flex items-center space-x-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg" onClick={handleNavigate}>
                            {!isCollapsed && (
                                <span className="text-xl font-bold tracking-tight text-foreground">CryptoFlow</span>
                            )}
                        </Link>
                        {/* Botón de Colapso en Desktop (integrado en el sidebar) */}
                        <button
                            className="hidden lg:flex p-1.5 rounded-lg bg-muted/50 border border-border hover:bg-brand-primary hover:text-foreground hover:border-brand-primary transition-all text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            aria-label={isCollapsed ? t.dashboardShell.expandNav : t.dashboardShell.collapseNav}
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>
                        {/* Botón para cerrar el menú lateral en móvil con accesibilidad */}
                        {!isCollapsed && (
                            <button
                                className="lg:hidden p-2 pr-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-all"
                                onClick={() => setIsSidebarOpen(false)}
                                aria-label={t.dashboardShell.closeNav}
                            >
                                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
                        <NavItem href="/" icon={<LayoutDashboard />} label={t.sidebar.dashboard} currentPath={pathname} onClick={handleNavigate} isCollapsed={isCollapsed} />
                        <NavItem href="/markets" icon={<Activity />} label={t.sidebar.markets} currentPath={pathname} onClick={handleNavigate} isCollapsed={isCollapsed} />
                        <NavItem href="/portfolio" icon={<Wallet />} label={t.sidebar.portfolio} currentPath={pathname} onClick={handleNavigate} isCollapsed={isCollapsed} />
                        <NavItem href="/alerts" icon={<Bell />} label={t.sidebar.alerts} currentPath={pathname} onClick={handleNavigate} isCollapsed={isCollapsed} />
                        <NavItem href="/settings" icon={<Settings />} label={t.sidebar.settings} currentPath={pathname} onClick={handleNavigate} isCollapsed={isCollapsed} />
                    </nav>

                    {!isCollapsed && (
                        <div className="p-4 mt-auto">
                            <div className="glass-card p-4 rounded-xl bg-brand-primary/10 border-brand-primary/20">
                                <p className="text-sm font-medium text-brand-primary">{t.sidebar.pro}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t.sidebar.upgrade}</p>
                                {/* Botón de upgrade accesible por teclado */}
                                <button
                                    className="w-full mt-3 py-2 px-4 bg-brand-primary hover:bg-brand-primary/90 text-foreground rounded-lg text-xs font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    aria-label={t.dashboardShell.upgradePro}
                                >
                                    {t.sidebar.btn}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header accesibilidad (Sticky) */}
                <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-6 lg:px-8 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center space-x-4">
                        {/* Botón menú hamburguesa accesible */}
                        <button
                            className="lg:hidden p-2 -ml-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-all"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label={t.dashboardShell.openNav}
                            aria-expanded={isSidebarOpen}
                        >
                            <PanelLeft className="w-6 h-6 text-foreground hover:text-brand-primary" />
                        </button>
                        <div className="relative hidden md:block z-50">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <input
                                type="search"
                                placeholder={t.sidebar.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                aria-label={t.dashboardShell.searchCrypto}
                                className="bg-muted border border-border rounded-full py-1.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary w-64 transition-all focus:w-80"
                            />

                            {/* Resultados de búsqueda Hardcodeados */}
                            {isSearchFocused && searchQuery.length > 0 && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-background border border-border rounded-xl shadow-2xl p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 z-[60]">
                                    <div className="text-[10px] font-bold text-muted-foreground mb-2 px-3 pt-2 uppercase tracking-wider">{t.dashboardShell.resultsFor(searchQuery)}</div>
                                    <div className="space-y-1">
                                        {[
                                            { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', color: 'bg-orange-500/10', text: 'text-orange-500', char: 'B' },
                                            { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: 'bg-blue-500/10', text: 'text-blue-500', char: 'E' },
                                            { id: 'solana', name: 'Solana', symbol: 'SOL', color: 'bg-purple-500/10', text: 'text-purple-500', char: 'S' },
                                            { id: 'cardano', name: 'Cardano', symbol: 'ADA', color: 'bg-indigo-500/10', text: 'text-indigo-500', char: 'A' }
                                        ].filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .slice(0, 4)
                                            .map(coin => (
                                                <Link key={coin.id} href="/markets" className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-all group border border-transparent hover:border-border">
                                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0", coin.color, coin.text)}>
                                                        {coin.char}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-foreground truncate">{coin.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{coin.symbol} • {t.dashboardShell.viewMarket}</p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            ))}
                                    </div>
                                    {searchQuery.length > 0 && [
                                        { name: 'Bitcoin', symbol: 'BTC' },
                                        { name: 'Ethereum', symbol: 'ETH' },
                                        { name: 'Solana', symbol: 'SOL' },
                                        { name: 'Cardano', symbol: 'ADA' }
                                    ].filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.symbol.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                            <div className="p-8 text-center bg-muted/30 rounded-lg m-1 border border-dashed border-border">
                                                <p className="text-sm text-muted-foreground font-medium italic">{t.dashboardShell.noAssetsFound(searchQuery)}</p>
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                            <span className="text-xs font-medium text-emerald-500">{t.sidebar.liveMarkets}</span>
                        </div>
                        {/* Botón de perfil visible por teclado */}
                        <button
                            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-shadow"
                            aria-label={t.dashboardShell.userProfile}
                        >
                            <span className="text-xs font-bold text-foreground">JS</span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide">
                    {children}
                </div>
            </main>

            {/* Overlay Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    currentPath: string;
    onClick?: () => void;
    isCollapsed?: boolean;
}

function NavItem({ href, icon, label, currentPath, onClick, isCollapsed }: NavItemProps) {
    // Calculamos si la ruta provista coincide estrictamente con la actual
    const active = currentPath === href;

    // Utilizamos <Link> de Next.js para Client-Side Navigation sin recargar la página
    return (
        <Link
            href={href}
            onClick={onClick}
            title={isCollapsed ? label : undefined}
            // aria-current para notificar a lectores de pantalla cuál es la página activa
            aria-current={active ? 'page' : undefined}
            className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isCollapsed ? "justify-center" : "space-x-3",
                active
                    ? "bg-brand-primary text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <span className={cn(
                "w-5 h-5 flex-shrink-0 flex items-center justify-center",
                active ? "text-foreground" : "text-muted-foreground group-hover:text-brand-primary"
            )}>
                {/* Clonamos de forma segura el ícono para pasarle tamaño y usarlo modularmente */}
                {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
            </span>
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{label}</span>}
        </Link>
    );
}
