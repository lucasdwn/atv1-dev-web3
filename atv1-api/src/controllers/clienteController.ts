import { Request, Response } from 'express';
import Cliente from '../models/clienteModel';

class clienteController {
    public async createCliente(req: Request, res: Response) {
        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(401).json({ erro: "Forneça o nome e e-mail" });
        }

        try {
            const response = await Cliente.create({
                name, email
            })
            res.status(201).json(response);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.status(500).json({ message: "Este e-mail já está em uso" });
            } else if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            } else if (error && error.errors["email"]) {
                return res.json({ message: error.errors["email"].message });
            }
            res.status(400).json({ error: error.message });
        }
    };

    public async getClientes(req: Request, res: Response) {
        try {
            const clientes = await Cliente.find();
            res.status(200).json(clientes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    public async update(req: Request, res: Response) {
        const { name, email } = req.body;
        const { clienteId } = req.params;
        try {
            const cliente = await Cliente.findOne({ _id: clienteId });

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            cliente.name = name || cliente.name;
            cliente.email = email || cliente.email;

            await cliente.save();
            return res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.status(500).json({ message: "Este e-mail já está em uso" });
            }
            return res.status(500).json({ message: 'Erro ao atualizar cliente', error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;

            const cliente = await Cliente.findByIdAndDelete({ _id: clienteId });

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            res.status(200).json({ message: 'Cliente removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover cliente', error });
        }
    }
}

export default new clienteController();
