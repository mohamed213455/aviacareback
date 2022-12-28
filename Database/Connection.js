const mongoose = require('mongoose');


mongoose.connect('mongodb://avia:care@host:27017/aviacare2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
});

db.once('open', () => {
  console.log('MongoDB connection established successfully!');
});

