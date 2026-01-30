// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || '127.0.0.1',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'LUCIFER620',
//   database: process.env.DB_NAME || 'resume_analyzer',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test database connection
// pool.getConnection()
//   .then(connection => {
//     console.log('Database connected successfully');
//     connection.release();
//   })
//   .catch(err => {
//     console.error('Database connection failed:', err.message);
//     process.exit(1);
//   });

// export default pool;


import mysql from "mysql2/promise";

let pool = null;

// Only create DB pool if explicitly enabled
if (process.env.ENABLE_DB === "true") {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Test database connection (NON-FATAL)
  pool.getConnection()
    .then(connection => {
      console.log("Database connected successfully");
      connection.release();
    })
    .catch(err => {
      console.error("Database connection failed:", err.message);
      console.log("⚠️ Continuing without database");
    });
} else {
  console.log("⚠️ Database disabled (ENABLE_DB=false)");
}

export default pool;