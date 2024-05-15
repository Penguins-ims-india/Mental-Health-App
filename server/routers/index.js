const express = require('express');
const weatherController = require('./weatherController');
const journalController = require('./journalController');
const userController = require('./userController');

const router = express.Router();

// Weather Routers
router.route('/weather').get(weatherController.getWeather);

// User Routers
router.route('/:UserId').get(userController.getUser);
router.route('/user').post(userController.addUser);

// Journal Routers
router.route('/:UserId/journal').get(journalController.getJournals);
router.route('/:UserId/journal').post(journalController.addJournal);
router.route('/:UserId/journal/:id').get(journalController.getJournalEntry);
router.route('/:UserId/journal/:id').put(journalController.updateJournalEntry);
router.route('/:UserId/journal/:id').delete(journalController.deleteJournalEntry);

module.exports = router;
