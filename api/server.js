const express = require("express")

const cors = require("cors")
const fs = require("fs");
const bcrypt = require("bcryptjs");
const {randomBytes} = require('crypto');
const app = express()

app.use(cors())
app.use(express.json())

const dataGamesFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesData.json", "utf-8"))
const dataUsersFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\usersData.json", "utf-8"))
const dataTokensFromJson = JSON.parse(fs.readFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\tokensData.json", "utf-8"))

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
    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesData.json", JSON.stringify(dataGamesFromJson, null, 2))
    return res.json(newComment)
})

app.delete("/api/:id/deleteComment/:commentId", (req, res) => {
    const game = dataGamesFromJson.Games.find(game => game.id == req.params.id)
    game.comments = game.comments.filter(comment => comment.id != req.params.commentId)
    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesData.json", JSON.stringify(dataGamesFromJson, null, 2))
    return res.json(game)
})

app.post("/api/addNewGame", (req, res) => {
    console.log("req.body => ", req.body)

    const newGame = {
        id: dataGamesFromJson.Games.length + 3,
        infos: {
            name: req.body.name,
            description: req.body.description,
            imageCard: req.body.imageCard,
            imageBanner: req.body.imageBanner,
            pegi: req.body.pegi,
            date: req.body.date,
            developers: req.body.developers,
            type: req.body.type,
            youtubeVideoLink: req.body.youtubeVideoLink,
        },
        comments: []
    }

    dataGamesFromJson.Games.push(newGame)
    fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\gamesData.json", JSON.stringify(dataGamesFromJson, null, 2))
    return res.json(newGame)
})

app.post("/api/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = dataUsersFromJson.Users.find(user => user.name === username && user.password === password)

    if (user) {
        const token = await generateToken()
        saveToken(user.id, token)

        return res.json({
            id: user.id,
            name: user.name,
            token: token
        })
    } else {
        return res.json({error: "User not found"})
    }
})

// Token part
function generateToken() {
    return new Promise((resolve, reject) => {
        randomBytes(60, (err, buf) => {
            if (err) return reject(err);
            resolve(buf.toString('hex'));
        });
    })
}

function saveToken(userId, token) {
    if (dataTokensFromJson.Tokens.find(token => token.userId === userId)) {
        return
    } else {
        const newToken = {
            userId: userId,
            token: token
        }

        dataTokensFromJson.Tokens.push(newToken);
        fs.writeFileSync("C:\\Users\\Gaby\\Downloads\\only_fun\\api\\tokensData.json", JSON.stringify(dataTokensFromJson, null, 2))
    }
}

function getUserFromReq(req) {
    const token = req.headers.authorization.split(' ')[1]
    const tokens = dataTokensFromJson.Tokens
    console.log(tokens)

    const tokenData = tokens.find(tokenData => tokenData.token === token)

    if (tokenData) {
        const users = dataUsersFromJson.Users
        const user = users.find(user => user.id === tokenData.userId)
        if (user) {
            console.log("Correspondance trouvée => ", user)
            return user
        } else {
            console.log("Auncune correspondance trouvée")
        }
    }
    throw new Error('Invalid token')
}

app.get("/api/me", (req, res) => {
    try {
        const user = getUserFromReq(req);

        console.log(user)

        res.json({
            id: user.id,
            username: user.name,
        });
    } catch (e) {
        res.status(401).json({
            error: e.message
        });
    }
})

app.listen(3001, () => console.log("Server started..."))