const express = require('express');

const app = express();

app.use('/fail', (req, res) => {
    const statusGatewayTimeout = 504;
    res.status(statusGatewayTimeout).json({ message: 'Gateway Timeout' });
});

app.use('/ok', (req, res) => {
    const statusGatewayTimeout = 200;
    setTimeout(() => {
        res.status(statusGatewayTimeout).json({ message: 'Ok' });
    }, 600);
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
    console.log('http://localhost:3000');
});