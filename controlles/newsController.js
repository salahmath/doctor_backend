const News = require('../models/news');

// Créer une actualité (Admin uniquement)
exports.createNews = async (req, res) => {
  try {
    const { title, content, image,source } = req.body;

    const news = new News({
      title,
      content,
      image,
      source
    });

    await news.save();
    res.status(201).json({ message: 'News created successfully', news });
  } catch (error) {
    res.status(500).json({ message: 'Error creating news', error });
  }
};

// Récupérer toutes les actualités
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
};

// Mettre à jour une actualité (Admin uniquement)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const news = await News.findByIdAndUpdate(id, updates, { new: true });
    if (!news) return res.status(404).json({ message: 'News not found' });

    res.status(200).json({ message: 'News updated successfully', news });
  } catch (error) {
    res.status(500).json({ message: 'Error updating news', error });
  }
};

// Supprimer une actualité (Admin uniquement)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news', error });
  }
};
