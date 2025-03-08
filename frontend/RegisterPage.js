import React, { useState } from 'react';
import { registerUser } from './api'; // Importa a função de registro do api.js

function RegisterPage() {
  // Definindo os estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client'); // Definindo o tipo de usuário (client, barber, etc.)

  // Função para processar o registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    try {
      const response = await registerUser(name, email, password, userType); // Chama a função de registro do api.js
      console.log('Usuário registrado com sucesso!', response);
      // Aqui você pode redirecionar o usuário ou limpar o formulário
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <div>
      <h1>Registrar Usuário</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="client">Cliente</option>
          <option value="barber">Barbeiro</option>
          {/* Adicione mais opções se necessário */}
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;