import pkg from 'pg';
const { Pool, Client } = pkg;

import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

const pool = new Pool({
  user: 'kim',
  host: 'database',
  database: 'db',
  password: '2003',
  port: 5432,
})
 
// console.log(await pool.query('SELECT NOW()'))
 
const client = new Client({
  user: 'kim',
  host: 'database',
  database: 'db',
  password: '2003',
  port: 5432,
})
 
await client.connect()
 
var data = await client.query('SELECT ten, mssv FROM data');

app.get('/', (req, res) => {
  res.json([data][0]['rows']);
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})

await client.end()

