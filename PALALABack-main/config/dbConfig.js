const { Pool } = require("pg");
require('dotenv').config();
/* 
const isTestEnv = process.env.NODE_ENV === 'test';

const dbConfig = {
    host: isTestEnv ? require('./').host : process.env.PSQL_HOST,
    user: isTestEnv ? require('./').user : process.env.PSQL_USER,
    password: isTestEnv ? require('./').password : process.env.PSQL_PASSWORD,
    database: isTestEnv ? require('./').database : process.env.PSQL_DATABASE,
    port: isTestEnv ? require('./').port : process.env.PSQL_PORT,
    max: isTestEnv ? require('./').max : process.env.PSQL_MAX_CON,
    idleTimeoutMillis: isTestEnv ? require('./').idleTimeoutMillis : process.env.PSQL_IDLE_TIMEOUT,
  }; */

const dbConfig = {
    host: process.env.psql_host,
    user: process.env.psql_user,
    password: process.env.psql_password,
    database: process.env.psql_database,
    port: process.env.psql_port,
    max: process.env.psql_max_con,
    idleTimeoutMillis: process.env.psql_idleTimeoutMillis,
};

const pool = new Pool(dbConfig);

pool.on('connect', () => {  
    
});

pool.on('error', (error) => {
    console.log("Error to connect to PostgresSQL", error);
});

module.exports = pool;

async function query(query_str){
  let res_obj;
  try{
      const client = await pool.connect();
      try{
          const res = await client.query(query_str);
          res_obj = await res.rows;
          return res_obj;
      }finally{
          client.release();
      }
  }
  catch(err){
      console.log(err);
  }
};

//To use this function you must use promises or async/await formats 
exports.RawQuery = query;