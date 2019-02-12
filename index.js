var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');



app.listen(PORT, () => {
    console.log(`Your server is running on port: ${PORT}`);
});
