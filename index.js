var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Server is running for port: ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Your server is running on port: ${PORT}`);
});
