import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: "NikitaDuritsyn",
    password: "123123",
    host: "localhost",
    port: 5432,
    database: "kamenka2",
})