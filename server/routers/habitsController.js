const { where } = require('sequelize');
const { Habits } = require('../db');
const sequelize = require('sequelize');


module.exports = {
  getHabits: (req, res) => {
    const { id } = req.user;
    Habits.findAll({
      where: {
        userId: id 
      },
      order: sequelize.literal('`timesCompleted` < `goal` DESC, `timesCompleted` >= `goal` ASC')
    })
    .then((habits) => {
      res.status(200).send(habits);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },
  
  /**
   *  This functions returns 201 or 500 wheter the habit was updated or not
   * this is the /:HabitId/habits
   * @param {Request} req
   * @param {Response} res
   *
   * @returns {status} 201 || err
   */
  updateHabit: (req, res) => {
    const { HabitId } = req.params;
    const { goal, timesCompleted } = req.body;
    let isComplete = false;
    if (timesCompleted === goal) {
      isComplete === true;
    }

    Habits.update(
      { timesCompleted, goal, isComplete },
      {
        where: {
          id: HabitId,
        },
      },
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
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
    const { goal, description } = req.body;
    const numGoal = Number(goal);
    const { id } = req.user[0];

    Habits.create({
      description,
      goal: numGoal,
      timesCompleted: 0,
      isComplete: false,
      streak: 0,
      UserId: id,
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  deleteHabit: (req, res) => {
    const { HabitId } = req.params;

    Habits.destroy({
      where: {
        id: HabitId,
      },
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
