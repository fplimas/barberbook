import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch, FaPhone, FaEnvelope, FaCalendarAlt, FaStar, FaSort, FaSortUp, FaSortDown, FaUserPlus, FaEdit, FaTrash, FaClipboardList, FaFilter, FaEllipsisV } from 'react-icons/fa';
import './ClientManager.css';

const ClientManager = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({ status: 'all', loyaltyLevel: 'all' });
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    notes: '',
  });
  const [editingClient, setEditingClient] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: '' });

  // Carregar dados simulados de clientes
  useEffect(() => {
    const loadData = async () => {
      // Simular tempo de carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados fictícios para demonstração
      const demoClients = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          phone: '(11) 99999-1111',
          birthdate: '1985-04-12',
          status: 'active',
          loyaltyPoints: 320,
          loyaltyLevel: 'gold',
          lastVisit: '2023-11-15',
          totalVisits: 24,
          totalSpent: 1850.00,
          averageSpent: 77.08,
          preferredServices: ['Corte Degradê', 'Barba Completa'],
          appointmentHistory: [
            { id: 12, date: '2023-11-15', service: 'Corte Degradê', price: 70.00, status: 'completed' },
            { id: 10, date: '2023-10-20', service: 'Corte + Barba', price: 100.00, status: 'completed' },
            { id: 8, date: '2023-09-18', service: 'Corte Degradê', price: 70.00, status: 'completed' },
          ],
          notes: 'Prefere atendimento no fim do dia. Alérgico a produto X.'
        },
        {
          id: 2,
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          phone: '(11) 99999-2222',
          birthdate: '1990-07-23',
          status: 'active',
          loyaltyPoints: 180,
          loyaltyLevel: 'silver',
          lastVisit: '2023-11-10',
          totalVisits: 12,
          totalSpent: 950.00,
          averageSpent: 79.17,
          preferredServices: ['Corte Simples', 'Pigmentação'],
          appointmentHistory: [
            { id: 11, date: '2023-11-10', service: 'Corte Simples', price: 60.00, status: 'completed' },
            { id: 9, date: '2023-10-05', service: 'Pigmentação', price: 120.00, status: 'completed' },
          ],
          notes: 'Gosta de conversar sobre esportes.'
        },
        {
          id: 3,
          name: 'Carlos Mendes',
          email: 'carlos.mendes@email.com',
          phone: '(11) 99999-3333',
          birthdate: '1988-02-10',
          status: 'inactive',
          loyaltyPoints: 80,
          loyaltyLevel: 'bronze',
          lastVisit: '2023-08-17',
          totalVisits: 5,
          totalSpent: 350.00,
          averageSpent: 70.00,
          preferredServices: ['Corte Simples'],
          appointmentHistory: [
            { id: 7, date: '2023-08-17', service: 'Corte Simples', price: 60.00, status: 'completed' },
            { id: 5, date: '2023-07-01', service: 'Corte + Barba', price: 100.00, status: 'completed' },
          ],
          notes: 'Não gosta de esperar. Prefere atendimentos rápidos.'
        },
        {
          id: 4,
          name: 'André Costa',
          email: 'andre.costa@email.com',
          phone: '(11) 99999-4444',
          birthdate: '1992-10-15',
          status: 'active',
          loyaltyPoints: 410,
          loyaltyLevel: 'platinum',
          lastVisit: '2023-11-18',
          totalVisits: 30,
          totalSpent: 2500.00,
          averageSpent: 83.33,
          preferredServices: ['Corte Premium', 'Barba Modelada', 'Hidratação'],
          appointmentHistory: [
            { id: 13, date: '2023-11-18', service: 'Corte Premium', price: 90.00, status: 'completed' },
            { id: 12, date: '2023-11-01', service: 'Barba Modelada', price: 60.00, status: 'completed' },
            { id: 11, date: '2023-10-15', service: 'Hidratação', price: 80.00, status: 'completed' },
          ],
          notes: 'Cliente VIP. Oferecer bebidas premium.'
        },
        {
          id: 5,
          name: 'Rafael Santos',
          email: 'rafael.santos@email.com',
          phone: '(11) 99999-5555',
          birthdate: '1995-06-20',
          status: 'active',
          loyaltyPoints: 150,
          loyaltyLevel: 'silver',
          lastVisit: '2023-11-05',
          totalVisits: 10,
          totalSpent: 720.00,
          averageSpent: 72.00,
          preferredServices: ['Corte Degradê', 'Sobrancelha'],
          appointmentHistory: [
            { id: 10, date: '2023-11-05', service: 'Corte Degradê', price: 70.00, status: 'completed' },
            { id: 8, date: '2023-10-10', service: 'Sobrancelha', price: 30.00, status: 'completed' },
          ],
          notes: 'Gosta de ouvir música durante o atendimento.'
        },
      ];
      
      setClients(demoClients);
      setFilteredClients(demoClients);
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Filtrar e ordenar clientes baseado no termo de pesquisa e configurações
  useEffect(() => {
    let result = [...clients];
    
    // Aplicar filtros
    if (filterConfig.status !== 'all') {
      result = result.filter(client => client.status === filterConfig.status);
    }
    
    if (filterConfig.loyaltyLevel !== 'all') {
      result = result.filter(client => client.loyaltyLevel === filterConfig.loyaltyLevel);
    }
    
    // Aplicar pesquisa
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(client => 
        client.name.toLowerCase().includes(lowercaseSearchTerm) ||
        client.email.toLowerCase().includes(lowercaseSearchTerm) ||
        client.phone.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Aplicar ordenação
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredClients(result);
  }, [clients, searchTerm, sortConfig, filterConfig]);

  // Gerenciar ordenação
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Gerenciar filtros
  const handleFilterChange = (filter, value) => {
    setFilterConfig(prev => ({ ...prev, [filter]: value }));
  };

  // Renderizar ícone de ordenação
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };
  
  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Formatar valor monetário
  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  // Retornar o nome do nível de fidelidade
  const getLoyaltyLevelName = (level) => {
    const levels = {
      bronze: 'Bronze',
      silver: 'Prata',
      gold: 'Ouro',
      platinum: 'Platina'
    };
    return levels[level] || level;
  };
  
  // Cores para níveis de fidelidade
  const getLoyaltyLevelColor = (level) => {
    const colors = {
      bronze: '#cd7f32',
      silver: '#c0c0c0',
      gold: '#ffd700',
      platinum: '#e5e4e2'
    };
    return colors[level] || '#999';
  };
  
  // Manipular seleção de cliente
  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setActiveTab('details');
  };
  
  // Manipular abertura do formulário de adicionar cliente
  const handleAddClientClick = () => {
    setIsAddFormOpen(true);
    setActiveTab('add');
  };
  
  // Manipular mudanças no formulário de novo cliente
  const handleNewClientChange = (field, value) => {
    setNewClient(prev => ({ ...prev, [field]: value }));
  };
  
  // Salvar novo cliente
  const handleSaveNewClient = () => {
    // Verificar campos obrigatórios
    if (!newClient.name || !newClient.phone) {
      setSaveStatus({
        show: true,
        success: false,
        message: 'Nome e telefone são campos obrigatórios'
      });
      return;
    }
    
    // Simular salvamento na API
    const id = clients.length + 1;
    const now = new Date().toISOString().split('T')[0];
    
    const clientToAdd = {
      ...newClient,
      id,
      status: 'active',
      loyaltyPoints: 0,
      loyaltyLevel: 'bronze',
      lastVisit: null,
      totalVisits: 0,
      totalSpent: 0,
      averageSpent: 0,
      preferredServices: [],
      appointmentHistory: []
    };
    
    setClients(prev => [...prev, clientToAdd]);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      birthdate: '',
      notes: '',
    });
    
    setSaveStatus({
      show: true,
      success: true,
      message: 'Cliente adicionado com sucesso!'
    });
    
    // Esconder a mensagem após 3 segundos
    setTimeout(() => {
      setSaveStatus({show: false, success: false, message: ''});
      setIsAddFormOpen(false);
      setActiveTab('list');
    }, 3000);
  };
  
  // Iniciar edição de cliente
  const handleEditClient = (client) => {
    setEditingClient({...client});
    setIsEditFormOpen(true);
    setActiveTab('edit');
  };
  
  // Manipular mudanças no formulário de edição
  const handleEditingClientChange = (field, value) => {
    setEditingClient(prev => ({ ...prev, [field]: value }));
  };
  
  // Salvar cliente editado
  const handleSaveEditedClient = () => {
    // Verificar campos obrigatórios
    if (!editingClient.name || !editingClient.phone) {
      setSaveStatus({
        show: true,
        success: false,
        message: 'Nome e telefone são campos obrigatórios'
      });
      return;
    }
    
    setClients(prev => prev.map(client => 
      client.id === editingClient.id ? editingClient : client
    ));
    
    setSaveStatus({
      show: true,
      success: true,
      message: 'Cliente atualizado com sucesso!'
    });
    
    // Esconder a mensagem após 3 segundos
    setTimeout(() => {
      setSaveStatus({show: false, success: false, message: ''});
      setIsEditFormOpen(false);
      setActiveTab('details');
      setSelectedClient(editingClient);
    }, 3000);
  };
  
  // Excluir cliente
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
      
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
        setActiveTab('list');
      }
      
      setSaveStatus({
        show: true,
        success: true,
        message: 'Cliente excluído com sucesso!'
      });
      
      // Esconder a mensagem após 3 segundos
      setTimeout(() => {
        setSaveStatus({show: false, success: false, message: ''});
      }, 3000);
    }
  };
  
  // Voltar para a lista ou detalhes
  const handleCancel = () => {
    if (isEditFormOpen && selectedClient) {
      setIsEditFormOpen(false);
      setActiveTab('details');
    } else {
      setIsAddFormOpen(false);
      setIsEditFormOpen(false);
      setActiveTab('list');
    }
  };

  if (loading) {
    return (
      <div className="client-manager loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="client-manager">
      <div className="client-header">
        <h2>Gerenciamento de Clientes</h2>
        {saveStatus.show && (
          <div className={`save-status ${saveStatus.success ? 'success' : 'error'}`}>
            {saveStatus.message}
          </div>
        )}
        {activeTab === 'list' && (
          <button className="btn-add-client" onClick={handleAddClientClick}>
            <FaUserPlus /> Adicionar Cliente
          </button>
        )}
        {(activeTab === 'details' || activeTab === 'edit') && selectedClient && (
          <div className="client-actions">
            {activeTab === 'details' && (
              <>
                <button className="btn-edit" onClick={() => handleEditClient(selectedClient)}>
                  <FaEdit /> Editar
                </button>
                <button className="btn-delete" onClick={() => handleDeleteClient(selectedClient.id)}>
                  <FaTrash /> Excluir
                </button>
                <button className="btn-back" onClick={handleCancel}>
                  Voltar para Lista
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {activeTab === 'list' && (
        <>
          <div className="client-filters">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar cliente por nome, email ou telefone" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-actions">
              <select 
                className="filter-select"
                value={filterConfig.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Status: Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
              <select 
                className="filter-select"
                value={filterConfig.loyaltyLevel}
                onChange={(e) => handleFilterChange('loyaltyLevel', e.target.value)}
              >
                <option value="all">Fidelidade: Todos</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Prata</option>
                <option value="gold">Ouro</option>
                <option value="platinum">Platina</option>
              </select>
            </div>
          </div>

          <div className="client-table">
            <div className="table-header">
              <div className="header-cell name" onClick={() => requestSort('name')}>
                Nome {getSortIcon('name')}
              </div>
              <div className="header-cell contact" onClick={() => requestSort('phone')}>
                Contato {getSortIcon('phone')}
              </div>
              <div className="header-cell last-visit" onClick={() => requestSort('lastVisit')}>
                Última Visita {getSortIcon('lastVisit')}
              </div>
              <div className="header-cell loyalty" onClick={() => requestSort('loyaltyPoints')}>
                Fidelidade {getSortIcon('loyaltyPoints')}
              </div>
              <div className="header-cell spent" onClick={() => requestSort('totalSpent')}>
                Total Gasto {getSortIcon('totalSpent')}
              </div>
              <div className="header-cell actions">
                Ações
              </div>
            </div>
            <div className="table-body">
              {filteredClients.length === 0 ? (
                <div className="no-clients">
                  <FaUser />
                  <p>Nenhum cliente encontrado</p>
                </div>
              ) : (
                filteredClients.map(client => (
                  <div 
                    key={client.id} 
                    className={`table-row ${client.status === 'inactive' ? 'inactive' : ''}`}
                    onClick={() => handleClientSelect(client)}
                  >
                    <div className="table-cell name">
                      {client.name}
                    </div>
                    <div className="table-cell contact">
                      <div className="contact-phone">
                        <FaPhone /> {client.phone}
                      </div>
                      <div className="contact-email">
                        <FaEnvelope /> {client.email}
                      </div>
                    </div>
                    <div className="table-cell last-visit">
                      {client.lastVisit ? formatDate(client.lastVisit) : 'Nunca visitou'}
                    </div>
                    <div className="table-cell loyalty">
                      <div 
                        className="loyalty-badge"
                        style={{ backgroundColor: getLoyaltyLevelColor(client.loyaltyLevel) }}
                      >
                        {getLoyaltyLevelName(client.loyaltyLevel)}
                      </div>
                      <div className="loyalty-points">
                        <FaStar /> {client.loyaltyPoints} pontos
                      </div>
                    </div>
                    <div className="table-cell spent">
                      {formatCurrency(client.totalSpent)}
                      <div className="visit-count">
                        <FaCalendarAlt /> {client.totalVisits} visitas
                      </div>
                    </div>
                    <div className="table-cell actions" onClick={(e) => e.stopPropagation()}>
                      <button className="btn-view" onClick={(e) => {
                        e.stopPropagation();
                        handleClientSelect(client);
                      }}>
                        <FaClipboardList /> Ver
                      </button>
                      <button className="btn-edit" onClick={(e) => {
                        e.stopPropagation();
                        handleEditClient(client);
                      }}>
                        <FaEdit />
                      </button>
                      <button className="btn-delete" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client.id);
                      }}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'details' && selectedClient && (
        <div className="client-details">
          <div className="client-profile">
            <div className="profile-header">
              <div className="profile-avatar">
                <FaUser />
              </div>
              <div className="profile-info">
                <h3>{selectedClient.name}</h3>
                <div className="profile-status">
                  <span className={`status-badge ${selectedClient.status}`}>
                    {selectedClient.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <span 
                    className="loyalty-badge" 
                    style={{ backgroundColor: getLoyaltyLevelColor(selectedClient.loyaltyLevel) }}
                  >
                    {getLoyaltyLevelName(selectedClient.loyaltyLevel)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="profile-contact">
              <div className="contact-item">
                <FaPhone />
                <span>{selectedClient.phone}</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>{selectedClient.email}</span>
              </div>
              <div className="contact-item">
                <FaCalendarAlt />
                <span>{selectedClient.birthdate ? formatDate(selectedClient.birthdate) : 'Não informado'}</span>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-value">{selectedClient.totalVisits}</div>
                <div className="stat-label">Total de Visitas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{formatCurrency(selectedClient.totalSpent)}</div>
                <div className="stat-label">Total Gasto</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{formatCurrency(selectedClient.averageSpent)}</div>
                <div className="stat-label">Ticket Médio</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{selectedClient.loyaltyPoints}</div>
                <div className="stat-label">Pontos de Fidelidade</div>
              </div>
            </div>
            
            {selectedClient.notes && (
              <div className="profile-notes">
                <h4>Observações</h4>
                <p>{selectedClient.notes}</p>
              </div>
            )}
            
            <div className="preferred-services">
              <h4>Serviços Preferidos</h4>
              {selectedClient.preferredServices && selectedClient.preferredServices.length > 0 ? (
                <div className="service-tags">
                  {selectedClient.preferredServices.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-services">Nenhum serviço preferido registrado</p>
              )}
            </div>
          </div>
          
          <div className="appointment-history">
            <h3>Histórico de Agendamentos</h3>
            {selectedClient.appointmentHistory && selectedClient.appointmentHistory.length > 0 ? (
              <div className="history-list">
                {selectedClient.appointmentHistory.map(appointment => (
                  <div key={appointment.id} className="history-item">
                    <div className="history-date">
                      {formatDate(appointment.date)}
                    </div>
                    <div className="history-service">
                      {appointment.service}
                    </div>
                    <div className="history-price">
                      {formatCurrency(appointment.price)}
                    </div>
                    <div className={`history-status ${appointment.status}`}>
                      {appointment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-history">Nenhum agendamento registrado</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="client-form">
          <h3>Adicionar Novo Cliente</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome*</label>
              <input 
                type="text" 
                value={newClient.name}
                onChange={(e) => handleNewClientChange('name', e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group">
              <label>Telefone*</label>
              <input 
                type="text" 
                value={newClient.phone}
                onChange={(e) => handleNewClientChange('phone', e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={newClient.email}
                onChange={(e) => handleNewClientChange('email', e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input 
                type="date" 
                value={newClient.birthdate}
                onChange={(e) => handleNewClientChange('birthdate', e.target.value)}
              />
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea 
                value={newClient.notes}
                onChange={(e) => handleNewClientChange('notes', e.target.value)}
                placeholder="Preferências, restrições, etc."
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSaveNewClient}>
              Salvar Cliente
            </button>
          </div>
        </div>
      )}

      {activeTab === 'edit' && editingClient && (
        <div className="client-form">
          <h3>Editar Cliente</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome*</label>
              <input 
                type="text" 
                value={editingClient.name}
                onChange={(e) => handleEditingClientChange('name', e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group">
              <label>Telefone*</label>
              <input 
                type="text" 
                value={editingClient.phone}
                onChange={(e) => handleEditingClientChange('phone', e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={editingClient.email}
                onChange={(e) => handleEditingClientChange('email', e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input 
                type="date" 
                value={editingClient.birthdate}
                onChange={(e) => handleEditingClientChange('birthdate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editingClient.status}
                onChange={(e) => handleEditingClientChange('status', e.target.value)}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea 
                value={editingClient.notes}
                onChange={(e) => handleEditingClientChange('notes', e.target.value)}
                placeholder="Preferências, restrições, etc."
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSaveEditedClient}>
              Atualizar Cliente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager; 