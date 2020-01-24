updateListUsers = (listUsers) => {
    let element = document.getElementById("listUsers");
    removeAllChildren(element)
    for(let user in listUsers){
        console.log(listUsers[user]);
        element.appendChild(buildUser(listUsers[user]));
    }
}

removeAllChildren = (parent) =>{
        // Create the Range object
        var rangeObj = new Range();

        // Select all of theParent's children
        rangeObj.selectNodeContents(parent);
    
        // Delete everything that is selected
        rangeObj.deleteContents();
}

buildUser = (user) => {
    let aTag = document.createElement("button");
    aTag.setAttribute("onClick",`joinWithUser("${user.name}")`);
    aTag.appendChild(document.createTextNode(user.name))

    return aTag;
}

joinWithUser = (joinName) => {
    let name = params.get("name");
    window.location.href=("/chat.html?name="+name+"&join="+joinName);
}

document.getElementById("sendMessage").addEventListener("click", () => {
    let message = document.getElementById("inputMessage").value
    sendMessageTo({name:params.get("name"), join: params.get("join"), message})
})

updateChatHistory = ({data}) => {
    let chat = document.getElementById("chat");
    let name = params.get("name");

    chat.appendChild(buildDialog(data.message, data.name !== name));
}

buildDialog = (message , isReceived) => {
    let dialog = document.createElement("div");
    dialog.setAttribute("class", "card message" + (isReceived ? " receivedMessage" : " sendMessage"));
    let text = document.createTextNode(message);
    dialog.appendChild(text);

    return dialog;
}