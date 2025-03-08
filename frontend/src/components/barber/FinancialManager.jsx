import React, { useState, useEffect } from 'react';
import { 
  FaFileInvoiceDollar, 
  FaMoneyBillWave, 
  FaChartPie, 
  FaChartLine, 
  FaCalendarAlt, 
  FaDownload, 
  FaFilter, 
  FaPrint,
  FaAngleDown,
  FaAngleUp,
  FaCheck,
  FaCreditCard,
  FaMoneyBillAlt,
  FaMobileAlt,
  FaEllipsisH
} from 'react-icons/fa';
import './FinancialManager.css';

const FinancialManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('month');
  const [chartType, setChartType] = useState('revenue');
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [financialStats, setFinancialStats] = useState({
    totalRevenue: 0,
    netProfit: 0,
    pendingPayments: 0,
    expenses: 0,
    averageTicket: 0,
    projectedRevenue: 0
  });
  const [revenueByService, setRevenueByService] = useState([]);
  const [revenueByDay, setRevenueByDay] = useState([]);

  useEffect(() => {
    // Simula carregamento de dados
    const loadData = async () => {
      setLoading(true);
      
      // Simula um delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados
      const demoStats = {
        totalRevenue: 5840.50,
        netProfit: 4380.30,
        pendingPayments: 420.00,
        expenses: 1460.20,
        averageTicket: 48.75,
        projectedRevenue: 6200.00
      };
      
      const demoTransactions = [
        { 
          id: 1, 
          date: new Date(2023, 6, 28, 10, 30), 
          clientName: 'João Silva', 
          service: 'Corte + Barba', 
          amount: 65.00, 
          status: 'completed', 
          paymentMethod: 'card'
        },
        { 
          id: 2, 
          date: new Date(2023, 6, 28, 14, 0), 
          clientName: 'Carlos Mendes', 
          service: 'Corte Degradê', 
          amount: 45.00, 
          status: 'completed', 
          paymentMethod: 'cash'
        },
        { 
          id: 3, 
          date: new Date(2023, 6, 27, 11, 15), 
          clientName: 'Pedro Souza', 
          service: 'Barba', 
          amount: 35.00, 
          status: 'completed', 
          paymentMethod: 'pix'
        },
        { 
          id: 4, 
          date: new Date(2023, 6, 27, 16, 45), 
          clientName: 'Lucas Ferreira', 
          service: 'Corte + Sobrancelha', 
          amount: 60.00, 
          status: 'pending', 
          paymentMethod: 'card'
        },
        { 
          id: 5, 
          date: new Date(2023, 6, 26, 9, 0), 
          clientName: 'André Costa', 
          service: 'Combo Completo', 
          amount: 85.00, 
          status: 'completed', 
          paymentMethod: 'pix'
        },
        { 
          id: 6, 
          date: new Date(2023, 6, 26, 13, 30), 
          clientName: 'Matheus Oliveira', 
          service: 'Corte Clássico', 
          amount: 40.00, 
          status: 'completed', 
          paymentMethod: 'cash'
        },
        { 
          id: 7, 
          date: new Date(2023, 6, 25, 15, 15), 
          clientName: 'Roberto Alves', 
          service: 'Corte + Barba', 
          amount: 65.00, 
          status: 'pending', 
          paymentMethod: 'card'
        }
      ];
      
      const demoRevenueByService = [
        { service: 'Corte de Cabelo', revenue: 2320.00, count: 58 },
        { service: 'Barba', revenue: 1260.00, count: 36 },
        { service: 'Combo Cabelo + Barba', revenue: 1625.00, count: 25 },
        { service: 'Sobrancelha', revenue: 420.50, count: 21 },
        { service: 'Tratamentos', revenue: 215.00, count: 5 }
      ];
      
      const demoRevenueByDay = [
        { day: 'Segunda', revenue: 825.50 },
        { day: 'Terça', revenue: 720.00 },
        { day: 'Quarta', revenue: 1150.50 },
        { day: 'Quinta', revenue: 935.00 },
        { day: 'Sexta', revenue: 1045.00 },
        { day: 'Sábado', revenue: 1165.00 },
        { day: 'Domingo', revenue: 0 }
      ];
      
      setFinancialStats(demoStats);
      setTransactions(demoTransactions);
      setRevenueByService(demoRevenueByService);
      setRevenueByDay(demoRevenueByDay);
      setLoading(false);
    };
    
    loadData();
  }, [period]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getPaymentIcon = (method) => {
    switch (method) {
      case 'card':
        return <FaCreditCard />;
      case 'cash':
        return <FaMoneyBillAlt />;
      case 'pix':
        return <FaMobileAlt />;
      default:
        return <FaMoneyBillWave />;
    }
  };
  
  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Cartão';
      case 'cash':
        return 'Dinheiro';
      case 'pix':
        return 'PIX';
      default:
        return 'Outro';
    }
  };

  if (loading) {
    return (
      <div className="financial-manager loading">
        <div className="spinner"></div>
        <p>Carregando dados financeiros...</p>
      </div>
    );
  }

  return (
    <div className="financial-manager">
      <div className="financial-header">
        <h2><FaFileInvoiceDollar /> Gerenciamento Financeiro</h2>
        <div className="period-selector">
          <span>Período:</span>
          <div className="period-buttons">
            <button 
              className={period === 'week' ? 'active' : ''} 
              onClick={() => setPeriod('week')}
            >
              Semana
            </button>
            <button 
              className={period === 'month' ? 'active' : ''} 
              onClick={() => setPeriod('month')}
            >
              Mês
            </button>
            <button 
              className={period === 'year' ? 'active' : ''} 
              onClick={() => setPeriod('year')}
            >
              Ano
            </button>
          </div>
        </div>
      </div>

      <div className="financial-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          <FaChartPie /> Visão Geral
        </button>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''} 
          onClick={() => setActiveTab('transactions')}
        >
          <FaMoneyBillWave /> Transações
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''} 
          onClick={() => setActiveTab('reports')}
        >
          <FaChartLine /> Relatórios
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="financial-overview">
          <div className="stats-grid">
            <div className="stat-card revenue">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>
              <div className="stat-content">
                <h3>Receita Total</h3>
                <div className="stat-value">{formatCurrency(financialStats.totalRevenue)}</div>
              </div>
            </div>
            
            <div className="stat-card profit">
              <div className="stat-icon">
                <FaChartLine />
              </div>
              <div className="stat-content">
                <h3>Lucro Líquido</h3>
                <div className="stat-value">{formatCurrency(financialStats.netProfit)}</div>
              </div>
            </div>
            
            <div className="stat-card pending">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <h3>Pagamentos Pendentes</h3>
                <div className="stat-value">{formatCurrency(financialStats.pendingPayments)}</div>
              </div>
            </div>
            
            <div className="stat-card average">
              <div className="stat-icon">
                <FaChartPie />
              </div>
              <div className="stat-content">
                <h3>Ticket Médio</h3>
                <div className="stat-value">{formatCurrency(financialStats.averageTicket)}</div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Análise de Receitas</h3>
              <div className="chart-selector">
                <button 
                  className={chartType === 'revenue' ? 'active' : ''} 
                  onClick={() => setChartType('revenue')}
                >
                  Por Dia
                </button>
                <button 
                  className={chartType === 'services' ? 'active' : ''} 
                  onClick={() => setChartType('services')}
                >
                  Por Serviço
                </button>
              </div>
            </div>
            
            <div className="chart-content">
              {chartType === 'revenue' ? (
                <div className="bar-chart">
                  {revenueByDay.map((day, index) => (
                    <div className="chart-bar-container" key={index}>
                      <div className="chart-bar-label">{day.day}</div>
                      <div className="chart-bar-wrapper">
                        <div 
                          className="chart-bar" 
                          style={{ 
                            height: `${(day.revenue / Math.max(...revenueByDay.map(d => d.revenue))) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="chart-bar-value">{formatCurrency(day.revenue)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="service-revenue">
                  {revenueByService.map((service, index) => (
                    <div className="service-row" key={index}>
                      <div className="service-info">
                        <div className="service-name">{service.service}</div>
                        <div className="service-count">{service.count} serviços</div>
                      </div>
                      <div className="service-progress">
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${(service.revenue / Math.max(...revenueByService.map(s => s.revenue))) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="service-revenue-value">{formatCurrency(service.revenue)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="recent-transactions">
            <div className="section-header">
              <h3>Transações Recentes</h3>
              <button onClick={() => setActiveTab('transactions')} className="view-all">
                Ver Todas
              </button>
            </div>
            <div className="transactions-list">
              {transactions.slice(0, 5).map(transaction => (
                <div 
                  className={`transaction-item ${transaction.status === 'pending' ? 'pending' : ''}`} 
                  key={transaction.id}
                >
                  <div className="transaction-date">
                    <div className="date">{formatDate(transaction.date)}</div>
                    <div className="time">{formatTime(transaction.date)}</div>
                  </div>
                  <div className="transaction-info">
                    <div className="client-name">{transaction.clientName}</div>
                    <div className="service-name">{transaction.service}</div>
                  </div>
                  <div className="transaction-payment">
                    <div className="amount">{formatCurrency(transaction.amount)}</div>
                    <div className="payment-method">
                      {getPaymentIcon(transaction.paymentMethod)}
                      <span>{getPaymentMethodName(transaction.paymentMethod)}</span>
                    </div>
                  </div>
                  <div className="transaction-status">
                    {transaction.status === 'completed' ? (
                      <span className="status-completed"><FaCheck /> Pago</span>
                    ) : (
                      <span className="status-pending">Pendente</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="transactions-tab">
          <div className="transactions-filters">
            <div className="search-box">
              <input type="text" placeholder="Buscar transações..." />
            </div>
            <div className="filter-actions">
              <button className="filter-button">
                <FaFilter /> Filtrar
              </button>
              <button className="export-button">
                <FaDownload /> Exportar
              </button>
              <button className="print-button">
                <FaPrint /> Imprimir
              </button>
            </div>
          </div>
          
          <div className="transactions-table">
            <div className="table-header">
              <div className="header-cell date">Data</div>
              <div className="header-cell client">Cliente</div>
              <div className="header-cell service">Serviço</div>
              <div className="header-cell amount">Valor</div>
              <div className="header-cell payment">Pagamento</div>
              <div className="header-cell status">Status</div>
              <div className="header-cell actions">Ações</div>
            </div>
            <div className="table-body">
              {transactions.map(transaction => (
                <div 
                  className={`table-row ${transaction.status === 'pending' ? 'pending' : ''}`} 
                  key={transaction.id}
                >
                  <div className="table-cell date">
                    <div>{formatDate(transaction.date)}</div>
                    <div className="time">{formatTime(transaction.date)}</div>
                  </div>
                  <div className="table-cell client">{transaction.clientName}</div>
                  <div className="table-cell service">{transaction.service}</div>
                  <div className="table-cell amount">{formatCurrency(transaction.amount)}</div>
                  <div className="table-cell payment">
                    <div className="payment-method">
                      {getPaymentIcon(transaction.paymentMethod)}
                      <span>{getPaymentMethodName(transaction.paymentMethod)}</span>
                    </div>
                  </div>
                  <div className="table-cell status">
                    {transaction.status === 'completed' ? (
                      <span className="status-completed"><FaCheck /> Pago</span>
                    ) : (
                      <span className="status-pending">Pendente</span>
                    )}
                  </div>
                  <div className="table-cell actions">
                    <button className="action-button">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pagination">
            <button className="pagination-prev" disabled>&lt; Anterior</button>
            <div className="pagination-numbers">
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
            </div>
            <button className="pagination-next">Próximo &gt;</button>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="reports-tab">
          <div className="report-filters">
            <div className="date-range">
              <label>Período:</label>
              <div className="date-inputs">
                <input type="date" placeholder="Data inicial" />
                <span>até</span>
                <input type="date" placeholder="Data final" />
              </div>
            </div>
            <div className="report-actions">
              <button className="generate-button">
                <FaChartLine /> Gerar Relatório
              </button>
              <button className="export-button">
                <FaDownload /> Exportar
              </button>
              <button className="print-button">
                <FaPrint /> Imprimir
              </button>
            </div>
          </div>
          
          <div className="report-types">
            <div className="report-card">
              <div className="report-icon">
                <FaMoneyBillWave />
              </div>
              <div className="report-info">
                <h3>Receita por Período</h3>
                <p>Análise detalhada de receitas por dia, semana ou mês</p>
              </div>
              <button className="report-button">Gerar</button>
            </div>
            
            <div className="report-card">
              <div className="report-icon">
                <FaChartPie />
              </div>
              <div className="report-info">
                <h3>Serviços Mais Populares</h3>
                <p>Análise dos serviços mais procurados e sua contribuição</p>
              </div>
              <button className="report-button">Gerar</button>
            </div>
            
            <div className="report-card">
              <div className="report-icon">
                <FaChartLine />
              </div>
              <div className="report-info">
                <h3>Crescimento de Receita</h3>
                <p>Compare o crescimento de receita em diferentes períodos</p>
              </div>
              <button className="report-button">Gerar</button>
            </div>
            
            <div className="report-card">
              <div className="report-icon">
                <FaFileInvoiceDollar />
              </div>
              <div className="report-info">
                <h3>Relatório Fiscal</h3>
                <p>Resumo de receitas e despesas para fins fiscais</p>
              </div>
              <button className="report-button">Gerar</button>
            </div>
          </div>
          
          <div className="sample-report">
            <div className="sample-header">
              <h3>Prévia do Relatório</h3>
              <p>Selecione um tipo de relatório acima para visualizar uma prévia</p>
            </div>
            <div className="sample-chart">
              <div className="chart-placeholder">
                <FaChartLine />
                <p>Os dados do relatório aparecerão aqui</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialManager; 