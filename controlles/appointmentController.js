const Appointment = require('../models/Appointment ');
// Créer un rendez-vous
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, reason } = req.body;
    const appointment = new Appointment({
      clientId: req.user,
      date,
      time,
      reason,
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};

// Récupérer les rendez-vous d’un client connecté
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ clientId: req.user }).populate('clientId');;
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Récupérer tous les rendez-vous (admin uniquement)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('clientId', 'name email');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Mettre à jour un rendez-vous (admin uniquement)
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};

// Supprimer un rendez-vous (admin uniquement)
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
