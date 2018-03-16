var ObjectID = require('mongodb').ObjectID;

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

    app.post('/notes', (req, res) => {
        const note = {title: req.body.title, text: req.body.body};
        db.collection('notes').insert(note, (e, result) => {
            if(e) {
                res.send({'error' : 'error was found'})
            } else {
                res.send(result.ops[0])
            }

        })
    })
}