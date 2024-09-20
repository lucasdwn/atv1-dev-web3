import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connect } from './config/connection';
import routes from './routes';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {

    try {
        await connect();
        console.log('Conectado ao MongoDB com sucesso!')

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        app.use('/api', routes);
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

    }
    catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
    }
}

startServer();