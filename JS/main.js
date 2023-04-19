
let itemArrastrado;
let cesta = document.getElementById("cesta");
let contenedorCompra = document.getElementById("listado");

// Se crea la escucha del evento dragstart
document.addEventListener("dragstart", function(event){
  itemArrastrado = event.target;
  //cambia la opacidad del elemento
  event.target.style.opacity = .5;

}, false);

// Se crea la escucha del evento drag
document.addEventListener("drag", function(){
  cesta.style.border = "dotted";
  cesta.style.background = "rgb" + "(" + 210 + ", " + 200 + ", " + 191 + ")"
}, false);

// Se crea la escucha del evento dragover
document.addEventListener("dragover", function(event){
  // previene el comportamiento por defecto del elemento arrastrado
   event.preventDefault();
}, false);

// Se crea la escucha del evento dragend
document.addEventListener("dragend", function(event){
  // reestablece el valor de la opacidad
  event.target.style.opacity = 1;
  // reestablece los valores originales de la cesta
  cesta.style.border = "";
  cesta.style.background = ""
  // llama a la funcion que actualiza listado de productos y precios
  actualizarProductosCesta();
}, false);

// Se crea la escucha del evento drop
document.addEventListener("drop", function(event){
  // comprueba si el destino es una zona configurada para soltar
  if(event.target.id == "cestaCompra"){
    // se llama a la funcion que crea o actualiza los productos dropeados
    crearObjeto();
  }
}, false);

// Función para actualizar el total de los productos en el listado y el total de la suma del precio de los productos
let cuentaTotal = document.getElementById("totalCompra");
let estadoCesta = document.getElementById('estadoCesta');
let productosTicket = contenedorCompra.getElementsByTagName("div"); // Cuenta de los elementos de la lista de productos

function actualizarProductosCesta(){

  let cantidadSuma = 0; // Sumatorio del precio de los productos de la lista de productos
  
  if(productosTicket.length == 0){

    cuentaTotal.style.display = "none";
    estadoCesta.innerHTML = "¡La cesta está vacía!";

  }else{

    estadoCesta.innerHTML = "Productos en la cesta: " + productosTicket.length;;
    cuentaTotal.style.display = "";

    for(let i = 0; i <= productosTicket.length; i ++){

      if (contenedorCompra.children[i].id != "ticketCompra"){
        cantidadSuma = (Number(cantidadSuma) + Number(contenedorCompra.children[i].children[1].dataset.total)).toFixed(2);
      }
    }
    cuentaTotal.innerHTML = "Total: " + cantidadSuma + " €";
  }
}

// Función para crear y añadir los detalles a la lista de productos
function crearObjeto(){

  // Se crean los elementos que compondrán cada linea de la lista de productos
  let conjuntoObjeto = document.createElement('div');
  let botonCerrar = document.createElement('button');
  let productoCompra = document.createElement('h4');

  //productoCompra.innerHTML = itemArrastrado.className;
  productoCompra.id = "concepto" + itemArrastrado.className;
  productoCompra.cantidad = 1;
  productoCompra.precio = itemArrastrado.dataset.precio;
  productoCompra.className = "detalleProducto";  // nombre de clase para darle formato CSS

  conjuntoObjeto.className = "lineaTicket"; // nombre de clase para darle formato CSS
  conjuntoObjeto.id = itemArrastrado.className;
  
  botonCerrar.className = "botonListado"; // nombre de clase para darle formato CSS

  // Evento al clickear en el boton de cierre de los detalles de la compra // 
  botonCerrar.addEventListener("click", function(event){
    contenedorCompra.removeChild(event.target.parentNode);
    actualizarProductosCesta();
  },);

  // accedo al elemento que deseo actualizar si es el caso que existe ya en listado de productos
  let elementoActualizar = document.getElementById(productoCompra.id);
  
  // Si no existe nada en el ticket se crea
  if(productosTicket.length==0){

    productoCompra.dataset.total = (Number(productoCompra.precio) * Number(productoCompra.cantidad));
    productoCompra.innerHTML = itemArrastrado.className + " artículos cant. " + productoCompra.cantidad + " x " + productoCompra.precio + " total: " + productoCompra.dataset.total+ " €";

    conjuntoObjeto.appendChild(botonCerrar);
    conjuntoObjeto.appendChild(productoCompra);
    
    return contenedorCompra.appendChild(conjuntoObjeto);

  } else {

    // Se busco en los productos de la lista para no repetir mismo producto sino actualizar la cantidad del mismo en el ticket
    for(let i = 0; i < productosTicket.length; i++){
      
      if(itemArrastrado.className === productosTicket[i].id){
        
        elementoActualizar.cantidad = elementoActualizar.cantidad +1;
        elementoActualizar.dataset.total = (Number(productoCompra.precio) * Number(elementoActualizar.cantidad)).toFixed(2);
        elementoActualizar.innerHTML = productosTicket[i].id + " artículos cant. " + elementoActualizar.cantidad + " x " + productoCompra.precio + " total: " + elementoActualizar.dataset.total + " €";

        // Al existir un articulo igual se actualiza la linea y se sale de la rutina
        return "";
      }
    }

    // Si no existe un producto similar, se crea una nuevo
    productoCompra.innerHTML = itemArrastrado.className + " artículos cant. " + productoCompra.cantidad + " x " + productoCompra.precio + " total: " + (Number(productoCompra.precio) * Number(productoCompra.cantidad)) + " €";
    productoCompra.dataset.total = (Number(productoCompra.precio) * Number(productoCompra.cantidad));
    conjuntoObjeto.appendChild(botonCerrar);
    conjuntoObjeto.appendChild(productoCompra);
    
    return contenedorCompra.appendChild(conjuntoObjeto);
  }
}