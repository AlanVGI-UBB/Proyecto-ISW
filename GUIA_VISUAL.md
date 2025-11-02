# 🎬 Guía Visual - Uso de Scripts

Esta guía muestra paso a paso cómo usar los scripts para trabajar con el proyecto.

## 🚀 Inicio Rápido para Principiantes

### Opción A: Doble Clic (Más Fácil)

Si prefieres no usar la terminal:

1. **Primera vez - Configuración:**
   - Haz doble clic en `setup.bat`
   - Sigue las instrucciones en pantalla

2. **Todos los días - Iniciar proyecto:**
   - Haz doble clic en `start.bat`
   - ¡Listo! Se abrirán dos ventanas automáticamente

### Opción B: PowerShell (Recomendado)

1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta el comando que necesites

---

## 📝 Escenarios de Uso

### 🎯 Escenario 1: Primera Vez - Configurar Todo

**Situación:** Acabas de clonar el proyecto y necesitas configurarlo.

**Pasos:**

```powershell
# 1. Abrir PowerShell en la carpeta del proyecto
# (Shift + Click derecho → "Abrir PowerShell aquí")

# 2. Ejecutar configuración guiada
.\setup.ps1
```

**Lo que verás:**

```
========================================
  Configuración Inicial del Proyecto
========================================

Este script te ayudará a configurar el proyecto paso a paso.

========================================
  Paso 1: Verificar requisitos
========================================

✓ Node.js instalado: v20.10.0

========================================
  Paso 2: Instalar dependencias
========================================

¿Deseas instalar las dependencias ahora? (S/N): S

Instalando dependencias del Backend...
✓ Backend listo

Instalando dependencias del Frontend...
✓ Frontend listo

========================================
  Paso 3: Configurar archivo .env
========================================

Necesitamos configurar las credenciales de PostgreSQL:

Host de PostgreSQL (default: localhost): [Enter]
Puerto de PostgreSQL (default: 5432): [Enter]
Usuario de PostgreSQL (default: postgres): [Enter]
Contraseña de PostgreSQL: ******* [escribir tu contraseña]
Nombre de la base de datos (default: evaluaciones_orales): [Enter]

✓ Archivo .env configurado correctamente

========================================
  Paso 4: Base de datos
========================================

Asegúrate de crear la base de datos en PostgreSQL:

  CREATE DATABASE evaluaciones_orales;

¿Ya creaste la base de datos? (S/N): S

========================================
  ✓ Configuración Completada
========================================

Próximo paso:
  Ejecuta: .\start.ps1
```

---

### 🎯 Escenario 2: Día Normal - Iniciar para Trabajar

**Situación:** Ya configuraste todo y quieres empezar a trabajar.

**Pasos:**

```powershell
# Ejecutar inicio automático
.\start.ps1
```

**Lo que verás:**

```
========================================
  Sistema de Evaluaciones Orales
  Iniciando proyecto...
========================================

[1/4] Verificando Node.js...
  ✓ Node.js instalado: v20.10.0

[2/4] Verificando dependencias...
  ✓ Dependencias ya instaladas

[3/4] Verificando configuración...
  ✓ Archivo .env encontrado

[4/4] Iniciando servidores...

========================================
  Servidores iniciándose...
========================================

  Backend:  http://localhost:4000
  Frontend: http://localhost:5173

  Presiona Ctrl+C para detener los servidores

Iniciando Backend...
Iniciando Frontend...

========================================
  ✓ Proyecto iniciado correctamente
========================================

Los servidores están corriendo en ventanas separadas.
Abre tu navegador en: http://localhost:5173
```

**Resultado:**
- Se abre una ventana de PowerShell con el Backend (fondo negro, texto verde)
- Se abre otra ventana de PowerShell con el Frontend (fondo negro, texto azul)
- Ambas ventanas muestran los logs en tiempo real

---

### 🎯 Escenario 3: Verificar que Todo Está Bien

**Situación:** Quieres asegurarte de que el proyecto está bien configurado antes de iniciar.

**Pasos:**

```powershell
# Ejecutar verificación
.\check.ps1
```

**Lo que verás (Caso exitoso):**

```
========================================
  Verificación del Sistema
========================================

[1/6] Verificando Node.js...
  ✓ Node.js instalado: v20.10.0
  ✓ Versión compatible

[2/6] Verificando npm...
  ✓ npm instalado: v10.2.3

[3/6] Verificando PostgreSQL...
  ✓ PostgreSQL instalado: psql (PostgreSQL) 15.4

[4/6] Verificando estructura del proyecto...
  ✓ Carpeta 'backend' encontrada
  ✓ Carpeta 'frontend' encontrada

[5/6] Verificando dependencias...
  ✓ Dependencias del Backend instaladas
  ✓ Dependencias del Frontend instaladas

[6/6] Verificando configuración...
  ✓ Archivo .env encontrado
  ✓ DB_PASSWORD configurado
  ✓ JWT_SECRET configurado

========================================
  Resumen de Verificación
========================================

✓ SISTEMA LISTO PARA USAR

Puedes iniciar el proyecto con:
  .\start.ps1
```

**Lo que verás (Si hay problemas):**

```
[5/6] Verificando dependencias...
  ✗ Dependencias del Backend no instaladas
    Ejecuta: .\install.ps1

========================================
  Resumen de Verificación
========================================

⚠ SISTEMA NECESITA CONFIGURACIÓN

Pasos recomendados:
  1. Instalar dependencias: .\install.ps1
  2. Configurar archivo .env en backend\
  3. Crear base de datos en PostgreSQL
  4. Ejecutar: .\start.ps1
```

---

### 🎯 Escenario 4: Solo Instalar/Actualizar Dependencias

**Situación:** Hiciste `git pull` y hay nuevas dependencias, o algo salió mal.

**Pasos:**

```powershell
# Instalar solo dependencias
.\install.ps1
```

**Lo que verás:**

```
========================================
  Instalación de Dependencias
========================================

Verificando Node.js...
✓ Node.js instalado: v20.10.0

========================================
  Backend - Instalando dependencias
========================================

npm install
...
added 150 packages in 15s

✓ Dependencias del Backend instaladas correctamente

========================================
  Frontend - Instalando dependencias
========================================

npm install
...
added 80 packages in 10s

✓ Dependencias del Frontend instaladas correctamente

Creando archivo .env...
✓ Archivo .env creado desde .env.example

========================================
  ✓ Instalación completada
========================================

Próximos pasos:
  1. Crea la base de datos en PostgreSQL:
     CREATE DATABASE evaluaciones_orales;

  2. Edita backend\.env con tus credenciales

  3. Ejecuta el proyecto con:
     .\start.ps1
```

---

### 🎯 Escenario 5: Detener Todo

**Situación:** Los servidores están corriendo y quieres detenerlos.

**Opción 1: Manual (Recomendado)**
- Simplemente cierra las ventanas de PowerShell del Backend y Frontend

**Opción 2: Con Script**

```powershell
.\stop.ps1
```

**Lo que verás:**

```
========================================
  Deteniendo Servidores
========================================

Buscando procesos activos...

Procesos Node.js encontrados:
  - PID: 12345 | Path: C:\Program Files\nodejs\node.exe
    ✓ Proceso detenido
  - PID: 12346 | Path: C:\Program Files\nodejs\node.exe
    ✓ Proceso detenido

✓ Se detuvieron 2 proceso(s)

========================================
  Proceso completado
========================================

Si las ventanas de PowerShell siguen abiertas,
ciérralas manualmente.
```

---

## 🎨 Entendiendo los Colores

Los scripts usan colores para facilitar la lectura:

- **Cyan (Azul claro)** - Títulos de secciones
  ```
  ========================================
    Paso 1: Verificar requisitos
  ========================================
  ```

- **Green (Verde)** - Todo está bien ✓
  ```
  ✓ Node.js instalado: v20.10.0
  ✓ Dependencias instaladas correctamente
  ```

- **Yellow (Amarillo)** - Advertencias o progreso ⚠
  ```
  ⚠ PostgreSQL no encontrado en PATH
  [1/4] Verificando Node.js...
  ```

- **Red (Rojo)** - Errores ✗
  ```
  ✗ Node.js no está instalado
  ✗ Dependencias no instaladas
  ```

---

## 🔧 Solución de Problemas Comunes

### Error: "No se puede ejecutar scripts en este sistema"

**Problema:**
```
.\setup.ps1 : No se puede cargar el archivo ... porque la ejecución de scripts está deshabilitada
```

**Solución:**
1. Abre PowerShell como **Administrador**
2. Ejecuta:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Confirma con `S` (Sí)
4. Cierra y vuelve a abrir PowerShell normalmente
5. Intenta nuevamente

---

### Las ventanas se cierran inmediatamente

**Problema:** Al ejecutar `.\start.ps1`, las ventanas se abren y cierran rápidamente.

**Posibles causas:**
1. Node.js no está instalado
2. Las dependencias no están instaladas
3. Hay un error en el código

**Solución:**
1. Ejecuta `.\check.ps1` para ver el estado
2. Ejecuta `.\install.ps1` para instalar dependencias
3. Revisa los errores en las ventanas antes de que se cierren

---

### Puerto ya en uso

**Problema:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**
```powershell
# Detener todos los procesos Node.js
.\stop.ps1

# Esperar 5 segundos
Start-Sleep -Seconds 5

# Iniciar nuevamente
.\start.ps1
```

---

## 💡 Tips y Trucos

### Tip 1: Ver logs en tiempo real

Las ventanas de Backend y Frontend permanecen abiertas mostrando logs:

**Backend:**
```
✅ Base de datos conectada exitosamente
🚀 Servidor corriendo en http://localhost:4000
2024-11-02T10:30:00.000Z - POST /api/auth/login
```

**Frontend:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Tip 2: Mantén las ventanas abiertas

No cierres las ventanas de Backend y Frontend mientras trabajas. Necesitas ambas para que el sistema funcione.

### Tip 3: Usa archivos .bat si prefieres

Si no te sientes cómodo con PowerShell, usa los archivos .bat:
- Doble clic en `start.bat` → Inicia todo
- Doble clic en `setup.bat` → Configura todo
- Doble clic en `install.bat` → Instala dependencias

### Tip 4: Atajos de teclado

En las ventanas de Backend/Frontend:
- `Ctrl + C` → Detener el servidor
- `Ctrl + Rueda del mouse` → Zoom in/out
- Click derecho → Copiar/Pegar

---

## 📱 Acceso desde el Navegador

Una vez que los servidores estén corriendo:

1. Abre tu navegador favorito (Chrome, Firefox, Edge)
2. Ve a: `http://localhost:5173`
3. Verás la pantalla de login del sistema
4. Crea una cuenta o inicia sesión

**Nota:** El Backend corre en el puerto 3000, pero NO necesitas abrirlo en el navegador. El Frontend (puerto 5173) se comunica con él automáticamente.

---

**¡Con estos scripts, tu flujo de trabajo será mucho más eficiente!** 🚀

Para más detalles técnicos, consulta [SCRIPTS.md](SCRIPTS.md).
