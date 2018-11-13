// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Vencimiento Token
// ============================

process.env.CADUCIDAD_TOKEN = '24h';

// ============================
// SEED de autenticación
// ============================

process.env.SEED = process.env.SEED || 'seed-desarrollo';

// ============================
// Base de Datos
// ============================

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
	urlDB = 'mongodb://localhost:27017/cafe';
} else {
	urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============================
// Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID = '393435832292-oq1r3v12cl39fs3s0jv1ri3rtl9msvav.apps.googleusercontent.com';