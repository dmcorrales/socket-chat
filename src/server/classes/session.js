const User = require("./user")
const mapper = require("automapper-js");
class Session{
    constructor(){
        this.users = []
        this.userEntity = new User();
    }

    connect(req){
        let objectMapper = mapper(User, req);
        this.users.push(objectMapper);
        return this.users;
    }

    findUserById(id){
        let findUser = this.users.filter( p => p.id === id)[0];
        if(!findUser)
            throw new Error("No se ha encontrado el usuario especificado");

        return findUser;
    }

    deleteUserById(id){
        let removedUser = this.findUserById(id);
        console.log("Se ha removido a:" + removedUser.name)
        let findUser = this.users.filter( p => p.id !== id);
        if(!findUser)
            throw new Error("No se ha encontrado el usuario especificado");
        console.log("Ahora hay:" + findUser)
        this.users = findUser;
        return removedUser;
    }

    findSocketIdByUsername(username){
        let user = this.users.filter(p  => p.name === username)[0];
        console.log("entryset ",username)
        return user.id;
    }

    getUsersByRoom(room){
        return this.users;
    }
}

module.exports = Session;