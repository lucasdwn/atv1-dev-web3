import api from './api';

export interface Cliente {
  _id: string;
  name: string;
  email: string;
}

interface IResponse {
  message: string;
  cliente: Cliente;
}

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await api.get<Cliente[]>('/cliente');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  try {
    const response = await api.get<Cliente>(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCliente = async (userData: Omit<Cliente, '_id'>): Promise<Cliente> => {
  try {
    const response = await api.post<Cliente>('/cliente', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCliente = async (id: string, userData: Partial<Cliente>): Promise<Cliente> => {
  try {
    const response = await api.put<IResponse>(`/cliente/${id}`, userData);
    return response.data.cliente;
  } catch (error) {
    throw error;
  }
};

export const deleteCliente = async (id: string): Promise<void> => {
  try {
    await api.delete(`/cliente/${id}`);
  } catch (error) {
    throw error;
  }
};
