const express = require("express")

const cors = require("cors")
const fs = require("fs");
const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/getDatasGames", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))
    res.json(datasGamesFromJson)
})

app.get("/api/recoverGame/:id", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))
    const id = req.params.id
    const game = datasGamesFromJson.find(game => game.id === id)
    res.json(game)
})

app.listen(3001, () => console.log("Server started..."))