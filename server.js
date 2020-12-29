const express = require('express');
const app = express();
app.use(express.static("hungrySnake"));

app.listen(3001, () => {
    console.log(("Server is listening at port 3001..."))
})