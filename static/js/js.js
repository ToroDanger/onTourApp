const API_URL='http://127.0.0.1:5000/'

const xhr = new XMLHttpRequest();

function onRequestHandler(){
    if(this.readyState == 4 && this.status == 200){
        console.log("funciona")
    }
}

xhr.addEventListener("load",onRequestHandler);
xhr.open('GET','${API_URL}/cursos');
xhr.send();
