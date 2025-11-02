# Sistema de Evaluaciones Orales - Backend

Backend del Sistema de Evaluaciones Orales para la Facultad de Derecho, desarrollado con Node.js, Express, PostgreSQL y TypeORM.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM para PostgreSQL
- **JWT** - Autenticación
- **Joi** - Validación de datos
- **bcryptjs** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con tus credenciales:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=evaluaciones_orales
JWT_SECRET=tu_clave_secreta
```

4. Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE evaluaciones_orales;
```

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor estará disponible en: `http://localhost:4000`

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuraciones (BD, etc)
│   ├── controllers/     # Controladores
│   ├── middlewares/     # Middlewares (auth, etc)
│   ├── models/          # Modelos/Entidades
│   ├── routes/          # Rutas
│   ├── validations/     # Validaciones con Joi
│   └── server.js        # Punto de entrada
├── .env                 # Variables de entorno
├── .env.example         # Ejemplo de variables
└── package.json
```

## 🔑 Endpoints API

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "estudiante"
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

#### Obtener Perfil (requiere autenticación)
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

## 🧪 Pruebas con Postman

1. Importar la colección de Postman (próximamente)
2. Configurar la variable de entorno `baseUrl` a `http://localhost:4000`
3. Probar los endpoints

## 🚀 Despliegue con PM2

```bash
npm install -g pm2
pm2 start src/server.js --name "evaluaciones-api"
pm2 save
pm2 startup
```

## 👥 Roles de Usuario

- **estudiante** - Usuario por defecto
- **profesor** - Acceso a gestión de evaluaciones
- **admin** - Acceso completo al sistema

## 📝 Validaciones

El sistema utiliza Joi para validar:
- Formato de email válido
- Contraseña mínima de 6 caracteres
- Campos obligatorios y opcionales
- Tipos de datos correctos

## 🔒 Seguridad

- Contraseñas encriptadas con bcryptjs
- Autenticación con JWT
- CORS configurado
- Validación de datos de entrada
- Protección contra inyección SQL (TypeORM)

## 📖 Documentación Adicional

- [Express.js](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Joi](https://joi.dev/)
- [JWT](https://jwt.io/)
