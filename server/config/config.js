// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
// Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Entorno
// ============================

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
	urlDB = 'mongodb://localhost:27017/cafe';
} else {
	urlDB = 'mongodb://carlos8_alb:123456abc@ds155313.mlab.com:55313/cafedb-udemy';
}

process.env.URLDB = urlDB;