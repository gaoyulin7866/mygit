var fs = require('fs');
var express = require('express');
var multer = require('multer')
var router = express.Router();
var mysql = require('mysql');
var COS = require('cos-nodejs-sdk-v5');
var storge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        cb(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);
    }
})
var upload = multer({storage: storge})
// var _images = require("images");
var cos = new COS({
    AppId: '1254541115',
    SecretId: 'AKIDyz3AC8EYecP2TkCmfQ8sgXTk4QpHetxy',
    SecretKey: '4KQVP8ayABze7PXTIweBi41unU3dDnNa',
});
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

router.get('/', function(req, res, next) {
    
    var num = req.cookies.redirect?req.cookies.redirect.num:'0'
    res.cookie("redirect", {num: '0'}, {maxAge: 600000 , httpOnly: false});
    if(num == '0'){
        res.render('adduser', { title: '注册', msg: '' });
    }else if(num == '1'){
        res.render('adduser', { title: '注册', msg: '两次密码不正确' });
    }else if(num == '2'){
        res.render('adduser', { title: '注册', msg: '用户名被占用' });
    }else if(num == '3'){
        res.render('adduser', { title: '注册', msg: '上传图片失败,请重新上传' });
    }
});
router.post('/addname', upload.single('filename'), function(req, res, next) {
    if(req.body.password!=req.body.passwords){
        res.cookie("redirect", {num: '1'}, {maxAge: 600000 , httpOnly: false});
        return res.redirect('/adduser');
    }
    var upload_name = req.file.mimetype.split('/')[1]
    console.log(upload_name)
    if((upload_name=='png')||(upload_name=='jpg')||(upload_name=='jpeg')){
        var fileName = new Date().getTime().toString() + '.' + req.file.originalname.split(".")[1]
        fs.readFile(req.file.path, function(err, data) {
            if (err) {
                console.log(err)
                console.log(JSON.stringify({ status: '102', msg: '文件写入失败' }));
                return res.redirect('/error');
            } else {
                var localFile = req.file.path;
                var key = fileName;

                var params = {
                    Bucket: 'upload',
                    Region: 'ap-chengdu',
                    Key: key,
                    FilePath: localFile,
                }
                cos.sliceUploadFile(params, function(err, data) {
                    if (err) {
                        fs.unlinkSync(localFile);
                        console.log(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }));
                        res.cookie("redirect", {num: '3'}, {maxAge: 600000 , httpOnly: false});
                        return res.redirect('/adduser');
                    } else {
                        fs.unlinkSync(localFile);//删除文件
                        imgUrl = 'http://upload-1254541115.coscd.myqcloud.com/' + data.Key;
                        console.log(JSON.stringify({ status: '100', msg: '上传成功', imageUrl: imgUrl }));
                        var sqls = 'select name from user'
                        connection.query(sqls, function(err, result) {
                            if (err) {
                                console.log('[INSERT ERROR] - ', err.message);
                                return res.redirect('/error');
                            } 
                            for(var i = 0; i < result.length; i++){
                                if(req.body.username == result[i].name){
                                    res.cookie("redirect", {num: '2'}, {maxAge: 600000 , httpOnly: false});
                                    return res.redirect('/adduser');
                                }
                            }
                            var sql = 'INSERT INTO user(name,pwd,url) VALUES("' + req.body.username + '","' + req.body.password + '","' + imgUrl + '")'
                            connection.query(sql, function(err, result) {
                                if (err) {
                                    console.log('[INSERT ERROR] - ', err.message);
                                    return res.redirect('/error');
                                }
                            })
                            res.cookie("user", {username: req.body.username}, {maxAge: 600000 , httpOnly: false});
                            res.cookie("users",{url: imgUrl}, {maxAge: 600000 , httpOnly: false});
                            return res.redirect('/index');
                        })
                    }
                });
            }
        })
    }else {
        res.cookie("redirect", {num: '3'}, {maxAge: 600000 , httpOnly: false});
        return res.redirect('/adduser');
    }
    
});

module.exports = router;









