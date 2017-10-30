var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async')
var crypto = require("crypto");
var addCrypto = require("../addCrypto");
var addKey = 'MyFirstWeb'
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    // password: 'my-new-password',
    database: 'python1',
    connectTimeout: 5000,
    multipleStatements: true,
    charset: 'UTF8'
})

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '登录' , msg:""});
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: '登录' ,msg:'用户名或密码错误'});
});
router.post('/index', function(req, res, next) {
    var sqls = 'select * from user'
    connection.query(sqls, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return res.redirect('/error');
        }
        async.series([
            function(callback){
                let newPas = addCrypto.aesEncrypt(req.body.password, addKey)
                for (var i = 0; i < result.length; i++) {
                    if ((req.body.username == result[i].name)&&(newPas == result[i].pwd)) {
                        res.cookie("user", {username: req.body.username}, {maxAge: 600000 , httpOnly: false});
                        res.cookie("users",{url: result[i].url}, {maxAge: 600000 , httpOnly: false});
                        return res.redirect('/index');
                    }
                }
                callback(null, 'one');
            },
            function(callback){
                return res.redirect('/login');
                callback(null, 'two');
            }
        ],
        function(err, results){
            if (err) {
               return res.redirect('/error'); 
            }
        });
    })
});

module.exports = router;







