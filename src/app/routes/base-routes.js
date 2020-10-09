const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

const { INDEX_URL, LOGIN_URL } = BaseController.routes();

module.exports = (app) => {
    app.get(INDEX_URL, baseController.getIndex());

    app.route(LOGIN_URL)
        .get(baseController.login())
        .post(baseController.doLogin());
}
