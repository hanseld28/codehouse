class UserDAO {

    constructor(db) {
        this._db = db;
    }

    findByEmail(email) {
        const query = `
            SELECT 
                id,
                full_name, 
                email,
                password
            FROM 
                users
            WHERE
                email = ?
        `;
        
        return new Promise((resolve, reject) => {
            this._db.get(
                query,
                [email],
                (error, user) => {
                        return (error) 
                        ? reject('No user found with the specified e-mail.') 
                        : resolve(user);                
                }
            );
        });
    }

}

module.exports = UserDAO;