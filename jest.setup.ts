import '@testing-library/jest-dom';

// Muchas librerías de gráficos (como Recharts) dependen de ResizeObserver para ser responsivas.
// Como JSDOM no tiene ResizeObserver de forma nativa, necesitamos moquearlo para que los test no fallen.
class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

window.ResizeObserver = ResizeObserverMock;
