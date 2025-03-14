import express from 'express';

import dotenv from 'dotenv';
import router from './routes/routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => console.log(`server is running at ${PORT}`));
