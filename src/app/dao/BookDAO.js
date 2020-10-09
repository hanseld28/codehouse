class BookDAO {

    constructor(db) {
        this._db = db;
    }

    save(book) {
        
        if (book.id) {
            return this._update(book);
        }

        const { title, price, description } = book;

        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO books (
                    title,
                    price,
                    description
                ) VALUES (?, ?, ?)
            `,
            [
                title,
                price,
                description
            ],
            (error) => {
                return (error) 
                ? reject('Did not possible add this book.') 
                : resolve()     
            })
        });
    }

    findById(id) {
        const query = `
            SELECT 
                id, 
                title, 
                price, 
                description 
            FROM 
                books
            WHERE
                id = ?
        `;

        return new Promise((resolve, reject) => {
            
            this._db.get(
                query, 
                id, 
                (error, result) => {
                    return (error) 
                        ? reject('No books found with the specified ID.') 
                        : resolve(result);                
                })
        });   
    }

    findAll() {
        const query = 'SELECT id, title, price, description FROM books';

        return new Promise((resolve, reject) => {

            this._db.all(
                query,
                (error, results) => {
                    return (error) 
                        ? reject('Did not possible listing the books.') 
                        : resolve(results);                
                }
            )
        })
        
    }

    _update({ id, title, price, description }) {

        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE 
                    books
                SET    
                    title = ?,
                    price = ?,
                    description = ?
                WHERE
                    id = ?
            `,
            [
                title,
                price,
                description,
                id
            ],
            (error) => {
                return (error) 
                ? reject('Did not possible add this book.') 
                : resolve()     
            })
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE 
                FROM 
                    books
                WHERE
                    id = ?
            `,
            id,
            (error) => {
                return (error) 
                ? reject('Did not possible remove the wanted book by this ID.') 
                : resolve()     
            })
        });
    }

}

module.exports = BookDAO;