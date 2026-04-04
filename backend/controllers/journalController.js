const Journal = require('../models/Journal');

// get all journals for logged in user
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// create a new journal entry
const createJournal = async (req, res) => {
  try {
    const { title, content, photos, location, tags, visibility } = req.body;
    const journal = await Journal.create({
      title, content, photos, location, tags, visibility,
      user: req.user.id
    });
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get a single journal entry
const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    if (journal.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });
    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// delete a journal entry
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    if (journal.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Journal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update a journal entry
const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    if (journal.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });
    const updated = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJournals, createJournal, getJournal, deleteJournal, updateJournal };