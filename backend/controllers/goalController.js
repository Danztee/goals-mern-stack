const Goal = require("../models/goalModel");

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ message: "Get goals", data: goals });
};

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res) => {
  const text = req.body.text;
  if (!text) {
    res.status(400);
    throw new Error("please enter a text field");
  }

  const goal = await Goal.create({ text });
  res.status(201).json({ message: "Goal created", data: goal });
};

// @desc    Update Goal
// @route   PUT api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  const goalId = req.params.id;
  const updateText = req.body;
  const goal = await Goal.findById(goalId);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateText, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `Goal Updated successfully`, data: updatedGoal });
};

// @desc    Delete Goal
// @route   DELETE api/goal/:id
// @access  Private
const deleteGoal = async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await Goal.findByIdAndDelete(goalId);
  res.status(200).json({ message: "Goal deleted successfully", id: goalId });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
