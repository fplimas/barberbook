// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

// Importando rotas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const serviceRoutes = require('./routes/service.routes');
const barberRoutes = require('./routes/barber.routes');

// Configurando variáveis de ambiente
dotenv.config();

// Inicializando app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Servir arquivos estáticos para o frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Conectar ao MongoDB
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/barberbookApp';
mongoose.connect(dbURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Definindo rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/barbers', barberRoutes);

// Rota de teste da API
app.get('/api', (req, res) => {
  res.json({ message: 'API BarberBook - Funcionando' });
});

// Rota para servir o app React em produção
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.log('ERRO NÃO TRATADO! 💥 Encerrando...');
  console.log(err.name, err.message);
  process.exit(1);
});