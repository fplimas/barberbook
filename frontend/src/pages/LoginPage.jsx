import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt, FaUser, FaCut } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Redirecionar para a página anterior ou para o perfil
      const from = location.state?.from || '/profile';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Atualizar erro local quando o erro de autenticação muda
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Tentar realizar login
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.error || 'Erro ao fazer login. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro no servidor. Por favor, tente novamente mais tarde.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login de demonstração como cliente
  const loginAsDemoClient = async () => {
    setLoading(true);
    setError('');
    try {
      await login('cliente@demo.com', 'senha123');
      navigate('/profile');
    } catch (err) {
      setError('Erro ao usar conta de demonstração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Login de demonstração como barbeiro
  const loginAsDemoBarber = async () => {
    setLoading(true);
    setError('');
    try {
      await login('barbeiro@demo.com', 'senha123');
      navigate('/barber-profile');
    } catch (err) {
      setError('Erro ao usar conta de demonstração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>Login</h1>
            <p>Acesse sua conta para agendar serviços e mais</p>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Digite seu email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Digite sua senha"
                required
              />
            </div>
            
            <div className="forgot-password">
              <Link to="/forgot-password">Esqueceu sua senha?</Link>
            </div>
            
            <button 
              type="submit" 
              className="btn-login" 
              disabled={loading}
            >
              {loading ? 'Processando...' : (
                <>
                  <FaSignInAlt /> Entrar
                </>
              )}
            </button>
          </form>

          {/* Botões de demonstração */}
          <div className="demo-accounts">
            <h3>Contas de Demonstração</h3>
            <div className="demo-buttons">
              <button 
                onClick={loginAsDemoClient} 
                className="btn-demo btn-demo-client" 
                disabled={loading}
              >
                <FaUser /> Entrar como Cliente
              </button>
              <button 
                onClick={loginAsDemoBarber} 
                className="btn-demo btn-demo-barber" 
                disabled={loading}
              >
                <FaCut /> Entrar como Barbeiro
              </button>
            </div>
          </div>
          
          <div className="register-cta">
            <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 