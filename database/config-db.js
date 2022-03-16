const pg = require('pg');

require("dotenv").config();

const config = {
    host: process.env.BDD_LINK,
    user: process.env.BDD_USER,     
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_DATABASE,
    port: 5432,
    ssl: true
};

const connectionString = '';
const pgClient = new pg.Client(connectionString);
pgClient.connect();
