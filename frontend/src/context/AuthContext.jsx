import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Criando o contexto
const AuthContext = createContext();

// Hook personalizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Usuários de demonstração para testes
const DEMO_USERS = {
  cliente: {
    id: 1,
    name: 'Cliente Demo',
    email: 'cliente@demo.com',
    role: 'client',
    phone: '(11) 99999-9999',
    createdAt: '2023-01-01T00:00:00.000Z',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200'
  },
  barbeiro: {
    id: 2,
    name: 'Barbeiro Demo',
    email: 'barbeiro@demo.com',
    role: 'barber',
    phone: '(11) 88888-8888',
    specialty: 'Cortes clássicos',
    createdAt: '2023-01-01T00:00:00.000Z',
    profileImage: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200'
  }
};

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se há um token válido ao iniciar
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Para fins de demonstração, verificar se é um usuário demo
          if (token === 'demo-client-token') {
            setUser(DEMO_USERS.cliente);
            setLoading(false);
            return;
          } else if (token === 'demo-barber-token') {
            setUser(DEMO_USERS.barbeiro);
            setLoading(false);
            return;
          }

          // Configurar o token no header de autorização
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Buscar informações do usuário
          const response = await api.get('/api/auth/me');
          setUser(response.data.data.user);
        } catch (err) {
          // Se o token for inválido, fazer logout
          console.error('Erro ao verificar token:', err);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Função para registrar um novo usuário
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/auth/register', userData);
      const { token, data } = response.data;
      
      // Salvar token no localStorage
      localStorage.setItem('token', token);
      
      // Configurar token no header de autorização
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Atualizar estado
      setToken(token);
      setUser(data.user);
      
      return { success: true, data: data.user };
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao registrar. Tente novamente.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setError(null);
      
      // Logins de demonstração
      if (email === 'cliente@demo.com') {
        localStorage.setItem('token', 'demo-client-token');
        setToken('demo-client-token');
        setUser(DEMO_USERS.cliente);
        return { success: true };
      } 
      else if (email === 'barbeiro@demo.com') {
        localStorage.setItem('token', 'demo-barber-token');
        setToken('demo-barber-token');
        setUser(DEMO_USERS.barbeiro);
        return { success: true };
      }
      
      // Implementação real
      const response = await api.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      } else {
        setError(response.data.message || 'Credenciais inválidas');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      const errorMsg = err.response ? (err.response.data.message || 'Erro no login') : 'Erro no servidor. Tente novamente';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Função para fazer logout
  const logout = () => {
    // Remover token do localStorage
    localStorage.removeItem('token');
    
    // Remover token do header de autorização
    delete api.defaults.headers.common['Authorization'];
    
    // Limpar estado
    setToken(null);
    setUser(null);
  };

  // Função para atualizar perfil
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    // Para usuários de demonstração, simular atualização
    if (user && (user.email === "cliente@demo.com" || user.email === "barbeiro@demo.com")) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      setLoading(false);
      return { success: true, data: updatedUser };
    }
    
    try {
      const response = await api.patch('/api/auth/update-me', userData);
      
      // Atualizar estado
      setUser(response.data.data.user);
      
      return { success: true, data: response.data.data.user };
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Função para resetar senha
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    // Para usuários de demonstração, simular sucesso
    if (email === "cliente@demo.com" || email === "barbeiro@demo.com") {
      setLoading(false);
      return { success: true, message: "Email de recuperação enviado com sucesso!" };
    }
    
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao enviar email de recuperação. Tente novamente.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Valores fornecidos pelo contexto
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 