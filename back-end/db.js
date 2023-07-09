const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "20182003", // db password
  host: "localhost",
  port: 2018,
  database: "postgres", //db name
});
