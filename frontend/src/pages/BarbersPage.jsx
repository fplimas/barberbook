import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import './BarbersPage.css';

const BarbersPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoading(true);
        
        // Simulação de dados - em produção, usar chamada de API real
        const barbersData = [
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
          },
          { 
            id: 4, 
            name: 'Barbearia Vintage', 
            distance: '4.3km', 
            rating: 4.9, 
            address: 'Rua Antiga, 210',
            image: 'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?ixlib=rb-4.0.3',
            specialty: 'Ambiente vintage e produtos premium'
          },
          { 
            id: 5, 
            name: 'Cabelo & Arte', 
            distance: '3.8km', 
            rating: 4.6, 
            address: 'Av. das Artes, 76',
            image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3',
            specialty: 'Cortes artísticos e personalizados'
          },
          { 
            id: 6, 
            name: 'BarberShop Premium', 
            distance: '5.2km', 
            rating: 4.7, 
            address: 'Shopping Central, Loja 42',
            image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3',
            specialty: 'Experiência completa de barbearia'
          }
        ];
        
        setBarbers(barbersData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar barbeiros:', error);
        setError('Falha ao carregar a lista de barbeiros. Tente novamente mais tarde.');
        setLoading(false);
      }
    };
    
    fetchBarbers();
  }, []);

  // Filtrar barbeiros com base na busca
  const filteredBarbers = barbers.filter(barber => {
    const matchesSearch = barber.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     barber.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     barber.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'top-rated') return matchesSearch && barber.rating >= 4.7;
    if (filter === 'nearest') return matchesSearch && parseFloat(barber.distance) <= 3.0;
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="barbers-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando barbeiros próximos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="barbers-page">
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
    <div className="barbers-page">
      <div className="container">
        <div className="barbers-header">
          <h1>Encontre um Barbeiro</h1>
          <p>Descubra os melhores profissionais próximos a você</p>
        </div>
        
        <div className="barbers-filter">
          <div className="search-box">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Pesquisar por nome, especialidade ou endereço"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${filter === 'top-rated' ? 'active' : ''}`}
              onClick={() => setFilter('top-rated')}
            >
              Melhor Avaliados
            </button>
            <button 
              className={`filter-btn ${filter === 'nearest' ? 'active' : ''}`}
              onClick={() => setFilter('nearest')}
            >
              Mais Próximos
            </button>
          </div>
        </div>
        
        <div className="barbers-list">
          {filteredBarbers.length > 0 ? (
            filteredBarbers.map(barber => (
              <div key={barber.id} className="barber-card">
                <div className="barber-card-image">
                  <img src={barber.image} alt={barber.name} />
                  <div className="barber-distance-badge">{barber.distance}</div>
                </div>
                <div className="barber-card-content">
                  <h3>{barber.name}</h3>
                  <div className="barber-info">
                    <p className="barber-rating"><FaStar /> {barber.rating}</p>
                    <p className="barber-specialty">{barber.specialty}</p>
                    <p className="barber-address"><FaMapMarkerAlt /> {barber.address}</p>
                  </div>
                  <Link to={`/barber/${barber.id}`} className="btn btn-primary">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>Nenhum barbeiro encontrado</h3>
              <p>Tente ajustar seus filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarbersPage; 