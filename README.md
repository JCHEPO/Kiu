🐾 Petu (Kiu) - Gestión de Actividades en Chile

Proyecto Fullstack diseñado para coordinar actividades presenciales, gestionando quórum y participación mediante un sistema de "vidas". Este repositorio contiene tanto el servidor (backend) como la interfaz de usuario (frontend).
🚀 Tecnologías Utilizadas
Backend

    Node.js & Express: Servidor de aplicaciones y manejo de rutas.

    MongoDB & Mongoose: Base de datos NoSQL y modelado de datos (Eventos y Usuarios).

    JWT (JSON Web Tokens): Autenticación segura de usuarios.

    Bcrypt: Encriptación de contraseñas.

Frontend

    React (Vite): Biblioteca para la interfaz de usuario dinámica.

    React Router Dom: Gestión de navegación y rutas protegidas.

📂 Estructura del Proyecto

    /backend: API REST que gestiona la lógica de negocio, autenticación y base de datos.

    /frontend: Aplicación Single Page Application (SPA) para la interacción del usuario.

🛠️ Instalación y Configuración
1. Clonar el repositorio
Bash

git clone https://github.com/JCHEPO/Kiu.git
cd Kiu

2. Configurar el Backend
Bash

cd backend
npm install
# Asegúrate de tener MongoDB corriendo localmente en el puerto 27017
npm run dev

3. Configurar el Frontend
Bash

cd ../frontend
npm install
npm run dev

🛡️ Características Principales (En Desarrollo)

    Autenticación de Usuarios: Registro e inicio de sesión seguro.

    Gestión de Eventos: Creación y visualización de actividades coordinadas.

    Middleware de Seguridad: Protección de rutas mediante validación de tokens.

🤵 Autor

    Juan Manuel Chepo - GitHub
