# 📦 StockMaster Backend

Backend API REST para el sistema de gestión de inventario StockMaster. Construido con Node.js, Express.js, Sequelize y SQL Server.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Scripts Disponibles](#scripts-disponibles)

---

## 📝 Descripción

StockMaster Backend es una API REST completa para la gestión de inventario, proveedores, clientes y ventas. Incluye autenticación con JWT, validación de datos, manejo centralizado de errores y arquitectura escalable con separación en capas (modelos, servicios, controladores y rutas).

---

## ✨ Características

- ✅ Autenticación y autorización con JWT
- ✅ Gestión de usuarios y roles
- ✅ Gestión de productos y categorías
- ✅ Gestión de ventas y facturas
- ✅ Gestión de clientes y proveedores
- ✅ Validación de datos con Joi
- ✅ Manejo centralizado de errores
- ✅ CORS habilitado
- ✅ ORM con Sequelize
- ✅ Conexión segura a SQL Server

---

## 🚀 Tecnologías

| Tecnología | Versión | Descripción |
|---|---|---|
| **Node.js** | 14+ | Entorno de ejecución JavaScript |
| **Express.js** | ^5.2.1 | Framework web |
| **Sequelize** | ^6.37.8 | ORM para base de datos |
| **SQL Server** | - | Sistema de gestión de base de datos |
| **MSSQL** | ^12.5.0 | Driver para SQL Server |
| **JWT** | ^9.0.3 | Autenticación con tokens |
| **Bcryptjs** | ^3.0.3 | Hash de contraseñas |
| **Joi** | ^18.2.1 | Validación de esquemas |
| **CORS** | ^2.8.6 | Control de acceso entre orígenes |
| **Dotenv** | ^17.4.2 | Gestión de variables de entorno |

---

## 📋 Requisitos Previos

- **Node.js** versión 14 o superior
- **npm** (incluido con Node.js)
- **SQL Server** instalado y ejecutándose
- **Base de datos** `STOCKMASTERbdv4` creada
- Usuario con permisos en SQL Server configurado

---

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd StockMaster_Backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=tu_contraseña
DB_NAME=STOCKMASTERbdv4

# JWT Configuration
JWT_SECRET=tu_clave_secreta_jwt_muy_segura

# Server Configuration
PORT=3000
NODE_ENV=development
```

---

## ⚙️ Configuración

### Conexión a Base de Datos

La configuración se encuentra en [config/database.js](config/database.js). Puedes personalizar:

- **Servidor**: `localhost` (por defecto)
- **Puerto**: `1433` (puerto estándar SQL Server)
- **Base de datos**: `STOCKMASTERbdv4`
- **Usuario y contraseña**: Configurable en variables de entorno

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DB_HOST` | Host del servidor SQL Server | localhost |
| `DB_PORT` | Puerto del servidor | 1433 |
| `DB_USER` | Usuario de SQL Server | sa |
| `DB_PASSWORD` | Contraseña de SQL Server | password123 |
| `DB_NAME` | Nombre de la base de datos | STOCKMASTERbdv4 |
| `JWT_SECRET` | Clave secreta para JWT | mysecretkey123456 |
| `PORT` | Puerto en que escucha el servidor | 3000 |
| `NODE_ENV` | Entorno de ejecución | development/production |

---

## 🚀 Uso

### Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon para reinicio automático)
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### Verificar estado del servidor

```bash
# Health check - Verifica conexión a BD
curl http://localhost:3000/health
```

---

## 📁 Estructura del Proyecto

```
StockMaster_Backend/
│
├── config/
│   └── database.js                      # Configuración de conexión a BD
│
├── controller/                          # Controladores (lógica de rutas)
│   ├── articulo.controller.js
│   ├── auth.controller.js               # Autenticación (login, registro)
│   ├── categoria.controller.js
│   ├── detalleFactura.controller.js
│   ├── persona.controller.js
│   ├── tipoPersona.controller.js
│   └── venta.controller.js
│
├── middleware/                          # Middlewares personalizados
│   ├── auth.middleware.js               # Validación de JWT
│   ├── error.middleware.js              # Manejo centralizado de errores
│   └── validate.middleware.js           # Validación con Joi
│
├── models/                              # Modelos de datos (Sequelize)
│   ├── articulo.models.js
│   ├── categoria.models.js
│   ├── detalleFactura.models.js
│   ├── persona.models.js
│   ├── tipoPersona.models.js
│   └── venta.models.js
│
├── routes/                              # Definición de rutas API
│   ├── articulo.routes.js
│   ├── auth.routes.js                   # Rutas de autenticación
│   ├── categoria.routes.js
│   ├── detalleFactura.routes.js
│   ├── persona.routes.js
│   ├── tipoPersona.routes.js
│   └── venta.routes.js
│
├── schemas/                             # Esquemas de validación (Joi)
│   ├── articulo.schema.js
│   ├── categoria.schema.js
│   ├── detalleFactura.schema.js
│   ├── persona.schema.js
│   ├── tipoPersona.schema.js
│   └── venta.schema.js
│
├── services/                            # Lógica de negocio
│   ├── articulo.services.js
│   ├── auth.services.js                 # Servicios de autenticación
│   ├── categoria.services.js
│   ├── detalleFactura.services.js
│   ├── persona.services.js
│   ├── tipoPersona.services.js
│   └── venta.services.js
│
├── app.js                               # Archivo principal (configuración Express)
├── package.json                         # Dependencias del proyecto
├── .env                                 # Variables de entorno (no incluir en git)
├── README.md                            # Este archivo
└── JWT_AUTHENTICATION_GUIDE.md          # Guía de autenticación JWT
```

---

## 📊 Modelos de Datos

### 👤 Persona (Usuario)
- Gestión de usuarios del sistema
- Campos: id, nombre, usuario, contraseña, dirección, tipo
- Relación: Asociada con TipoPersona

### 🏷️ TipoPersona (Roles)
- Define roles y tipos de usuario (administrador, cliente, proveedor, etc.)
- Campos: id, descripción, nombre

### 📦 Articulo (Producto)
- Registro de productos del inventario
- Campos: id, nombre, descripción, precio, stock, categoria
- Relación: Asociado con Categoria

### 🔖 Categoria
- Categorización de productos
- Campos: id, nombre, descripción

### 🛍️ Venta
- Registro de transacciones de venta
- Campos: id, fecha, monto, cliente, estado
- Relación: Asociada con Persona y DetalleFactura

### 📄 DetalleFactura
- Detalles de línea en cada venta
- Campos: id, cantidad, precio, articulo, venta
- Relación: Asociado con Articulo y Venta

---

## 🔗 API Endpoints

### 🔐 Autenticación (`/auth`)

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/logout` | Cerrar sesión |

**Ver documentación completa en [JWT_AUTHENTICATION_GUIDE.md](JWT_AUTHENTICATION_GUIDE.md)**

### 👥 Personas (`/personas`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/personas` | Obtener todas las personas |
| GET | `/personas/:id` | Obtener persona por ID |
| POST | `/personas` | Crear nueva persona |
| PUT | `/personas/:id` | Actualizar persona |
| DELETE | `/personas/:id` | Eliminar persona |

### 🏷️ Tipos de Persona (`/tiposPersona`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/tiposPersona` | Obtener todos los tipos |
| GET | `/tiposPersona/:id` | Obtener tipo por ID |
| POST | `/tiposPersona` | Crear nuevo tipo |
| PUT | `/tiposPersona/:id` | Actualizar tipo |
| DELETE | `/tiposPersona/:id` | Eliminar tipo |

### 📦 Articulos (`/articulos`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/articulos` | Obtener todos los artículos |
| GET | `/articulos/:id` | Obtener artículo por ID |
| POST | `/articulos` | Crear nuevo artículo |
| PUT | `/articulos/:id` | Actualizar artículo |
| DELETE | `/articulos/:id` | Eliminar artículo |

### 🔖 Categorias (`/categorias`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/categorias` | Obtener todas las categorías |
| GET | `/categorias/:id` | Obtener categoría por ID |
| POST | `/categorias` | Crear nueva categoría |
| PUT | `/categorias/:id` | Actualizar categoría |
| DELETE | `/categorias/:id` | Eliminar categoría |

### 🛍️ Ventas (`/ventas`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/ventas` | Obtener todas las ventas |
| GET | `/ventas/:id` | Obtener venta por ID |
| POST | `/ventas` | Crear nueva venta |
| PUT | `/ventas/:id` | Actualizar venta |
| DELETE | `/ventas/:id` | Eliminar venta |

### 📄 Detalles de Factura (`/detalleFacturas`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/detalleFacturas` | Obtener todos los detalles |
| GET | `/detalleFacturas/:id` | Obtener detalle por ID |
| POST | `/detalleFacturas` | Crear nuevo detalle |
| PUT | `/detalleFacturas/:id` | Actualizar detalle |
| DELETE | `/detalleFacturas/:id` | Eliminar detalle |

### 🏥 Health Check (`/health`)

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verificar estado del servidor y BD |

**Respuesta:**
```json
{
  "status": "OK",
  "database": "Connected"
}
```

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Token)** para autenticación y autorización.

### Flujo de Autenticación

1. **Registro**: El usuario se registra con nombre, usuario, contraseña y tipo
2. **Login**: El usuario envía credenciales y recibe un token JWT
3. **Peticiones Autenticadas**: Incluir el token en el header `Authorization: Bearer <token>`

### Headers Requeridos

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Para documentación detallada de endpoints de autenticación, ver [JWT_AUTHENTICATION_GUIDE.md](JWT_AUTHENTICATION_GUIDE.md)**

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor en modo desarrollo con nodemon |
| `npm run test-db` | Prueba la conexión a la base de datos |

---

## 🔨 Arquitectura

El proyecto sigue una arquitectura en capas:

```
Request → Routes → Controllers → Services → Models → Database
Response ← Middleware (Validación, Autenticación, Errores)
```

### Capas

- **Routes**: Definen los endpoints de la API
- **Controllers**: Manejan las solicitudes HTTP
- **Services**: Contienen la lógica de negocio
- **Models**: Definen la estructura de datos
- **Middleware**: Validación, autenticación y manejo de errores

---

## 🐛 Solución de Problemas

### Error: "Connection refused"
- Verifica que SQL Server esté ejecutándose
- Confirma las credenciales en `.env`
- Verifica que la base de datos exista

### Error: "Token expired"
- El token JWT ha expirado
- Realiza login nuevamente para obtener un nuevo token

### Error: "Validation failed"
- Revisa los esquemas en la carpeta `schemas/`
- Verifica que los datos cumplan con el formato requerido

---

## 📞 Contacto y Soporte

Para reportar problemas o hacer sugerencias, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto está bajo licencia ISC.

## 🧪 Testing

Para probar la API, puedes usar herramientas como:
- Postman
- Insomnia
- curl

Ejemplo de prueba del health check:
```bash
curl http://localhost:3000/health
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Soporte

Para soporte técnico o preguntas, por favor contacta al equipo de desarrollo.

---

**Nota**: Asegúrate de que SQL Server esté ejecutándose y que la base de datos `STOCKMASTERbdv4` exista antes de iniciar la aplicación.
