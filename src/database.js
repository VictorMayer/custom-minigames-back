import pg from 'pg';

const { Pool } = pg;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, NODE_ENV, DATABASE_URL } = process.env;

let databaseConnection = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
};

if (NODE_ENV === 'prod') {
    databaseConnection = {
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const connection = new Pool(databaseConnection);

export default connection;
