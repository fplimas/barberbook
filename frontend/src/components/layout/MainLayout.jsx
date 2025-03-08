import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaCut } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './MainLayout.css';

const MainLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fechar menu móvel ao mudar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Aplicar tema escuro por padrão
  useEffect(() => {
    document.body.classList.add('dark-theme');
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <Link to="/" className="logo">
            BarberBook
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                <FaCalendarAlt /> Serviços
              </Link>
            </li>
            <li>
              <Link to="/barbers" className={location.pathname === '/barbers' ? 'active' : ''}>
                <FaCut /> Encontrar Barbeiro
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                    <FaUser /> Perfil
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="logout-button">
                    <FaSignOutAlt /> Sair
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BarberBook</h3>
            <p>Sua plataforma de agendamento para barbearias</p>
          </div>
          <div className="footer-section">
            <h3>Links Rápidos</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Serviços</Link></li>
              <li><Link to="/barbers">Encontrar Barbeiro</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contato</h3>
            <p>Email: contato@barberbook.com</p>
            <p>Telefone: (11) 9999-9999</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BarberBook - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 