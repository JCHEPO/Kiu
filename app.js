let listaAmigos =[];

function ElementoTextoFun (elemento,texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
}

function agregarAmigo() {
    let nombre = document.getElementById('amigo').value.trim();

    if (nombre === ""){   // verificar que la casilla esté vacia
        ElementoTextoFun('p', 'El campo está vacio, ingresa un nombre');
        return
    }
        
    if(listaAmigos.includes(nombre)){ // alert si el nombre ya está en la lista
        alert("ese nombre ya existe");
    } else {        // si el nombre no está incluido, lo agregamos
        listaAmigos.push(nombre);
        console.log(listaAmigos);
        limpiarCampo();
        ElementoTextoFun('p', `tienes a ${listaAmigos}`);
        }
    return;
}

function limpiarCampo(){
    let valorCampo = document.querySelector('#amigo').value="";
}


function sortearAmigo(){
    if(listaAmigos.length===0) {
        alert("Tu lista de amigos está vacia");
    } else {
        let indice=Math.floor(Math.random()*(listaAmigos.length-1))+1; // generar un indice dentro del array
        console.log(indice); 
        console.log(listaAmigos[indice]);
        ElementoTextoFun('h2', `Tu amigo secreto es ${listaAmigos[indice]}`);
    }
}
