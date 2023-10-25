const express = require("express")

const cors = require("cors")
const fs = require("fs");
const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/getDataGames", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))
    res.json(datasGamesFromJson)
})

app.get("/api/recoverGame/:id", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))
    const id = req.params.id
    const game = datasGamesFromJson.Games.find(game => game.id == id)
    res.json(game)
})

app.post("/api/addComment/:id", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))

    const id = req.body.id
    const name = req.body.name
    const comment = req.body.comment
    const avatar = req.body.avatar

    const idGame = req.params.id

    const game = datasGamesFromJson.Games.find(game => game.id == idGame)

    game.comments.push({id: id, name: name, avatar: avatar, comment: comment})
    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", JSON.stringify(datasGamesFromJson))
    res.json(game)
})

app.delete("/api/deleteComment/:id", (req, res) => {
    const datasGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", "utf-8"))

    const commentId = req.params.id

    const id = req.body.id
    const name = req.body.name
    const avatar = req.body.avatar
    const text = req.body.text

    const comment = datasGamesFromJson.Games.comment.find(comment => comment.id == commentId)

    comment.delete({id: id, name: name, avatar: avatar, text: text})

    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesDatas.json", JSON.stringify(datasGamesFromJson))

    res.json(comment)
})
app.listen(3001, () => console.log("Server started..."))