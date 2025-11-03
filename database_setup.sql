-- ============================================
-- Sistema de Evaluaciones Orales
-- Script de Configuración Inicial de Base de Datos
-- ============================================

-- IMPORTANTE: Ejecuta este script en dos partes:
-- PARTE 1: Ejecuta solo las líneas 9-16 conectado a la base de datos 'postgres'
-- PARTE 2: Después, conéctate a 'evaluaciones_orales' y ejecuta el resto

-- ============================================
-- PARTE 1: Crear la Base de Datos
-- ============================================
-- Ejecuta esto conectado a 'postgres' (la base de datos por defecto)

-- Eliminar la base de datos si existe (CUIDADO: esto borra todos los datos)
-- DROP DATABASE IF EXISTS evaluaciones_orales;

-- Crear la base de datos
CREATE DATABASE evaluaciones_orales
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- ============================================
-- PARTE 2: Verificar la Base de Datos
-- ============================================
-- Ahora cierra esta ventana de Query Tool
-- Haz clic derecho en "evaluaciones_orales" en el árbol de la izquierda
-- Selecciona "Query Tool" para abrir una nueva ventana conectada a esta BD
-- Luego ejecuta las siguientes líneas:

-- Mensaje de confirmación
SELECT 'Base de datos "evaluaciones_orales" creada exitosamente' AS status;

-- ============================================
-- NOTA: Las tablas se crean automáticamente
-- ============================================
-- TypeORM se encarga de crear las tablas automáticamente
-- cuando inicias el servidor por primera vez con synchronize: true
--
-- La tabla que se creará automáticamente:
--
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     nombre VARCHAR(100),
--     apellido VARCHAR(100),
--     rol VARCHAR(50) DEFAULT 'estudiante' NOT NULL,
--     activo BOOLEAN DEFAULT true,
--     "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- ============================================

-- Verificar que la base de datos está lista
SELECT 
    datname AS "Nombre Base de Datos",
    pg_encoding_to_char(encoding) AS "Codificación",
    datcollate AS "Collation"
FROM pg_database
WHERE datname = 'evaluaciones_orales';
