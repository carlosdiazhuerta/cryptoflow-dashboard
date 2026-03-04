import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'Alerts - CryptoFlow',
};

const DUMMY_ALERTS = [
    { id: 1, type: 'success', title: 'Depósito Completado', message: 'Tu depósito de 0.5 BTC ha sido confirmado en la red.', time: 'Hace 5 min', icon: CheckCircle2 },
    { id: 2, type: 'warning', title: 'Volatilidad Detectada', message: 'Ethereum (ETH) ha bajado un 5% en la última hora.', time: 'Hace 2 horas', icon: AlertTriangle },
    { id: 3, type: 'info', title: 'Nueva Funcionalidad', message: 'Ya puedes exportar tu historial de transacciones en PDF.', time: 'Hace 1 día', icon: Info },
];

export default function AlertsPage() {
    return (
        <div className="space-y-6 fade-in h-full max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Centro de Alertas</h1>
                    <p className="text-muted-foreground mt-1">Mantente al tanto de la actividad de tu cuenta y el mercado.</p>
                </div>
                <button className="px-4 py-2 bg-muted border border-border hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl transition-all">
                    Marcar todas como leídas
                </button>
            </div>

            <div className="space-y-4">
                {DUMMY_ALERTS.map((alert) => (
                    <div key={alert.id} className="glass-card p-5 group hover:border-brand-primary/30 transition-all flex items-start gap-4 cursor-pointer">
                        <div className={`p-3 rounded-full shrink-0 ${alert.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                            alert.type === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                                'bg-brand-primary/20 text-brand-primary'
                            }`}>
                            <alert.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-foreground font-bold">{alert.title}</h3>
                                <span className="text-xs font-semibold text-muted-foreground bg-muted/80 px-2 py-1 rounded-md">{alert.time}</span>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">{alert.message}</p>
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                        <Bell className="w-12 h-12 text-muted mx-auto mb-4" />
                        <p className="text-muted-foreground font-medium">No hay más notificaciones recientes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
