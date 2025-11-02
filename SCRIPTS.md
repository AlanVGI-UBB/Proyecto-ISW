# 📜 Scripts de PowerShell

Este proyecto incluye varios scripts de PowerShell para facilitar el desarrollo y la gestión del proyecto.

## 📋 Lista de Scripts

### 🚀 `start.ps1` - Iniciar el Proyecto

**Uso:**
```powershell
.\start.ps1
```

**¿Qué hace?**
- ✅ Verifica que Node.js esté instalado
- ✅ Verifica que las dependencias estén instaladas
- ✅ Verifica que el archivo `.env` exista
- ✅ Inicia el **Backend** en una ventana de PowerShell separada
- ✅ Inicia el **Frontend** en otra ventana de PowerShell separada
- ✅ Muestra las URLs donde acceder a cada servicio

**Resultado:**
- Backend corriendo en: http://localhost:4000
- Frontend corriendo en: http://localhost:5173

**Para detener:**
- Cierra las ventanas de PowerShell del Backend y Frontend
- O ejecuta `.\stop.ps1`

---

### ⚙️ `setup.ps1` - Configuración Inicial Guiada

**Uso:**
```powershell
.\setup.ps1
```

**¿Qué hace?**
- ✅ Verifica requisitos del sistema (Node.js)
- ✅ Instala dependencias del Backend y Frontend
- ✅ Crea y configura el archivo `.env` de forma interactiva
- ✅ Solicita credenciales de PostgreSQL
- ✅ Prepara el proyecto para su primera ejecución

**Ideal para:**
- Primera vez que configuras el proyecto
- Cuando necesitas reconfigurar las credenciales de la BD

---

### 📦 `install.ps1` - Instalar Dependencias

**Uso:**
```powershell
.\install.ps1
```

**¿Qué hace?**
- ✅ Verifica que Node.js esté instalado
- ✅ Instala dependencias del Backend (`npm install` en backend/)
- ✅ Instala dependencias del Frontend (`npm install` en frontend/)
- ✅ Crea archivo `.env` desde `.env.example` si no existe
- ✅ Muestra instrucciones de próximos pasos

**Ideal para:**
- Después de clonar el repositorio
- Cuando agregas nuevas dependencias
- Después de hacer `git pull` con cambios en `package.json`

---

### ✅ `check.ps1` - Verificar Sistema

**Uso:**
```powershell
.\check.ps1
```

**¿Qué hace?**
- ✅ Verifica que Node.js esté instalado (versión mínima v18)
- ✅ Verifica que npm esté instalado
- ✅ Verifica que PostgreSQL esté instalado (opcional)
- ✅ Verifica la estructura de carpetas del proyecto
- ✅ Verifica que las dependencias estén instaladas
- ✅ Verifica que el archivo `.env` esté configurado
- ✅ Verifica que existan los archivos importantes del proyecto
- ✅ Muestra un resumen del estado del sistema

**Ideal para:**
- Diagnosticar problemas
- Verificar que todo esté correcto antes de iniciar
- Después de la configuración inicial

---

### 🛑 `stop.ps1` - Detener Servidores

**Uso:**
```powershell
.\stop.ps1
```

**¿Qué hace?**
- ✅ Busca todos los procesos Node.js activos
- ✅ Detiene los procesos relacionados con el proyecto
- ✅ Libera los puertos 3000 y 5173

**Ideal para:**
- Cuando necesitas detener rápidamente todos los servidores
- Cuando un puerto está ocupado
- Antes de reiniciar el proyecto

---

## 🎯 Flujo de Trabajo Recomendado

### Primera Vez (Configuración Inicial)

```powershell
# 1. Configuración guiada completa
.\setup.ps1

# 2. Verificar que todo esté correcto
.\check.ps1

# 3. Iniciar el proyecto
.\start.ps1
```

### Día a Día (Desarrollo Normal)

```powershell
# Iniciar el proyecto
.\start.ps1

# ... trabajar en el proyecto ...

# Detener cuando termines (opcional, puedes solo cerrar las ventanas)
.\stop.ps1
```

### Después de Git Pull

```powershell
# Si hay cambios en package.json
.\install.ps1

# Luego iniciar normalmente
.\start.ps1
```

### Solución de Problemas

```powershell
# 1. Verificar el estado del sistema
.\check.ps1

# 2. Reinstalar dependencias si hay problemas
.\install.ps1

# 3. Detener procesos si hay conflictos
.\stop.ps1

# 4. Intentar iniciar nuevamente
.\start.ps1
```

---

## 🔧 Requisitos

Para que los scripts funcionen correctamente, necesitas:

- **Windows 10/11** con PowerShell 5.1 o superior
- **Node.js** v18 o superior instalado
- **PostgreSQL** instalado y corriendo
- **Permisos de ejecución** de scripts de PowerShell

### Habilitar Ejecución de Scripts

Si recibes un error sobre "ejecución de scripts deshabilitada", ejecuta:

```powershell
# Ejecutar PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego confirma con `S` (Sí).

---

## 🎨 Características de los Scripts

### Código de Colores

Los scripts usan colores para facilitar la lectura:

- 🔵 **Cyan** - Títulos y secciones
- 🟢 **Green** - Operaciones exitosas (✓)
- 🟡 **Yellow** - Advertencias y acciones en progreso (⚠)
- 🔴 **Red** - Errores (✗)
- ⚪ **White/Gray** - Información general

### Ventanas Separadas

`start.ps1` abre dos ventanas de PowerShell separadas:
- Una para el **Backend** (con título verde)
- Una para el **Frontend** (con título azul)

Esto permite ver los logs de cada servicio independientemente y mantenerlos corriendo simultáneamente.

---

## ❓ Preguntas Frecuentes

### ¿Por qué usar scripts de PowerShell?

- ✅ Automatizan tareas repetitivas
- ✅ Reducen errores humanos
- ✅ Facilitan la configuración para nuevos desarrolladores
- ✅ Proporcionan verificaciones de estado
- ✅ Ahorran tiempo en el día a día

### ¿Puedo modificar los scripts?

¡Por supuesto! Los scripts están diseñados para ser fáciles de entender y modificar. Puedes ajustarlos según las necesidades de tu equipo.

### ¿Funcionan en Linux/Mac?

Estos scripts son específicos para Windows PowerShell. Para Linux/Mac, puedes crear scripts Bash equivalentes o usar los comandos manuales del README principal.

### ¿Qué hago si un script falla?

1. Lee el mensaje de error (generalmente en rojo)
2. Ejecuta `.\check.ps1` para diagnosticar
3. Verifica que cumples todos los requisitos
4. Asegúrate de que PostgreSQL esté corriendo
5. Revisa que las credenciales en `.env` sean correctas

---

## 🚀 Atajos Rápidos

Para facilitar aún más el uso, puedes crear alias en tu perfil de PowerShell:

```powershell
# Abrir tu perfil de PowerShell
notepad $PROFILE

# Agregar estos alias
Set-Alias -Name dev-start -Value "d:\Proyectos\Proyecto ISW\start.ps1"
Set-Alias -Name dev-stop -Value "d:\Proyectos\Proyecto ISW\stop.ps1"
Set-Alias -Name dev-check -Value "d:\Proyectos\Proyecto ISW\check.ps1"

# Guardar y recargar
. $PROFILE
```

Ahora puedes usar:
```powershell
dev-start   # Iniciar proyecto
dev-stop    # Detener proyecto
dev-check   # Verificar sistema
```

---

## 📝 Notas Adicionales

- Los scripts crean el archivo `.env` automáticamente desde `.env.example`
- `setup.ps1` solicita la contraseña de PostgreSQL de forma segura (no se muestra en pantalla)
- Las ventanas de Backend y Frontend permanecen abiertas para ver los logs en tiempo real
- Puedes cerrar las ventanas en cualquier momento para detener los servicios

---

**¡Con estos scripts, iniciar tu proyecto es tan simple como ejecutar `.\start.ps1`!** 🎉
