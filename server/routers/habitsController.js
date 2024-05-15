const { Habits } = require('../db');

const userId = 13;

module.exports = {
  getHabits: (req, res) => {
    Habits.findAll({})
      .then((habits) => {
        res.status(200).send(habits);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  /**
   *  This function post a new Habit to the Database
   * in the User table and associates a user with their habits
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {status} 201 || err
   */
  postHabit: (req, res) => {
    const { UserId } = req.params;
    const { goal, description} = req.body;
    const { goal, description } = req.body;

    const numGoal = Number(goal);

    Habits.create({
      description,
      goal: numGoal,
      timesCompleted: 0,
      isComplete: false,
      streak: 0, 
      UserId
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
      streak: 0,
      UserId,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};