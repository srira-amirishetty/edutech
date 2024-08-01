const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();


const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const questionRoutes = require('./routes/question');
const responseRoutes = require('./routes/response');
const resultRoutes = require('./routes/result');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use('/auth', authRoutes);
app.use('/tests', testRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);
app.use('/results', resultRoutes);

// Error handling middleware
app.use(errorHandler);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Catch-all handler to serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
