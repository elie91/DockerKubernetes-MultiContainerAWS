const keys = require('./keys');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

//Express setup
const app = express();
app.use(cors());
app.use(express.json());

//Postgres setup
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    host: keys.pgHost
});

pgClient.on('error', () => console.log('lost pg connection'));

pgClient.query('CREATE TABLE IF NOT EXISTS values(number INT)')
    .catch(err => console.log(err));

// Redis setup
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

