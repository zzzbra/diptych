require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Routes
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const coursesAndLessons = require('./routes/coursesAndLessons');
const enrollments = require('./routes/enrollments');

const PORT = process.env.SERVER_PORT;

// Middleware
app.use(cors());
app.use(morgan('dev')); // predefined: combined, common, dev, short, tiny
app.use(express.json()); // req.body

// Routes
app.use('/api/v1/auth', auth);
// Currently just pulls from the auth table -- need to split the actual auth
// stuff and the user identity stuff into separate tables
app.use('/api/v1/profile', profile);
app.use('/api/v1/courses', coursesAndLessons);
app.use('/api/v1/enrollments', enrollments);

// Lift off
app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
