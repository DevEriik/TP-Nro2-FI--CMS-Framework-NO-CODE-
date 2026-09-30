import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
    try {
        const sqlPath = path.join(__dirname, 'schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf-8');
        console.log('⏳ Ejecutando schema.sql en Supabase...');
        await pool.query(sql);
        console.log('✅ Tablas y datos de prueba creados exitosamente en Supabase.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar base de datos:', error);
        process.exit(1);
    }
}

initDb();
