module.exports = (app, db) => {
    app.post('/note', (req, res) => {
        res.send('you got a note')
    })
}