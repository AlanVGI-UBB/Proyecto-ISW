# 🚀 Guía de Inicio Rápido

Sigue estos pasos para poner en marcha el proyecto.

## 🎯 Opción 1: Scripts Automáticos de PowerShell (MÁS RÁPIDO)

### Configuración Inicial (Primera vez)

```powershell
# Ejecutar configuración guiada
.\setup.ps1
```

Este script te guiará paso a paso para:
- ✅ Verificar Node.js
- ✅ Instalar todas las dependencias
- ✅ Configurar archivo .env con tus credenciales
- ✅ Preparar el proyecto para ejecución

### Iniciar el Proyecto

```powershell
# Iniciar Backend y Frontend automáticamente
.\start.ps1
```

Este script:
- ✅ Verifica las dependencias
- ✅ Inicia el Backend en una ventana separada
- ✅ Inicia el Frontend en otra ventana separada
- ✅ Abre automáticamente en http://localhost:5173

### Scripts Adicionales

```powershell
# Verificar el estado del sistema
.\check.ps1

# Solo instalar dependencias
.\install.ps1

# Detener todos los servidores
.\stop.ps1
```

---

## ⚡ Opción 2: Inicio Manual (5 minutos)

### 1️⃣ Instalar Dependencias

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd frontend
npm install
```

### 2️⃣ Configurar Base de Datos PostgreSQL

1. Abre pgAdmin o la terminal de PostgreSQL
2. Crea la base de datos:

```sql
CREATE DATABASE evaluaciones_orales;
```

3. Configura el archivo `.env` en la carpeta `backend`:
   - Ya existe un archivo `.env` de ejemplo
   - Edítalo con tus credenciales de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=TU_CONTRASEÑA_AQUI
DB_DATABASE=evaluaciones_orales
```

### 3️⃣ Ejecutar el Proyecto

Necesitas **DOS terminales** (PowerShell):

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
✅ Verás: "Base de datos conectada exitosamente"
✅ Servidor corriendo en http://localhost:4000

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
✅ Servidor corriendo en http://localhost:5173

### 4️⃣ Probar la Aplicación

1. Abre tu navegador en: `http://localhost:5173`
2. Verás la pantalla de login
3. Haz clic en "Registrarse"
4. Crea una cuenta con:
   - Nombre: Tu nombre
   - Apellido: Tu apellido
   - Email: tu@email.com
   - Contraseña: mínimo 6 caracteres
5. Inicia sesión con tus credenciales

## 🎯 Comandos Rápidos

### Backend
```powershell
cd backend
npm install              # Instalar dependencias
npm run dev             # Ejecutar en modo desarrollo
npm start               # Ejecutar en modo producción
```

### Frontend
```powershell
cd frontend
npm install              # Instalar dependencias
npm run dev             # Ejecutar servidor de desarrollo
npm run build           # Compilar para producción
```

## 📝 Primer Usuario de Prueba

Después de iniciar el proyecto, puedes:

1. **Registrarte** desde la interfaz web, o
2. **Usar Postman** para crear un usuario:

```
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "email": "admin@derecho.cl",
  "password": "admin123",
  "nombre": "Admin",
  "apellido": "Sistema",
  "rol": "admin"
}
```

## 🔧 Verificar que Todo Funciona

### ✅ Checklist Backend

1. ✅ PostgreSQL corriendo
2. ✅ Base de datos `evaluaciones_orales` creada
3. ✅ `npm install` ejecutado
4. ✅ `.env` configurado
5. ✅ `npm run dev` sin errores
6. ✅ Mensaje: "Base de datos conectada exitosamente"
7. ✅ Puedes acceder a: http://localhost:4000

### ✅ Checklist Frontend

1. ✅ `npm install` ejecutado
2. ✅ `npm run dev` sin errores
3. ✅ Puedes acceder a: http://localhost:5173
4. ✅ Ves la pantalla de login

## 🧪 Probar con Postman

### Registrar Usuario
```
POST http://localhost:4000/api/auth/register

Body (JSON):
{
  "email": "estudiante@derecho.cl",
  "password": "123456",
  "nombre": "Juan",
  "apellido": "Pérez"
}
```

### Iniciar Sesión
```
POST http://localhost:4000/api/auth/login

Body (JSON):
{
  "email": "estudiante@derecho.cl",
  "password": "123456"
}
```

Copia el `token` de la respuesta.

### Obtener Perfil (con autenticación)
```
GET http://localhost:4000/api/auth/profile

Headers:
Authorization: Bearer TU_TOKEN_AQUI
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to database"
**Solución:**
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `backend/.env`
- Verifica que la base de datos exista: `CREATE DATABASE evaluaciones_orales;`

### Error: "Port 3000 already in use"
**Solución:**
```powershell
# Cambiar el puerto en backend/.env
PORT=3001
```

### Error: "Port 5173 already in use"
**Solución:**
```powershell
# El frontend buscará el siguiente puerto disponible automáticamente
# O puedes cerrar la aplicación que usa el puerto 5173
```

### Error: "MODULE_NOT_FOUND"
**Solución:**
```powershell
# Asegúrate de haber instalado las dependencias
cd backend
npm install

cd ../frontend
npm install
```

### Las tablas no se crean en la BD
**Solución:**
- TypeORM crea las tablas automáticamente la primera vez que se ejecuta
- Asegúrate de que `synchronize: true` esté en `src/config/database.js`
- Reinicia el servidor backend

## 📚 Siguientes Pasos

1. ✅ Familiarízate con la estructura del proyecto
2. ✅ Lee el `README.md` principal para más detalles
3. ✅ Explora los archivos en `backend/src/` y `frontend/src/`
4. ✅ Prueba crear usuarios y hacer login
5. ✅ Personaliza según las necesidades de tu proyecto

## 💡 Consejos

- Mantén ambos servidores (backend y frontend) corriendo mientras desarrollas
- Usa las herramientas de desarrollo de Chrome para depurar el frontend
- Revisa los logs en la consola para ver las peticiones
- Usa Postman para probar el backend de forma independiente

## 📞 Ayuda Adicional

Si tienes problemas:
1. Revisa los logs en la consola del backend
2. Revisa la consola del navegador (F12)
3. Verifica que todas las dependencias estén instaladas
4. Asegúrate de estar en la carpeta correcta al ejecutar comandos

---

**¡Listo! Ahora tienes un sistema completo funcionando siguiendo las directrices del curso de Ingeniería de Software** 🎉
