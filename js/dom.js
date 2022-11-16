const contenedor = document.querySelector("#contenedor")
const contadorCarrito = document.querySelector("#contadorCarrito")
const btnVaciarCarrito = document.querySelector("#vaciarCarrito")


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//FUNCION TRAER TARJETAS AL MAIN//


function tarjetas(producto) {
  return `
  <div class="card" style="width: 25rem;">
  <img src="${producto.imagen}" class="card-img-top" alt="Dosis Perfecta">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">Primer Disco de Estudio de la banda.</p>
    <p class="card-text2">Precio: $ ${producto.precio}</p>
    <button class="btn btn__contacto" id="${producto.nombre}">Agregar al carrito</button>
    
  </div>
</div>
  `
}

//FUNCION PARA LLAMAR A BOTONES AGREGAR AL CARRITO//

const pulsarBotones = () => {
  const botones = document.querySelectorAll(".btn.btn__contacto")
  botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
      agregarCarrito(btn.id)
    })

  })
}



const agregarCarrito = (merch) => {
  const item = productos.find(prod => prod.nombre === merch)
  if (item !== undefined) {
    carrito.push(item)
    
    mostrarCarrito()
  }
}


//FUNCION CARGAR PRODUCTOS AL CARRITO//

function cargarProductos() {
  contenedor.innerHTML = ""
  productos.forEach(producto => {
    contenedor.innerHTML += tarjetas(producto)
  });
  pulsarBotones()
}
cargarProductos()



const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body")
  modalBody.innerHTML = "";
  carrito.forEach((prod) => {
    const { id, imagen, precio, nombre, cantidad } = prod
    modalBody.innerHTML += `
        <div class="modal__contenedor">
          <div>
          <img class="img-fluid img__carrito" src="${imagen}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
          <p>Cantidad: ${cantidad}</p>
        <p> Precio: $ ${precio}</p>    
        <button onclick= "eliminarProducto(${id})" class="btn btn-danger"">Eliminar producto</button>  
          </div>
        </div>
        `;
        

  })
  guardarCarrito()
  contadorCarrito.textContent = carrito.length
}




vaciarCarrito.addEventListener("click", () => {
  carrito.length = []
  mostrarCarrito();
  if (carrito.length === 0) {
    modalBody.innerHTML = `
    <div>
    <p class="modal-body"></p>
    </div>
      `
  }

})



function eliminarProducto(id) {
  const pdtId = id;
  carrito = carrito.filter((pdt) => pdt.id !== pdtId);
  console.log(id)
  mostrarCarrito();
}


const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}













