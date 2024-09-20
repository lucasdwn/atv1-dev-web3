'use client';
import { useState, useEffect } from 'react';
import { Cliente, createCliente, getClientes } from '../services/clienteService';

export default function ClientesPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const clienteList = await getClientes();
                setClientes(clienteList);
            } catch (err) {
                setError('Erro ao buscar cliente');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleCreateCliente = async () => {
        const newCliente = {
            name: 'Novo Cliente',
            email: 'novo@exemplo.com',
        };

        try {
            const createdCliente = await createCliente(newCliente);
            setClientes((prevClientes) => [...prevClientes, createdCliente]);
        } catch (err) {
            console.error('Erro ao criar cliente:', err);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <button onClick={handleCreateCliente}>Criar Novo Cliente</button>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        {cliente.name} - {cliente.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
