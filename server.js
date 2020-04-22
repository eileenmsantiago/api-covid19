'use strict';

const app = require('./functions/server');
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Local app listening on port!'));