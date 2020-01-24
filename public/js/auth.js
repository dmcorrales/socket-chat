auth = (form) => {
    let name = form.name.value;
    if(name)
        window.location.href=("/chat.html?name="+name);
}