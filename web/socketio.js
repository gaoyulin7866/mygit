var socketio = {};  
var socket_io = require('socket.io');  
  
//获取io  
socketio.getSocketio = function(server){  
  	
    var io = socket_io.listen(server);  
    io.sockets.on('connection', function(socket) {
    var _time = new Date().toLocaleString();
    //向所有客户发送消息
    socket.on('msg', function(data) {
        var _times = new Date().toLocaleString();
        io.sockets.emit("notification",{cont:data,time:_times});
    })
});
  
};  
  
module.exports = socketio;  