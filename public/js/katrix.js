var socket = io();
var context = document.getElementById("root");
buildMessage = (msg) => {
    var elem = document.createElement("div");
    elem.setAttribute("class","alert alert-primary");

    var contentAle = document.createElement("p");
    contentAle.innerHTML = msg;
    elem.appendChild(contentAle);
    context.appendChild(elem);
}

socket.on('updateListUsers', (list) => {
    updateListUsers(list);
})

socket.on('sendPrivateMessage', (data) => {
    console.log(data)
    updateChatHistory(data)
})

socket.on('connect', () => {
    buildMessage("Conexión establecida con el servidor");
    let name = params.get("name");
    if(name){
        socket.emit('createConnection', {name} )
    }
}, response => {
    console.log(response)
});

socket.on('generalMessage', (message) => {
    buildMessage(message.message);
})


socket.on('disconnect', function(){
    
})

/***
 * Private messages
 */

 sendMessageTo = (data) => {
     socket.emit('sendMessageTo', data);
 }








/*
let button = document.createElement("button");
button.setAttribute("onClick", "generalMessage()");
let p = document.createElement("p");
p.innerHTML = "Enviar mensaje global";
button.appendChild(p);
document.getElementById("root").appendChild(button);
*/