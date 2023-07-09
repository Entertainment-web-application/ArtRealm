const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Abd2001@",
  host: "localhost",
  port: 5432,
  database: "ArtRealm",
});

module.exports = pool;
