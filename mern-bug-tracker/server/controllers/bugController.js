const Bug = require('../models/Bug');

exports.getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

exports.createBug = async (req, res) => {
  const bug = new Bug(req.body);
  await bug.save();
  res.status(201).json(bug);
};

exports.updateBug = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const bug = await Bug.findByIdAndUpdate(id, { status }, { new: true });
  if (!bug) return res.status(404).json({ message: 'Bug not found' });
  res.json(bug);
};

exports.deleteBug = async (req, res) => {
  const { id } = req.params;
  const bug = await Bug.findByIdAndDelete(id);
  if (!bug) return res.status(404).json({ message: 'Bug not found' });
  res.json({ message: 'Bug deleted' });
};
