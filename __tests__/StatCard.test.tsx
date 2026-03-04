import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from '../src/components/ui/StatCard';
import { Bitcoin } from 'lucide-react';

describe('StatCard Component', () => {

    it('renderiza correctamente titulo y valor normal', () => {
        render(
            <StatCard
                title="Precio Actual"
                value="$50,000"
                icon={Bitcoin}
            />
        );

        // Verificamos que contenga la información básica
        expect(screen.getByText('Precio Actual')).toBeInTheDocument();
        expect(screen.getByText('$50,000')).toBeInTheDocument();
    });

    it('muestra el cambio de precio (porcentaje) si se proporciona (positivo vs negativo)', () => {
        const { rerender } = render(
            <StatCard
                title="Cambio 24h"
                value="$5,000"
                change={5.2}
                icon={Bitcoin}
            />
        );

        // Muestra el 5.2% positivo
        expect(screen.getByText('5.20%')).toBeInTheDocument();
    });

    it('no muestra componente interno si recibe estado `loading`', () => {
        // Rendereamos con loading en TRUE
        const { container } = render(
            <StatCard
                title="Cargando"
                value="$0"
                icon={Bitcoin}
                loading={true}
            />
        );

        // El componente original usa "animate-pulse" para el Skeleton
        // Nos aseguramos que el texto principal todavía no existe
        expect(screen.queryByText('Cargando')).not.toBeInTheDocument();

        // Y verificamos que esté mostrando la clase "animate-pulse" (loader)
        // El primer div es el wrapper del componente.
        expect(container.firstChild).toHaveClass('animate-pulse');
    });

});
