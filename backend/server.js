const express = require('express');
const chalk = require('chalk');


const app = express();
const PORT = 3000;

app.use((req,res,next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(`${chalk.yellow.bgBlack(req.method)}, ${req.hostname}, ${req.path}, ${req.time}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(chalk.green.bold(`Server is running on http://localhost:${PORT}`));
});
