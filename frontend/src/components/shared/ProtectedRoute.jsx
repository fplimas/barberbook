import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Se estiver carregando, mostra um loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se precisar de uma role específica e o usuário não tiver, redireciona para a página inicial
  if (roleRequired && user.userType !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado e tiver a role necessária, renderiza o conteúdo
  return children;
};

export default ProtectedRoute; 