const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('healthier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId : {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  }
});

const Journals = db.define('Journal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT('long'),
  },
});

const Moods = db.define('Moods', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rank: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.DATE,
  },
});

const Habits = db.define('Habits', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  goal: {
    type: DataTypes.INTEGER,
  },
  timesCompleted: {
    type: DataTypes.INTEGER,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
  },
  streak: {
    type: DataTypes.INTEGER,
  },
});

User.Habits = User.hasMany(Habits);
User.Moods = User.hasMany(Moods);
User.Journals = User.hasMany(Journals);

Habits.User = Habits.belongsTo(User);
Moods.User = Moods.belongsTo(User);
Journals.User = Journals.belongsTo(User);

(async () => {
  try {
    await db.authenticate();
    User.sync();
    Habits.sync();
    Moods.sync();
    Journals.sync();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


module.exports = {
  db,
  User,
  Journals,
  Habits,
  Moods,
}
