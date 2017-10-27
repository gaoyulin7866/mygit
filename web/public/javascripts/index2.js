function search() {
    var _val = $('.search')[0].value
    tab(_val)
}

function tab(e) {
    $.post('index/getdata', { 'sort': e }, function(data) {
        if (data != '没有数据') {
            var _data = JSON.parse(data)
            var str = ""
            for (var i = 0; i < _data.length; i++) {
                let comment = JSON.parse(_data[i].other)
                str += '<dl><dt>'
                str += '<span class="content_name"><a href="">' + _data[i].username + '</a></span>'
                str += '<span class="content_title">' + _data[i].name + '</span>'
                str += '<span class="content_sort">' + _data[i].sort + '</span>'
                str += '<span class="content_num">积分:<i>' + _data[i].grade + '</i></span>'
                str += '<span class="content_floor"><em>' + _data[i].id + '</em>楼</span>'
                str += '</dt><dd>'
                str += '<p>' + _data[i].cont + '</p><div>'
                for (var j = 0; j < comment.data.length; j++) {
                    str += '<em>' + comment.data[j].name + ' 说:' + comment.data[j].cont + '<i>&nbsp;&nbsp;&nbsp;' + comment.data[j].time + '</i></em>'
                }
                str += '</div><input class="keydown" onkeydown="keydown(' + _data[i].id + ')" type="text" name="content_inp" value="" placeholder="我有话说~~"  maxlength="100">'
                str += '<span>时间:' + _data[i].time + '</span>'
                str += '</dd></dl>'
            }
            $('.content_main').html(str)
        } else {
            var _str = '<p style="display: block;width: 100px;height: 100px;font-size: 18px;margin: 0 auto;">暂时没有数据,等你来添加！</p>'
            $('.content_main').html(_str)
        }
    });
}

$("#select_page").change(function() {
    var num = $("#select_page")[0].value
    $.post('index/showPage', { 'page': num }, function(data) {
        var _data = JSON.parse(data)
        var str = ""
        var _str = ""
        for (var i = 0; i < _data.data.length; i++) {
            str += '<dl><dt>'
            str += '<span class="content_name"><a href="">' + _data.data[i].username + '</a></span>'
            str += '<span class="content_title">' + _data.data[i].name + '</span>'
            str += '<span class="content_sort">' + _data.data[i].sort + '</span>'
            str += '<span class="content_num">积分:<i>' + _data.data[i].grade + '</i></span>'
            str += '<span class="content_floor"><em>' + _data.data[i].id + '</em>楼</span>'
            str += '</dt><dd>'
            str += '<p>' + _data.data[i].cont + '</p><div>'
            for (var j = 0; j < _data.comment[i].length; j++) {
                str += '<em>' + _data.comment[i][j].name + ' 说:' + _data.comment[i][j].cont + '<i>&nbsp;&nbsp;&nbsp;' + _data.comment[i][j].time + '</i></em>'
            }
            str += '</div><input class="keydown" onkeydown="keydown(' + _data.data[i].id + ')" type="text" name="content_inp" value="" placeholder="我有话说~~"  maxlength="100">'
            str += '<span>时间:' + _data.data[i].time + '</span>'
            str += '</dd></dl>'
        }
        for (var i = 0; i < _data.sorts.length; i++) {
            _str += '<span class="tab' + i.toString() + '" onclick="tab(' + "'" + _data.sorts[i] + "'" + ')">' + _data.sorts[i] + '</span>'
        }
        $('.content_main').html(str)
        $('.wrap_lr_sort').html(_str)
    })
});

function find_word() {
    var text = $('.search_word_inp')[0].value
    window.open("http://www.baidu.com.cn/s?wd=" + text);
}

function keydown(index) {
    if (event.keyCode == '13') {
        if ($('.user_name')[0].textContent == '过客') {
            var host = window.location.host
            window.location.assign('login')
        } else {
            var num = index.toString()
            var index = (index - 1) % 3
            socket.emit('msg', { 'val': $('.keydown')[index].value, 'index': index, 'name': $('.user_name')[0].textContent }); //向服务器发送消息
            var user_inp = $('.keydown')[index].value
            var _name = $('dl').eq(index).children(0).children(0)[0].innerText
            $.post('index/userInp', { 'cont': user_inp, 'name': _name, 'id': num }, function(data) {
                //无返回值
            })
        }
    }
}

function getNews(index) {
    $.post('index/getnews', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            for (var i = 0; i < _data.data.length; i++) {
                str += '<li><a href="' + _data.data[i].long + '">' + _data.data[i].title + '</a></li>'
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.news ul').html(str)
    })
    $.post('index/getjoke', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            var num = _data.data.length > 5 ? 5 : _data.data.length
            for (var i = 0; i < num; i++) {
                str += '<li><a href="javascript:void(0);" onclick="joke_tab()">' + _data.data[i].title + '</a></li>'
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.joke ul').html(str)
    })
    $.post('index/getjokegif', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            var num = _data.data.length > 5 ? 5 : _data.data.length
            for (var i = 0; i < num; i++) {
                str += '<li><a href="javascript:void(0);" onclick="jokegif_tab()">' + _data.data[i].title + '</a></li>'
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.joke_gif ul').html(str)
    })
    $.post('index/getjokeimg', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            var num = _data.data.length > 5 ? 5 : _data.data.length
            for (var i = 0; i < num; i++) {
                str += '<li><a href="javascript:void(0);" onclick="jokeimg_tab()">' + _data.data[i].title + '</a></li>'
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.joke_img ul').html(str)
    })
}

function joke_tab() {
    $.post('index/getjoke', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            for (var i = 0; i < _data.data.length; i++) {
                str += `<dl><dt>` + _data.data[i].title + `</dt><dd>` + _data.data[i].text + `</dd></dl>`
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.content').html(str)
    })
}

function refresh() {
    $.post('index/getnews', function(data) {
        var str = ""
        if (data != 'none') {
            var _data = JSON.parse(data)
            for (var i = 0; i < _data.data.length; i++) {
                str += '<li><a href="' + _data.data[i].long + '">' + _data.data[i].title + '</a></li>'
            }
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.news ul').html(str)
    })
}

function jokegif_tab() {
    $.post('index/getjokegif', function(data) {
        var str = ""
        if (data != 'none') {
            str += '<ul>'
            var _data = JSON.parse(data)
            for (var i = 0; i < _data.data.length; i++) {
                str += `<li><img src="` + _data.data[i].img + `"></li>`
            }
            str += '</ul>'
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.content').html(str)
    })
}

function jokeimg_tab() {
    $.post('index/getjokeimg', function(data) {
        var str = ""
        if (data != 'none') {
            str += '<ul>'
            var _data = JSON.parse(data)
            for (var i = 0; i < _data.data.length; i++) {
                str += `<li><img src="` + _data.data[i].img + `"><span style="display:block;width:400px;height:20px;margin:0;text-align:center;font-size:14px;color:#000;">` + _data.data[i].title + `</span></li>`
            }
            str += '</ul>'
        } else {
            str = '<li><a href="#">接口请求失败</a></li>'
        }
        $('.content').html(str)
    })
}
getNews()