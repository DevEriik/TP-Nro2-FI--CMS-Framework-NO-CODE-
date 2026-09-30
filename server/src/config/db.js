import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('✅ [PostgreSQL - Supabase] Conexión establecida exitosamente');
});

pool.on('error', (err) => {
    console.error('❌ [PostgreSQL - Supabase] Error inesperado en el pool:', err.message);
});
