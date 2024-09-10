import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Nome é obrigatório"] },
    email: {
        type: String, required: [true, "O e-mail é obrigatório"], unique: true, validate: {
            validator: function (value: string) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: (props: any) => `${props.value} não é um formato de e-mail válido`,
        }
    },
});

const User = mongoose.model<IUser>('User', userSchema, 'users');

export default User;
