
const {io} = require("../index");
const Session = require("../classes/session");
const currentSession = new Session();
io.on('connection', socket => {
    console.log('Nueva conexión establecida.');
    socket.on('createConnection', (data, callback) =>{
        currentSession.connect({name: data.name, id:socket.id });
        io.emit('updateListUsers', currentSession.getUsersByRoom(1))
    })

    socket.on('disconnect', () => {
        let user = currentSession.deleteUserById(socket.id);
        socket.broadcast.emit('generalMessage',{
            message: `El usuario ${user.name} abandonó el chat`,
        })
        socket.broadcast.emit('updateListUsers', currentSession.getUsersByRoom(1))
    });
    

    socket.on('generalMessage', (data, callback) => {
        if(data.message)
            callback({
                message:'Se ha creado un mensaje global.'
            });
        else
            callback({
                message:'No se ha recibido el mensaje'
            })

        socket.broadcast.emit('generalMessage', {
            message: data.message
        })
    })

    socket.on('sendMessage', (data, callback) => {
    
        if(data.message)
            callback({
                message:'Se ha recibido el mensaje!'
            });
        else
            callback({
                message:'No se ha recibido el mensaje'
            })

    });

    socket.on('sendMessageTo', (data) => {
        socket.broadcast.to(currentSession.findSocketIdByUsername(data.join)).emit('sendPrivateMessage', {data});
        socket.emit('sendPrivateMessage', {data});
    })

    socket.emit('sendMessage', {
        message: 'Hola cliente!'
    })
});
