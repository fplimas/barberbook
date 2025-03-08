import React, { useState, useEffect } from 'react';
import { FaChartBar, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaCut, FaBell } from 'react-icons/fa';
import './DashboardPanel.css';

// Componente para os cartões de estatísticas
const StatCard = ({ icon, title, value, trend, trendLabel, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: `var(--${color})` }}>
      {icon}
    </div>
    <div className="stat-content">
      <h3 className="stat-title">{title}</h3>
      <div className="stat-value-container">
        <p className="stat-value">{value}</p>
        {trend && (
          <span className={`stat-trend ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}`}>
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '–'} {Math.abs(trend)}% {trendLabel}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Componente para o gráfico de agendamentos (simulação)
const AppointmentsChart = ({ data }) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Agendamentos por Dia</h3>
        <div className="chart-period-selector">
          <button className="active">Semana</button>
          <button>Mês</button>
          <button>Ano</button>
        </div>
      </div>
      <div className="chart-body">
        {/* Em um cenário real, aqui você usaria uma biblioteca como Chart.js, Recharts, etc. */}
        <div className="chart-placeholder">
          <div className="chart-bars">
            {data.map((item, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar" 
                  style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
                  data-value={item.value}
                ></div>
                <div className="chart-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para notificações recentes
const RecentNotifications = ({ notifications }) => {
  return (
    <div className="notifications-panel">
      <div className="panel-header">
        <h3><FaBell /> Notificações Recentes</h3>
        <button className="btn-clear">Limpar Todas</button>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">Nenhuma notificação recente</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className={`notification-item ${notification.read ? '' : 'unread'}`}>
              <div className="notification-icon">
                {notification.type === 'booking' && <FaCalendarAlt />}
                {notification.type === 'review' && <FaUsers />}
                {notification.type === 'payment' && <FaMoneyBillWave />}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Componente principal do painel
const DashboardPanel = () => {
  const [period, setPeriod] = useState('week');
  const [stats, setStats] = useState({
    revenue: { value: 0, trend: 0 },
    appointments: { value: 0, trend: 0 },
    clients: { value: 0, trend: 0 },
    services: { value: 0 }
  });
  const [chartData, setChartData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Em um cenário real, estes dados viriam de uma API
    setTimeout(() => {
      setStats({
        revenue: { value: 'R$ 2.458,00', trend: 12.5 },
        appointments: { value: '47', trend: 8.2 },
        clients: { value: '18', trend: 5.3 },
        services: { value: '32' }
      });

      setChartData([
        { label: 'Seg', value: 8 },
        { label: 'Ter', value: 12 },
        { label: 'Qua', value: 7 },
        { label: 'Qui', value: 15 },
        { label: 'Sex', value: 10 },
        { label: 'Sáb', value: 18 },
        { label: 'Dom', value: 5 }
      ]);

      setNotifications([
        { 
          type: 'booking', 
          message: 'Novo agendamento de Pedro Silva para Corte de Cabelo', 
          time: 'há 10 minutos', 
          read: false 
        },
        { 
          type: 'review', 
          message: 'Lucas Oliveira avaliou seu serviço com 5 estrelas', 
          time: 'há 2 horas', 
          read: false 
        },
        { 
          type: 'payment', 
          message: 'Recebimento confirmado: R$ 85,00 de João Almeida', 
          time: 'há 5 horas', 
          read: true 
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="dashboard-panel loading">
        <div className="spinner"></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-panel">
      <div className="dashboard-header">
        <h2><FaChartBar /> Painel de Controle</h2>
        <div className="period-selector">
          <button 
            className={period === 'today' ? 'active' : ''} 
            onClick={() => handlePeriodChange('today')}
          >
            Hoje
          </button>
          <button 
            className={period === 'week' ? 'active' : ''} 
            onClick={() => handlePeriodChange('week')}
          >
            Semana
          </button>
          <button 
            className={period === 'month' ? 'active' : ''} 
            onClick={() => handlePeriodChange('month')}
          >
            Mês
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={<FaMoneyBillWave />} 
          title="Receita Total" 
          value={stats.revenue.value} 
          trend={stats.revenue.trend} 
          trendLabel="vs. período anterior" 
          color="revenue" 
        />
        <StatCard 
          icon={<FaCalendarAlt />} 
          title="Agendamentos" 
          value={stats.appointments.value} 
          trend={stats.appointments.trend} 
          trendLabel="vs. período anterior" 
          color="appointments" 
        />
        <StatCard 
          icon={<FaUsers />} 
          title="Novos Clientes" 
          value={stats.clients.value} 
          trend={stats.clients.trend} 
          trendLabel="vs. período anterior" 
          color="clients" 
        />
        <StatCard 
          icon={<FaCut />} 
          title="Serviços Realizados" 
          value={stats.services.value} 
          color="services" 
        />
      </div>

      <div className="dashboard-grid">
        <AppointmentsChart data={chartData} />
        <RecentNotifications notifications={notifications} />
      </div>
    </div>
  );
};

export default DashboardPanel; 