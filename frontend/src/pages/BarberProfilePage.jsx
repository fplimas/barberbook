import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheck, FaHeart, FaRegHeart, FaCut, FaTags } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Importando o hook useAuth
import BarberProfile from '../components/barber/BarberProfile';
import './BarberProfilePage.css';

const BarberProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtendo o usuário autenticado
  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBarberOwner, setIsBarberOwner] = useState(false);
  const [comboServices, setComboServices] = useState([]);
  const [comboName, setComboName] = useState('');
  const [comboDescription, setComboDescription] = useState('');
  const [comboPrice, setComboPrice] = useState('');

  // Verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem('token');

  // Verificar se o usuário é dono do perfil
  useEffect(() => {
    if (user && user.role === 'barber') {
      setIsBarberOwner(true);
      localStorage.setItem('isBarberOwner', 'true');
    } else {
      setIsBarberOwner(false);
      localStorage.setItem('isBarberOwner', 'false');
    }
  }, [user]);

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Em produção, fazer uma chamada de API real
        // const response = await fetch(`/api/barbers/${id}`);
        // if (!response.ok) {
        //   throw new Error('Erro ao buscar dados do barbeiro');
        // }
        // const data = await response.json();

        // Dados simulados para desenvolvimento
        const barberData = {
          id: id,
          name: 'Carlos Barbosa',
          email: 'carlos.barbosa@exemplo.com',
          phone: '(11) 98765-4321',
          address: 'Rua Augusta, 1500, São Paulo - SP',
          bio: 'Especialista em cortes modernos e barbas. Mais de 10 anos de experiência no ramo de barbearia.',
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          workingHours: '09:00 - 19:00',
          rating: 4.8,
          reviewCount: 124,
          gallery: [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
            'https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36',
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c'
          ]
        };

        // Dados simulados de serviços
        const servicesData = [
          { id: 1, name: 'Corte de Cabelo', description: 'Corte moderno com tesoura ou máquina', duration: 30, price: 45.00 },
          { id: 2, name: 'Barba', description: 'Aparo e modelagem de barba com toalha quente', duration: 20, price: 35.00 },
          { id: 3, name: 'Corte + Barba', description: 'Combo de corte e barba com desconto', duration: 50, price: 70.00 },
          { id: 4, name: 'Coloração', description: 'Pintura de cabelo ou barba', duration: 60, price: 85.00 },
          { id: 5, name: 'Hidratação', description: 'Tratamento para cabelos ressecados', duration: 40, price: 50.00 }
        ];

        // Dados simulados de avaliações
        const reviewsData = [
          { 
            id: 101, 
            clientName: 'Pedro Almeida', 
            rating: 5, 
            comment: 'Excelente profissional! Corte perfeito como sempre.', 
            date: '2023-09-15T14:30:00Z',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
          },
          { 
            id: 102, 
            clientName: 'Lucas Oliveira', 
            rating: 4, 
            comment: 'Muito bom atendimento e ambiente agradável. Recomendo!', 
            date: '2023-09-10T11:15:00Z',
            avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
          },
          { 
            id: 103, 
            clientName: 'Rafael Costa', 
            rating: 5, 
            comment: 'O melhor barbeiro da região! Atencioso e muito habilidoso.', 
            date: '2023-09-05T16:45:00Z',
            avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
          }
        ];

        // Verificar se este barbeiro é favorito do usuário
        // Em produção, buscar da API
        const isFav = localStorage.getItem('favorites') ? 
          JSON.parse(localStorage.getItem('favorites')).includes(Number(id)) : 
          false;

        setBarber(barberData);
        setServices(servicesData);
        setReviews(reviewsData);
        setIsFavorite(isFav);
        setLoading(false);

        // Gerar horários disponíveis após carregar dados do barbeiro
        generateAvailableSlots(new Date());

        // Verificar se o usuário é o proprietário do barbeiro
        // Em produção, buscar da API
        const isOwner = localStorage.getItem('isBarberOwner') === 'true';
        setIsBarberOwner(isOwner);
      } catch (err) {
        console.error('Erro:', err);
        setError(err.message || 'Ocorreu um erro ao carregar dados do barbeiro');
        setLoading(false);
      }
    };

    if (id) {
      fetchBarberData();
    }
  }, [id]);

  // Função para gerar horários disponíveis
  const generateAvailableSlots = (date) => {
    // Em produção, buscar horários disponíveis da API
    // const response = await fetch(`/api/barbers/${id}/availability?date=${date.toISOString()}`);
    // const data = await response.json();
    // setAvailableSlots(data.slots);
    
    // Simulação de horários disponíveis
    const slots = [];
    const workStart = 9; // 9:00
    const workEnd = 19; // 19:00
    const interval = 30; // 30 minutos por slot
    
    for (let hour = workStart; hour < workEnd; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        // Simular alguns horários como indisponíveis aleatoriamente
        const isAvailable = Math.random() > 0.3;
        
        if (isAvailable) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          slots.push(timeString);
        }
      }
    }
    
    setAvailableSlots(slots);
  };

  // Manipulador de mudança de data
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Resetar slot selecionado quando a data muda
    generateAvailableSlots(date);
  };

  // Manipulador de serviço selecionado
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null); // Resetar slot selecionado quando o serviço muda
  };

  // Manipulador de horário selecionado
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Manipulador para agendar serviço
  const handleBooking = () => {
    if (!isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      navigate('/login', { 
        state: { 
          returnUrl: `/barber/${id}`, 
          message: 'Faça login para agendar um serviço' 
        } 
      });
      return;
    }

    if (!selectedService || !selectedSlot) {
      alert('Por favor, selecione um serviço e um horário disponível.');
      return;
    }

    // Em produção, enviar para a API
    // const bookingData = {
    //   barberId: id,
    //   serviceId: selectedService.id,
    //   date: selectedDate.toISOString().split('T')[0],
    //   time: selectedSlot
    // };
    
    // try {
    //   const response = await fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(bookingData)
    //   });
    
    //   const data = await response.json();
    
    //   if (response.ok) {
    //     // Redirecionar para página de confirmação
    //     navigate(`/booking-confirmation/${data.bookingId}`);
    //   } else {
    //     throw new Error(data.message || 'Erro ao agendar serviço');
    //   }
    // } catch (err) {
    //   console.error('Erro:', err);
    //   alert(err.message || 'Ocorreu um erro ao agendar. Tente novamente.');
    // }

    // Simulação de agendamento bem-sucedido
    alert(`Agendamento realizado com sucesso!\n\nServiço: ${selectedService.name}\nData: ${selectedDate.toLocaleDateString('pt-BR')}\nHorário: ${selectedSlot}`);
    navigate('/profile');
  };

  // Manipulador para favoritar/desfavoritar barbeiro
  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      navigate('/login', { 
        state: { 
          returnUrl: `/barber/${id}`, 
          message: 'Faça login para adicionar aos favoritos' 
        } 
      });
      return;
    }

    // Em produção, enviar para a API
    // try {
    //   const method = isFavorite ? 'DELETE' : 'POST';
    //   const response = await fetch(`/api/favorites/${id}`, {
    //     method,
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Erro ao atualizar favoritos');
    //   }
    
    //   setIsFavorite(!isFavorite);
    // } catch (err) {
    //   console.error('Erro:', err);
    //   alert(err.message || 'Ocorreu um erro. Tente novamente.');
    // }

    // Simulação de favoritar/desfavoritar
    let favorites = localStorage.getItem('favorites') ? 
      JSON.parse(localStorage.getItem('favorites')) : 
      [];
    
    if (isFavorite) {
      favorites = favorites.filter(favId => favId !== Number(id));
    } else {
      favorites.push(Number(id));
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  // Renderização de estrelas para avaliação
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    
    return stars;
  };

  // Formatação de data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Renderizar dias para seleção de data
  const renderDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isSelected = 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();
      
      const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
      const dayName = dayNames[date.getDay()];
      
      dates.push(
        <div 
          key={i} 
          className={`date-option ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateChange(date)}
        >
          <span className="day-name">{dayName}</span>
          <span className="day-number">{date.getDate()}</span>
        </div>
      );
    }
    
    return dates;
  };

  // Manipulador de mudança de preço
  const handlePriceChange = (serviceId, newPrice) => {
    // Em produção, enviar para a API
    // try {
    //   const response = await fetch(`/api/barbers/${id}/services/${serviceId}/price`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({ price: newPrice })
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Erro ao atualizar preço do serviço');
    //   }
    // } catch (err) {
    //   console.error('Erro:', err);
    //   alert(err.message || 'Ocorreu um erro ao atualizar o preço do serviço');
    // }

    // Simulação de atualização bem-sucedida
    const updatedServices = services.map(service =>
      service.id === serviceId ? { ...service, price: parseFloat(newPrice) } : service
    );
    setServices(updatedServices);
  };

  // Manipulador para salvar o preço de um serviço
  const saveServicePrice = (serviceId) => {
    // Em produção, enviar para a API
    // try {
    //   const response = await fetch(`/api/barbers/${id}/services/${serviceId}/price`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({ price: newPrice })
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Erro ao atualizar preço do serviço');
    //   }
    // } catch (err) {
    //   console.error('Erro:', err);
    //   alert(err.message || 'Ocorreu um erro ao atualizar o preço do serviço');
    // }

    // Simulação de atualização bem-sucedida
    alert('Preço do serviço atualizado com sucesso!');
  };

  // Manipulador para criar um novo combo
  const createCombo = () => {
    // Em produção, enviar para a API
    // try {
    //   const response = await fetch(`/api/barbers/${id}/combos`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({
    //       name: comboName,
    //       description: comboDescription,
    //       price: comboPrice,
    //       services: comboServices
    //     })
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Erro ao criar combo');
    //   }
    // } catch (err) {
    //   console.error('Erro:', err);
    //   alert(err.message || 'Ocorreu um erro ao criar o combo');
    // }

    // Simulação de criação bem-sucedida
    alert('Combo criado com sucesso!');
    setComboName('');
    setComboDescription('');
    setComboPrice('');
    setComboServices([]);
  };

  // Manipulador para adicionar/remover um serviço do combo
  const toggleComboService = (serviceId) => {
    if (comboServices.includes(serviceId)) {
      setComboServices(comboServices.filter(id => id !== serviceId));
    } else {
      setComboServices([...comboServices, serviceId]);
    }
  };

  // Se o usuário é um barbeiro ou se estamos na rota /barber-profile, 
  // mostrar o componente de perfil barbeiro estilo Booksy
  if (user?.role === 'barber' || window.location.pathname === '/barber-profile') {
    return <BarberProfile />;
  }
  
  // Caso contrário, mostrar a página de visualização de perfil de barbeiro para clientes
  return (
    <div className="barber-profile-page">
      <h1>Perfil de Barbeiro</h1>
      <p>Visualização para clientes (perfil público)</p>
      {/* Conteúdo da página de visualização de perfil de barbeiro para clientes */}
    </div>
  );
};

export default BarberProfilePage; 