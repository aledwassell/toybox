module.exports = (app, db) => {
    app.post('/note', (req, res) => {
        console.log(req.body);
        res.send('you got a note')
    })
}