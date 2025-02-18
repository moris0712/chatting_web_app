var clients = new Array();
clients ={};
$(function(){
    var socket = io();

    socket.emit("login", {username: username});


    socket.on("login", function (data){
        $("#chatLog").append("<li><strong>" + data + "</strong> has entered</li>");
    });
    socket.on("logout", function (data){
        $("#chatLog").append("<li><strong>" + data + "</strong> has exited</li>");
    });
    socket.on("userlist",function(data){
        $("#connect").empty();
        for(var i=0; i<data.length; i++){
            $("#connect").append("<strong>" + data[i]+ "<br>");
        }
    });

    socket.on("chat", function (data){
        var date = new Date();
        $("#chatLog").append("<li><strong>" + data.username + "</strong>: " + data.msg + " ("+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+")</li>");
    });
    $("#myForm").submit(function(e){
        e.preventDefault();
        var $msgForm = $("#msgForm");

        socket.emit("chat", {msg: $msgForm.val() });
        document.getElementById('msgForm').value = ''
    });
});