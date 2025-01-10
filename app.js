require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Importer les routes
const userRoutes = require("./routes/userRouter");
const AppointmentRoutes=require("./routes/appointementRouter")
const newsRoutes = require('./routes/newsRouter');

app.use('/api/news', newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", AppointmentRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
