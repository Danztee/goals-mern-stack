const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
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

  const goal = await Goal.create({ text, user: req.user.id });
  res.status(201).json({ message: "Goal created", data: goal });
};

// @desc    Update Goal
// @route   PUT api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const updateText = req.body;
    const goal = await Goal.findById(goalId);
    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);
    if (!user) throw new Error("User not found");
    if (goal.user.toString() !== user.id)
      throw new Error("User not authorized");

    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateText, {
      new: true,
    });
    res
      .status(200)
      .json({ message: `Goal Updated successfully`, data: updatedGoal });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

// @desc    Delete Goal
// @route   DELETE api/goal/:id
// @access  Private
const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await Goal.findById(goalId);
    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);
    if (!user) throw new Error("User not found");
    if (goal.user.toString() !== user.id)
      throw new Error("User not authorized");

    await Goal.findByIdAndDelete(goalId);
    res.status(200).json({ message: "Goal deleted successfully", id: goalId });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
