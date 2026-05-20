/**
 * Servicio de Autenticación para el Frontend
 * Ubicación: src/services/auth.service.js
 * Descripción: Gestiona la comunicación con los endpoints de autenticación.
 * Adapta los nombres de los campos para que coincidan con la tabla 'Persona'.
 */

import axios from 'axios';

// URL base del backend (Asegúrate de que coincida con donde corre tu compañero)
const API_URL = 'http://localhost:3000/api';

class AuthService {
    
    /**
     * Iniciar sesión (Login)
     * Envía 'usuario' y 'contrasena' para coincidir con la BD
     */
    async login(usuario, contrasena) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                usuario,       // 👈 Antes era username
                contrasena     // 👈 Antes era password
            });

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.data.usuario));
                localStorage.setItem('token', response.data.data.token);
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error de conexión con el servidor' };
        }
    }

    /**
     * Registrar nuevo usuario (Register)
     * Envía los campos necesarios para la tabla Persona
     */
    async register(data) {
        try {
            // Adaptamos los nombres de los campos para la petición
            const payload = {
                usuario: data.usuario,      // 👈 Antes era username
                contrasena: data.contrasena,// 👈 Antes era password
                nombre: data.nombre,
                direccion: data.direccion,
                id_tipo: data.id_tipo       // 👈 ID del tipo de persona (ej: 1, 2, 3)
            };

            const response = await axios.post(`${API_URL}/auth/register`, payload);
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al registrar' };
        }
    }

    /**
     * Cerrar sesión
     */
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Obtener token actual
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Header de autorización
     */
    authHeader() {
        const token = this.getToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }
}

export default new AuthService();