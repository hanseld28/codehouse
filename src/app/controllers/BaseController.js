const { BASE_VIEWS_PATH } = require('../views/templates');
const BookController = require('./BookController');

class BaseController {

    static routes() {
        return {
            INDEX_URL: '/',
            LOGIN_URL: '/login'
        }
    }

    getIndex() {
        return function(request, response) {

            console.log(`${request.method} request to endpoint -> ${request.url}`);
            
            return response.marko(
                BASE_VIEWS_PATH.HOME
            );
        }
    }

    login() {
        return function(request, response) {
            response.marko(
                BASE_VIEWS_PATH.LOGIN
            )
        }
    }

    doLogin() {
        return function(request, response, next) {
            
            const passport = request.passport;
            console.log('doLogin()')
            passport.authenticate('local', (error, user, message) => {
                if (message) {
                    return response.marko(BASE_VIEWS_PATH.LOGIN);
                }

                console.log(error);
                console.log(user);
                console.log(message);

                if (error) {
                    return next(error);
                }

                request.login(user, (error) => {
                    if (error) {
                        return next(error);
                    }

                    return response.redirect(BookController.routes().BOOKS_URL);
                });
            })(request, response, next);
        }
    }
}

module.exports = BaseController;