import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaUserAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpar mensagens anteriores
    setError('');
    setSuccessMessage('');
    
    // Validar campos
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    
    // Validar senha
    if (!validatePassword()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Registrar usuário
      const result = await register({
        name,
        email,
        password,
        userType,
      });
      
      if (result.success) {
        setSuccessMessage('Conta criada com sucesso! Redirecionando para o login...');
        
        // Limpar formulário
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error || 'Erro ao criar conta. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro no servidor. Por favor, tente novamente mais tarde.');
      console.error('Erro de registro:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Criar Conta</h1>
          <p>Registre-se para começar a usar o BarberBook</p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser /> Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="form-control"
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock /> Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tipo de Conta</label>
            <div className="user-type-options">
              <div 
                className={`user-type-option ${userType === 'client' ? 'selected' : ''}`}
                onClick={() => setUserType('client')}
              >
                <FaUserAlt className="user-type-icon" />
                <div className="user-type-info">
                  <span className="user-type-title">Cliente</span>
                  <span className="user-type-desc">Agende serviços de barbearia</span>
                </div>
              </div>
              
              <div 
                className={`user-type-option ${userType === 'barber' ? 'selected' : ''}`}
                onClick={() => setUserType('barber')}
              >
                <FaUserTie className="user-type-icon" />
                <div className="user-type-info">
                  <span className="user-type-title">Barbeiro</span>
                  <span className="user-type-desc">Ofereça seus serviços</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 