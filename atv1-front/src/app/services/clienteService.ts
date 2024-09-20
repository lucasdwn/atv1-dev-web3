import api from './api';

export interface Cliente {
  id: number;
  name: string;
  email: string;
}

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await api.get<Cliente[]>('/cliente');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  try {
    const response = await api.get<Cliente>(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o cliente com id ${id}:`, error);
    throw error;
  }
};

export const createCliente = async (userData: Omit<Cliente, 'id'>): Promise<Cliente> => {
  try {
    const response = await api.post<Cliente>('/cliente', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

export const updateCliente = async (id: number, userData: Partial<Cliente>): Promise<Cliente> => {
  try {
    const response = await api.put<Cliente>(`/cliente/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o cliente com id ${id}:`, error);
    throw error;
  }
};

export const deleteCliente = async (id: number): Promise<void> => {
  try {
    await api.delete(`/cliente/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar o cliente com id ${id}:`, error);
    throw error;
  }
};
