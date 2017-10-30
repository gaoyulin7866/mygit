var express = require('express');
var router = express.Router();
var app = require('../bin/www')
var mysql = require('mysql');
var request = require('request');
var connections = mysql.createConnection({
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
connections.connect();

router.get('/', function(req, res, next) {
    var sql = 'select * from content limit 0,3'
    var data = [];
    var sorts = [];
    var _url = req.cookies.users?req.cookies.users.url:'../images/my.jpg'
    var name = req.cookies.user?req.cookies.user.username:'过客'
    connections.query(sql, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return res.redirect('/error');
        }else {
            var _data = []
            data = result
            var json = {};
            for(var i = 0; i < data.length; i++){
                _data.push(JSON.parse(data[i].other).data)
                if(!json[data[i].sort]){
                    sorts.push(data[i].sort);
                    json[data[i].sort] = 1;
                }
            }
            var sqls = 'select * from content'
            connections.query(sqls, function(err, results) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return res.redirect('/error');
                }else {
                    var _num = Math.ceil(results.length/3)
                    var obj = {'url':_url,'name':name,'data':data,'sorts':sorts,'comment':_data}
                    return res.render('index', { title: '首页', infos:obj,num:_num});
                }
            })
        }
    })
});
router.post('/getdata', function(req, res, next) {
	var _sort = req.body.sort
	var sql = 'select * from content'
	var data = []
	var _data = []
    connections.query(sql, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return res.redirect('/error');
        }else {
        	data = result
        	var sorts = [_sort];
			for(var j = 0; j < data.length; j++){
				if(data[j].sort == _sort){
					_data.push(data[j])
				}
			}
			if(_data.length>0){
				res.end(JSON.stringify(_data));
			}else {
				res.end('没有数据');
			}
        }
    })
});
router.post('/putdata', function(req, res, next) {
    var username = req.cookies.user?req.cookies.user.username:'过客'
    var add_name = req.body.add_name
    var add_sort = req.body.add_sort
    var add_text = req.body.add_text
    var add_time = new Date().toLocaleString()
    var add_other = JSON.stringify({'data':[]})
    if(username == '过客'){
        return res.redirect('/login');
    }else {
        var sqls = 'select grade from content where username = "'+username+'"'
        connections.query(sqls, function(err, result) {
            try {
                var add_grade = result[0].grade+1
                var _sql = `update content set grade = `+add_grade+` where username = '`+username+`'`
                connections.query(_sql, function(err, results) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        return res.redirect('/error');
                    }else {
                        console.log('添加成功');
                    }
                })
                var sql = `insert into content(grade,username,name,sort,cont,time,other) values(`+add_grade+`,"`+username+`","`+add_name+`","`+add_sort+`","`+add_text+`","`+add_time+`",'`+add_other+`')`
                connections.query(sql, function(err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        return res.redirect('/error');
                    }else {
                      return res.redirect('/index');  
                    }
                })
            } catch(e) {
                var sql = `insert into content(grade,username,name,sort,cont,time,other) values(1,"`+username+`","`+add_name+`","`+add_sort+`","`+add_text+`","`+add_time+`",'`+add_other+`')`
                connections.query(sql, function(err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        return res.redirect('/error');
                    }else {
                      return res.redirect('/index');  
                    }
                })
            }
        })
    }
});
router.post('/userInp', function(req, res, next) {

    var user_inp = req.body.cont
    var _name= req.body.name
    var id= parseInt(req.body.id,10)
    var user_name = req.cookies.user?req.cookies.user.username:'过客'
    console.log(user_name)
    if(user_name == '过客'){
        return false
    }else {
       var sql = 'select other from content where id = '+id
        connections.query(sql, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return res.redirect('/error');
            }else {
                var _data = JSON.parse(result[0].other)
                var _time = new Date().toLocaleString()
                _data.data.push({'name':user_name,'cont':user_inp,"time":_time})
                var str = JSON.stringify(_data)
                var _sql = `update content set other = '`+str+`' where id = `+id
                connections.query(_sql, function(err, results) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        return res.redirect('/error');
                    }else {
                        if(user_name!='过客'){
                            var sqls = 'select grade from content where username = "'+user_name+'"'
                            connections.query(sqls, function(err, results) {
                                if (err) {
                                    console.log('[INSERT ERROR] - ', err.message);
                                    return res.redirect('/error');
                                }else {
                                    var num = results[0].grade + 1
                                    var _sqls = `update content set grade = `+num+` where username = '`+user_name+`'`
                                    connections.query(_sqls, function(err, results) {
                                        if (err) {
                                            console.log('[INSERT ERROR] - ', err.message);
                                            return res.redirect('/error');
                                        }else {
                                            console.log('添加成功');
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }) 
    }
});
router.post('/showPage', function(req, res, next) {
    var page = parseInt(req.body.page,10)
    var data = []
    var sorts = [];
    var sql = 'select * from content limit '+((page-1)*3)+',3'
    connections.query(sql, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return res.redirect('/error');
        }else {
            var _data = []
            data = result
            var json = {};
            for(var i = 0; i < data.length; i++){
                _data.push(JSON.parse(data[i].other).data)
                if(!json[data[i].sort]){
                    sorts.push(data[i].sort);
                    json[data[i].sort] = 1;
                }
            }
            var obj = {'data':data,'sorts':sorts,'comment':_data}
            res.end(JSON.stringify(obj));
        }
    })
});

router.post('/getnews', function(req, res, next) {
    request('https://route.showapi.com/1071-1?showapi_appid=47662&showapi_sign=4c70bda39fba4d4a9a809ac6f721b50d', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(JSON.stringify({'data':JSON.parse(body).showapi_res_body.showapi_res_body.list}))
        }else {
            res.end('none')
        }
    })
});
router.post('/getjoke', function(req, res, next) {
    request('https://route.showapi.com/341-1?showapi_appid=47662&showapi_sign=4c70bda39fba4d4a9a809ac6f721b50d', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(JSON.stringify({'data':JSON.parse(body).showapi_res_body.contentlist}))
        }else {
            res.end('none')
        }
    })
});
router.post('/getjokegif', function(req, res, next) {
    request('https://route.showapi.com/341-3?showapi_appid=47662&showapi_sign=4c70bda39fba4d4a9a809ac6f721b50d', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(JSON.stringify({'data':JSON.parse(body).showapi_res_body.contentlist}))
        }else {
            res.end('none')
        }
    })
});
router.post('/getjokeimg', function(req, res, next) {
    request('https://route.showapi.com/341-2?showapi_appid=47662&showapi_sign=4c70bda39fba4d4a9a809ac6f721b50d', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(JSON.stringify({'data':JSON.parse(body).showapi_res_body.contentlist}))
        }else {
            res.end('none')
        }
    })
});
module.exports = router;


























