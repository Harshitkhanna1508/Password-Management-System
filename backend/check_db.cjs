const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vaultx').then(async () => {
  const db = mongoose.connection.db;
  const entries = await db.collection('vaults').find({}).toArray();
  console.log('Total entries:', entries.length);
  for (const e of entries) {
    if (!e.siteName || !e.username) {
      console.log('BAD ENTRY FOUND:', e);
    }
  }
  process.exit(0);
});
