const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6,
    select: false, // Não retorna a senha por padrão nas consultas
  },
  phone: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
    default: 'default-avatar.png',
  },
  userType: {
    type: String,
    enum: ['client', 'barber', 'admin'],
    default: 'client',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Campos adicionais para barbeiros
  specialty: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  workingHours: {
    monday: { start: String, end: String, isWorking: Boolean },
    tuesday: { start: String, end: String, isWorking: Boolean },
    wednesday: { start: String, end: String, isWorking: Boolean },
    thursday: { start: String, end: String, isWorking: Boolean },
    friday: { start: String, end: String, isWorking: Boolean },
    saturday: { start: String, end: String, isWorking: Boolean },
    sunday: { start: String, end: String, isWorking: Boolean },
  },
  // Dados para clientes
  favoriteBarbers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  loyaltyPoints: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  // Só executa se a senha foi modificada
  if (!this.isModified('password')) return next();
  
  // Hash da senha com custo de 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Virtual para agendamentos como barbeiro
userSchema.virtual('barberAppointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'barber',
});

// Virtual para agendamentos como cliente
userSchema.virtual('clientAppointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'client',
});

// Método para verificar senha
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar token de redefinição de senha
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos
  
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
