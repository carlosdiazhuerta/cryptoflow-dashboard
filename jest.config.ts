import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Proveer la ruta de la app Next.js para cargar la configuración y variables de entorno
    dir: './',
});

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom', // Fundamental para simular el DOM del navegador en Node.js
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Archivo para configurar Jest, mockear APIs y añadir aserciones de testing-library
    moduleNameMapper: {
        // Alias para paths (si se configuraron en tsconfig)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default createJestConfig(config);
