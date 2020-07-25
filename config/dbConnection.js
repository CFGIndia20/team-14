import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

//const MONGOURL = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

//const MONGOURL = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const MONGOURL = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;
/* mongodb+srv://yogesh:<password>@cluster0.1zicm.mongodb.net/<dbname>?retryWrites=true&w=majority */
export default mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE CONNECTED.'))
  .catch((error) => console.log('DATABASE CONNECTION ERROR - ', error));