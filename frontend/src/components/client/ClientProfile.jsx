import React, { useState, useEffect } from 'react';
import { FaUser, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaHeart, FaBirthdayCake, FaHistory, FaEdit, FaSave, FaTimes, FaCheckCircle, FaStar, FaStarHalfAlt, FaRegStar, FaCreditCard, FaMoneyBillWave, FaRegBell } from 'react-icons/fa';
import './ClientProfile.css';

const ClientProfile = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: '' });
  const [openUpcomingAppointments, setOpenUpcomingAppointments] = useState(true);
  const [openPastAppointments, setOpenPastAppointments] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simular tempo de carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados fictícios para demonstração
      const demoClient = {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-1111',
        birthdate: '1985-04-12',
        avatar: null, // URL da imagem, null para demonstração
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipcode: '01234-567'
        },
        loyaltyPoints: 320,
        totalVisits: 24,
        favoriteBarbers: [
          { id: 1, name: 'Carlos Oliveira', rating: 4.8 },
          { id: 2, name: 'André Martins', rating: 4.6 }
        ],
        favoriteServices: [
          'Corte Degradê',
          'Barba Completa'
        ],
        paymentMethods: [
          { id: 1, type: 'credit_card', last4: '1234', brand: 'Visa', isDefault: true },
          { id: 2, type: 'money', isDefault: false }
        ],
        upcomingAppointments: [
          { 
            id: 14, 
            date: '2023-12-15', 
            time: '14:30', 
            service: 'Corte Degradê', 
            price: 70.00, 
            barber: 'Carlos Oliveira',
            status: 'confirmed',
            barbershop: 'Barbearia Estilo'
          }
        ],
        appointmentHistory: [
          { 
            id: 12, 
            date: '2023-11-15', 
            time: '15:00',
            service: 'Corte Degradê', 
            price: 70.00, 
            barber: 'Carlos Oliveira',
            status: 'completed',
            barbershop: 'Barbearia Estilo',
            rating: 5
          },
          { 
            id: 10, 
            date: '2023-10-20', 
            time: '10:30',
            service: 'Corte + Barba', 
            price: 100.00, 
            barber: 'André Martins',
            status: 'completed',
            barbershop: 'Barbearia Estilo',
            rating: 4
          },
          { 
            id: 8, 
            date: '2023-09-18', 
            time: '16:45',
            service: 'Corte Degradê', 
            price: 70.00, 
            barber: 'Carlos Oliveira',
            status: 'completed',
            barbershop: 'Barbearia Estilo',
            rating: 5
          },
        ],
        notifications: {
          appointmentReminder: true,
          promotions: true,
          news: false
        },
        notes: 'Prefere atendimento no fim do dia. Alérgico a produto X.'
      };
      
      setClient(demoClient);
      setEditedClient({...demoClient});
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleChange = (field, value) => {
    setEditedClient(prev => {
      if (field.includes('.')) {
        const [mainField, subField] = field.split('.');
        return {
          ...prev,
          [mainField]: {
            ...prev[mainField],
            [subField]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  const handleNotificationChange = (type) => {
    setEditedClient(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSaveProfile = () => {
    // Simulação de salvamento
    setClient({...editedClient});
    setSaveStatus({
      show: true,
      success: true,
      message: 'Perfil atualizado com sucesso!'
    });
    
    setTimeout(() => {
      setSaveStatus({ show: false, success: false, message: '' });
      setEditMode(false);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setEditedClient({...client});
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  const calculateAge = (birthdate) => {
    if (!birthdate) return '';
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    
    return <div className="rating-stars">{stars}</div>;
  };
  
  const getPaymentIcon = (type) => {
    switch (type) {
      case 'credit_card':
        return <FaCreditCard />;
      case 'money':
        return <FaMoneyBillWave />;
      default:
        return <FaCreditCard />;
    }
  };
  
  const getPaymentMethodName = (method) => {
    if (method.type === 'credit_card') {
      return `${method.brand} **** ${method.last4}${method.isDefault ? ' (Padrão)' : ''}`;
    } else if (method.type === 'money') {
      return `Dinheiro${method.isDefault ? ' (Padrão)' : ''}`;
    }
    return 'Desconhecido';
  };
  
  const getAppointmentStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="client-profile loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="client-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {client.avatar ? (
            <img src={client.avatar} alt={client.name} />
          ) : (
            <FaUser />
          )}
          <button className="btn-change-avatar">
            <FaCamera />
          </button>
        </div>
        
        <div className="profile-summary">
          <h1>{client.name}</h1>
          <div className="client-details">
            <span className="client-detail">
              <FaCalendarAlt />
              {client.totalVisits} visitas
            </span>
            <span className="client-detail">
              <FaHeart />
              {client.loyaltyPoints} pontos de fidelidade
            </span>
            {client.birthdate && (
              <span className="client-detail">
                <FaBirthdayCake />
                {calculateAge(client.birthdate)} anos
              </span>
            )}
          </div>
        </div>
        
        <div className="profile-actions">
          {!editMode ? (
            <button className="btn-edit-profile" onClick={() => setEditMode(true)}>
              <FaEdit /> Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                <FaTimes /> Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveProfile}>
                <FaSave /> Salvar
              </button>
            </div>
          )}
        </div>
      </div>
      
      {saveStatus.show && (
        <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
          {saveStatus.message}
        </div>
      )}
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Perfil
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Agendamentos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferências
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="personal-info">
              <h3>Informações Pessoais</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome Completo</label>
                  {!editMode ? (
                    <p>{client.name}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>Email</label>
                  {!editMode ? (
                    <p>{client.email}</p>
                  ) : (
                    <input 
                      type="email" 
                      value={editedClient.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>Telefone</label>
                  {!editMode ? (
                    <p>{client.phone}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>Data de Nascimento</label>
                  {!editMode ? (
                    <p>{formatDate(client.birthdate)}</p>
                  ) : (
                    <input 
                      type="date" 
                      value={editedClient.birthdate}
                      onChange={(e) => handleChange('birthdate', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="address-info">
              <h3>Endereço</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Rua</label>
                  {!editMode ? (
                    <p>{client.address.street}, {client.address.number}</p>
                  ) : (
                    <div className="address-row">
                      <input 
                        type="text" 
                        value={editedClient.address.street}
                        onChange={(e) => handleChange('address.street', e.target.value)}
                        placeholder="Rua"
                        className="street-input"
                      />
                      <input 
                        type="text" 
                        value={editedClient.address.number}
                        onChange={(e) => handleChange('address.number', e.target.value)}
                        placeholder="Número"
                        className="number-input"
                      />
                    </div>
                  )}
                </div>
                
                <div className="info-item">
                  <label>Bairro</label>
                  {!editMode ? (
                    <p>{client.address.neighborhood}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.address.neighborhood}
                      onChange={(e) => handleChange('address.neighborhood', e.target.value)}
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>Cidade</label>
                  {!editMode ? (
                    <p>{client.address.city}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.address.city}
                      onChange={(e) => handleChange('address.city', e.target.value)}
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>Estado</label>
                  {!editMode ? (
                    <p>{client.address.state}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.address.state}
                      onChange={(e) => handleChange('address.state', e.target.value)}
                      maxLength="2"
                    />
                  )}
                </div>
                
                <div className="info-item">
                  <label>CEP</label>
                  {!editMode ? (
                    <p>{client.address.zipcode}</p>
                  ) : (
                    <input 
                      type="text" 
                      value={editedClient.address.zipcode}
                      onChange={(e) => handleChange('address.zipcode', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="payment-methods">
              <h3>Métodos de Pagamento</h3>
              <div className="payment-list">
                {client.paymentMethods.map(method => (
                  <div key={method.id} className={`payment-item ${method.isDefault ? 'default' : ''}`}>
                    <div className="payment-icon">
                      {getPaymentIcon(method.type)}
                    </div>
                    <div className="payment-details">
                      <p className="payment-name">{getPaymentMethodName(method)}</p>
                    </div>
                    {editMode && (
                      <button className="btn-remove-payment">
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                
                {editMode && (
                  <button className="btn-add-payment">
                    + Adicionar Método de Pagamento
                  </button>
                )}
              </div>
            </div>
            
            <div className="notes-section">
              <h3>Observações</h3>
              {!editMode ? (
                <p className="notes-content">{client.notes || 'Nenhuma observação.'}</p>
              ) : (
                <textarea 
                  value={editedClient.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Adicione observações, como preferências ou restrições..."
                  rows={4}
                ></textarea>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="appointments-tab">
            <div className="appointment-section">
              <div 
                className="section-header collapsible"
                onClick={() => setOpenUpcomingAppointments(!openUpcomingAppointments)}
              >
                <h3>Agendamentos Futuros</h3>
                <span className={`arrow ${openUpcomingAppointments ? 'up' : 'down'}`}></span>
              </div>
              
              {openUpcomingAppointments && (
                <div className="appointment-list">
                  {client.upcomingAppointments.length > 0 ? (
                    client.upcomingAppointments.map(appointment => (
                      <div key={appointment.id} className="appointment-card future">
                        <div className="appointment-date">
                          <div className="date-day">{new Date(appointment.date).getDate()}</div>
                          <div className="date-month">{new Date(appointment.date).toLocaleDateString('pt-BR', { month: 'short' })}</div>
                        </div>
                        <div className="appointment-info">
                          <h4>{appointment.service}</h4>
                          <p className="appointment-barber">
                            <FaUser /> {appointment.barber}
                          </p>
                          <p className="appointment-time">
                            <FaCalendarAlt /> {formatDate(appointment.date)} às {appointment.time}
                          </p>
                          <p className="appointment-location">
                            <FaMapMarkerAlt /> {appointment.barbershop}
                          </p>
                          <div className="appointment-status">
                            {getAppointmentStatusLabel(appointment.status)}
                          </div>
                        </div>
                        <div className="appointment-price">
                          {formatCurrency(appointment.price)}
                        </div>
                        <div className="appointment-actions">
                          <button className="btn-reschedule">Reagendar</button>
                          <button className="btn-cancel-appointment">Cancelar</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-appointments">
                      <p>Você não possui agendamentos futuros.</p>
                      <button className="btn-new-appointment">Agendar Agora</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="appointment-section">
              <div 
                className="section-header collapsible"
                onClick={() => setOpenPastAppointments(!openPastAppointments)}
              >
                <h3>Histórico de Agendamentos</h3>
                <span className={`arrow ${openPastAppointments ? 'up' : 'down'}`}></span>
              </div>
              
              {openPastAppointments && (
                <div className="appointment-list">
                  {client.appointmentHistory.length > 0 ? (
                    client.appointmentHistory.map(appointment => (
                      <div key={appointment.id} className="appointment-card past">
                        <div className="appointment-date">
                          <div className="date-day">{new Date(appointment.date).getDate()}</div>
                          <div className="date-month">{new Date(appointment.date).toLocaleDateString('pt-BR', { month: 'short' })}</div>
                        </div>
                        <div className="appointment-info">
                          <h4>{appointment.service}</h4>
                          <p className="appointment-barber">
                            <FaUser /> {appointment.barber}
                          </p>
                          <p className="appointment-time">
                            <FaCalendarAlt /> {formatDate(appointment.date)} às {appointment.time}
                          </p>
                          <p className="appointment-location">
                            <FaMapMarkerAlt /> {appointment.barbershop}
                          </p>
                          <div className="appointment-status">
                            {getAppointmentStatusLabel(appointment.status)}
                          </div>
                        </div>
                        <div className="appointment-price">
                          {formatCurrency(appointment.price)}
                        </div>
                        <div className="appointment-rating">
                          {appointment.rating ? (
                            <>
                              <p>Sua avaliação:</p>
                              {renderRatingStars(appointment.rating)}
                            </>
                          ) : (
                            <button className="btn-rate">Avaliar</button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-appointments">
                      <p>Você ainda não possui histórico de agendamentos.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div className="preferences-tab">
            <div className="favorite-barbers">
              <h3>Barbeiros Favoritos</h3>
              <div className="favorites-list">
                {client.favoriteBarbers.length > 0 ? (
                  client.favoriteBarbers.map(barber => (
                    <div key={barber.id} className="favorite-item">
                      <div className="favorite-avatar">
                        <FaUser />
                      </div>
                      <div className="favorite-info">
                        <h4>{barber.name}</h4>
                        {renderRatingStars(barber.rating)}
                      </div>
                      <div className="favorite-actions">
                        <button className="btn-schedule">Agendar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-favorites">Você ainda não possui barbeiros favoritos.</p>
                )}
              </div>
            </div>
            
            <div className="favorite-services">
              <h3>Serviços Preferidos</h3>
              <div className="service-tags">
                {client.favoriteServices.length > 0 ? (
                  client.favoriteServices.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))
                ) : (
                  <p className="no-favorites">Você ainda não possui serviços preferidos.</p>
                )}
              </div>
            </div>
            
            <div className="notification-preferences">
              <h3>Preferências de Notificação</h3>
              <div className="notification-options">
                <div className="notification-option">
                  <div className="notification-info">
                    <FaRegBell />
                    <span>Lembretes de agendamento</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={editMode ? editedClient.notifications.appointmentReminder : client.notifications.appointmentReminder}
                      onChange={() => editMode && handleNotificationChange('appointmentReminder')}
                      disabled={!editMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="notification-option">
                  <div className="notification-info">
                    <FaRegBell />
                    <span>Promoções e descontos</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={editMode ? editedClient.notifications.promotions : client.notifications.promotions}
                      onChange={() => editMode && handleNotificationChange('promotions')}
                      disabled={!editMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="notification-option">
                  <div className="notification-info">
                    <FaRegBell />
                    <span>Novidades e atualizações</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={editMode ? editedClient.notifications.news : client.notifications.news}
                      onChange={() => editMode && handleNotificationChange('news')}
                      disabled={!editMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile; 