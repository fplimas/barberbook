const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('../utils/appError');

// Função para criar e enviar token JWT
const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Função para criar e enviar resposta com token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remover a senha da resposta
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, userType = 'client' } = req.body;

    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Este email já está em uso. Por favor, use outro email.',
      });
    }

    // Criar novo usuário
    const newUser = await User.create({
      name,
      email,
      password,
      userType,
    });

    // Criar e enviar token JWT
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao registrar usuário. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Por favor, forneça email e senha.',
      });
    }

    // Verificar se o usuário existe e a senha está correta
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email ou senha incorretos.',
      });
    }

    // Criar e enviar token JWT
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao fazer login. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Esqueceu a senha
exports.forgotPassword = async (req, res) => {
  try {
    // Obter usuário pelo email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Não existe usuário com este endereço de email.',
      });
    }

    // Gerar token de redefinição de senha
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // TODO: Enviar email com o token de redefinição
    // Esta é uma implementação simulada. Na versão final, você deve usar um serviço de email.
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    res.status(200).json({
      status: 'success',
      message: 'Token enviado para o email.',
      resetToken, // Remover em produção
      resetURL, // Remover em produção
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao enviar email de redefinição de senha. Tente novamente mais tarde.',
      error: error.message,
    });
  }
};

// Redefinir senha
exports.resetPassword = async (req, res) => {
  try {
    // Obter usuário baseado no token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // Verificar se o token é válido e não expirou
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token inválido ou expirado.',
      });
    }

    // Atualizar senha
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Fazer login (enviar token JWT)
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao redefinir senha. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Atualizar senha (quando o usuário já está logado)
exports.updatePassword = async (req, res) => {
  try {
    // Obter usuário
    const user = await User.findById(req.user._id).select('+password');

    // Verificar se a senha atual está correta
    if (!(await user.correctPassword(req.body.currentPassword))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Sua senha atual está incorreta.',
      });
    }

    // Atualizar senha
    user.password = req.body.newPassword;
    await user.save();

    // Fazer login (enviar novo token JWT)
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao atualizar senha. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Obter perfil do usuário logado
exports.getMe = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

// Atualizar dados do usuário (exceto senha)
exports.updateMe = async (req, res) => {
  try {
    // Verificar se o usuário está tentando atualizar a senha
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Esta rota não é para atualização de senha. Use /update-password.',
      });
    }

    // Filtrar campos que não são permitidos
    const filteredBody = filterObj(req.body, 'name', 'email', 'phone', 'profileImage');

    // Atualizar usuário
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao atualizar perfil. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Desativar conta do usuário
exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao desativar conta. Por favor, tente novamente.',
      error: error.message,
    });
  }
};

// Função auxiliar para filtrar objetos
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}; 