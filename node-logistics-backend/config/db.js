const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { MONGODB_URI } = process.env;

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

module.exports = mongoose.connection;
