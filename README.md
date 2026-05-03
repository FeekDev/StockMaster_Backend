# StockMaster Backend

Backend API para el sistema de gestión de inventario StockMaster, desarrollado con Node.js, Express.js y Sequelize.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **Sequelize** - ORM para Node.js
- **SQL Server** - Sistema de gestión de base de datos
- **MSSQL** - Driver para SQL Server
- **Tedious** - Driver de conexión para SQL Server

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- SQL Server instalado y ejecutándose
- Base de datos `STOCKMASTERbdv4` creada
- Usuario `sa` con permisos adecuados

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd stockmaster_backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (opcional):
Crea un archivo `.env` en la raíz del proyecto con las configuraciones de base de datos si es necesario.

## ⚙️ Configuración

La aplicación está configurada para conectarse a SQL Server con los siguientes parámetros por defecto:
- **Servidor**: localhost
- **Base de datos**: STOCKMASTERbdv4
- **Usuario**: sa
- **Contraseña**: SQLS3rv3r*
- **Puerto**: 3000

### Variables de Entorno

Puedes configurar la conexión a la base de datos modificando las variables en el archivo `config/database.js` o usando variables de entorno.

## 🚀 Uso

### Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

El servidor se iniciará en el puerto 3000.

### Probar la conexión a la base de datos

```bash
npm run test-db
```

## 📁 Estructura del Proyecto

```
stockmaster_backend/
├── config/
│   └── database.js          # Configuración de conexión a BD
├── controllers/             # Controladores de la aplicación
├── middlewares/             # Middlewares personalizados
├── models/                  # Modelos de Sequelize
│   ├── articulo.models.js
│   ├── categoria.models.js
│   ├── detalleFactura.models.js
│   ├── tipoPersona.models.js
│   ├── usuario.models.js
│   └── venta.models.js
├── routes/                  # Definición de rutas
├── services/                # Lógica de negocio
├── utils/                   # Utilidades
├── app.js                   # Archivo principal de la aplicación
├── package.json
└── README.md
```

## 📊 Modelos de Datos

### Persona (Usuario)
- Gestión de usuarios del sistema con roles

### TipoPersona
- Definición de roles y tipos de usuario

### Categoria
- Categorización de artículos

### Articulo
- Productos del inventario con stock y precios

### Venta
- Registro de ventas realizadas

### DetalleFactura
- Detalles específicos de cada venta

## 🔗 API Endpoints

### Health Check
- `GET /health` - Verificar estado de la aplicación y conexión a BD

## 📜 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run test-db` - Prueba la conexión a la base de datos

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