'use client';
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import testPng from '../assets/test.png';
import { getClientes, createCliente, deleteCliente, updateCliente, Cliente } from '../services/clienteService';

export default function ClientManagement() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editClientId, setEditClientId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientList = await getClientes();
        setClients(clientList);
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newName && newEmail) {
      try {
        if (editMode && editClientId !== null) {
          const updatedClient = await updateCliente(editClientId, { name: newName, email: newEmail });
          setClients((prevClients) =>
            prevClients.map((client) => (client._id === editClientId ? updatedClient : client))
          );

          resetForm();
        } else {
          const newClient = await createCliente({ name: newName, email: newEmail });

          setClients((prevClients) => [...prevClients, newClient]);

          resetForm();
        }
      } catch (error: any) {
        setError(error?.response?.data?.message || 'Erro ao salvar cliente.');
      }
    } else {
      setError('Por favor, preencha todos os campos.');
    }
  };

  const deleteClient = async (id: string) => {
    const confirmed = window.confirm('Você realmente deseja deletar este cliente?');
    if (!confirmed) return;

    setError(null);
    try {
      await deleteCliente(id);
      setClients(clients.filter(client => client._id !== id));
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  };

  const editClient = (client: Cliente) => {
    setEditMode(true);
    setEditClientId(client._id);
    setNewName(client.name);
    setNewEmail(client.email);
  };

  const resetForm = () => {
    setNewName('');
    setNewEmail('');
    setEditMode(false);
    setEditClientId(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{editMode ? 'EDITAR CLIENTE' : 'NOVO CLIENTE'}</h1>

        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertTitle>Erro:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="h-60 overflow-hidden">
            <Image
              src={testPng.src}
              alt="Shopping illustration"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>

          <div className="bg-gray-900 border border-blue-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{editMode ? 'Editar' : 'Cadastro'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="NOME"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-blue-500 rounded text-white"
              />
              <input
                type="email"
                placeholder="EMAIL"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-blue-500 rounded text-white"
              />
              <div className="flex justify-between">
                <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white">
                  {editMode ? 'SALVAR' : 'CADASTRAR'}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="ml-2 w-full p-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
                  >
                    CANCELAR
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">CLIENTES</h2>
        <div className="bg-gray-900 border border-blue-500 rounded-lg overflow-hidden">
          {clients.map(client => (
            <div key={client._id} className="flex justify-between items-center p-4 border-b border-gray-800 last:border-b-0">
              <div>
                <p className="font-semibold">NOME: {client.name}</p>
                <p className="text-gray-400">EMAIL: {client.email}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => editClient(client)} className="text-blue-500 hover:text-blue-600">
                  <FaEdit />
                </button>
                <button onClick={() => deleteClient(client._id)} className="text-red-500 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
