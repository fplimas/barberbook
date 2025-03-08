import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCut, FaCalendarAlt, FaClock, FaStar, FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';
import api from '../services/api';
import './HomePage.css';

// Componente para as frases animadas
const AnimatedPhrase = () => {
  const phrases = [
    "Seu estilo, nossa especialidade",
    "Transforme seu visual com os melhores barbeiros",
    "Precisão em cada corte, perfeição em cada detalhe",
    "Agende sem sair de casa, seja atendido sem espera"
  ];
  
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setFadeIn(true);
      }, 1000); // Tempo para o fade out
      
    }, 5000); // Tempo entre trocas de frases
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <p className={`hero-animated-phrase ${fadeIn ? 'fade-in' : 'fade-out'}`}>
      {phrases[currentPhrase]}
    </p>
  );
};

const HomePage = () => {
  const [nearbyBarbers, setNearbyBarbers] = useState([]);
  const [featuredBarbers, setFeaturedBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulação de barbearias próximas (em produção usaria geolocalização)
        setNearbyBarbers([
          { 
            id: 1, 
            name: 'Barbearia Central', 
            distance: '1.2km', 
            rating: 4.8, 
            address: 'Rua das Flores, 123',
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3',
            specialty: 'Especialista em cortes clássicos'
          },
          { 
            id: 2, 
            name: 'Corte & Cia', 
            distance: '2.5km', 
            rating: 4.5, 
            address: 'Av. Principal, 456',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3',
            specialty: 'Tratamentos para barba'
          },
          { 
            id: 3, 
            name: 'Barba Negra', 
            distance: '3.1km', 
            rating: 4.7, 
            address: 'Praça Central, 78',
            image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3',
            specialty: 'Cortes modernos e design'
          }
        ]);
        
        // Barbearias em destaque
        setFeaturedBarbers([
          { 
            id: 4, 
            name: 'Barbearia Vintage', 
            distance: '4.3km', 
            rating: 4.9, 
            image: 'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?ixlib=rb-4.0.3',
            specialty: 'Ambiente vintage e produtos premium'
          },
          { 
            id: 5, 
            name: 'Cabelo & Arte', 
            distance: '3.8km', 
            rating: 4.6, 
            image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3',
            specialty: 'Cortes artísticos e personalizados'
          },
          { 
            id: 6, 
            name: 'BarberShop Premium', 
            distance: '5.2km', 
            rating: 4.7, 
            image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3',
            specialty: 'Experiência completa de barbearia'
          },
          { 
            id: 7, 
            name: 'Espaço da Barba', 
            distance: '2.9km', 
            rating: 4.5, 
            image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3',
            specialty: 'Tratamentos especiais para barba'
          }
        ]);

        // Simulando obtenção da localização do usuário
        setUserLocation('São Paulo, SP');
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Simulando obtenção de geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Em produção, aqui você converteria as coordenadas em endereço usando uma API como Google Geocoding
          console.log("Localização obtida:", position.coords);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>BarberBook</h1>
          <p className="hero-subtitle">A melhor experiência em barbearia</p>
          <AnimatedPhrase />
          <div className="hero-buttons">
            <Link to="/barbers" className="btn btn-primary">
              Encontrar Barbeiro
            </Link>
          </div>
        </div>
      </section>

      {/* Location Bar */}
      <section className="location-bar">
        <div className="location-container">
          <div className="current-location">
            <FaMapMarkerAlt />
            <span>{userLocation || 'Definir localização'}</span>
          </div>
          <div className="location-search">
            <input 
              type="text" 
              placeholder="Buscar barbearias próximas..." 
              className="location-input" 
            />
            <button className="location-btn">
              <FaSearchLocation />
            </button>
          </div>
        </div>
      </section>

      {/* Nearby Barbers Section */}
      <section className="nearby-barbers-section">
        <h2 className="section-title">Barbearias Próximas</h2>
        <div className="nearby-barbers-grid">
          {nearbyBarbers.map((barber) => (
            <div key={barber.id} className="nearby-barber-card">
              <div className="barber-card-image">
                <img src={barber.image} alt={barber.name} />
                <div className="barber-distance-badge">{barber.distance}</div>
              </div>
              <div className="barber-card-content">
                <h3>{barber.name}</h3>
                <div className="barber-info">
                  <p className="barber-rating"><FaStar /> {barber.rating}</p>
                  <p className="barber-specialty">{barber.specialty}</p>
                  <p className="barber-address">{barber.address}</p>
                </div>
                <Link to={`/barber/${barber.id}`} className="btn btn-primary btn-sm">
                  Ver Barbearia
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Barbers Section */}
      <section className="featured-barbers-section">
        <h2 className="section-title">Barbearias em Destaque</h2>
        <div className="featured-barbers-grid">
          {featuredBarbers.map((barber) => (
            <div key={barber.id} className="featured-barber-card">
              <div className="featured-barber-image">
                <img src={barber.image} alt={barber.name} />
              </div>
              <div className="featured-barber-content">
                <h3>{barber.name}</h3>
                <div className="featured-barber-rating">
                  <FaStar /> {barber.rating}
                </div>
                <p className="featured-barber-specialty">{barber.specialty}</p>
                <Link to={`/barber/${barber.id}`} className="btn btn-outline btn-sm">
                  Saiba Mais
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="features-section">
        <h2 className="section-title">Por que escolher o BarberBook?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaCut />
            </div>
            <h3>Profissionais Qualificados</h3>
            <p>Barbeiros especializados para todos os tipos de cortes e estilos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <h3>Agendamento Fácil</h3>
            <p>Marque seu horário em segundos, escolha o profissional e o serviço</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaClock />
            </div>
            <h3>Economize Tempo</h3>
            <p>Sem filas ou esperas. Chegue no horário e seja atendido imediatamente</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaStar />
            </div>
            <h3>Avaliações Reais</h3>
            <p>Veja as avaliações de outros clientes antes de escolher</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto para agendar?</h2>
          <p>Faça seu agendamento agora e tenha a melhor experiência em barbearia</p>
          <Link to="/barbers" className="btn btn-primary btn-lg">
            Encontrar Barbeiro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 