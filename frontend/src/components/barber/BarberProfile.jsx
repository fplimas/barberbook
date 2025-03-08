import React, { useState, useEffect } from 'react';
import { FaUser, FaStar, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaCertificate, FaCheckCircle, FaEdit, FaUpload, FaCrown, FaGem } from 'react-icons/fa';
import './BarberProfile.css';

const BarberProfile = () => {
  const [loading, setLoading] = useState(true);
  const [barber, setBarber] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBarber, setEditedBarber] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: '' });
  const [activeTab, setActiveTab] = useState('info');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Simular tempo de carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados fictícios para demonstração
      const demoBarber = {
        id: 1,
        name: 'Carlos Oliveira',
        avatar: null, // URL da imagem, null para demonstração
        profession: 'Barbeiro Master',
        bio: 'Especialista em cortes modernos e barbas. Com mais de 10 anos de experiência no mercado, atendendo clientes que buscam estilo e qualidade. Formado pela Escola de Barbearia Moderna e com diversos cursos de especialização.',
        rating: 4.8,
        reviewCount: 124,
        location: {
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipcode: '01234-567'
        },
        contact: {
          phone: '(11) 99999-8888',
          email: 'carlos.oliveira@barbearia.com',
          instagram: '@carlosbarbeiro',
          facebook: 'carlosbarbeiro',
          twitter: null,
          youtube: null
        },
        workHours: [
          { day: 'Segunda', start: '09:00', end: '18:00', closed: false },
          { day: 'Terça', start: '09:00', end: '18:00', closed: false },
          { day: 'Quarta', start: '09:00', end: '18:00', closed: false },
          { day: 'Quinta', start: '09:00', end: '18:00', closed: false },
          { day: 'Sexta', start: '09:00', end: '20:00', closed: false },
          { day: 'Sábado', start: '09:00', end: '16:00', closed: false },
          { day: 'Domingo', start: null, end: null, closed: true }
        ],
        services: [
          { id: 1, name: 'Corte Degradê', duration: 30, price: 70.00 },
          { id: 2, name: 'Barba Completa', duration: 20, price: 50.00 },
          { id: 3, name: 'Corte + Barba', duration: 45, price: 100.00 },
          { id: 4, name: 'Sobrancelha', duration: 10, price: 30.00 },
          { id: 5, name: 'Corte Premium', duration: 45, price: 90.00 },
          { id: 6, name: 'Relaxamento', duration: 60, price: 120.00 }
        ],
        certifications: [
          { name: 'Certificado Barba e Cabelo - Barbearia Moderna', year: 2015 },
          { name: 'Especialização em Barbas - Instituto de Estética', year: 2018 },
          { name: 'Técnicas de Degradê - Workshop Internacional', year: 2020 }
        ],
        portfolio: [
          { id: 1, imageUrl: null, description: 'Corte Degradê com barba delineada' },
          { id: 2, imageUrl: null, description: 'Barba modelada estilo lenhador' },
          { id: 3, imageUrl: null, description: 'Corte social moderno' }
        ],
        subscription: {
          plan: 'premium',
          validUntil: '2024-12-31',
          features: [
            'Agendamento ilimitado',
            'Gestão completa de clientes',
            'Relatórios financeiros detalhados',
            'Marketing integrado',
            'Suporte prioritário'
          ]
        }
      };
      
      setBarber(demoBarber);
      setEditedBarber({...demoBarber});
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleChange = (field, value) => {
    setEditedBarber(prev => {
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

  const handleWorkHoursChange = (index, field, value) => {
    const updatedWorkHours = [...editedBarber.workHours];
    updatedWorkHours[index] = {
      ...updatedWorkHours[index],
      [field]: value
    };
    
    if (field === 'closed' && value === true) {
      updatedWorkHours[index].start = null;
      updatedWorkHours[index].end = null;
    }
    
    setEditedBarber(prev => ({
      ...prev,
      workHours: updatedWorkHours
    }));
  };

  const handleSaveProfile = () => {
    // Simulação de salvamento
    setBarber({...editedBarber});
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
    setEditedBarber({...barber});
    setEditMode(false);
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const getSubscriptionPlanColor = (plan) => {
    const colors = {
      basic: '#64b5f6',
      premium: '#ffd700',
      professional: '#e5e4e2'
    };
    return colors[plan] || '#64b5f6';
  };

  const getSubscriptionPlanName = (plan) => {
    const names = {
      basic: 'Básico',
      premium: 'Premium',
      professional: 'Profissional'
    };
    return names[plan] || 'Básico';
  };

  const getPlanIcon = (plan) => {
    switch (plan) {
      case 'premium':
        return <FaCrown />;
      case 'professional':
        return <FaGem />;
      default:
        return <FaCheckCircle />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleUpgradeClick = () => {
    setShowSubscriptionModal(true);
  };

  const handleCloseModal = () => {
    setShowSubscriptionModal(false);
  };

  if (loading) {
    return (
      <div className="barber-profile loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="barber-profile">
      <div className="profile-header">
        <div className="profile-background">
          <button className="btn-change-cover">
            <FaCamera /> Alterar Capa
          </button>
        </div>
        
        <div className="profile-info-bar">
          <div className="avatar-container">
            <div className="avatar">
              {barber.avatar ? (
                <img src={barber.avatar} alt={barber.name} />
              ) : (
                <FaUser />
              )}
              <button className="btn-change-avatar">
                <FaCamera />
              </button>
            </div>
          </div>
          
          <div className="barber-info">
            <h1>{barber.name}</h1>
            <p className="profession">{barber.profession}</p>
            <div className="rating">
              <FaStar />
              <span>{barber.rating}</span>
              <span className="review-count">({barber.reviewCount} avaliações)</span>
            </div>
          </div>
          
          <div className="subscription-info">
            <div 
              className="subscription-badge"
              style={{ backgroundColor: getSubscriptionPlanColor(barber.subscription.plan) }}
            >
              {getPlanIcon(barber.subscription.plan)}
              <span>{getSubscriptionPlanName(barber.subscription.plan)}</span>
            </div>
            <p className="subscription-valid">
              Válido até: {formatDate(barber.subscription.validUntil)}
            </p>
            <button className="btn-upgrade" onClick={handleUpgradeClick}>
              Gerenciar Assinatura
            </button>
          </div>
          
          {!editMode ? (
            <button className="btn-edit-profile" onClick={() => setEditMode(true)}>
              <FaEdit /> Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveProfile}>
                Salvar
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
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Informações
        </button>
        <button 
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Serviços
        </button>
        <button 
          className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfólio
        </button>
        <button 
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Horários
        </button>
        <button 
          className={`tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          Assinatura
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'info' && (
          <div className="info-tab">
            <div className="bio-section">
              <h3>Sobre</h3>
              {!editMode ? (
                <p>{barber.bio}</p>
              ) : (
                <textarea
                  value={editedBarber.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={5}
                  placeholder="Fale um pouco sobre você, sua experiência e especialidades..."
                />
              )}
            </div>
            
            <div className="contact-section">
              <h3>Informações de Contato</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  {!editMode ? (
                    <span>
                      {barber.location.address}, {barber.location.city}/{barber.location.state}
                    </span>
                  ) : (
                    <div className="edit-address">
                      <input 
                        type="text" 
                        value={editedBarber.location.address}
                        onChange={(e) => handleChange('location.address', e.target.value)}
                        placeholder="Endereço"
                      />
                      <div className="city-state">
                        <input 
                          type="text" 
                          value={editedBarber.location.city}
                          onChange={(e) => handleChange('location.city', e.target.value)}
                          placeholder="Cidade"
                        />
                        <input 
                          type="text" 
                          value={editedBarber.location.state}
                          onChange={(e) => handleChange('location.state', e.target.value)}
                          placeholder="Estado"
                          maxLength="2"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={editedBarber.location.zipcode}
                        onChange={(e) => handleChange('location.zipcode', e.target.value)}
                        placeholder="CEP"
                      />
                    </div>
                  )}
                </div>
                
                <div className="contact-item">
                  <FaPhone />
                  {!editMode ? (
                    <span>{barber.contact.phone}</span>
                  ) : (
                    <input 
                      type="text" 
                      value={editedBarber.contact.phone}
                      onChange={(e) => handleChange('contact.phone', e.target.value)}
                      placeholder="Telefone"
                    />
                  )}
                </div>
                
                <div className="contact-item">
                  <FaEnvelope />
                  {!editMode ? (
                    <span>{barber.contact.email}</span>
                  ) : (
                    <input 
                      type="email" 
                      value={editedBarber.contact.email}
                      onChange={(e) => handleChange('contact.email', e.target.value)}
                      placeholder="Email"
                    />
                  )}
                </div>
                
                <div className="contact-item">
                  <FaInstagram />
                  {!editMode ? (
                    <span>{barber.contact.instagram || 'Não informado'}</span>
                  ) : (
                    <input 
                      type="text" 
                      value={editedBarber.contact.instagram || ''}
                      onChange={(e) => handleChange('contact.instagram', e.target.value)}
                      placeholder="Perfil do Instagram"
                    />
                  )}
                </div>
                
                <div className="contact-item">
                  <FaFacebook />
                  {!editMode ? (
                    <span>{barber.contact.facebook || 'Não informado'}</span>
                  ) : (
                    <input 
                      type="text" 
                      value={editedBarber.contact.facebook || ''}
                      onChange={(e) => handleChange('contact.facebook', e.target.value)}
                      placeholder="Perfil do Facebook"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="certifications-section">
              <h3>Certificações e Formação</h3>
              {barber.certifications.length > 0 ? (
                <ul className="certifications-list">
                  {barber.certifications.map((cert, index) => (
                    <li key={index} className="certification-item">
                      <FaCertificate />
                      <div className="certification-info">
                        <span className="certification-name">{cert.name}</span>
                        <span className="certification-year">{cert.year}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-certifications">Nenhuma certificação adicionada</p>
              )}
              
              {editMode && (
                <button className="btn-add-certification">
                  <FaCertificate /> Adicionar Certificação
                </button>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="services-tab">
            <div className="services-header">
              <h3>Serviços Oferecidos</h3>
              {editMode && (
                <button className="btn-add-service">
                  + Adicionar Serviço
                </button>
              )}
            </div>
            
            <div className="services-list">
              {barber.services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-details">
                    <h4>{service.name}</h4>
                    <div className="service-meta">
                      <span className="service-duration">
                        <FaClock /> {service.duration} min
                      </span>
                    </div>
                  </div>
                  <div className="service-price">
                    {formatCurrency(service.price)}
                  </div>
                  {editMode && (
                    <div className="service-actions">
                      <button className="btn-edit-service">
                        <FaEdit />
                      </button>
                      <button className="btn-delete-service">
                        ×
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'portfolio' && (
          <div className="portfolio-tab">
            <div className="portfolio-header">
              <h3>Portfólio de Trabalhos</h3>
              {editMode && (
                <button className="btn-add-portfolio">
                  <FaUpload /> Adicionar Foto
                </button>
              )}
            </div>
            
            <div className="portfolio-grid">
              {barber.portfolio.length > 0 ? (
                barber.portfolio.map((item) => (
                  <div key={item.id} className="portfolio-item">
                    <div className="portfolio-image">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.description} />
                      ) : (
                        <div className="image-placeholder">
                          <FaCamera />
                        </div>
                      )}
                    </div>
                    <p className="portfolio-description">{item.description}</p>
                    {editMode && (
                      <div className="portfolio-actions">
                        <button className="btn-edit-portfolio">
                          <FaEdit />
                        </button>
                        <button className="btn-delete-portfolio">
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-portfolio">
                  <FaCamera />
                  <p>Nenhuma foto no portfólio</p>
                  {editMode && (
                    <button className="btn-add-first-portfolio">
                      <FaUpload /> Adicionar primeira foto
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="schedule-tab">
            <h3>Horário de Funcionamento</h3>
            <div className="work-hours">
              {(editMode ? editedBarber.workHours : barber.workHours).map((schedule, index) => (
                <div key={index} className={`work-day ${schedule.closed ? 'closed' : ''}`}>
                  <div className="day-name">{schedule.day}</div>
                  
                  {!editMode ? (
                    <div className="day-hours">
                      {schedule.closed ? (
                        <span className="closed-text">Fechado</span>
                      ) : (
                        <span>{schedule.start} - {schedule.end}</span>
                      )}
                    </div>
                  ) : (
                    <div className="edit-hours">
                      <label className="closed-toggle">
                        <input 
                          type="checkbox" 
                          checked={schedule.closed}
                          onChange={(e) => handleWorkHoursChange(index, 'closed', e.target.checked)}
                        />
                        <span className="slider"></span>
                        <span className="toggle-label">Fechado</span>
                      </label>
                      
                      {!schedule.closed && (
                        <div className="hours-inputs">
                          <input 
                            type="time" 
                            value={schedule.start || ''}
                            onChange={(e) => handleWorkHoursChange(index, 'start', e.target.value)}
                          />
                          <span>até</span>
                          <input 
                            type="time" 
                            value={schedule.end || ''}
                            onChange={(e) => handleWorkHoursChange(index, 'end', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'subscription' && (
          <div className="subscription-tab">
            <div className="current-plan">
              <h3>Seu Plano Atual</h3>
              <div 
                className={`plan-card ${barber.subscription.plan}`}
                style={{ borderColor: getSubscriptionPlanColor(barber.subscription.plan) }}
              >
                <div 
                  className="plan-header"
                  style={{ backgroundColor: getSubscriptionPlanColor(barber.subscription.plan) }}
                >
                  {getPlanIcon(barber.subscription.plan)}
                  <h4>{getSubscriptionPlanName(barber.subscription.plan)}</h4>
                </div>
                <div className="plan-features">
                  <p className="validity">
                    <FaCalendarAlt />
                    Válido até: {formatDate(barber.subscription.validUntil)}
                  </p>
                  <ul>
                    {barber.subscription.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheckCircle /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-change-plan" onClick={handleUpgradeClick}>
                  Mudar de Plano
                </button>
              </div>
            </div>
            
            <div className="available-plans">
              <h3>Planos Disponíveis</h3>
              <div className="plans-grid">
                <div className="plan-card basic">
                  <div className="plan-header">
                    <FaCheckCircle />
                    <h4>Básico</h4>
                  </div>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">59</span>
                    <span className="period">/mês</span>
                  </div>
                  <div className="plan-features">
                    <ul>
                      <li><FaCheckCircle /> Agendamento básico</li>
                      <li><FaCheckCircle /> Até 50 clientes</li>
                      <li><FaCheckCircle /> Relatórios simples</li>
                      <li><FaCheckCircle /> Suporte por email</li>
                    </ul>
                  </div>
                  <button 
                    className="btn-select-plan"
                    disabled={barber.subscription.plan === 'basic'}
                  >
                    {barber.subscription.plan === 'basic' ? 'Plano Atual' : 'Selecionar Plano'}
                  </button>
                </div>
                
                <div className="plan-card premium featured">
                  <div className="plan-tag">POPULAR</div>
                  <div className="plan-header">
                    <FaCrown />
                    <h4>Premium</h4>
                  </div>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">99</span>
                    <span className="period">/mês</span>
                  </div>
                  <div className="plan-features">
                    <ul>
                      <li><FaCheckCircle /> Agendamento ilimitado</li>
                      <li><FaCheckCircle /> Clientes ilimitados</li>
                      <li><FaCheckCircle /> Relatórios detalhados</li>
                      <li><FaCheckCircle /> Marketing integrado</li>
                      <li><FaCheckCircle /> Suporte prioritário</li>
                    </ul>
                  </div>
                  <button 
                    className="btn-select-plan"
                    disabled={barber.subscription.plan === 'premium'}
                  >
                    {barber.subscription.plan === 'premium' ? 'Plano Atual' : 'Selecionar Plano'}
                  </button>
                </div>
                
                <div className="plan-card professional">
                  <div className="plan-header">
                    <FaGem />
                    <h4>Profissional</h4>
                  </div>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">149</span>
                    <span className="period">/mês</span>
                  </div>
                  <div className="plan-features">
                    <ul>
                      <li><FaCheckCircle /> Tudo do plano Premium</li>
                      <li><FaCheckCircle /> Múltiplos barbeiros</li>
                      <li><FaCheckCircle /> Website personalizado</li>
                      <li><FaCheckCircle /> Integrações avançadas</li>
                      <li><FaCheckCircle /> Suporte 24/7</li>
                    </ul>
                  </div>
                  <button 
                    className="btn-select-plan"
                    disabled={barber.subscription.plan === 'professional'}
                  >
                    {barber.subscription.plan === 'professional' ? 'Plano Atual' : 'Selecionar Plano'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showSubscriptionModal && (
        <div className="subscription-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <h2>Alterar Plano de Assinatura</h2>
            <div className="plans-grid modal-plans">
              <div className="plan-card basic">
                <div className="plan-header">
                  <FaCheckCircle />
                  <h4>Básico</h4>
                </div>
                <div className="plan-price">
                  <span className="currency">R$</span>
                  <span className="amount">59</span>
                  <span className="period">/mês</span>
                </div>
                <div className="plan-features">
                  <ul>
                    <li><FaCheckCircle /> Agendamento básico</li>
                    <li><FaCheckCircle /> Até 50 clientes</li>
                    <li><FaCheckCircle /> Relatórios simples</li>
                    <li><FaCheckCircle /> Suporte por email</li>
                  </ul>
                </div>
                <button 
                  className="btn-select-plan"
                  disabled={barber.subscription.plan === 'basic'}
                  onClick={handleCloseModal}
                >
                  {barber.subscription.plan === 'basic' ? 'Plano Atual' : 'Selecionar'}
                </button>
              </div>
              
              <div className="plan-card premium featured">
                <div className="plan-tag">POPULAR</div>
                <div className="plan-header">
                  <FaCrown />
                  <h4>Premium</h4>
                </div>
                <div className="plan-price">
                  <span className="currency">R$</span>
                  <span className="amount">99</span>
                  <span className="period">/mês</span>
                </div>
                <div className="plan-features">
                  <ul>
                    <li><FaCheckCircle /> Agendamento ilimitado</li>
                    <li><FaCheckCircle /> Clientes ilimitados</li>
                    <li><FaCheckCircle /> Relatórios detalhados</li>
                    <li><FaCheckCircle /> Marketing integrado</li>
                    <li><FaCheckCircle /> Suporte prioritário</li>
                  </ul>
                </div>
                <button 
                  className="btn-select-plan"
                  disabled={barber.subscription.plan === 'premium'}
                  onClick={handleCloseModal}
                >
                  {barber.subscription.plan === 'premium' ? 'Plano Atual' : 'Selecionar'}
                </button>
              </div>
              
              <div className="plan-card professional">
                <div className="plan-header">
                  <FaGem />
                  <h4>Profissional</h4>
                </div>
                <div className="plan-price">
                  <span className="currency">R$</span>
                  <span className="amount">149</span>
                  <span className="period">/mês</span>
                </div>
                <div className="plan-features">
                  <ul>
                    <li><FaCheckCircle /> Tudo do plano Premium</li>
                    <li><FaCheckCircle /> Múltiplos barbeiros</li>
                    <li><FaCheckCircle /> Website personalizado</li>
                    <li><FaCheckCircle /> Integrações avançadas</li>
                    <li><FaCheckCircle /> Suporte 24/7</li>
                  </ul>
                </div>
                <button 
                  className="btn-select-plan"
                  disabled={barber.subscription.plan === 'professional'}
                  onClick={handleCloseModal}
                >
                  {barber.subscription.plan === 'professional' ? 'Plano Atual' : 'Selecionar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarberProfile; 