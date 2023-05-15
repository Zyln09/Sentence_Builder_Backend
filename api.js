import express from 'express';
import mssql from 'mssql';



// Create an instance of the express application
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Database configuration
const config = {
  user: 'Egg12',
  password: 'Gov3nd3r',
  server: 'buildsentence.database.windows.net',
  database: 'SentenceBuilder',
  options: {
    encrypt: true, // If you're using Azure
    trustServerCertificate: true // If you're using a self-signed certificate
  }
};

// Function to execute SQL queries
async function executeQuery(query) {
  try {
    const pool = await mssql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Route to handle the request for word types
app.get('/api/word-types', async (req, res) => {
  const query = 'SELECT WordType FROM WordTypes';
  try {
    const wordTypes = await executeQuery(query);
    res.json(wordTypes.map((row) => row.WordType));
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve word types' });
  }
});

// Route to handle the request for word options based on word type
app.get('/api/words/:type', async (req, res) => {
  const { type } = req.params;
  const query = `SELECT Word FROM Words
                 INNER JOIN WordTypes ON Words.WordTypeID = WordTypes.ID
                 WHERE WordTypes.WordType = '${type}'`;
  try {
    const words = await executeQuery(query);
    res.json(words.map((row) => row.Word));
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve word options' });
  }
});

// Route to handle the request for saving a sentence
app.post('/api/sentence', async (req, res) => {
  const { sentence } = req.body;
  
  // Database query to insert the sentence into a table
  const query = `INSERT INTO Sentences (Sentence) VALUES ('${sentence}')`;

  try {
    await executeQuery(query);
    res.status(200).json({ message: 'Sentence saved successfully' });
  } catch (error) {
    console.error('Failed to save sentence:', error);
    res.status(500).json({ message: 'Failed to save sentence' });
  }
});

// Route to handle the request for retrieving all sentences
app.get('/api/getAllSentences', async (req, res) => {
  const query = 'SELECT Sentence FROM Sentences';
  try {
    const sentences = await executeQuery(query);
    const numberedSentences = sentences.map((row, index) => `${index + 1}. ${row.Sentence}`);
    res.json(numberedSentences);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve sentences' });
  }
});




// Start the server
const port = 3000;
const ipAddress = '0.0.0.0';

app.listen(port, ipAddress, () => {
  console.log(`Server is listening on ${ipAddress}:${port}`);
});

