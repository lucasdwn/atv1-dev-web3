import { Request, Response } from 'express';
import User from '../models/userModel';

class userController {
    public async createUser(req: Request, res: Response) {
        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(401).json({ erro: "Forneça o nome e e-mail" });
        }

        try {
            const response = await User.create({
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

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    public async update(req: Request, res: Response) {
        const { name, email } = req.body;
        const { userId } = req.params;
        try {
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            user.name = name || user.name;
            user.email = email || user.email;

            await user.save();
            return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.status(500).json({ message: "Este e-mail já está em uso" });
            }
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const user = await User.findByIdAndDelete({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover usuário', error });
        }
    }
}

export default new userController();
