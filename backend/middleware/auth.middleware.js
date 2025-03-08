const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/appError');

// Middleware para proteger rotas (requer autenticação)
exports.protect = async (req, res, next) => {
  try {
    // 1) Obter o token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Você não está logado. Por favor, faça login para ter acesso.',
      });
    }

    // 2) Verificar o token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Verificar se o usuário ainda existe
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'O usuário deste token não existe mais.',
      });
    }

    // 4) Armazenar o usuário no request para uso posterior
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Autenticação inválida. Por favor, faça login novamente.',
    });
  }
};

// Middleware para restringir acesso a determinados tipos de usuário
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // verifica se o tipo de usuário está na lista de roles permitidos
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Você não tem permissão para realizar esta ação.',
      });
    }
    next();
  };
}; 