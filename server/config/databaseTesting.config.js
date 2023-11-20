//// mongoConfigTesting.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

exports.initializeMongoServer = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'TIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
};

exports.deleteMongoServer = async () => {
  await mongoose.connection.dropDatabase();
};
