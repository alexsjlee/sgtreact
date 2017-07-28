const express = require('express');
const path = require('path');
const port = process.env.PORT || 7070;
const app = express();

app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log('Server listening on port:' + port);
});