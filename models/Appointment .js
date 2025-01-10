const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

/* Champs du modèle :
clientId : Référence au client ayant pris le rendez-vous (relation avec le modèle User).
date : Date du rendez-vous.
time : Heure du rendez-vous.
reason : Motif du rendez-vous.
status : Statut du rendez-vous (ex. : "en attente", "validé", "refusé").
createdAt et updatedAt : Horodatage.*/

module.exports = mongoose.model('Appointment', appointmentSchema);
