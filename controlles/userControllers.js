const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
exports.register = async (req, res) => {
  const { name, email, phone,password, role, birth } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Utilisateur déjà existant" });

    const user = await User.create({ name, email,phone, password, role, birth });
    res.status(201).json({ message: "Inscription réussie", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Connexion réussie", token,user });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { email } = req.body;

  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("Vous n'êtes pas un administrateur");
  } else {
    next();
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des utilisateurs",
        error: err.message,
      });
  }
};
exports.updateUser=async (req,res)=>{
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true});
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour", error });
    }
}
exports.deleteUser=async (req,res)=>{
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
  
}
exports.bloqUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isBlocked: !user.isBlocked },
        { new: true }
      );
      res.status(200).json({
        message: `Utilisateur ${updatedUser.isBlocked ? "bloqué" : "débloqué"} avec succès`,
        user: updatedUser,
      });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour du statut de blocage", error: error.message });
    }
  };
  
