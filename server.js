const app = require('./src/config/custom-express');

const port = 3000;

app.listen(port, function () {
    console.log(`The server is running on port ${port}.`)
});
