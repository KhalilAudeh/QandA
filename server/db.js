const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "KHA361997",
  host: "localhost",
  port: 5432,
  database: "q&a"
});

module.exports = pool;