import { Router } from "express";
import clienteRoutes from './clienteRoutes';

const routes = Router()

routes.use("/cliente", clienteRoutes);

export default routes