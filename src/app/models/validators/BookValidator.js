const { check } = require('express-validator/check');

class BookValidator {

    static validators() {
        return [
            check('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
            check('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido.')
        ];
    }
}

module.exports = BookValidator;