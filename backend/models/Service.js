const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do serviço é obrigatório'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Preço do serviço é obrigatório'],
    min: 0,
  },
  durationMinutes: {
    type: Number,
    required: [true, 'Duração do serviço é obrigatória'],
    min: 5,
  },
  category: {
    type: String,
    enum: ['haircut', 'beard', 'combo', 'hair-treatment', 'other'],
    default: 'haircut',
  },
  image: {
    type: String,
    default: 'default-service.jpg',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para formatar o preço como R$ XX,XX
serviceSchema.virtual('formattedPrice').get(function() {
  return `R$ ${this.price.toFixed(2).replace('.', ',')}`;
});

// Virtual para formatar a duração como Xh Ymin
serviceSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.durationMinutes / 60);
  const minutes = this.durationMinutes % 60;
  
  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}min`;
  }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service; 