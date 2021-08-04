const express = require('express')
const cors = require('cors')
const db = require('./db')

const Notes = db.notes;
const randomstring = require("randomstring");

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3401, () => {
    console.log("Server running")
})

app.get('/', (req, res, next) => {
    res.send('')
})

app.get('/note/:noteHash', (req, res, next) => {
    const noteHash = req.params.noteHash.trim()
    console.log(`get ${noteHash}`)

    console.log(noteHash);
    Notes.findOne({
        where: {
            'url': noteHash
        }
    })
        .then(result => {
            if (result) {
                res.json({ 'result': true, "note": result.text })
                Notes.destroy({where: {id: result.id}}); // if you want delete message!!!
            }
            else {
                res.json({ 'result': false, "text": 'note not found' })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({ 'result': false, "error": err })
        });
})

app.post('/create', (req, res, next) => {
    let note = req.body.note
    note = note.trim();
    if (note === undefined || note === '') {
        res.json({ result: false})
        console.log('Note is  undefined', note)
        return
    }
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    Notes.create({
        url: randomstring.generate({
            length: 24,
            capitalization : 'lowercase'
        }),
        text: note,
        timestamp: Math.floor(Date.now() / 1000),
        clientIp: ip,
        clientUserAgent: req.headers['user-agent']
    }).then(result => {
        res.json({ 'result': true, "url": result.url });
    }).catch(err => {
        console.log(err);
        res.json({ 'result': false, "error": err });

    });
})
