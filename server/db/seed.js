const { User, Journals, Moods, Habits } = require('.');
const loremIpsum = require('lorem-ipsum').LoremIpsum;

//setup lorem-ipsum
const lorem = new loremIpsum();

(function async () {
  let user1, user2;

  const options = { where: {} };

  //clear database
  return User.destroy(options)
    .then(() => Journals.destroy(options))
    .then(() => Moods.destroy(options))
    .then(() => Habits.destroy(options))
    .then(() => {
      console.info('Cleared tables');
    })
    .then(() =>
      User.create({
          username: lorem.generateWords(1),
          location: lorem.generateWords(2),
          googleId: '0001',
      })
    ))
    .then((user) => {
      user1 = user;
      console.log(user1);
    })
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user1.id,
      }),
    )
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user1.id,
      }),
    )
    .then(() =>
      User.create({
          username: lorem.generateWords(1),
          location: lorem.generateWords(2),
          googleId: '0002'
      })
    ))
    .then((user) => {
      user2 = user;
      console.log(user2);
    })
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user2.id,
      }),
    )
    .then(() =>
      Journals.create({
        title: lorem.generateWords(5),
        body: lorem.generateParagraphs(1),
        UserId: user2.id,
      }),
    )
    .then(() => {
      Habits.create({
        description: lorem.generateWords(5),
        goal: 4,
        timesCompleted: 2,
        isComplete: false,
        streak: 3,
      })
    })
    .then(() => {
      console.info('Seeded database');
    })
    .catch((err) => {
      console.error('Could not seed database: ', err);
    });
})();
