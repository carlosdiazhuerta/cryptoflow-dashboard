"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '@/lib/i18n';

const DATA = [
    { name: 'Bitcoin', value: 65, color: '#f59e0b' },
    { name: 'Ethereum', value: 20, color: '#6366f1' },
    { name: 'Solana', value: 10, color: '#8b5cf6' },
    { name: 'Cardano', value: 5, color: '#3b82f6' },
];

export default function AllocationChart() {
    const { t } = useLanguage();

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--popover)',
                            borderColor: 'var(--border)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)',
                            color: 'var(--popover-foreground)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: 'var(--popover-foreground)' }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-xs font-medium text-muted-foreground">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
