import { ConnectionPool } from 'mssql';

const config = {
  user: 'YourUsername',
  password: 'Yourpassword',
  server: 'Youraddress',
  database: 'YourDbName',
  options: {
    encrypt: true, // Enable encryption if required for your Azure SQL Database
  },
};

async function executeQuery(query: string) {
  try {
    const pool = await new ConnectionPool(config).connect();
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}


