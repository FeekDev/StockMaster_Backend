# 🔐 Guía de Autenticación con JWT

## ✅ Implementación Completada

Se ha implementado autenticación con JSON Web Token (JWT) en tu aplicación. Aquí están los archivos creados/modificados:

### Archivos Nuevos:
1. **`services/auth.services.js`** - Lógica de autenticación (registro y login)
2. **`controller/auth.controller.js`** - Controladores para las rutas de auth
3. **`middleware/auth.middleware.js`** - Middleware para verificar tokens JWT
4. **`routes/auth.routes.js`** - Rutas de autenticación

### Archivos Modificados:
- **`app.js`** - Se agregó las rutas de autenticación
- **`.env`** - Se agregó variables de JWT

---

## 📋 Endpoints Disponibles

### 1. Registrar nuevo usuario
**POST** `/auth/register`

```json
{
  "nombre": "Juan Pérez",
  "usuario": "juan123",
  "contrasena": "password123",
  "id_tipo": 1,
  "direccion": "Calle Principal 123"
}
```

**Respuesta:**
```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id_persona": 1,
    "nombre": "Juan Pérez",
    "usuario": "juan123"
  }
}
```

---

### 2. Login de usuario
**POST** `/auth/login`

```json
{
  "usuario": "juan123",
  "contrasena": "password123"
}
```

**Respuesta:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id_persona": 1,
    "nombre": "Juan Pérez",
    "usuario": "juan123"
  }
}
```

---

### 3. Obtener perfil (ruta protegida)
**GET** `/auth/profile`

**Headers requeridos:**
```
Authorization: Bearer <tu_token_jwt>
```

**Respuesta:**
```json
{
  "message": "Acceso permitido",
  "usuario": {
    "id_persona": 1,
    "usuario": "juan123"
  }
}
```

---

## 🔒 Cómo Proteger Rutas

Para proteger cualquier ruta con JWT, importa el middleware en tus archivos de rutas:

```javascript
const { verifyToken } = require('../middleware/auth.middleware');

// Ruta protegida
router.get('/datos-sensibles', verifyToken, (req, res) => {
    // req.user contiene los datos del usuario: { id_persona, usuario }
    res.json({
        message: 'Datos sensibles',
        usuario: req.user
    });
});
```

---

## 🔧 Configuración de Variables de Entorno

En el archivo `.env`, actualiza:

```env
JWT_SECRET=cambiar_por_una_clave_muy_segura_en_produccion
JWT_EXPIRE=7d
PORT=3000
```

**⚠️ IMPORTANTE:** En producción, cambia `JWT_SECRET` por una clave fuerte y única.

---

## 🛡️ Características de Seguridad

✅ Contraseñas hasheadas con bcrypt  
✅ Tokens JWT con expiración  
✅ Validación de credenciales  
✅ Manejo de errores seguro  
✅ Tokens regenerados en cada login/registro  

---

## 🧪 Ejemplo de Uso en Frontend

### Con JavaScript/Fetch:

```javascript
// Registrarse
async function registrar() {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Juan Pérez',
      usuario: 'juan123',
      contrasena: 'password123',
      id_tipo: 1,
      direccion: 'Calle Principal 123'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
}

// Login
async function login() {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario: 'juan123',
      contrasena: 'password123'
    })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
}

// Acceder a ruta protegida
async function getPerfil() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/auth/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const data = await response.json();
  console.log(data);
}
```

---

## 📝 Próximos Pasos (Recomendado)

1. **Proteger rutas existentes** - Agrega el middleware `verifyToken` a tus rutas que requieran autenticación
2. **Actualizar controladores** - Modifica los controladores para usar `req.user.id_persona`
3. **Refresh tokens** - Implementar tokens de refresco para mayor seguridad
4. **Roles y permisos** - Implementar autorización basada en roles (admin, usuario, etc.)

---

## ⚠️ Notas Importantes

- Las contraseñas ahora se hashean automáticamente en el registro
- Al migrar usuarios existentes, sus contraseñas antiguas en texto plano ya no funcionarán
- El token expira en 7 días (configurable en `.env`)
- Los tokens deben enviarse en el header: `Authorization: Bearer <token>`

