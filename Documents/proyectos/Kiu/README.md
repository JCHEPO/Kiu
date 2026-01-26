# Kiu - App de Eventos

Aplicación web para gestión de eventos con autenticación de usuarios.

## Requisitos

- Node.js (versión 16 o superior)
- MongoDB (instala MongoDB Community Server y Compass)

## Instalación

1. Clona el repositorio:
   ```
   git clone <url-del-repo>
   cd Kiu
   ```

2. Instala dependencias del backend:
   ```
   cd backend
   npm install
   ```

3. Instala dependencias del frontend:
   ```
   cd ../frontend
   npm install
   ```

## Configuración

1. Asegúrate de que MongoDB esté corriendo localmente (puerto 27017).

2. En el backend, la conexión a DB está en `src/server.js` (mongodb://127.0.0.1:27017/petu).

## Ejecución

1. Ejecuta el backend:
   ```
   cd backend
   npm run dev
   ```
   (Corre en http://localhost:3000)

2. Ejecuta el frontend (en otra terminal):
   ```
   cd frontend
   npm run dev
   ```
   (Corre en http://localhost:5173 o 5174)

3. Abre http://localhost:5174 en tu navegador.

## Funcionalidades

- Registro e inicio de sesión.
- Creación de eventos (todos los usuarios logueados).
- Lista de eventos disponibles con detalles.

## Notas

- Usa MongoDB Compass para ver/editar la DB local.
- Para pruebas con otros, cada persona debe clonar y ejecutar localmente (DB local no es compartida).