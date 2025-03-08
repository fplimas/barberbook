import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaClock, FaStar, FaMapMarkerAlt, FaUserAlt, FaRegCalendarAlt, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './ProfilePage.css';
import ClientProfile from '../components/client/ClientProfile';

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [favoriteBarbers, setFavoriteBarbers] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Campos editáveis do perfil
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Carregar agendamentos do usuário
        const response = await api.get('/api/appointments/my-appointments');
        setAppointments(response.data.data || []);
        
        // Preencher formulário com dados do usuário
        if (user) {
          setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || ''
          });
        }
        
        if (user.userType === 'client') {
          // Buscar barbeiros favoritos e pontos de fidelidade
          const userDetailsRes = await api.get('/api/users/profile');
          setFavoriteBarbers(userDetailsRes.data.data.favoriteBarbers || []);
          setLoyaltyPoints(userDetailsRes.data.data.loyaltyPoints || 0);
        }
      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
        setError('Não foi possível carregar seus dados. Por favor, tente novamente.');
        
        // Dados de agendamento de exemplo quando a API não está disponível
        setAppointments([
          {
            id: 1,
            service: { name: 'Corte de Cabelo', price: 50 },
            barber: { name: 'Carlos Silva' },
            startTime: '2023-04-20T10:00:00',
            status: 'confirmed',
          },
          {
            id: 2,
            service: { name: 'Barba', price: 30 },
            barber: { name: 'André Santos' },
            startTime: '2023-04-25T14:30:00',
            status: 'pending',
          },
        ]);
        
        setFavoriteBarbers([
          { id: 1, name: 'Carlos Silva', specialty: 'Especialista em Degradê' },
          { id: 2, name: 'André Santos', specialty: 'Barba e Cabelo' }
        ]);
        
        setLoyaltyPoints(120);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      // Atualizar perfil do usuário
      const result = await updateProfile(formData);
      
      if (result.success) {
        setIsEditing(false);
      } else {
        setError(result.error || 'Erro ao atualizar perfil. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro no servidor. Por favor, tente novamente mais tarde.');
      console.error('Erro ao atualizar perfil:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Formatar data para exibição
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Mapear status para texto e classe CSS
  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { text: 'Pendente', className: 'status-pending' },
      confirmed: { text: 'Confirmado', className: 'status-confirmed' },
      completed: { text: 'Concluído', className: 'status-completed' },
      cancelled: { text: 'Cancelado', className: 'status-cancelled' },
      'no-show': { text: 'Não Compareceu', className: 'status-no-show' },
    };
    
    return statusMap[status] || { text: status, className: '' };
  };
  
  if (loading && !user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando seu perfil...</p>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="profile-page">
        <div className="not-authenticated">
          <h2>Acesso Restrito</h2>
          <p>Você precisa estar logado para acessar esta página.</p>
          <Link to="/login" className="btn btn-primary">Fazer Login</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Meu Perfil</h1>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="profile-content">
        <ClientProfile />
      </div>
    </div>
  );
};

export default ProfilePage; 