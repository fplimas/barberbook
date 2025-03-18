# BarberBook - Sistema de Agendamento para Barbearias

BarberBook é uma aplicação web completa para gerenciamento de barbearias, permitindo que clientes agendem serviços online e barbeiros gerenciem sua agenda, clientes e finanças.

![BarberBook Preview](https://via.placeholder.com/800x400?text=BarberBook+Preview)

## Funcionalidades

### Para Clientes
- Cadastro e gerenciamento de perfil de usuário
- Visualização de todos os barbeiros disponíveis
- Agendamento de serviços (cortes, barbas, etc.)
- Histórico de agendamentos
- Sistema de avaliação de serviços
- Lista de barbeiros favoritos

### Para Barbeiros
- Dashboard com visão geral de agendamentos e receita
- Perfil profissional personalizado 
- Gestão de horários e disponibilidade
- Gerenciamento de clientes com sistema de fidelidade
- Controle financeiro e relatórios
- Inventário e gestão de produtos
- Planos de assinatura (Básico, Premium, Profissional)

## Tecnologias Utilizadas

### Frontend
- React.js
- React Router
- CSS Moderno
- Hooks personalizados para gerenciamento de estado
- Bibliotecas: react-icons, axios

### Backend (em desenvolvimento)
- Node.js
- Express
- MongoDB
- JWT para autenticação

## Instalação e Execução

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Frontend
```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

### Backend (quando disponível)
```bash
# Navegar para a pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

## Contas de Demonstração

Para testar o sistema, você pode usar as seguintes contas:

### Cliente
- Email: cliente@demo.com
- Senha: qualquer valor (para fins de demonstração)

### Barbeiro
- Email: barbeiro@demo.com
- Senha: qualquer valor (para fins de demonstração)

## Estrutura do Projeto

```
barberbook/
├── frontend/             # Aplicação React
│   ├── public/           # Arquivos públicos
│   └── src/              # Código fonte
│       ├── components/   # Componentes React
│       ├── context/      # Contextos (autenticação, etc.)
│       ├── pages/        # Páginas da aplicação
│       └── services/     # Serviços (API, etc.)
│
└── backend/              # API Node.js (em desenvolvimento)
    ├── controllers/      # Controladores 
    ├── models/           # Modelos de dados
    ├── routes/           # Rotas da API
    └── middleware/       # Middlewares
```

## Roadmap

- [x] Sistema de autenticação
- [x] Perfil de cliente
- [x] Perfil de barbeiro
- [x] Gerenciamento financeiro
- [x] Gerenciamento de clientes
- [ ] Implementação completa do backend
- [ ] Sistema de pagamentos
- [ ] Aplicativo móvel

## Licença

Este projeto está licenciado sob a licença MIT.

## Contato

Para mais informações sobre este projeto, entre em contato.

---

Desenvolvido por Filipe Fernando para o mercado de barbearias. 
