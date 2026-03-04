import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CoinSelector from '../src/components/filters/CoinSelector';
import { CoinMarketData } from '../src/types/crypto';

// Datos de simulación (mock) para probar el selector
const mockCoins: CoinMarketData[] = [
    {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://fake.url/btc.png',
        current_price: 50000,
        market_cap: 1000000000,
        market_cap_rank: 1,
        total_volume: 5000000,
        high_24h: 51000,
        low_24h: 49000,
        price_change_24h: 1000,
        price_change_percentage_24h: 2,
        sparkline_in_7d: { price: [] },
        last_updated: '2023-10-01T00:00:00.000Z'
    },
    {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://fake.url/eth.png',
        current_price: 3000,
        market_cap: 300000000,
        market_cap_rank: 2,
        total_volume: 2000000,
        high_24h: 3100,
        low_24h: 2900,
        price_change_24h: -100,
        price_change_percentage_24h: -3.3,
        sparkline_in_7d: { price: [] },
        last_updated: '2023-10-01T00:00:00.000Z'
    }
];

describe('CoinSelector Component', () => {
    const onSelectMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza la moneda seleccionada de inicio', () => {
        render(
            <CoinSelector
                coins={mockCoins}
                selectedId="bitcoin"
                onSelect={onSelectMock}
            />
        );

        // Debe mostrar "Bitcoin" como el texto en el botón principal cerrado
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    it('abre el menú desplegable al hacer click', () => {
        render(
            <CoinSelector
                coins={mockCoins}
                selectedId="bitcoin"
                onSelect={onSelectMock}
            />
        );

        // Buscar el botón inicial que abarca la selección
        // Utilizamos el role de botón que abre el listbox
        const toggleBtn = screen.getByRole('button', { name: /bitcoin/i });
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

        // Hacemos clic para abrir
        fireEvent.click(toggleBtn);

        // Ahora el listbox debería existir
        expect(screen.getByRole('listbox')).toBeInTheDocument();

        // Y debemos ver opciones (ej. Ethereum)
        expect(screen.getAllByRole('option')).toHaveLength(2);
        expect(screen.getByText('Ethereum')).toBeInTheDocument();
    });

    it('selecciona otra moneda y evalúa la llamada del callback', () => {
        render(
            <CoinSelector
                coins={mockCoins}
                selectedId="bitcoin"
                onSelect={onSelectMock}
            />
        );

        // Abrir menú
        const toggleBtn = screen.getByRole('button', { name: /bitcoin/i });
        fireEvent.click(toggleBtn);

        // Seleccionar Ethereum (clic a la opción dentro de listbox)
        const ethOption = screen.getAllByRole('option')[1]; // El segundo en el mock
        fireEvent.click(ethOption);

        // Comprobamos que nuestro callback "mock" haya recibido 'ethereum' como argumento
        expect(onSelectMock).toHaveBeenCalledWith('ethereum');
        expect(onSelectMock).toHaveBeenCalledTimes(1);
    });

});
