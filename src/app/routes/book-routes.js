const BookController = require('../controllers/BookController');
const BaseController = require('../controllers/BaseController');

const BookValidator = require('../models/validators/BookValidator');

const bookController = new BookController();

const {
    AUTHENTICATED_ROUTES,
    REGISTER_BOOK_URL,
    BOOKS_URL,
    EDIT_BOOK_URL,
    REMOVE_BOOK_URL
} = BookController.routes();

module.exports = (app) => {
    
    app.use(AUTHENTICATED_ROUTES, function(request, response, next) {
        if (request.isAuthenticated()) {
            next();
        } else {
            response.redirect(BaseController.routes().LOGIN_URL);
        }
    });

    app.route(REGISTER_BOOK_URL)
        .get(bookController.getFormNew())
        .post(BookValidator.validators(), bookController.save())
        .put(BookValidator.validators(), bookController.save());

    app.get(BOOKS_URL, bookController.findAll());
    app.get(EDIT_BOOK_URL, bookController.getFormEdit());
    app.delete(REMOVE_BOOK_URL, bookController.remove());
}
