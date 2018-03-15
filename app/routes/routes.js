module.exports = (app, db) => {
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').insert(note, (e, result) => {
            if(e) {
                res.send({'error' : 'error was found'})
            } else {
                res.send(result.ops[0])
            }

        })
    })
}