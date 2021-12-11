const express = require("express")
const app = express();
app.use(express.static('public'))
app.listen(4450)
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})