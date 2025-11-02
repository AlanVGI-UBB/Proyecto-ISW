# 📚 Guía de Desarrollo y Mejores Prácticas

Esta guía te ayudará a mantener la calidad del código y seguir las convenciones establecidas en el proyecto.

## 🏗️ Arquitectura del Proyecto

### Backend (Node.js + Express + TypeORM)

```
backend/src/
├── config/          # Configuraciones (database, etc)
├── controllers/     # Lógica de negocio
├── middlewares/     # Middlewares (auth, validación, etc)
├── models/          # Entidades/Modelos de TypeORM
├── routes/          # Definición de rutas
├── validations/     # Schemas de validación con Joi
└── server.js        # Punto de entrada
```

### Frontend (React + Vite)

```
frontend/src/
├── config/          # Configuraciones (axios, etc)
├── pages/           # Páginas/Vistas principales
├── components/      # Componentes reutilizables (crear según necesidad)
├── services/        # Servicios para comunicación con API
├── utils/           # Utilidades y helpers (crear según necesidad)
└── App.jsx          # Componente principal
```

## 📝 Convenciones de Código

### Nombres de Archivos

**Backend:**
- Controllers: `nombreController.js` (camelCase)
- Models: `NombreModelo.js` (PascalCase)
- Routes: `nombreRoutes.js` (camelCase)
- Middlewares: `nombre.js` (camelCase)
- Validations: `nombreValidation.js` (camelCase)

**Frontend:**
- Componentes: `NombreComponente.jsx` (PascalCase)
- Páginas: `NombrePagina.jsx` (PascalCase)
- Services: `nombreService.js` (camelCase)
- Estilos: `NombreComponente.css` (mismo nombre que el componente)

### Nombres de Variables y Funciones

```javascript
// ✅ CORRECTO
const userName = 'Juan';
const getUserById = (id) => {};
const isAuthenticated = () => {};

// ❌ INCORRECTO
const UserName = 'Juan';
const get_user_by_id = (id) => {};
const authenticated = () => {};
```

### Nombres de Constantes

```javascript
// ✅ CORRECTO - Constantes globales
const MAX_LOGIN_ATTEMPTS = 5;
const DEFAULT_TIMEOUT = 3000;

// ✅ CORRECTO - Configuración
const API_URL = process.env.API_URL;
```

## 🔐 Seguridad

### Variables de Entorno

❌ **NUNCA** subas el archivo `.env` a Git
✅ Mantén `.env.example` actualizado
✅ Usa variables de entorno para datos sensibles

```javascript
// ✅ CORRECTO
const secret = process.env.JWT_SECRET;

// ❌ INCORRECTO
const secret = 'mi_clave_secreta_123';
```

### Contraseñas

❌ **NUNCA** guardes contraseñas en texto plano
✅ Usa bcrypt para hashear contraseñas
✅ Mínimo 6 caracteres (configurable)

```javascript
// ✅ CORRECTO
const hashedPassword = await bcrypt.hash(password, 10);

// ❌ INCORRECTO
const password = req.body.password; // Guardar directamente
```

## 🛡️ Validación de Datos

### Backend con Joi

Siempre valida los datos de entrada:

```javascript
// ✅ CORRECTO
export const createUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  nombre: Joi.string().min(2).max(100).required(),
});

// En el controller:
const { error, value } = createUserValidation.validate(req.body);
if (error) {
  return res.status(400).json({ 
    success: false, 
    errors: error.details 
  });
}
```

### Frontend con React

```javascript
// ✅ CORRECTO - Validación antes de enviar
const validateForm = () => {
  const errors = {};
  if (!email) errors.email = 'Email requerido';
  if (!password) errors.password = 'Contraseña requerida';
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  // Enviar datos...
};
```

## 📡 Respuestas de API

### Formato Estándar

Usa siempre el mismo formato de respuesta:

```javascript
// ✅ Respuesta Exitosa
{
  "success": true,
  "message": "Operación exitosa",
  "data": { /* datos */ }
}

// ✅ Respuesta con Error
{
  "success": false,
  "message": "Descripción del error",
  "errors": [ /* detalles */ ]
}
```

### Códigos HTTP

```javascript
200 - OK (GET exitoso, operación exitosa)
201 - Created (POST exitoso, recurso creado)
400 - Bad Request (validación fallida)
401 - Unauthorized (no autenticado)
403 - Forbidden (no autorizado)
404 - Not Found (recurso no encontrado)
409 - Conflict (recurso ya existe)
500 - Internal Server Error (error del servidor)
```

## 🎯 Manejo de Errores

### Backend

```javascript
// ✅ CORRECTO - Try-Catch en async functions
export const getUser = async (req, res) => {
  try {
    const user = await userRepository().findOne({ where: { id: req.params.id } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
```

### Frontend

```javascript
// ✅ CORRECTO - Try-Catch en llamadas API
const handleLogin = async () => {
  try {
    setLoading(true);
    const response = await authService.login(email, password);
    
    if (response.success) {
      navigate('/dashboard');
    }
  } catch (error) {
    setAlert({
      type: 'error',
      message: error.message || 'Error al iniciar sesión'
    });
  } finally {
    setLoading(false);
  }
};
```

## 🔄 Estado y Hooks en React

### Uso de useState

```javascript
// ✅ CORRECTO
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

// ❌ INCORRECTO - Mutar el estado directamente
formData.email = 'nuevo@email.com'; // ¡NO HACER ESTO!
```

### Uso de useEffect

```javascript
// ✅ CORRECTO - Con array de dependencias
useEffect(() => {
  if (!authService.isAuthenticated()) {
    navigate('/');
  }
}, [navigate]);

// ⚠️ CUIDADO - Sin array de dependencias (se ejecuta en cada render)
useEffect(() => {
  // Este código se ejecuta constantemente
});
```

## 🎨 Estilos CSS

### Variables CSS

Usa las variables definidas en `index.css`:

```css
/* ✅ CORRECTO */
.mi-componente {
  color: var(--text-primary);
  background-color: var(--primary-color);
}

/* ❌ INCORRECTO */
.mi-componente {
  color: #333333;
  background-color: #003366;
}
```

### Nombres de Clases

```css
/* ✅ CORRECTO - BEM Style */
.card { }
.card-header { }
.card-body { }
.card-footer { }

/* ❌ EVITAR - Nombres genéricos */
.container { }
.button { }
.text { }
```

## 📦 Imports

### Orden de Imports

```javascript
// 1. Librerías externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Servicios y utilidades
import { authService } from '../services/authService';

// 3. Componentes
import Header from '../components/Header';

// 4. Estilos
import './MiComponente.css';
```

## 🧪 Testing (Próximamente)

Cuando agregues tests, sigue estas convenciones:

```javascript
// Archivo: authController.test.js
describe('Auth Controller', () => {
  describe('login', () => {
    it('debe retornar token cuando las credenciales son válidas', async () => {
      // Test aquí
    });
    
    it('debe retornar error 401 cuando las credenciales son inválidas', async () => {
      // Test aquí
    });
  });
});
```

## 📚 Comentarios en el Código

### Cuándo Comentar

```javascript
// ✅ CORRECTO - Explicar "por qué", no "qué"
// Usamos bcrypt con 10 rounds por seguridad vs performance
const hashedPassword = await bcrypt.hash(password, 10);

// ✅ CORRECTO - Documentar funciones complejas
/**
 * Genera un token JWT para el usuario
 * @param {Object} user - Usuario autenticado
 * @returns {string} Token JWT firmado
 */
const generateToken = (user) => { };

// ❌ INNECESARIO - El código es auto-explicativo
// Asignar email a la variable email
const email = req.body.email;
```

## 🔄 Git y Control de Versiones

### Commits

```bash
# ✅ CORRECTO - Mensajes descriptivos
git commit -m "feat: Agregar validación de email en registro"
git commit -m "fix: Corregir error de autenticación en login"
git commit -m "style: Mejorar diseño responsive del header"

# ❌ INCORRECTO - Mensajes vagos
git commit -m "cambios"
git commit -m "arreglos"
git commit -m "actualizacion"
```

### Branches

```bash
# ✅ CORRECTO - Nombres descriptivos
git checkout -b feature/recuperar-password
git checkout -b fix/login-error
git checkout -b improve/validaciones

# ❌ INCORRECTO
git checkout -b cambios
git checkout -b nuevos-archivos
```

## 📁 Organización de Nuevas Features

Cuando agregues nuevas funcionalidades:

### 1. Backend

```bash
# Crear modelo
backend/src/models/Evaluacion.js

# Crear validación
backend/src/validations/evaluacionValidation.js

# Crear controller
backend/src/controllers/evaluacionController.js

# Crear rutas
backend/src/routes/evaluacionRoutes.js

# Agregar rutas al index
backend/src/routes/index.js
```

### 2. Frontend

```bash
# Crear página
frontend/src/pages/Evaluaciones.jsx
frontend/src/pages/Evaluaciones.css

# Crear servicio
frontend/src/services/evaluacionService.js

# Agregar ruta en App.jsx
```

## 🚀 Performance

### Backend

```javascript
// ✅ CORRECTO - Seleccionar solo campos necesarios
const users = await userRepository().find({
  select: ['id', 'email', 'nombre'],
  where: { activo: true }
});

// ❌ INCORRECTO - Traer todo innecesariamente
const users = await userRepository().find();
```

### Frontend

```javascript
// ✅ CORRECTO - Memoizar valores costosos
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// ✅ CORRECTO - Debounce en búsquedas
const debouncedSearch = useDebounce(searchTerm, 500);
```

## 📱 Responsive Design

Usa media queries para diferentes tamaños:

```css
/* Mobile first */
.component {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: 3rem;
  }
}
```

## ✅ Checklist antes de Commit

- [ ] El código funciona sin errores
- [ ] No hay `console.log` innecesarios
- [ ] Las variables tienen nombres descriptivos
- [ ] El código está formateado correctamente
- [ ] Se agregaron validaciones necesarias
- [ ] No se subieron archivos sensibles (.env)
- [ ] El commit tiene un mensaje descriptivo

## 🎓 Recursos de Aprendizaje

- **JavaScript:** [MDN Web Docs](https://developer.mozilla.org/)
- **React:** [React Docs](https://react.dev/)
- **Node.js:** [Node.js Docs](https://nodejs.org/)
- **Express:** [Express Docs](https://expressjs.com/)
- **PostgreSQL:** [PostgreSQL Docs](https://www.postgresql.org/docs/)
- **TypeORM:** [TypeORM Docs](https://typeorm.io/)

---

**Mantén estas prácticas y el código será mantenible, escalable y de calidad profesional.** 🚀
