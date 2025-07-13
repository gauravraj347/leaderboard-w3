const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

module.exports = app;
