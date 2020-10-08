const { check, validationResult } = require('express-validator/check');

const BookDAO = require('../architecture/dao/BookDAO');
const db = require('../../config/database');

module.exports = (app) => {
    
    app.get('/', function(request, response) {

        console.log(`${request.method} request to endpoint -> ${request.url}`);
        
        return response.marko(
            require('../views/home/home.marko')
        );
    });

    app.get('/books', function(request, response) {

        console.log(`${request.method} request to endpoint -> ${request.url}`);

        const bookDAO = new BookDAO(db);
        bookDAO.findAll()
            .then(books => {
                return response.marko(
                    require('../views/books/list/list.marko'), 
                    {
                        books
                    }
                );
            })
            .catch(error => console.error(error));
    });

    app.get('/books/new', function(request, response) {
        console.log(`${request.method} request to endpoint -> ${request.url}`);

        response.marko(
            require('../views/books/form/form.marko'),
            { 
                book: {
                    id: null,
                    title: '',
                    price: null,
                    description: '' 
                } 
            }
        )
    })

    app.post('/books', [
            check('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
            check('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido.')
        ], function(request, response) {
            console.log(`${request.method} request to endpoint -> ${request.url}`);
            console.log('Request body: ' + request.body);

            const bookToAdd = request.body;

            const validationErrors = validationResult(request);

            if (!validationErrors.isEmpty()) {
                return response.marko(
                    require('../views/books/form/form.marko'),
                    { 
                        book: {
                            id: null,
                            ...bookToAdd
                        },
                        validationErrors: validationErrors.array() 
                    }
                ) 
            }
            
            const bookDAO = new BookDAO(db);
            
            bookDAO.add(bookToAdd)
                .then(
                    response.redirect('/books')
                )
                .catch(
                    error => console.error(error)
                );
    })

    app.get('/books/:id/edit', function(request, response) {

        console.log(`${request.method} request to endpoint -> ${request.url}`);

        const id = request.params.id;

        const bookDAO = new BookDAO(db);

        bookDAO.findById(id)
            .then(book => {
                return response.marko(
                    require('../views/books/form/form.marko'), 
                    {
                        book
                    }
                );
            })
            .catch(error => console.error(error));
    });

    app.put('/books', [
            check('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
            check('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido.')
        ], function(request, response) {
            console.log(`${request.method} request to endpoint -> ${request.url}`);
            console.log('Request body: ' + request.body);

            const bookToAdd = request.body;

            const validationErrors = validationResult(request);

            if (!validationErrors.isEmpty()) {
                return response.marko(
                    require('../views/books/form/form.marko'),
                    { 
                        book: bookToAdd,
                        validationErrors: validationErrors.array() 
                    }
                ) 
            }

            const bookDAO = new BookDAO(db);
            bookDAO.update(bookToAdd)
                .then(
                    response.redirect('/books')
                )
                .catch(
                    error => console.error(error)
                );
        });

    app.delete('/books/:id', function(request, response) {

        console.log(`${request.method} request to endpoint -> ${request.url}`);

        const bookId = Number.parseInt(request.params.id);

        const bookDAO = new BookDAO(db);
        bookDAO.remove(bookId)
            .then(response.status(200).end())
            .catch(error => console.error(error));
    });
}
