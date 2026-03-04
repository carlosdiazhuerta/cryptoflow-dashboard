"use client";

import React, { useState } from 'react';
import { User, Shield, CreditCard, Bell, Moon, Languages, LogOut, Sun, Key, Smartphone, History, Download, CreditCard as CardIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/i18n';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="space-y-6 fade-in h-full w-full">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{t.settings.title}</h1>
                <p className="text-muted-foreground mt-1">{t.settings.subtitle}</p>
            </div>

            {/* Horizontal Tabs Navigation (Sticky) */}
            <div className="sticky top-[-24px] lg:top-[-32px] z-30 bg-background border-b border-border -mx-6 lg:-mx-8 px-6 lg:px-8 pt-6 transition-all duration-300 shadow-md">
                <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide py-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={clsx(
                            "relative px-5 py-4 text-xs md:text-sm font-bold transition-all outline-none shrink-0",
                            activeTab === 'profile' ? "text-brand-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{t.settings.profile}</span>
                        </div>
                        {activeTab === 'profile' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary animate-in fade-in slide-in-from-bottom-1" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={clsx(
                            "relative px-5 py-4 text-xs md:text-sm font-bold transition-all outline-none shrink-0",
                            activeTab === 'security' ? "text-brand-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4" />
                            <span>{t.settings.security}</span>
                        </div>
                        {activeTab === 'security' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary animate-in fade-in slide-in-from-bottom-1" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={clsx(
                            "relative px-5 py-4 text-xs md:text-sm font-bold transition-all outline-none shrink-0",
                            activeTab === 'billing' ? "text-brand-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4" />
                            <span>{t.settings.billing}</span>
                        </div>
                        {activeTab === 'billing' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary animate-in fade-in slide-in-from-bottom-1" />
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-8 px-2 md:px-0">
                {/* Main Content Area */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Contenido PERFIL */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Perfil */}
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">{t.settings.profileDetails}</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-xl">
                                            <span className="text-2xl font-black text-foreground">JS</span>
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-muted hover:bg-border text-foreground text-sm font-medium rounded-lg transition-all">{t.settings.changeAvatar}</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">{t.settings.fullName}</label>
                                            <input type="text" defaultValue="John Smith" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-brand-primary transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">{t.settings.email}</label>
                                            <input type="email" defaultValue="john.smith@ejemplo.com" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-muted-foreground cursor-not-allowed focus:outline-none" disabled />
                                        </div>
                                    </div>

                                    <button className="w-full md:w-auto mt-4 px-6 py-2.5 bg-brand-primary text-foreground font-bold rounded-lg hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">{t.settings.saveChanges}</button>
                                </div>
                            </div>

                            {/* Preferencias */}
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">{t.settings.preferences}</h2>
                                <div className="space-y-6">
                                    {/* Modo Oscuro Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">{t.settings.darkMode}</h4>
                                                <p className="text-muted-foreground text-sm">{t.settings.darkModeDesc}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                                            className={clsx(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                isDarkMode ? "bg-brand-primary" : "bg-muted"
                                            )}
                                        >
                                            <span className={clsx(
                                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                                isDarkMode && "translate-x-6"
                                            )}></span>
                                        </button>
                                    </div>

                                    {/* Alertas Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                                <Bell className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">{t.settings.emailAlerts}</h4>
                                                <p className="text-muted-foreground text-sm">{t.settings.emailAlertsDesc}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setEmailAlerts(!emailAlerts)}
                                            className={clsx(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                emailAlerts ? "bg-brand-primary" : "bg-muted"
                                            )}
                                        >
                                            <span className={clsx(
                                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                                emailAlerts && "translate-x-6"
                                            )}></span>
                                        </button>
                                    </div>

                                    {/* Idioma Selector */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                                                <Languages className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">{t.settings.language}</h4>
                                                <p className="text-muted-foreground text-sm">{t.settings.languageDesc}</p>
                                            </div>
                                        </div>
                                        <select
                                            className="bg-background cursor-pointer border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-primary"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
                                        >
                                            <option value="es">Español</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Zona Peligrosa */}
                            <div className="glass-card p-6 border-rose-500/20">
                                <h2 className="text-lg font-bold text-rose-500 mb-4">{t.settings.dangerZone}</h2>
                                <p className="text-muted-foreground text-sm mb-4">{t.settings.dangerZoneDesc}</p>
                                <button className="px-4 py-2 border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-foreground font-bold rounded-lg transition-colors flex items-center">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {t.settings.logout}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Contenido SEGURIDAD */}
                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">Seguridad de la Cuenta</h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                                <Key className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">Contraseña</h4>
                                                <p className="text-muted-foreground text-sm">Actualizada hace 3 meses</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-muted hover:bg-border text-foreground text-sm font-medium rounded-lg transition-all">Cambiar</button>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                                <Smartphone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">Autenticación de Dos Factores (2FA)</h4>
                                                <p className="text-muted-foreground text-sm">Añade una capa extra de seguridad a tu cuenta</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                                            className={clsx(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                twoFactorAuth ? "bg-brand-primary" : "bg-muted"
                                            )}
                                        >
                                            <span className={clsx(
                                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                                twoFactorAuth && "translate-x-6"
                                            )}></span>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-foreground font-medium">Sesiones Activas</h4>
                                                <p className="text-muted-foreground text-sm">Gestiona los dispositivos conectados a tu cuenta</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-muted hover:bg-border text-foreground text-sm font-medium rounded-lg transition-all">Ver dispositivos</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contenido FACTURACIÓN */}
                    {activeTab === 'billing' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">Plan Actual</h2>
                                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-primary mb-1">Versión Básica</h3>
                                        <p className="text-muted-foreground text-sm">Funcionalidades esenciales para observar el mercado.</p>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <div className="text-2xl font-black text-foreground">$0.00<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
                                        <button className="mt-2 px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">Mejorar a Pro</button>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">Métodos de Pago</h2>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-background rounded-lg shadow-sm">
                                            <CardIcon className="w-6 h-6 text-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">Visa terminada en 4242</p>
                                            <p className="text-sm text-muted-foreground">Expira 12/2026</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-medium text-brand-primary hover:underline">Editar</button>
                                </div>
                                <button className="mt-4 w-full px-4 py-2 border border-dashed border-border text-muted-foreground hover:bg-muted hover:text-foreground font-medium rounded-lg transition-all">
                                    + Añadir nuevo método de pago
                                </button>
                            </div>

                            <div className="glass-card p-6">
                                <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4">Historial de Facturación</h2>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 last:pb-0">
                                            <div className="flex items-center space-x-3">
                                                <History className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-medium text-foreground">Factura #INV-{2026 - i}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-muted-foreground">0{i}/03/2026</span>
                                                <span className="font-bold text-foreground">$0.00</span>
                                                <button className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column / Sidebar Info */}
                <div className="hidden xl:block space-y-6">
                    <div className="glass-card p-6 bg-brand-primary/5 border-brand-primary/20">
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-brand-primary" />
                            Consejos de Seguridad
                        </h3>
                        <ul className="space-y-3 text-xs text-muted-foreground">
                            <li className="flex items-start">
                                <span className="w-1 h-1 rounded-full bg-brand-primary mt-1.5 mr-2 shrink-0" />
                                Nunca compartas tus llaves privadas con nadie.
                            </li>
                            <li className="flex items-start">
                                <span className="w-1 h-1 rounded-full bg-brand-primary mt-1.5 mr-2 shrink-0" />
                                Habilita 2FA para una capa extra de protección.
                            </li>
                            <li className="flex items-start">
                                <span className="w-1 h-1 rounded-full bg-brand-primary mt-1.5 mr-2 shrink-0" />
                                Revisa tus sesiones activas periódicamente.
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card p-6 border-dashed">
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center">
                            <Bell className="w-4 h-4 mr-2 text-brand-primary" />
                            Soporte Prioritario
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            Como usuario de CryptoFlow, tienes acceso a soporte técnico 24/7.
                        </p>
                        <button className="w-full py-2 bg-muted hover:bg-border text-foreground text-xs font-bold rounded-lg transition-colors border border-border">
                            Contactar Soporte
                        </button>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary/20 via-transparent to-indigo-500/10 border border-brand-primary/10">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
                                <User className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">John Smith</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Plan Basic</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-muted-foreground">Límite de Alertas</span>
                                <span className="text-foreground font-bold">5 / 10</span>
                            </div>
                            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-brand-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
