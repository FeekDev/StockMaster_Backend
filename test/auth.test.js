/**
 * Prueba de lógica de autenticación SIN base de datos
 * Ubicación: test/auth.test.js
 * Ejecutar con: node test/auth.test.js
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simular la clave secreta para que el test funcione sin .env
process.env.JWT_SECRET = 'ClaveSecretaParaPruebas';

async function probarLogica() {
    console.log('🧪 Probando lógica de autenticación...\n');

    // ==========================================
    // 1. PROBAR ENCRIPTACIÓN (bcrypt)
    // ==========================================
    try {
        const passwordOriginal = 'miContraseña123';
        console.log(`🔑 Password original: ${passwordOriginal}`);

        // Generar el hash (lo que se guardará en la BD)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordOriginal, salt);
        console.log(`🔒 Password hasheado: ${passwordHash.substring(0, 30)}...`);

        // Verificar que la contraseña original coincide con el hash
        const esValido = await bcrypt.compare(passwordOriginal, passwordHash);
        
        if (esValido) {
            console.log('✅ Coincidencia de password: CORRECTO\n');
        } else {
            console.log('❌ Error: Las contraseñas no coinciden\n');
        }
    } catch (error) {
        console.error('❌ Error probando bcrypt:', error.message);
    }

    // ==========================================
    // 2. PROBAR TOKENS (JWT)
    // ==========================================
    try {
        const datosUsuario = { id: 1, username: 'admin', rol: 'admin' };
        console.log('👤 Datos del usuario:', datosUsuario);

        // Generar token
        const token = jwt.sign(datosUsuario, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`🎫 Token generado: ${token.substring(0, 40)}...`);

        // Verificar token (decodificarlo)
        const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`🔓 Token verificado: ${JSON.stringify(tokenDecodificado)}\n`);
        
        console.log('✅ Token generado y verificado: CORRECTO\n');
    } catch (error) {
        console.error('❌ Error probando JWT:', error.message);
    }

    console.log('🏁 Prueba finalizada. Si no ves errores rojos, la lógica está bien.');
}

// Ejecutar la prueba
probarLogica();