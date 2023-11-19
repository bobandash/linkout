const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Connected to database.');
}
mongoose.set('strictQuery', true);
main().catch((err) => console.log(err));
