# CryptoFlow Dashboard - Especificación Técnica

Plataforma de visualización de datos de mercado criptográfico desarrollada para la evaluación técnica de Frontend. El sistema integra el consumo de APIs externas con una arquitectura de componentes modular, priorizando la accesibilidad, la seguridad y el rendimiento.

##  Acceso al Despliegue
**URL de Producción:** [https://cryptoflow-dashboard.web.app](https://cryptoflow-dashboard.web.app)

---

## Ejes Técnicos del Proyecto

### 1. Sistema de Visualización de Datos
- **Arquitectura de Gráficos**: Implementación basada en `Recharts`, utilizando SVG para optimización de renderizado.
- **Perspectiva Temporal**: Rangos de datos ajustables (24h, 7d, 30d, 1y) mediante parámetros de consulta a la API de CoinGecko.
- **Distribución de Activos**: Cálculo y representación porcentual de la composición del portafolio.

### 2. Capa de Presentación y UX
- **Design System**: Basado en tokens de diseño integrados con `Tailwind CSS`, garantizando consistencia en espaciado, tipografía y colorimetría.
- **Esquemas de Color**: Implementación nativa de temas (Dark/Light) mediante variables CSS, eliminando parpadeos de tema (Flash of unstyled content).
- **Adaptabilidad**: Interfaz fluida optimizada para múltiples breakpoints mediante CSS Grid y Flexbox.

### 3. Internacionalización y Localización
- **Arquitectura i18n**: Proveedor de contexto personalizado para la gestión de estados de idioma (ES/EN) sin redundancia de red.
- **Formateo de Moneda**: Localización automática de valores numéricos según el estándar ISO 4217.

### 4. Seguridad y Robustez
- **HTTP Security Headers**: Implementación de políticas de seguridad en el servidor (Firebase Hosting):
  - **HSTS**: Forzado de conexiones HTTPS seguras.
  - **CSP (Content Security Policy)**: Mitigación de ataques XSS.
  - **Referrer-Policy**: Control de privacidad en el intercambio de cabeceras.
- **Manejo de Tasa de Peticiones**: Lógica de fallback para gestionar límites de la API externa (Rate Limiting).

### 5. Estándares de Accesibilidad (WCAG)
- **Semántica HTML**: Uso estricto de etiquetas seccionales y roles ARIA.
- **Interactividad**: Soporte completo para navegación mediante teclado y gestión de focos.

---

## 🛠 Stack Tecnológico

- **Core**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5+ (Strict Mode)
- **Estilos**: Tailwind CSS 4
- **Validación**: Jest / React Testing Library
- **Infraestructura**: Firebase Hosting

---

## Configuración del Entorno Local

1. **Instalación de dependencias**:
   ```bash
   npm install
   ```

2. **Ejecución en desarrollo**:
   ```bash
   npm run dev
   ```

3. **Ejecución de suite de pruebas**:
   ```bash
   npm test
   ```

---

## Arquitectura de Directorios

```text
src/
├── app/                  # Arquitectura de rutas y layouts
├── components/           # Componentes modulares (charts, ui, filters)
├── lib/                  # Servicios de API, i18n y configuración
├── types/                # Contratos de interfaces y tipos
└── __tests__/            # Pruebas automatizadas
```

---

Desarrollado para la evaluación técnica de **Dinametra**.
