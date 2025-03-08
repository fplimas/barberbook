import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <FaExclamationTriangle />
          </div>
          
          <h1>404</h1>
          <h2>Página Não Encontrada</h2>
          
          <p>
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <FaHome /> Voltar para a Página Inicial
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline"
            >
              <FaArrowLeft /> Voltar para a Página Anterior
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 