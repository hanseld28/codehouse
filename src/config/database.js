const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USERS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        full_name VARCHAR(40) NOT NULL UNIQUE, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL
    )
`;

const INSERT_USER_1 = 
`
    INSERT INTO users (
        full_name, 
        email,
        password
    ) SELECT 'Hansel Donizete', 'hansel.donizete@gmail.com', 'abc12345' WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'hansel.donizete@gmail.com')
`;

const BOOKS_SCHEMA = 
`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL, 
        price REAL NOT NULL,
        description TEXT DEFAULT ('') NOT NULL
    )
`;

const INSERT_BOOK_1 = 
`
    INSERT INTO books (
        title,
        price,
        description
    ) SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Node na prática')
`;

const INSERT_BOOK_2 = 
`
    INSERT INTO books (
        title, 
        price,
        description
    ) SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'JavaScript na prática')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USERS_SCHEMA);
    db.run(INSERT_USER_1);
    db.run(BOOKS_SCHEMA);
    db.run(INSERT_BOOK_1);
    db.run(INSERT_BOOK_2);

    db.each("SELECT id, full_name, email, password FROM users", (err, user) => {
        console.log('User: ');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('The database connection was closed.');
        process.exit(0);
    })
);

module.exports = db;