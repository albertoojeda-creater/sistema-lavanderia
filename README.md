# Sistema de Seguimiento de Pedidos de Lavandería
Este sistema permite a una lavandería gestionar pedidos de clientes de manera eficiente mediante un panel administrativo, al mismo tiempo que ofrece a los clientes la posibilidad de consultar el estado de su pedido en tiempo real mediante un ticket único. Es una solución integral para modernizar y agilizar el flujo de trabajo en la recepción y entrega de prendas.

🛠️ Tecnologías Utilizadas
Frontend
React (con Vite)

TailwindCSS

Lucide React (Iconos)

Axios & React Router

Backend
Node.js & Express

Prisma ORM

PostgreSQL

JWT (JSON Web Tokens) & Bcrypt (Seguridad)

📁 Estructura del Proyecto
El proyecto está dividido en dos directorios principales:

/backend: Contiene la API REST.

/frontend: Contiene la Interfaz de Usuario (UI).

✨ Funcionalidades Implementadas
🛡️ Panel Admin (/login -> /admin)
Login: Acceso seguro y protegido mediante autenticación con JWT.

Panel de Pedidos: Vista general con la lista completa de pedidos, incluyendo filtros de búsqueda por número de ticket o teléfono del cliente.

Nuevo Pedido: Formulario intuitivo para registrar la información del cliente y los detalles específicos del servicio.

Gestión de Estados: Controles rápidos para actualizar el progreso del pedido (Recibido, En proceso, Listo, Entregado).

🔍 Portal de Clientes (/tracking)
Consulta de Ticket: Interfaz limpia y sencilla para que el cliente ingrese su código de seguimiento.

Estado Visual: Stepper dinámico e interactivo que muestra en qué etapa se encuentra el pedido.

Detalles del Servicio: Información clara sobre la fecha estimada de entrega y el tipo de servicio contratado.

📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado en tu entorno de desarrollo local:

Node.js: v18 o superior.

PostgreSQL: Una instancia de base de datos en funcionamiento.

🚀 Configuración y Puesta en Marcha
Sigue estos pasos para ejecutar el proyecto de forma local.

1. Configuración del Backend
Abre tu terminal, navega a la carpeta del backend y configura las variables de entorno:

Bash
cd backend
Crea o actualiza el archivo .env en la raíz de la carpeta backend con tu cadena de conexión a PostgreSQL:

Fragmento de código
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/laundry_db?schema=public"
Instala las dependencias y prepara la base de datos:

Bash
# Instalar dependencias
npm install

# Sincronizar el esquema de Prisma con la base de datos
npx prisma db push

# Generar el cliente de Prisma
npx prisma generate
Ejecuta el script de semilla (seed) para crear el usuario administrador por defecto (la contraseña será password):

Bash
node prisma/seed.js
Inicia el servidor de desarrollo:

Bash
npm run dev
2. Configuración del Frontend
Abre una nueva pestaña en tu terminal y navega a la carpeta del frontend:

Bash
cd frontend
Instala las dependencias necesarias:

Bash
npm install
Inicia la aplicación de desarrollo:

Bash
npm run dev
