const express = require('express');
const app = express();

// Route to handle the request for word types
app.get('/api/word-types', (req, res) => {
  const wordTypes = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Determiner', 'Exclamation'];
  res.json(wordTypes);
});

// Route to handle the request for word options based on word type
app.get('/api/word-options/:type', (req, res) => {
  const { type } = req.params;
  
  // Example data for word options based on word type
  const wordOptions = {
    noun: ['cat', 'dog', 'house'],
    verb: ['run', 'jump', 'play'],
    adjective: ['big', 'small', 'happy'],
    adverb: ['quickly', 'slowly', 'carefully'],
    pronoun: ['he', 'she', 'it'],
    preposition: ['on', 'in', 'at'],
    conjunction: ['and', 'but', 'or'],
    determiner: ['the', 'a', 'an'],
    exclamation: ['wow', 'oh', 'oops']
  };
 
   // Check if the selected word type exists in the wordOptions object
   if (wordTypes.hasOwnProperty(type)) {
    const words = wordTypes[type];
    res.json(words);
  } else {
    res.status(404).json({ message: 'Word type not found' });
  }


  // Check if the selected word type exists in the wordOptions object
  if (wordOptions.hasOwnProperty(type)) {
    const words = wordOptions[type];
    res.json(words);
  } else {
    res.status(404).json({ message: 'Word not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
