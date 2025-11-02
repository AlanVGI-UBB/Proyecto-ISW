# Sistema de Evaluaciones Orales - Facultad de Derecho

Sistema completo de gestión de evaluaciones orales desarrollado con el stack PERN (PostgreSQL, Express, React, Node.js) siguiendo las directrices de la asignatura Ingeniería de Software.

## 📚 Descripción del Proyecto

Este proyecto implementa un sistema de autenticación completo con:
- Backend RESTful con Node.js + Express + PostgreSQL + TypeORM
- Frontend interactivo con React + Vite
- Autenticación JWT
- Validaciones con Joi
- Diseño responsive basado en las especificaciones de la Facultad

## 🏗️ Estructura del Proyecto

```
Proyecto ISW/
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   ├── config/         # Configuración de BD
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middlewares/    # Middlewares (auth, etc)
│   │   ├── models/         # Modelos/Entidades
│   │   ├── routes/         # Definición de rutas
│   │   ├── validations/    # Validaciones Joi
│   │   └── server.js       # Punto de entrada
│   ├── .env                # Variables de entorno
│   └── package.json
│
└── frontend/               # Cliente React
    ├── src/
    │   ├── config/        # Configuración axios
    │   ├── pages/         # Páginas/Vistas
    │   ├── services/      # Servicios API
    │   ├── App.jsx        # Componente raíz
    │   └── main.jsx       # Punto de entrada
    └── package.json
```

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para PostgreSQL
- **JWT** - Autenticación mediante tokens
- **Joi** - Validación de datos
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Configuración de CORS

### Frontend
- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS3** - Estilos personalizados

## 📋 Requisitos Previos

- Node.js v18 o superior
- PostgreSQL v14 o superior
- npm o yarn
- Git

## 🔧 Instalación y Configuración

### 🚀 Opción 1: Scripts Automáticos (Windows - RECOMENDADO)

**Configuración inicial completa:**
```powershell
.\setup.ps1
```

**Iniciar el proyecto:**
```powershell
.\start.ps1
```

**¡Listo!** El script abre automáticamente Backend y Frontend en ventanas separadas.

📖 Ver [SCRIPTS.md](SCRIPTS.md) para más detalles sobre todos los scripts disponibles.

---

### ⚙️ Opción 2: Instalación Manual

#### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd "Proyecto ISW"
```

#### 2. Configurar Backend

```bash
# Entrar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=tu_contraseña
# DB_DATABASE=evaluaciones_orales
# JWT_SECRET=tu_clave_secreta
```

#### 3. Crear Base de Datos

```sql
-- Conectarse a PostgreSQL y ejecutar:
CREATE DATABASE evaluaciones_orales;
```

#### 4. Configurar Frontend

```bash
# Desde la raíz del proyecto
cd frontend

# Instalar dependencias
npm install
```

## 🏃 Ejecutar el Proyecto

### 🚀 Opción 1: Con Scripts (Windows)

```powershell
.\start.ps1
```

---

### ⚙️ Opción 2: Manual

#### Ejecutar Backend (Terminal 1)

```bash
cd backend
npm run dev
```

El backend estará disponible en: `http://localhost:4000`

#### Ejecutar Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔑 Endpoints API

### Autenticación

#### POST /api/auth/register
Registrar un nuevo usuario.

**Body:**
```json
{
  "email": "estudiante@ejemplo.com",
  "password": "password123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "estudiante"
}
```

#### POST /api/auth/login
Iniciar sesión.

**Body:**
```json
{
  "email": "estudiante@ejemplo.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "user": {
      "id": 1,
      "email": "estudiante@ejemplo.com",
      "nombre": "Juan",
      "apellido": "Pérez",
      "rol": "estudiante"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET /api/auth/profile
Obtener perfil del usuario autenticado (requiere token).

**Headers:**
```
Authorization: Bearer <token>
```

## 🧪 Pruebas con Postman

1. Crear una nueva colección en Postman
2. Configurar variable de entorno `baseUrl` = `http://localhost:4000`
3. Probar los siguientes endpoints:
   - POST {{baseUrl}}/api/auth/register
   - POST {{baseUrl}}/api/auth/login
   - GET {{baseUrl}}/api/auth/profile (con token)

## 👥 Roles de Usuario

- **estudiante** (default) - Acceso básico al sistema
- **profesor** - Gestión de evaluaciones
- **admin** - Acceso completo

## 🔒 Seguridad Implementada

✅ Contraseñas hasheadas con bcrypt (10 rounds)  
✅ Autenticación JWT con expiración  
✅ Validación de datos con Joi  
✅ CORS configurado  
✅ Middleware de autenticación  
✅ Protección contra inyección SQL (TypeORM)  
✅ Variables sensibles en .env  

## 📱 Características del Frontend

- ✅ Diseño responsive
- ✅ Validación de formularios en tiempo real
- ✅ Feedback visual de errores
- ✅ Toggle para mostrar/ocultar contraseña
- ✅ Loading states
- ✅ Rutas protegidas
- ✅ Auto-logout en token expirado
- ✅ Redirección inteligente

## 🚀 Despliegue a Producción

### Con PM2 (Backend)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicación
cd backend
pm2 start src/server.js --name "evaluaciones-api"

# Guardar configuración
pm2 save

# Configurar inicio automático
pm2 startup
```

### Con Nginx (Frontend)

```bash
# Build del frontend
cd frontend
npm run build

# Configurar Nginx para servir los archivos en dist/
```

## 📖 Conceptos Aplicados del Curso

### Ayudantía 1 - Backend con Express
✅ Estructura modular (config, models, controllers, routes)  
✅ Conexión a PostgreSQL con TypeORM  
✅ Operaciones CRUD  
✅ Autenticación JWT  
✅ Variables de entorno con .env  

### Ayudantía 2 - Producción
✅ Preparado para despliegue con PM2  
✅ Variables de entorno para diferentes ambientes  

### Ayudantía 3 - Validaciones con Joi
✅ Validación de registro (email, password, nombre, apellido)  
✅ Validación de login  
✅ Mensajes de error personalizados  

### Ayudantía 4 - Frontend con Vite
✅ Proyecto React con Vite  
✅ Comunicación con backend via Axios  
✅ Componentes reutilizables  
✅ Manejo de estado con hooks  

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev          # Modo desarrollo con hot-reload
npm start            # Modo producción
```

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
```

## 📝 Variables de Entorno

### Backend (.env)
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=evaluaciones_orales

JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

### Frontend (.env - opcional)
```env
VITE_API_URL=http://localhost:4000/api
```

## 🐛 Troubleshooting

### Error de conexión a la BD
- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en .env
- Verificar que la base de datos exista

### Error CORS
- Verificar que FRONTEND_URL esté configurado correctamente en backend/.env
- Verificar que el puerto del frontend sea correcto

### Token expirado
- El token expira según JWT_EXPIRES_IN (default: 7 días)
- Cerrar sesión y volver a iniciar sesión

## 📚 Próximas Funcionalidades

- [ ] Recuperación de contraseña
- [ ] Gestión de evaluaciones
- [ ] Sistema de calificaciones
- [ ] Panel de administración
- [ ] Reportes y estadísticas

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado siguiendo las directrices de la asignatura **Ingeniería de Software**, aplicando buenas prácticas de desarrollo:

- Separación de responsabilidades
- Código limpio y documentado
- Manejo de errores consistente
- Seguridad desde el diseño
- Arquitectura escalable

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la Facultad de Derecho.

---

**Desarrollado con ❤️ para la asignatura Ingeniería de Software**
