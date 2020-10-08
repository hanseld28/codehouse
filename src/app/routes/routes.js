const BookDAO = require('../architecture/dao/BookDAO');
const db = require('../../config/database');

module.exports = (app) => {
    
    app.get('/', function(request, response) {

        console.log(`${request.method} request to endpoint -> ${request.url}`);
        
        response.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body> 
                </html>
            `
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

    app.post('/books', function(request, response) {
        console.log(`${request.method} request to endpoint -> ${request.url}`);
        console.log('Request body: ' + request.body);

        const { 
            title, 
            price, 
            description 
        } = request.body;

        const bookToAdd = {
            title,
            price,
            description
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

    app.put('/books', function(request, response) {
        console.log(`${request.method} request to endpoint -> ${request.url}`);
        console.log('Request body: ' + request.body);

        const { 
            id,
            title, 
            price, 
            description 
        } = request.body;

        const bookToAdd = {
            id,
            title,
            price,
            description
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
