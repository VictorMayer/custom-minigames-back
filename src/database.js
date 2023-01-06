import pg from 'pg';

const { Pool } = pg;

const { NODE_ENV, DATABASE_URL } = process.env;

let databaseConnection = {
    connectionString: DATABASE_URL,
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
