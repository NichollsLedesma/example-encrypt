const routes = require('express').Router();
const bcrypt = require('bcrypt');

routes.get('/', (req, res) => {
    res.render('add');
});
routes.post('/add', (req, res) => {
    let { username, password } = req.body;
    req.getConnection((err, conn) => {
        if (err) res.send(err);
        let passEncrypt = bcrypt.hashSync(password, 10);
        let query = "INSERT INTO test (dni, password) VALUES (" + username + ",\'" + passEncrypt + "\');";
        conn.query(query, (err, result) => {
            if (err) res.send(err);
            console.log(result);
            res.redirect('/login');
        });
    });
});

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(username, password);
    // res.redirect('/admin');
    req.getConnection((err, conn) => {
        if (err) res.send(err);
        let query = "SELECT * FROM test WHERE dni= " + username + " ;";
        conn.query(query, (err, result) => {
            if (err) res.send(err);
            console.log(result);
            if (result.length !== 0) {
                console.log('pass', result[0].password);
                if (bcrypt.compareSync(password, result[0].password)) {
                    res.redirect('/admin');
                } else {
                    res.send('NO es la pass');
                }
            }
        });
    });

});
routes.get('/admin', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) res.send(err);
        let query = "SELECT * FROM test";
        conn.query(query, (err, result) => {
            if (err) res.send(err);
            console.log(result);
            res.send('admin');
        });
    });

});

module.exports = routes;