import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaCut, FaUser, FaClock, FaMoneyBillWave, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedServiceId = queryParams.get('service');

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnUrl: '/booking', 
          message: 'Faça login para agendar um serviço' 
        } 
      });
    }

    // Buscar serviços e barbeiros
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Em produção, fazer uma chamada de API real
        // const servicesResponse = await fetch('/api/services');
        // const barbersResponse = await fetch('/api/barbers');
        
        // if (!servicesResponse.ok || !barbersResponse.ok) {
        //   throw new Error('Erro ao buscar dados para agendamento');
        // }
        
        // const servicesData = await servicesResponse.json();
        // const barbersData = await barbersResponse.json();

        // Dados simulados para desenvolvimento
        const servicesData = [
          {
            id: 1,
            name: 'Corte de Cabelo',
            description: 'Corte moderno com tesoura ou máquina',
            duration: 30,
            price: 45.00,
            image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c'
          },
          {
            id: 2,
            name: 'Barba',
            description: 'Aparo e modelagem de barba com toalha quente',
            duration: 20,
            price: 35.00,
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1'
          },
          {
            id: 3,
            name: 'Corte + Barba',
            description: 'Combo de corte e barba com desconto',
            duration: 50,
            price: 70.00,
            image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919'
          },
          {
            id: 4,
            name: 'Coloração',
            description: 'Pintura de cabelo ou barba',
            duration: 60,
            price: 85.00,
            image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033'
          },
          {
            id: 5,
            name: 'Hidratação',
            description: 'Tratamento para cabelos ressecados',
            duration: 40,
            price: 50.00,
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035'
          }
        ];

        const barbersData = [
          {
            id: 1,
            name: 'Carlos Barbosa',
            specialty: 'Cortes modernos e barbas',
            rating: 4.8,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: 2,
            name: 'Fernando Soares',
            specialty: 'Degradês e acabamentos',
            rating: 4.6,
            avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
          },
          {
            id: 3,
            name: 'Ricardo Almeida',
            specialty: 'Tratamentos capilares',
            rating: 4.9,
            avatar: 'https://randomuser.me/api/portraits/men/51.jpg'
          },
          {
            id: 4,
            name: 'André Santos',
            specialty: 'Barbas e design facial',
            rating: 4.7,
            avatar: 'https://randomuser.me/api/portraits/men/64.jpg'
          }
        ];

        setServices(servicesData);
        setBarbers(barbersData);

        // Se houver um serviço pré-selecionado pela URL
        if (preSelectedServiceId) {
          const service = servicesData.find(s => s.id === parseInt(preSelectedServiceId));
          if (service) {
            setSelectedService(service);
            setStep(2);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Erro:', err);
        setError(err.message || 'Ocorreu um erro ao carregar dados para agendamento');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, isAuthenticated, preSelectedServiceId]);

  // Gerar próximos 7 dias para seleção
  useEffect(() => {
    if (selectedBarber) {
      const dates = [];
      const today = new Date();
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }
      
      setAvailableDates(dates);
    }
  }, [selectedBarber]);

  // Gerar horários disponíveis para o barbeiro selecionado e data
  useEffect(() => {
    if (selectedBarber && selectedDate) {
      setLoading(true);
      
      // Em produção, buscar horários disponíveis da API
      // const fetchAvailableTimes = async () => {
      //   try {
      //     const response = await fetch(`/api/barbers/${selectedBarber.id}/availability?date=${selectedDate.toISOString().split('T')[0]}`);
      //     if (!response.ok) {
      //       throw new Error('Erro ao buscar horários disponíveis');
      //     }
      //     const data = await response.json();
      //     setAvailableTimes(data.availableTimes);
      //     setLoading(false);
      //   } catch (err) {
      //     console.error('Erro:', err);
      //     setError(err.message || 'Ocorreu um erro ao carregar horários disponíveis');
      //     setLoading(false);
      //   }
      // };
      // fetchAvailableTimes();
      
      // Simulação de horários disponíveis
      setTimeout(() => {
        const times = [];
        const workStart = 9; // 9:00
        const workEnd = 19; // 19:00
        const interval = 30; // 30 minutos por slot
        
        for (let hour = workStart; hour < workEnd; hour++) {
          for (let minute = 0; minute < 60; minute += interval) {
            // Simular alguns horários como indisponíveis aleatoriamente
            const isAvailable = Math.random() > 0.4;
            
            if (isAvailable) {
              const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              times.push(timeString);
            }
          }
        }
        
        setAvailableTimes(times);
        setLoading(false);
      }, 500);
    }
  }, [selectedBarber, selectedDate]);

  // Avançar para o próximo passo
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleBookingConfirmation();
    }
  };

  // Voltar para o passo anterior
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Selecionar serviço
  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  // Selecionar barbeiro
  const handleSelectBarber = (barber) => {
    setSelectedBarber(barber);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Selecionar data
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // Selecionar horário
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  // Confirmar agendamento
  const handleBookingConfirmation = () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      setError('Por favor, preencha todas as informações necessárias para o agendamento.');
      return;
    }

    // Em produção, enviar dados para a API
    // try {
    //   const bookingData = {
    //     serviceId: selectedService.id,
    //     barberId: selectedBarber.id,
    //     date: selectedDate.toISOString().split('T')[0],
    //     time: selectedTime
    //   };
      
    //   const response = await fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(bookingData)
    //   });
      
    //   if (!response.ok) {
    //     const data = await response.json();
    //     throw new Error(data.message || 'Erro ao confirmar agendamento');
    //   }
      
    //   const confirmationData = await response.json();
    //   navigate(`/booking-confirmation/${confirmationData.id}`);
    // } catch (err) {
    //   console.error('Erro:', err);
    //   setError(err.message || 'Ocorreu um erro ao confirmar o agendamento. Tente novamente.');
    // }

    // Simulação de agendamento bem-sucedido
    alert(`Agendamento realizado com sucesso!\n\nServiço: ${selectedService.name}\nBarbeiro: ${selectedBarber.name}\nData: ${selectedDate.toLocaleDateString('pt-BR')}\nHorário: ${selectedTime}`);
    navigate('/profile');
  };

  // Formatar data
  const formatDate = (date) => {
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return `${weekDays[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Renderizar estrelas para avaliação
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
      );
    }
    return <div className="barber-stars">{stars}</div>;
  };

  // Se estiver carregando
  if (loading && step === 1) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="loading">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p>Carregando opções de agendamento...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se ocorreu um erro
  if (error && step === 1) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="error-container">
            <h2>Ops! Ocorreu um erro</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Agendar Serviço</h1>
          <p>Escolha suas preferências e agende seu horário em poucos passos</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="booking-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-text">Serviço</div>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-text">Barbeiro</div>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-text">Data</div>
          </div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-text">Confirmação</div>
          </div>
        </div>

        <div className="booking-content">
          {/* Passo 1: Selecionar Serviço */}
          {step === 1 && (
            <div className="booking-step">
              <h2>Escolha um serviço</h2>
              
              <div className="services-grid">
                {services.map(service => (
                  <div 
                    key={service.id} 
                    className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                    onClick={() => handleSelectService(service)}
                  >
                    <div className="service-image">
                      <img src={service.image} alt={service.name} />
                    </div>
                    <div className="service-content">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <div className="service-details">
                        <span>
                          <FaClock /> {service.duration} min
                        </span>
                        <span>
                          <FaMoneyBillWave /> R$ {service.price.toFixed(2)}
                        </span>
                      </div>
                      
                      {selectedService?.id === service.id && (
                        <div className="service-selected">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 2: Selecionar Barbeiro */}
          {step === 2 && (
            <div className="booking-step">
              <h2>Escolha um barbeiro</h2>
              
              <div className="barbers-grid">
                {barbers.map(barber => (
                  <div 
                    key={barber.id} 
                    className={`barber-card ${selectedBarber?.id === barber.id ? 'selected' : ''}`}
                    onClick={() => handleSelectBarber(barber)}
                  >
                    <div className="barber-avatar">
                      <img src={barber.avatar} alt={barber.name} />
                    </div>
                    <div className="barber-content">
                      <h3>{barber.name}</h3>
                      <p>{barber.specialty}</p>
                      {renderStars(barber.rating)}
                      
                      {selectedBarber?.id === barber.id && (
                        <div className="barber-selected">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passo 3: Selecionar Data e Horário */}
          {step === 3 && (
            <div className="booking-step">
              <h2>Escolha a data e horário</h2>
              
              <div className="date-time-selector">
                <div className="date-selector">
                  <h3>Data</h3>
                  <div className="dates-grid">
                    {availableDates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`date-card ${selectedDate && date.getDate() === selectedDate.getDate() ? 'selected' : ''}`}
                        onClick={() => handleSelectDate(date)}
                      >
                        <div className="date-weekday">{date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}</div>
                        <div className="date-day">{date.getDate()}</div>
                        <div className="date-month">{date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="time-selector">
                  <h3>Horário</h3>
                  {selectedDate ? (
                    loading ? (
                      <div className="loading-times">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p>Carregando horários disponíveis...</p>
                      </div>
                    ) : availableTimes.length > 0 ? (
                      <div className="times-grid">
                        {availableTimes.map((time, index) => (
                          <div 
                            key={index} 
                            className={`time-card ${selectedTime === time ? 'selected' : ''}`}
                            onClick={() => handleSelectTime(time)}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-times">
                        <p>Não há horários disponíveis para esta data.</p>
                        <p>Por favor, selecione outra data.</p>
                      </div>
                    )
                  ) : (
                    <div className="select-date-first">
                      <p>Selecione uma data para ver os horários disponíveis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Passo 4: Confirmação */}
          {step === 4 && (
            <div className="booking-step">
              <h2>Confirme seu agendamento</h2>
              
              <div className="booking-summary">
                <div className="summary-card">
                  <div className="summary-header">
                    <h3>Resumo do Agendamento</h3>
                  </div>
                  
                  <div className="summary-content">
                    <div className="summary-item">
                      <div className="summary-icon">
                        <FaCut />
                      </div>
                      <div className="summary-text">
                        <h4>Serviço</h4>
                        <p>{selectedService.name}</p>
                        <div className="summary-details">
                          <span>{selectedService.duration} min</span>
                          <span>R$ {selectedService.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-icon">
                        <FaUser />
                      </div>
                      <div className="summary-text">
                        <h4>Barbeiro</h4>
                        <p>{selectedBarber.name}</p>
                        <div className="summary-details">
                          <span>{selectedBarber.specialty}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-icon">
                        <FaCalendarAlt />
                      </div>
                      <div className="summary-text">
                        <h4>Data e Horário</h4>
                        <p>{formatDate(selectedDate)}</p>
                        <div className="summary-details">
                          <span>{selectedTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item">
                      <div className="summary-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="summary-text">
                        <h4>Local</h4>
                        <p>BarberBook</p>
                        <div className="summary-details">
                          <span>Rua dos Barbeiros, 123 - Centro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="summary-footer">
                    <div className="total-price">
                      <span>Total:</span>
                      <span>R$ {selectedService.price.toFixed(2)}</span>
                    </div>
                    <p className="payment-info">Pagamento na loja</p>
                  </div>
                </div>
                
                <div className="terms-check">
                  <label className="terms-label">
                    <input type="checkbox" defaultChecked />
                    Ao confirmar, você concorda com os <Link to="/terms">termos de serviço</Link> e <Link to="/privacy">política de privacidade</Link>.
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="booking-actions">
            {step > 1 && (
              <button className="btn btn-outline" onClick={handlePreviousStep}>
                Voltar
              </button>
            )}
            
            <button 
              className="btn btn-primary"
              onClick={handleNextStep}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && !selectedBarber) ||
                (step === 3 && (!selectedDate || !selectedTime))
              }
            >
              {step < 4 ? 'Continuar' : 'Confirmar Agendamento'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 