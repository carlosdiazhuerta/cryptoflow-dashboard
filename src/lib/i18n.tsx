"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export const es = {
    settings: {
        title: 'Configuración',
        subtitle: 'Administra tus preferencias de cuenta y seguridad.',
        profile: 'Perfil',
        security: 'Seguridad',
        billing: 'Facturación',
        profileDetails: 'Detalles del Perfil',
        changeAvatar: 'Cambiar Avatar',
        fullName: 'Nombre Completo',
        email: 'Email',
        saveChanges: 'Guardar Cambios',
        preferences: 'Preferencias',
        darkMode: 'Modo Oscuro',
        darkModeDesc: 'Tema oscuro en toda la plataforma',
        emailAlerts: 'Alertas por Email',
        emailAlertsDesc: 'Recibe notificaciones de mercado',
        language: 'Idioma',
        languageDesc: 'Idioma principal de la interfaz',
        dangerZone: 'Zona Crítica',
        dangerZoneDesc: 'Al cerrar tu sesión, necesitarás iniciar con tus credenciales seguras nuevamente.',
        logout: 'Cerrar Sesión',
        returnBtn: 'Volver al Dashboard'
    },
    dashboard: {
        title: 'Resumen del Mercado',
        subtitle: 'Analítica de criptomonedas y rendimiento del mercado en tiempo real.',
        currentPrice: 'Precio Actual',
        currentPriceInfo: 'Valor de mercado actual del activo seleccionado en tiempo real.',
        marketCap: 'Cap. de Mercado',
        marketCapInfo: 'Valor total de todas las monedas extraídas (Multiplica el Precio por la Cantidad Circulante).',
        volume24h: 'Volumen 24h',
        volume24hInfo: 'Monto total comerciado de este activo en todas las plataformas durante las últimas 24 horas.',
        marketRank: 'Ranking',
        marketRankInfo: 'Posición que ocupa este activo en el ecosistema global de criptomonedas según su Capitalización.',
        high24h: 'Máximo 24h',
        high24hInfo: 'El precio más alto que pagó alguien por este activo en las últimas 24 hrs.',
        low24h: 'Mínimo 24h',
        low24hInfo: 'El precio más bajo que se registró por este activo en las últimas 24 hrs.',
        priceChartTitle: 'Analítica de Precio:',
        priceChartSubtitle: 'RENDIMIENTO HISTÓRICO',
        marketCapChartTitle: 'Distribución del Mercado',
        marketCapChartSubtitle: 'TOP 6 ACTIVOS POR CAPITALIZACIÓN',
        priceChartInfo: 'Muestra la evolución del precio del activo a lo largo del tiempo seleccionado.',
        marketCapChartInfo: 'Compara la capitalización global entre los mayores proyectos.',
        loadingHistory: 'Obteniendo historial...',
        loadingMarketCap: 'Obteniendo distribución...',
        refreshAria: 'Refrescar datos del mercado',
        fetchError: 'Los datos del mercado no están disponibles en este momento. Inténtalo más tarde.',
        refreshError: 'Error al refrescar la información'
    },
    sidebar: {
        dashboard: 'Dashboard',
        markets: 'Mercados',
        portfolio: 'Portafolio',
        alerts: 'Alertas',
        settings: 'Configuración',
        pro: 'Versión Pro',
        upgrade: 'Mejora a pro para obtener analíticas avanzadas y más gráficos.',
        btn: 'Mejorar Ahora',
        search: 'Buscar activos...',
        liveMarkets: 'Mercados en Vivo'
    },
    charts: {
        priceAreaLabel: (coin: string, period: string) => `Gráfico de área interactivo mostrando el historial de precio de ${coin} durante el periodo ${period}`,
        selectPeriod: 'Seleccionar periodo de tiempo',
        priceOf: (coin: string) => `Precio de ${coin}`,
        date: 'Fecha',
        unitValue: 'Valor Unitario',
        marketCapBarLabel: 'Gráfico de barras mostrando la distribución del mercado de las top 6 criptomonedas',
        asset: 'Activo',
        globalMarketCap: 'Capitalización Global',
        marketDistribution: 'Distribución del Mercado'
    },
    dashboardShell: {
        expandNav: 'Expandir menú de navegación',
        collapseNav: 'Colapsar menú de navegación',
        closeNav: 'Cerrar menú de navegación',
        openNav: 'Abrir menú de navegación',
        upgradePro: 'Actualizar a la versión Pro',
        searchCrypto: 'Buscar criptomonedas',
        userProfile: 'Perfil de usuario JS',
        resultsFor: (query: string) => `Resultados para "${query}"`,
        viewMarket: 'Ver mercado',
        noAssetsFound: (query: string) => `No se encontraron activos para "${query}"`
    },
    portfolio: {
        subtitle: 'Monitorea tus activos, rendimiento y distribución global.',
        transfer: 'Transferir',
        deposit: 'Depositar',
        estimatedBalance: 'Balance Total Estimado',
        updated: (time: string) => `Actualizado hace ${time}`,
        investment: 'Inversión',
        profit: 'Ganancia',
        assetsCount: 'Activos',
        risk: 'Riesgo',
        riskLevels: { low: 'Bajo', medium: 'Medio', high: 'Alto' },
        distribution: 'Distribución',
        mainAssets: 'Tus Activos principales',
        viewAll: 'Ver todos',
        asset: 'Activo',
        balance: 'Balance',
        value: 'Valor',
        change: 'Cambio',
        transactions: 'Transacciones',
        received: 'Recibido',
        sent: 'Enviado',
        swap: 'Swap',
        completed: 'Completado',
        viewFullHistory: 'Ver historial completo',
        today: 'Hoy',
        yesterday: 'Ayer'
    },
    markets: {
        subtitle: 'Explora el mercado global de criptoactivos en tiempo real.',
        searchPlaceholder: 'Buscar moneda...',
        globalStats: {
            marketCap: 'Cap. de Mercado',
            volume24h: 'Volumen 24h',
            btcDominance: 'Dominancia BTC'
        },
        assetsByCap: 'Activos por Capitalización',
        tableHeaders: {
            asset: '# Activo',
            price: 'Precio',
            change24h: '24h %',
            marketCap: 'Market Cap'
        },
        viewAllCryptos: (count: string) => `Ver todas las criptomonedas (${count})`,
        winners24h: 'Ganadores 24h',
        marketInsight: 'Insight de Mercado',
        insightText: 'Bitcoin mantiene su soporte clave por encima de los **$65,000**. El sentimiento del mercado se mantiene en "Codicia" (74/100) impulsando las Altcoins de IA.',
        readTechReport: 'Leer reporte técnico',
        newListings: 'Nuevos Listados',
        hoursAgo: (hours: number) => `Hace ${hours}h`
    },
    coinSelector: {
        selectCoin: 'Seleccionar Moneda',
        listbox: 'Lista de monedas'
    }
};

export const en = {
    settings: {
        title: 'Settings',
        subtitle: 'Manage your account and security preferences.',
        profile: 'Profile',
        security: 'Security',
        billing: 'Billing',
        profileDetails: 'Profile Details',
        changeAvatar: 'Change Avatar',
        fullName: 'Full Name',
        email: 'Email',
        saveChanges: 'Save Changes',
        preferences: 'Preferences',
        darkMode: 'Dark Mode',
        darkModeDesc: 'Dark theme across the platform',
        emailAlerts: 'Email Alerts',
        emailAlertsDesc: 'Receive market notifications',
        language: 'Language',
        languageDesc: 'Main interface language',
        dangerZone: 'Danger Zone',
        dangerZoneDesc: 'By logging out, you will need to sign in with your secure credentials again.',
        logout: 'Log Out',
        returnBtn: 'Return to Dashboard'
    },
    dashboard: {
        title: 'Market Overview',
        subtitle: 'Real-time cryptocurrency analytics and market performance.',
        currentPrice: 'Current Price',
        currentPriceInfo: 'Real-time market value of the selected asset.',
        marketCap: 'Market Cap',
        marketCapInfo: 'Total value of all mined coins (Calculated by multiplying Price by Circulating Supply).',
        volume24h: '24h Volume',
        volume24hInfo: 'Total trading volume for this asset across all tracked platforms in the last 24 hours.',
        marketRank: 'Market Rank',
        marketRankInfo: 'Positions this asset holds in the global cryptocurrency ecosystem based on Market Cap.',
        high24h: '24h High',
        high24hInfo: 'The highest price paid for this asset within the last 24 hours.',
        low24h: '24h Low',
        low24hInfo: 'The lowest recorded price for this asset within the last 24 hours.',
        priceChartTitle: 'Price Analytics:',
        priceChartSubtitle: 'HISTORICAL PERFORMANCE',
        marketCapChartTitle: 'Market Distribution',
        marketCapChartSubtitle: 'TOP 6 ASSETS BY MARKET CAP',
        priceChartInfo: 'Displays the price evolution of the asset over the selected time frame.',
        marketCapChartInfo: 'Compares the global market capitalization among the top projects.',
        loadingHistory: 'Fetching history...',
        loadingMarketCap: 'Fetching distribution...',
        refreshAria: 'Refresh market data',
        fetchError: 'Market data is currently unavailable. Please try again later.',
        refreshError: 'Error refreshing information'
    },
    sidebar: {
        dashboard: 'Dashboard',
        markets: 'Markets',
        portfolio: 'Portfolio',
        alerts: 'Alerts',
        settings: 'Settings',
        pro: 'Pro Version',
        upgrade: 'Upgrade for advanced analytics and more charts.',
        btn: 'Upgrade Now',
        search: 'Search assets...',
        liveMarkets: 'Live Markets'
    },
    charts: {
        priceAreaLabel: (coin: string, period: string) => `Interactive area chart displaying ${coin} price history over ${period}`,
        selectPeriod: 'Select time period',
        priceOf: (coin: string) => `${coin} Price`,
        date: 'Date',
        unitValue: 'Unit Value',
        marketCapBarLabel: 'Bar chart showing market distribution of top 6 cryptocurrencies',
        asset: 'Asset',
        globalMarketCap: 'Global Market Cap',
        marketDistribution: 'Market Distribution'
    },
    dashboardShell: {
        expandNav: 'Expand navigation menu',
        collapseNav: 'Collapse navigation menu',
        closeNav: 'Close navigation menu',
        openNav: 'Open navigation menu',
        upgradePro: 'Upgrade to Pro version',
        searchCrypto: 'Search cryptocurrencies',
        userProfile: 'User profile JS',
        resultsFor: (query: string) => `Results for "${query}"`,
        viewMarket: 'View market',
        noAssetsFound: (query: string) => `No assets found for "${query}"`
    },
    portfolio: {
        subtitle: 'Monitor your assets, performance, and global distribution.',
        transfer: 'Transfer',
        deposit: 'Deposit',
        estimatedBalance: 'Estimated Total Balance',
        updated: (time: string) => `Updated ${time} ago`,
        investment: 'Investment',
        profit: 'Profit',
        assetsCount: 'Assets',
        risk: 'Risk',
        riskLevels: { low: 'Low', medium: 'Medium', high: 'High' },
        distribution: 'Distribution',
        mainAssets: 'Your Main Assets',
        viewAll: 'View all',
        asset: 'Asset',
        balance: 'Balance',
        value: 'Value',
        change: 'Change',
        transactions: 'Transactions',
        received: 'Received',
        sent: 'Sent',
        swap: 'Swap',
        completed: 'Completed',
        viewFullHistory: 'View full history',
        today: 'Today',
        yesterday: 'Yesterday'
    },
    markets: {
        subtitle: 'Explore the global crypto asset market in real-time.',
        searchPlaceholder: 'Search coin...',
        globalStats: {
            marketCap: 'Market Cap',
            volume24h: '24h Volume',
            btcDominance: 'BTC Dominance'
        },
        assetsByCap: 'Assets by Capitalization',
        tableHeaders: {
            asset: '# Asset',
            price: 'Price',
            change24h: '24h %',
            marketCap: 'Market Cap'
        },
        viewAllCryptos: (count: string) => `View all cryptocurrencies (${count})`,
        winners24h: '24h Winners',
        marketInsight: 'Market Insight',
        insightText: 'Bitcoin maintains its key support above **$65,000**. Market sentiment remains in "Greed" (74/100) driving AI Altcoins.',
        readTechReport: 'Read technical report',
        newListings: 'New Listings',
        hoursAgo: (hours: number) => `${hours}h ago`
    },
    coinSelector: {
        selectCoin: 'Select Coin',
        listbox: 'Coin list'
    }
};

type Language = 'es' | 'en';
type Translations = typeof es;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('language') as Language;
        if (stored === 'es' || stored === 'en') {
            setLanguage(stored);
        }
        setMounted(true);
    }, []);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = language === 'en' ? en : es;

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback for non-client components
        return { language: 'es' as Language, setLanguage: () => { }, t: es };
    }
    return context;
}
