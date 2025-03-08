const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Um cliente é necessário para o agendamento'],
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Um barbeiro é necessário para o agendamento'],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Um serviço é necessário para o agendamento'],
  },
  startTime: {
    type: Date,
    required: [true, 'Horário de início é obrigatório'],
  },
  endTime: {
    type: Date,
    required: [true, 'Horário de término é obrigatório'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Preço total é obrigatório'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit', 'debit', 'pix', 'other'],
    default: 'cash',
  },
  notes: {
    type: String,
    trim: true,
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: Date,
  },
  cancelReason: String,
  notificationSent: {
    type: Boolean,
    default: false,
  },
  reminderSent: {
    type: Boolean,
    default: false,
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

// Índices para melhor performance em consultas
appointmentSchema.index({ client: 1, startTime: -1 });
appointmentSchema.index({ barber: 1, startTime: -1 });
appointmentSchema.index({ startTime: 1 });
appointmentSchema.index({ status: 1 });

// Método para verificar se há sobreposição de horários para um barbeiro
appointmentSchema.statics.checkOverlap = async function(barberId, startTime, endTime, excludeId = null) {
  const query = {
    barber: barberId,
    status: { $nin: ['cancelled', 'no-show'] },
    $or: [
      // Novo agendamento começa durante um existente
      {
        startTime: { $lte: startTime },
        endTime: { $gt: startTime }
      },
      // Novo agendamento termina durante um existente
      {
        startTime: { $lt: endTime },
        endTime: { $gte: endTime }
      },
      // Novo agendamento engloba um existente
      {
        startTime: { $gte: startTime },
        endTime: { $lte: endTime }
      }
    ]
  };
  
  // Se estamos atualizando um agendamento existente, excluí-lo da verificação
  if (excludeId) {
    query._id = { $ne: mongoose.Types.ObjectId(excludeId) };
  }
  
  const overlappingAppointment = await this.findOne(query);
  return overlappingAppointment;
};

// Método virtual para calcular duração em minutos
appointmentSchema.virtual('durationMinutes').get(function() {
  return Math.ceil((this.endTime - this.startTime) / (1000 * 60));
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
