const app = require('./app');
require('./db/connection')();

app.listen(3000, () => console.log('Listenning on port 3000'));
