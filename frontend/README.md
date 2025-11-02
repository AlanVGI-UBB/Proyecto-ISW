# Frontend - Sistema de Evaluaciones Orales

Frontend del Sistema de Evaluaciones Orales para la Facultad de Derecho, desarrollado con React + Vite.

## 🚀 Tecnologías

- **React 18** - Librería UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilos

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):
```bash
# Crear archivo .env en la raíz del frontend
VITE_API_URL=http://localhost:4000/api
```

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo
```bash
npm run dev
```

El servidor de desarrollo estará disponible en: `http://localhost:5173`

### Build para Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── config/          # Configuraciones (axios, etc)
│   ├── pages/           # Páginas/Vistas
│   ├── services/        # Servicios API
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Características

### Pantalla de Login
- Validación de formularios
- Manejo de errores
- Feedback visual
- Toggle de contraseña
- Diseño responsive

### Autenticación
- JWT Token storage
- Rutas protegidas
- Auto-logout en token expirado
- Redirección automática

### Dashboard
- Información del usuario
- Header con avatar
- Cierre de sesión
- Área de trabajo personalizada

## 🔒 Rutas

- `/` - Login (Pública)
- `/register` - Registro (Pública)
- `/dashboard` - Dashboard (Protegida)

## 🎨 Diseño

El diseño sigue las directrices de la Facultad de Derecho:
- Color primario: #003366 (Azul institucional)
- Tipografía: System fonts
- Interfaz limpia y profesional
- Totalmente responsive

## 🔌 Integración con Backend

El frontend se comunica con el backend a través de Axios:
- Base URL: `http://localhost:4000/api`
- Interceptores para tokens
- Manejo centralizado de errores

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview del build

## 🚀 Despliegue

Para desplegar en producción:

1. Construir el proyecto:
```bash
npm run build
```

2. Los archivos estarán en la carpeta `dist/`

3. Servir con cualquier servidor estático (nginx, apache, etc.)

## 🔧 Personalización

### Cambiar colores
Edita las variables CSS en `src/index.css`:
```css
:root {
  --primary-color: #003366;
  --primary-dark: #002244;
  /* ... */
}
```

### Cambiar API URL
Edita `src/config/axios.js` o crea un archivo `.env`:
```env
VITE_API_URL=https://tu-api.com/api
```

## 📖 Documentación Adicional

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
