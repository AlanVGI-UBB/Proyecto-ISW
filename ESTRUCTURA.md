# 📁 Estructura Completa del Proyecto

```
Proyecto ISW/
│
├── 📁 backend/                          # Servidor Node.js + Express
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── database.js             # Configuración TypeORM + PostgreSQL
│   │   ├── 📁 controllers/
│   │   │   └── authController.js       # Lógica de autenticación (login, register)
│   │   ├── 📁 middlewares/
│   │   │   └── auth.js                 # Middleware JWT + autorización
│   │   ├── 📁 models/
│   │   │   └── User.js                 # Modelo/Entidad de Usuario
│   │   ├── 📁 routes/
│   │   │   ├── authRoutes.js           # Rutas de autenticación
│   │   │   └── index.js                # Router principal
│   │   ├── 📁 validations/
│   │   │   └── userValidation.js       # Schemas de validación Joi
│   │   └── server.js                   # Punto de entrada del servidor
│   │
│   ├── .env                            # Variables de entorno (NO SUBIR A GIT)
│   ├── .env.example                    # Ejemplo de configuración
│   ├── .gitignore                      # Archivos ignorados por Git
│   ├── package.json                    # Dependencias del backend
│   └── README.md                       # Documentación del backend
│
├── 📁 frontend/                         # Cliente React + Vite
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── axios.js                # Configuración de Axios + interceptores
│   │   ├── 📁 pages/
│   │   │   ├── Login.jsx               # Pantalla de inicio de sesión
│   │   │   ├── Login.css               # Estilos del Login
│   │   │   ├── Register.jsx            # Pantalla de registro
│   │   │   ├── Dashboard.jsx           # Panel principal (después de login)
│   │   │   └── Dashboard.css           # Estilos del Dashboard
│   │   ├── 📁 services/
│   │   │   └── authService.js          # Servicios de API (login, register, etc)
│   │   ├── App.jsx                     # Componente principal + rutas
│   │   ├── main.jsx                    # Punto de entrada React
│   │   └── index.css                   # Estilos globales + variables CSS
│   │
│   ├── index.html                      # HTML base
│   ├── vite.config.js                  # Configuración de Vite
│   ├── package.json                    # Dependencias del frontend
│   ├── .gitignore                      # Archivos ignorados por Git
│   └── README.md                       # Documentación del frontend
│
├── 📜 Scripts de PowerShell/            # Scripts de automatización
│   ├── start.ps1                       # ⭐ Iniciar Backend + Frontend
│   ├── setup.ps1                       # ⚙️ Configuración inicial guiada
│   ├── install.ps1                     # 📦 Instalar dependencias
│   ├── check.ps1                       # ✅ Verificar sistema
│   └── stop.ps1                        # 🛑 Detener servidores
│
├── 📜 Scripts Batch (Alternativa)/      # Archivos .bat para doble clic
│   ├── start.bat                       # Ejecuta start.ps1
│   ├── setup.bat                       # Ejecuta setup.ps1
│   └── install.bat                     # Ejecuta install.ps1
│
├── 📚 Documentación/                    # Guías y documentación
│   ├── README.md                       # 📖 Documentación principal
│   ├── INICIO_RAPIDO.md               # 🚀 Guía de inicio rápido (5 min)
│   ├── SCRIPTS.md                      # 📜 Documentación de scripts
│   ├── GUIA_VISUAL.md                 # 🎬 Guía visual paso a paso
│   └── GUIA_DESARROLLO.md             # 💻 Mejores prácticas de código
│
├── 🗄️ Base de Datos/
│   └── database_setup.sql              # Script SQL de configuración
│
├── 🧪 Testing/
│   └── Postman_Collection.json         # Colección de Postman para API
│
├── ⚙️ Configuración/
│   ├── .gitignore                      # Archivos ignorados por Git (raíz)
│   └── package.json                    # Scripts de gestión del proyecto
│
└── 📄 Otros/
    ├── .git/                           # Repositorio Git (si usas Git)
    └── node_modules/                   # Dependencias (generado, no subir)
```

---

## 📊 Estadísticas del Proyecto

### Backend
- **Archivos principales:** 8
- **Tecnologías:** Node.js, Express, PostgreSQL, TypeORM, JWT, Joi, bcrypt
- **Endpoints:** 3 (register, login, profile)
- **Puerto:** 3000

### Frontend
- **Archivos principales:** 9
- **Tecnologías:** React 18, Vite, React Router, Axios
- **Páginas:** 3 (Login, Register, Dashboard)
- **Puerto:** 5173

### Scripts
- **PowerShell:** 5 scripts
- **Batch:** 3 scripts
- **Funciones:** Inicio automático, configuración guiada, verificación, instalación

### Documentación
- **Archivos markdown:** 5
- **Líneas totales:** ~2000+
- **Idioma:** Español

---

## 🎯 Archivos Principales por Funcionalidad

### 🔐 Autenticación
```
backend/src/controllers/authController.js    # Lógica de auth
backend/src/middlewares/auth.js              # Middleware JWT
backend/src/validations/userValidation.js    # Validaciones
frontend/src/services/authService.js         # Cliente API
frontend/src/pages/Login.jsx                 # UI Login
frontend/src/pages/Register.jsx              # UI Register
```

### 🗄️ Base de Datos
```
backend/src/config/database.js               # Conexión TypeORM
backend/src/models/User.js                   # Modelo Usuario
database_setup.sql                           # Setup SQL
```

### 🎨 Interfaz de Usuario
```
frontend/src/pages/Login.jsx                 # Pantalla Login
frontend/src/pages/Login.css                 # Estilos Login
frontend/src/pages/Dashboard.jsx             # Panel principal
frontend/src/index.css                       # Estilos globales
```

### 🔧 Configuración
```
backend/.env                                 # Variables de entorno Backend
backend/src/server.js                        # Servidor Express
frontend/vite.config.js                      # Configuración Vite
frontend/src/config/axios.js                 # Cliente HTTP
```

### 🚀 Scripts de Inicio
```
start.ps1                                    # Inicio automático
start.bat                                    # Inicio con doble clic
setup.ps1                                    # Configuración inicial
check.ps1                                    # Verificación
```

### 📖 Documentación
```
README.md                                    # Documentación principal
INICIO_RAPIDO.md                            # Guía inicio rápido
SCRIPTS.md                                   # Guía de scripts
GUIA_VISUAL.md                              # Guía paso a paso
GUIA_DESARROLLO.md                          # Mejores prácticas
```

---

## 🎨 Código de Colores (para Editores)

Si usas VS Code u otro editor, estos son los tipos de archivos:

- 🟦 **JavaScript/JSX** - `.js`, `.jsx`
- 🟩 **JSON** - `.json`
- 🟨 **CSS** - `.css`
- 🟪 **Markdown** - `.md`
- 🟧 **PowerShell** - `.ps1`
- ⬜ **Batch** - `.bat`
- 🔵 **SQL** - `.sql`
- 🔴 **Config** - `.env`, `.gitignore`
- 🟫 **HTML** - `.html`

---

## 📦 Dependencias Instaladas

### Backend (package.json)
```json
{
  "express": "^4.18.2",           // Framework web
  "pg": "^8.11.3",                // Driver PostgreSQL
  "typeorm": "^0.3.17",           // ORM
  "reflect-metadata": "^0.1.13",  // Decoradores TypeORM
  "bcryptjs": "^2.4.3",           // Hash de contraseñas
  "jsonwebtoken": "^9.0.2",       // JWT
  "dotenv": "^16.3.1",            // Variables de entorno
  "cors": "^2.8.5",               // CORS
  "joi": "^17.11.0"               // Validación
}
```

### Frontend (package.json)
```json
{
  "react": "^18.2.0",             // Librería UI
  "react-dom": "^18.2.0",         // React DOM
  "react-router-dom": "^6.20.1",  // Enrutamiento
  "axios": "^1.6.2",              // Cliente HTTP
  "@vitejs/plugin-react": "^4.2.1", // Plugin Vite
  "vite": "^5.0.8"                // Build tool
}
```

---

## 🔗 Flujo de Datos

```
Usuario → Frontend (React)
           ↓ (Axios)
       Backend (Express)
           ↓ (TypeORM)
     PostgreSQL (Base de Datos)
           ↓
       Backend (Express)
           ↓ (JSON)
       Frontend (React)
           ↓
         Usuario
```

---

## 📝 Archivos que NO debes modificar (generados)

```
node_modules/           # Dependencias (regenerar con npm install)
backend/node_modules/   # Dependencias backend
frontend/node_modules/  # Dependencias frontend
frontend/dist/          # Build del frontend (regenerar con npm run build)
.env                    # Configuración personal (no subir a Git)
```

---

## ✅ Archivos Esenciales (NO ELIMINAR)

### Backend
- ✅ `src/server.js` - Sin esto, el backend no arranca
- ✅ `src/config/database.js` - Sin esto, no hay conexión a BD
- ✅ `package.json` - Sin esto, no se pueden instalar dependencias

### Frontend
- ✅ `src/main.jsx` - Sin esto, React no arranca
- ✅ `src/App.jsx` - Sin esto, no hay rutas
- ✅ `index.html` - Sin esto, no hay página web
- ✅ `package.json` - Sin esto, no se pueden instalar dependencias

### Scripts
- ✅ `start.ps1` - Para iniciar el proyecto fácilmente
- ✅ `setup.ps1` - Para configuración inicial

---

## 🎓 Para Aprender

Si quieres entender mejor el proyecto, empieza leyendo en este orden:

1. **`README.md`** - Visión general del proyecto
2. **`INICIO_RAPIDO.md`** - Cómo poner en marcha
3. **`backend/src/server.js`** - Cómo arranca el servidor
4. **`backend/src/models/User.js`** - Estructura de datos
5. **`backend/src/controllers/authController.js`** - Lógica de negocio
6. **`frontend/src/App.jsx`** - Rutas del frontend
7. **`frontend/src/pages/Login.jsx`** - Interfaz de usuario
8. **`GUIA_DESARROLLO.md`** - Mejores prácticas

---

**Esta estructura está diseñada para ser modular, escalable y fácil de mantener.** 🚀
