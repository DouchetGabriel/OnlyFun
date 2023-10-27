const express = require("express")

const cors = require("cors")
const fs = require("fs");
const app = express()

app.use(cors())
app.use(express.json())

const dataGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))

app.get("/api/getDataGames", (req, res) => {
    res.json(dataGamesFromJson)
})

app.get("/api/recoverGame/:id", (req, res) => {
    const id = req.params.id
    const game = dataGamesFromJson.Games.find(game => game.id == id)
    res.json(game)
})

app.post("/api/:id/addComment", (req, res) => {
    console.log("req.body => ", req.body)
    const game = dataGamesFromJson.Games.find(game => game.id == req.params.id)

    const newComment = {
        id: Math.floor(Math.random() * 100),
        author: {
            name: req.body.name,
            avatar: "https://i.pravatar.cc/300",
            id: Math.floor(Math.random() * 100),
        },
        text: req.body.comment,
    }

    game.comments.push(newComment)
    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", JSON.stringify(dataGamesFromJson, null, 2))
    return res.json(newComment)
})

app.listen(3001, () => console.log("Server started..."))