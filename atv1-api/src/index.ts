import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connect } from './config/connection';
import routes from './routes';
dotenv.config();

const app = express();
app.use(express.json());

connect()
app.use('/api', routes);
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
