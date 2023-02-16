const { Pool, Client } = require('pg');
// const connectionString =
//   process.env.DATABASE_URL || 'http://localhost:5432/horseplay-dev';

const DATABASE_URL = process.env.DB_URL;
const PASSWORD = process.env.DB_PW;

const client = new Pool({
  user: 'ndubell01',
  host: 'db.bit.io',
  database: DATABASE_URL,
  password: PASSWORD, 
  port: 5432,
  ssl: true,
});

client.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connected to PostgreSQL database');
});

// const client = new Pool({
//   connectionString,
//   ssl:
//     process.env.NODE_ENV === 'production'
//       ? {
//           rejectUnauthorized: false,
//         }
//       : undefined,
// });

// const client = new Client(
  // {
  // connectionString
  //   ssl:
  //     process.env.NODE_ENV === 'production'
  //       ? { rejectUnauthorized: false }
  //       : undefined,
  // }
// );

module.exports = client;
