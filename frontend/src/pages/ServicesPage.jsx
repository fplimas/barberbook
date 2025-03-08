import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCut, FaClock, FaMoneyBillWave, FaInfoCircle, FaSearch } from 'react-icons/fa';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        // Em produção, fazer uma chamada de API real
        // const response = await fetch('/api/services');
        // if (!response.ok) {
        //   throw new Error('Erro ao buscar serviços');
        // }
        // const data = await response.json();

        // Dados simulados para desenvolvimento - APENAS SERVIÇOS MASCULINOS
        const servicesData = [
          {
            id: 1,
            name: 'Corte Masculino',
            description: 'Corte moderno com tesoura ou máquina, finalizado com produtos profissionais.',
            duration: 30,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c',
            category: 'cabelo'
          },
          {
            id: 2,
            name: 'Barba Completa',
            description: 'Modelagem e aparo de barba com toalha quente e finalização com produtos especiais.',
            duration: 20,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
            category: 'barba'
          },
          {
            id: 3,
            name: 'Corte + Barba',
            description: 'Combo de corte masculino e barba com desconto especial.',
            duration: 50,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919',
            category: 'combo'
          },
          {
            id: 4,
            name: 'Combo Completo',
            description: 'Pacote completo com corte, barba e acabamento na sobrancelha masculina.',
            duration: 60,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38',
            category: 'combo'
          },
          {
            id: 5,
            name: 'Coloração de Barba',
            description: 'Tingimento de barba para cobrir fios brancos ou mudar o visual.',
            duration: 30,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033',
            category: 'tratamento'
          },
          {
            id: 6,
            name: 'Hidratação Capilar',
            description: 'Tratamento para cabelos masculinos, ideal para cabelos ressecados.',
            duration: 30,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
            category: 'tratamento'
          },
          {
            id: 7,
            name: 'Acabamento na Sobrancelha',
            description: 'Ajuste e acabamento na sobrancelha masculina para um visual mais limpo.',
            duration: 10,
            price: null, // Preço varia por barbearia
            image: 'https://images.unsplash.com/photo-1621786030493-cebb405efa83',
            category: 'extra'
          }
        ];

        // Extrair categorias únicas
        const uniqueCategories = [...new Set(servicesData.map(service => service.category))];
        
        setServices(servicesData);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error('Erro:', err);
        setError(err.message || 'Ocorreu um erro ao carregar os serviços');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filtrar serviços por categoria e termo de busca
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'todos' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Traduzir nome das categorias
  const getCategoryName = (category) => {
    const categoryMap = {
      'cabelo': 'Cabelo',
      'barba': 'Barba',
      'combo': 'Combos',
      'tratamento': 'Tratamentos',
      'extra': 'Extras',
      'todos': 'Todos os Serviços'
    };
    return categoryMap[category] || category;
  };

  // Se estiver carregando
  if (loading) {
    return (
      <div className="services-page">
        <div className="container">
          <div className="loading">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p>Carregando serviços...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se ocorreu um erro
  if (error) {
    return (
      <div className="services-page">
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
    <div className="services-page">
      <div className="container">
        <div className="services-header">
          <h1>Nossos Serviços</h1>
          <p>Conheça todos os serviços disponíveis em nossa barbearia</p>
        </div>

        <div className="services-filter">
          <div className="search-box">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="categories-filter">
            <button
              className={`category-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('todos')}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map(service => (
              <div className="service-card" key={service.id}>
                <div className="service-image">
                  <img src={service.image} alt={service.name} />
                  <div className="service-category">
                    {getCategoryName(service.category)}
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-details">
                    <span className="service-duration">
                      <FaClock /> {service.duration} min
                    </span>
                    <span className="service-price">
                      <FaMoneyBillWave /> Preço varia por barbearia
                    </span>
                  </div>
                  <div className="service-actions">
                    <Link to={`/service/${service.id}`} className="btn btn-outline btn-sm">
                      <FaInfoCircle /> Detalhes
                    </Link>
                    <Link to={`/booking?service=${service.id}`} className="btn btn-primary btn-sm">
                      <FaCut /> Agendar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-services">
            <h3>Nenhum serviço encontrado</h3>
            <p>Tente ajustar os filtros ou o termo de busca</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setSelectedCategory('todos');
                setSearchTerm('');
              }}
            >
              Ver todos os serviços
            </button>
          </div>
        )}

        <div className="services-cta">
          <div className="cta-content">
            <h2>Pronto para renovar seu visual?</h2>
            <p>Agende seu horário agora mesmo e desfrute dos melhores serviços de barbearia da cidade.</p>
            <Link to="/booking" className="btn btn-primary btn-lg">
              Agendar Agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 