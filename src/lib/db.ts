import mysql from 'mysql2/promise';

// Database configuration
const dbConfig: mysql.PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'review_agency',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Export pool for queries
export default pool;

// Helper function to execute queries
export async function query(sql: string, params?: any[]) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Helper function to execute queries that return rows
export async function queryRows<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const results = await query(sql, params);
    return results as T[];
}

// Helper function to execute queries that return a single row
export async function queryRow<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const results = await queryRows<T>(sql, params);
    return results.length > 0 ? results[0] : null;
}

