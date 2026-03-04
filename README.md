# CryptoFlow - Dashboard Interactivo de Criptomonedas (Prueba Técnica)

Este proyecto es una aplicación de dashboard moderna, responsiva y accesible, diseñada para resolver la prueba técnica de **Front-End Dinametra**. Utiliza la API de **CoinGecko** para proporcionar información sobre el mercado de criptomonedas, visualizados mediante gráficos y una interfaz de alto rendimiento.

##  Enlace a la Demo en Vivo
**[Ver Demostración en Vercel](https://tu-enlace-aqui.vercel.app)** *(Sujeto a despliegue del usuario)*

---

## 💎 Características Principales y Valor Agregado

### 1. Visualización de Datos Dinámica (Recharts)
- **Gráfico de Precios Histórico**: Visualización detallada del rendimiento de activos en periodos de 24h, 7d, 30d y 1y. Incluye **Tooltips**, **Áreas Degradadas** y **Guías Ejes** optimizadas.
- **Distribución de Portafolio (PieChart)**: En la vista de Portfolio, se implementó un gráfico de Pastel que muestra la diversificación de activos del usuario.
- **Gráfico de Barras de Mercado**: Comparación visual de capitalización de mercado entre activos líderes.

### 2. Diseño de Interfaz  (Glassmorphism)
- **Estética Moderna**: Implementación de bordes translúcidos, desenfoques de fondo (`backdrop-blur`) y sombras suaves
- **Dark/Light Mode**: Soporte nativo para cambio de tema utilizando `next-themes` y variables CSS semánticas que garantizan legibilidad en cualquier ambiente.
- **Diseño Responsivo**: Adaptación fluida para Móviles, Tablets y Escritorio utilizando CSS Grid y Flexbox. Se prestó especial atención a la experiencia táctil en móviles.

### 3. Navegación y Estructura Robusta
- **Layout Persistente**: Uso de un `DashboardShell` global con barra lateral colapsable para maximizar el área de trabajo según la preferencia del usuario.
- **Sticky Elements**: Los encabezados y las pestañas de navegación secundarios son "Pegajosos", asegurando que los controles de búsqueda y filtros estén siempre al alcance durante el scroll.
- **Búsqueda Funcional**: Implementación de un buscador con dropdown de resultados.

### 4. Internacionalización (i18n)
- **Multi-idioma**: Soporte para **Español e Inglés** integrado mediante un `LanguageProvider` personalizado. Las etiquetas de toda la aplicación (Dashboard, Settings, Alerts) cambian instantáneamente sin recargar.

### 5. Accesibilidad Universal (a11y)
- **Navegación por Teclado**: Todo elemento interactivo posee anillos de enfoque (`focus-rings`) claros y es navegable mediante la tecla `Tab`.
- **Compatibilidad con Lectores de Pantalla**: Uso de etiquetas `ARIA`, roles semánticos y descripciones alternativas en gráficos para asegurar la inclusión.

---

## 🛠 Tecnologías Utilizadas

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Estado/i18n**: Context API nativo de React
- **Pruebas**: [Jest](https://jestjs.io/) / [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 📂 Estructura del Proyecto

```text
src/
├── app/                  # Rutas y layouts principales (Next.js)
├── components/           # Componentes modulares y reutilizables
│   ├── charts/           # Lógica y vistas de visualización de datos
│   ├── ui/               # Componentes atómicos (Cards, Buttons, Skeletons)
│   └── filters/          # Selectores y controles interactivos
├── lib/                  # Utilidades, i18n y configuración de API
├── types/                # Definiciones de TypeScript
└── __tests__/            # Suite de pruebas unitarias
```

---

## Cómo Ejecutar el Proyecto

1. **Clonar el Repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd pruebaparatrabajowebdeveloper
   ```

2. **Instalar Dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en Desarrollo**:
   ```bash
   npm run dev
   ```
   *Acceso en: [http://localhost:3000](http://localhost:3000)*

4. **Correr Pruebas**:
   ```bash
   npm test
   ```

---

## 💡 Enfoque Técnico y Decisiones

- **Consumo de API**: Se priorizó el manejo de estados de carga con **Skeletons** sofisticados para evitar saltos bruscos en el diseño (Layout Shift).
- **Manejo de Errores**: Se implementaron estados visuales claros para cuando la API de CoinGecko alcanza su límite de peticiones gratuito, informando al usuario de manera amigable.
- **Modularidad**: Cada gráfico y filtro es un componente independiente, facilitando su mantenimiento y escalabilidad.
- **Optimización**: Uso de componentes de servidor de Next.js donde es posible y componentes de cliente solo para interactividad necesaria.

---


Desarrollado con ❤️ para **Dinametra**.
