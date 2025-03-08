import axios from 'axios';

// Crie uma instância do Axios com configurações básicas
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    // Se houver erro 401 (não autorizado), redirecionar para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Simular respostas para ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // Mock para login
  api.interceptors.response.use(function (response) {
    if (response.config.url === '/api/auth/login') {
      // Simular login de cliente
      if (response.config.data && JSON.parse(response.config.data).email === 'cliente@demo.com') {
        return {
          data: {
            success: true,
            token: 'demo-client-token',
            user: {
              id: 1,
              name: 'Cliente Demo',
              email: 'cliente@demo.com',
              role: 'client'
            }
          }
        };
      }
      // Simular login de barbeiro
      else if (response.config.data && JSON.parse(response.config.data).email === 'barbeiro@demo.com') {
        return {
          data: {
            success: true,
            token: 'demo-barber-token',
            user: {
              id: 2,
              name: 'Barbeiro Demo',
              email: 'barbeiro@demo.com',
              role: 'barber'
            }
          }
        };
      }
    }
    
    // Mock para perfil de usuário
    if (response.config.url === '/api/users/profile') {
      // Recuperar o token do localStorage
      const token = localStorage.getItem('token');
      
      // Perfil do cliente de demonstração
      if (token === 'demo-client-token') {
        return {
          data: {
            success: true,
            data: {
              id: 1,
              name: 'Cliente Demo',
              email: 'cliente@demo.com',
              phone: '(11) 99999-9999',
              role: 'client',
              birthdate: '1990-01-01',
              loyaltyPoints: 120,
              favoriteBarbers: [
                { id: 1, name: 'Carlos Barbosa', specialty: 'Cortes Modernos' },
                { id: 2, name: 'André Martins', specialty: 'Barbas' }
              ],
              address: {
                street: 'Rua das Flores',
                number: '123',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                zipcode: '01234-567'
              }
            }
          }
        };
      }
      
      // Perfil do barbeiro de demonstração
      else if (token === 'demo-barber-token') {
        return {
          data: {
            success: true,
            data: {
              id: 2,
              name: 'Barbeiro Demo',
              email: 'barbeiro@demo.com',
              phone: '(11) 88888-8888',
              role: 'barber',
              bio: 'Especialista em cortes modernos e barbas. Com mais de 10 anos de experiência no mercado, atendendo clientes que buscam estilo e qualidade.',
              specialty: 'Cortes Modernos',
              subscription: {
                plan: 'premium',
                validUntil: '2024-12-31'
              },
              workHours: [
                { day: 'Segunda', start: '09:00', end: '18:00', closed: false },
                { day: 'Terça', start: '09:00', end: '18:00', closed: false },
                { day: 'Quarta', start: '09:00', end: '18:00', closed: false },
                { day: 'Quinta', start: '09:00', end: '18:00', closed: false },
                { day: 'Sexta', start: '09:00', end: '20:00', closed: false },
                { day: 'Sábado', start: '09:00', end: '16:00', closed: false },
                { day: 'Domingo', start: null, end: null, closed: true }
              ]
            }
          }
        };
      }
    }
    
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

export default api; 