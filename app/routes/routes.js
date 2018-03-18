const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = (app, db) => {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').findOne(details, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(item)
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        const note = {title: req.body.title, text: req.body.body};
        db.collection('notes').update(details, note, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(item)
            }
        })
    })

    app.post('/notes', jsonParser, (req, res) => {
        const note = {title: req.body.title, text: req.body.body};
        db.collection('notes').insert(note, (e, result) => {
            if(e) {
                res.send({'error' : 'error was found'})
            } else {
                console.log(res.body)
                res.send(result.ops[0])
            }

        })
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').remove(details, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(`Note ${id} was deleted`);
            }
        })
    })
}