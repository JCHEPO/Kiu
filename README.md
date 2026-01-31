# Kiu

Plataforma web para crear y descubrir eventos en tu comunidad. Organiza partidos, juegos de mesa, clases y mas con tus vecinos.

## Stack

- **Frontend:** React 18 + Vite + React Router
- **Backend:** Express + Mongoose + JWT + bcrypt
- **Base de datos:** MongoDB

## Estructura

```
frontend/
  src/
    pages/          # HomePage, CreateEventPage, EventDetailPage, ProfilePage
    context/        # AuthContext (auth, login, logout, fetchWithAuth)
    app.jsx         # Rutas principales
    main.jsx        # Entry point

backend/
  src/
    models/         # User, Event
    routes/         # auth.routes, events.routes
    middleware/     # auth.middleware (JWT)
    server.js       # Entry point
```

## Setup

### Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en `/backend`:

```
MONGO_URI=mongodb://localhost:27017/kiu
JWT_SECRET=tu_secreto
PORT=3000
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en `http://localhost:5173` y se conecta al backend en `http://localhost:3000`.

## Funcionalidades

- Registro e inicio de sesion
- Crear eventos (Partidos, Social, Evento) con flujo paso a paso
- Filtros por categoria (Partidos, Cartas, Mundo Cafe, Clases) con sub-filtros
- Detalle de evento con cuenta regresiva, muro de mensajes, lista de items y participantes
- Unirse/salir de eventos
- Perfil de usuario
