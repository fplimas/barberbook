import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajustado para porta 3000

// Função para registrar usuário
export const registerUser = async (name, email, password, userType) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      userType,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Função para fazer login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Função para agendar um serviço
export const createAppointment = async (clientId, barberId, service, date) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, {
      clientId,
      barberId,
      service,
      date,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao agendar serviço:', error);
    throw error;
  }
};

// Função para listar agendamentos
export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    throw error;
  }
}; 