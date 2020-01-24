var socket = io();
var context = document.getElementById("root");
var params = new URLSearchParams(window.location.search);


buildMessage = (msg) => {
    var elem = document.createElement("div");
    elem.setAttribute("class","alert alert-primary");

    var contentAle = document.createElement("p");
    contentAle.innerHTML = msg;
    elem.appendChild(contentAle);
    context.appendChild(elem);
}

socket.on('updateListUsers', (list) => {
    console.log(list)
})

socket.on('connect', function() {
    buildMessage("Conexión establecida con el servidor");
    let name = params.get("name");
    if(name){
        socket.emit('createConnection', {name} )
    }
});

socket.on('generalMessage', (message) => {
    buildMessage(message.message);
})

class Connection{
    constructor(){

    }

    connect(){

  
    }

    receiveMessage(){
        socket.on('sendMessage', message => {
            buildMessage(message.message);
        })
    }

    sendMessage(message){
        socket.emit('sendMessage', {
            message: 'Hello server!',
        }, (response) => {
            console.log(response)
        })
    }

    receiveGeneralAlert(){
    
    }

    buildGeneralAlert(){
        socket.emit('generalMessage', {
            message: "Hola a todos!" 
        }, (response => {
            buildMessage(response.message);
        }))
    }
}


socket.on('disconnect', function(){
    
})








/*
let button = document.createElement("button");
button.setAttribute("onClick", "generalMessage()");
let p = document.createElement("p");
p.innerHTML = "Enviar mensaje global";
button.appendChild(p);
document.getElementById("root").appendChild(button);
*/