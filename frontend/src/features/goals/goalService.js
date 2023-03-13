import axios from "axios";

const API_URL = "http://localhost:8000/api/goals/";

// CREATE NEW GOAL
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(API_URL, goalData, config);
  console.log(res.data);
  return res.data.data;
};

// GET A USER GOALS
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.get(API_URL, config);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

// DELETE A USER GOALS
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(API_URL + goalId, config);
  return res.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
