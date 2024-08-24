import { config } from 'dotenv';
import express, { urlencoded } from 'express';
import api from './routes/api';
import { set, connect } from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';

config();

const app = express();
const PORT = process.env.PORT;
const MONGO_STR = process.env.MONGO_STR;

app.use(urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use('/api', api);

set('strictQuery', false);
connect(MONGO_STR)
  .then(() => {
    console.log('MongoDB successfully connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error in DB connection ${err}`);
  });

app.get('/', (req, res) => {
  res.send('Express test route succeded');
});
