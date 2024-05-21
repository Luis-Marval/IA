var chat = document.getElementById("chatbox")
var btn = document.getElementById("send-btn")

btn.addEventListener("click",()=>{    
    var element = document.createElement('li');
    var parrafo = document.createElement('p');
    var Info = document.getElementById("Info").value;
    element.classList.add("chat","outgoing")
    parrafo.innerHTML = Info;
    element.appendChild(parrafo);
    chat.appendChild(element);
})
