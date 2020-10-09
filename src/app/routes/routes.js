const db = require('../../config/database');

const BookController = require('../controllers/BookController');
const BaseController = require('../controllers/BaseController');

const BookValidator = require('../models/validators/BookValidator');

const baseRoutes = require('./base-routes');
const bookRoutes = require('./book-routes');


module.exports = (app) => {
    
    baseRoutes(app);
    bookRoutes(app);
}
