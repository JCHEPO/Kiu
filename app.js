let listaAmigos =[];

function elementoTextoFun (elemento,texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
}

function mostrarListaAmigos(){
    let mostrarAmigos = document.getElementById('listaAmigos')
    mostrarAmigos.innerHTML = ""; // asegurarse esté limpia antes de ingresar nuevo valor

    for(let i=0; i<listaAmigos.length; i++){   
        let li = document.createElement("li");
        li.textContent = listaAmigos[i];
        mostrarAmigos.appendChild(li);
    }
}

function agregarAmigo() {
    let nombre = document.getElementById('amigo').value.trim();

    if (nombre === ""){   // verificar que la casilla esté vacia

        alert('El campo está vacio, ingresa un nombre');
        return
    }
        
    if(listaAmigos.includes(nombre)){ // alert si el nombre ya está en la lista
        alert("ese nombre ya existe");
    } else {        // si el nombre no está incluido, lo agregamos
        listaAmigos.push(nombre);
        console.log(listaAmigos);
        limpiarCampo();
        elementoTextoFun('h3','Tu lista de amigos');

        mostrarListaAmigos();

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
        let indice=Math.floor(Math.random()*(listaAmigos.length)); // generar un indice dentro del array
        console.log(indice); 
        console.log(listaAmigos[indice]);
        elementoTextoFun('h2', `Tu amigo secreto es <strong>${listaAmigos[indice]}!</strong> `);
    }
}
