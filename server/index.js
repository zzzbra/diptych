require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Routes
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const courses = require('./routes/courses');
const lessons = require('./routes/lessons');
const enrollments = require('./routes/enrollments');
const cards = require('./routes/cards');
const reviews = require('./routes/reviews');

const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(morgan('dev')); // predefined: combined, common, dev, short, tiny
app.use(express.json()); // req.body

// Routes
app.use('/api/v1/auth', auth);
// Currently just pulls from the auth table -- need to split the actual auth
// stuff and the user identity stuff into separate tables
app.use('/api/v1/profile', profile);
app.use('/api/v1/courses', courses);
app.use('/api/v1/lessons', lessons);
app.use('/api/v1/enrollments', enrollments);
app.use('/api/v1/cards', cards);
app.use('/api/v1/reviews', reviews);

// Lift off
app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
