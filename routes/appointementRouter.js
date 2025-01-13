const express = require('express');
const router = express.Router();
const { 
  createAppointment, 
  getMyAppointments, 
  getAllAppointments, 
  updateAppointment, 
  deleteAppointment,
  getAllAppNonRejected
} = require('../controlles/appointmentController');
const { authMiddleware } = require('../authmidellware/index');
const { isAdmin } = require('../controlles/userControllers');

// Client routes
router.post('/createApp', authMiddleware, createAppointment);
router.get('/mine', authMiddleware, getMyAppointments);

// isAdmin routes

router.get('/getAllappNrej', getAllAppNonRejected);
router.get('/getAllapp', getAllAppointments);
router.put('/updateApp/:id', authMiddleware, isAdmin, updateAppointment);
router.delete('/deleteApp/:id', authMiddleware, isAdmin, deleteAppointment);

module.exports = router;
