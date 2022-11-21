const contenedor = document.querySelector("#contenedor")
const contadorCarrito = document.querySelector("#contadorCarrito")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const importeTotal = document.querySelector("#importeTotal")
const confirmarCompra = document.querySelector("#confirmarCompra")


document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || []
  mostrarCarrito()
})

let carrito = []

productos.forEach((prod) => {
  const { id, imagen, nombre, descripcion, precio, cantidad } = prod
  contenedor.innerHTML += `
    <div class="card" style="width: 25rem;">
    <img src="${imagen}" class="card-img-top" alt="Dosis Perfecta">
    <div class="card-body">
      <h5 class="card-title text-center">${nombre}</h5>
      <p class="card-text2">${descripcion}.</p>
      <p class="card-text2">Precio: $ ${precio}</p> 
      <button onclick="agregarCarrito (${id})"class="btn btn__contacto">Agregar al carrito</button>
      
    </div>
  </div>
    
    `
})

confirmarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'No has seleccionado ningún producto',
      text: 'Por favor selecciona algún producto',
      confirmButtonText: "Aceptar",

    })

  } else {
    Swal.fire({
      icon: 'success',
      title: 'Muchas Gracias por tu Compra!',
      confirmButtonText: "Aceptar",
    })
      .then((result) => {
        if (result.isConfirmed) {
          location.href = "../index.html";
        }
      });
  };

  localStorage.clear()
}

)


vaciarCarrito.addEventListener("click", () => {
  carrito.length = []
  mostrarCarrito()
})



function agregarCarrito(id) {

  const itemSelec = carrito.some(prod => prod.id === id)

  if (itemSelec) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = productos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
}


//TRAER PRODUCTOS AL MODAL//

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body")
  modalBody.innerHTML = ""
  carrito.forEach((prod) => {
    const { id, imagen, nombre, descripcion, precio, cantidad } = prod
    modalBody.innerHTML += `
        <div class="modal__contenedor">
          <div>
          <img class="img-fluid img__carrito" src="${imagen}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
          <p> ${descripcion}</p>
          <p>Cantidad: ${cantidad}</p>
        <p> Precio: $ ${precio}</p>
        <button onclick= "eliminarProducto(${id})" class="btn btn-danger"">Eliminar Producto</button>  
          </div>
        </div>
        `
  })

  if (carrito.length === 0) {
    modalBody.innerHTML = `  
        <p class= "text-center"> Tu Carrito está Vacío!</p>
     `
  }


  importeTotal.textContent = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)



  contadorCarrito.textContent = carrito.length

  guardarCarrito()

}



//FUNCION ELIMINAR PRODUCTO DEL CARRITO//

function eliminarProducto(id) {
  const merchId = id
  carrito = carrito.filter((merch) => merch.id !== merchId)
  mostrarCarrito()
}

//FUNCION PARA GUARDAR EN LOCAL STORAGE//

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}