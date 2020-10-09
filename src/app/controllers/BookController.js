const { BOOK_VIEWS_PATH } = require('../views/templates');

const db = require('../../config/database');

const { validationResult } = require('express-validator/check');

const BookDAO = require('../dao/BookDAO');


class BookController {

    static routes() {
        return {
            AUTHENTICATED_ROUTES: '/books*',
            BOOKS_URL: '/books',
            REGISTER_BOOK_URL: '/books/register',
            EDIT_BOOK_URL: '/books/:id/edit',
            REMOVE_BOOK_URL: '/books/:id'
        }
    }
    
    getFormNew() {
        return function(request, response) {
            console.log(`${request.method} request to endpoint -> ${request.url}`);
    
            response.marko(
                BOOK_VIEWS_PATH.FORM,
                { 
                    book: {
                        id: null,
                        title: '',
                        price: null,
                        description: '' 
                    } 
                }
            )
        }
    }

    getFormEdit() {
        return function(request, response) {

            console.log(`${request.method} request to endpoint -> ${request.url}`);
    
            const id = request.params.id;
    
            const bookDAO = new BookDAO(db);
    
            bookDAO.findById(id)
                .then(book => {
                    return response.marko(
                        BOOK_VIEWS_PATH.FORM,
                        {
                            book
                        }
                    );
                })
                .catch(error => console.error(error));
        }
    }

    save() {
        return function(request, response) {
            console.log(`${request.method} request to endpoint -> ${request.url}`);
            console.log('Request body: ' + request.body);

            const book = request.body;

            const validationErrors = validationResult(request);

            if (!validationErrors.isEmpty()) {
                return response.marko(
                    BOOK_VIEWS_PATH.FORM,
                    { 
                        book,
                        validationErrors: validationErrors.array() 
                    }
                ) 
            }
            
            const bookDAO = new BookDAO(db);
            
            bookDAO.save(book)
                .then(
                    response.redirect(BookController.routes().BOOKS_URL)
                )
                .catch(
                    error => console.error(error)
                );
        
        }
    }
    
    findAll() {
        return function(request, response) {
            
            console.log(`${request.method} request to endpoint -> ${request.url}`);
            
            const bookDAO = new BookDAO(db);
            bookDAO.findAll()
                .then(books => {
                    return response.marko(
                        BOOK_VIEWS_PATH.LIST, 
                        {
                            books
                        }
                    );
                })
                .catch(error => console.error(error));
        }
    }
       
    remove() {
        return function(request, response) {
            
            console.log(`${request.method} request to endpoint -> ${request.url}`);
            
            const bookId = Number.parseInt(request.params.id);
    
            const bookDAO = new BookDAO(db);
            bookDAO.remove(bookId)
                .then(response.status(200).end())
                .catch(error => console.error(error));
        }
    }

}

module.exports = BookController;