//---------navlist------------//
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}
//----------navlist---------//

const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragmento = document.createDocumentFragment();

//------------------------------------------ SE CREA EL CARRITO VACÍO
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

//------------------------------------------ EVENTO ON CLICK
cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', e =>{
    btnAccion(e);
})

//------------------------------------ CONSUMO API
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        console.log(data);
        mostrarProductos(data);
    } catch (error) {
        console.log(error);
    }
};
//------------------------------------------- METODO MOSTRAR PRODUCTOS
const mostrarProductos = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);
        templateCard.querySelector('.btn-light').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragmento.appendChild(clone);
    });

    cards.appendChild(fragmento);
};

//--------------------------------------- METODO ADD CARRITO
const addCarrito = e => {
    if (e.target.classList.contains('btn-light')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};

//----------------------------------- METODO INICIALIZAR CARRITO
const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-light').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: parseFloat(objeto.querySelector('p').textContent),
        cantidad: 1
    };

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };
    mostrarCarrito();
};

//--------------------------------- MOSTRAR CARRITO
const mostrarCarrito = () => {
    items.innerHTML = '';
    let indice = 1;
    Object.values(carrito).forEach(producto => {
        const cloneCarrito = document.importNode(templateCarrito, true).querySelector('tr');
        cloneCarrito.querySelector('th').textContent = indice++;
        cloneCarrito.querySelectorAll('td')[0].textContent = producto.title;
        cloneCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        cloneCarrito.querySelector('.btn-info').dataset.id = producto.id;
        cloneCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        cloneCarrito.querySelector('span').textContent = (producto.cantidad * producto.precio).toFixed(2);
        fragmento.appendChild(cloneCarrito);
    });
    items.appendChild(fragmento);
    mostrarFooter();
};

//---------------------------------------------- METODO MOSTRAR FOOTER
const mostrarFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!!</th>
        `
        return;
    } 
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc+cantidad*precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragmento.appendChild(clone)
    footer.appendChild(fragmento)

    const btnVaciar = document.getElementById('vaciar-carrito') 
    btnVaciar.addEventListener('click', () =>{
        carrito = {}
        mostrarCarrito()
    })
}
    /*else {
        const cloneFooter = templateFooter.cloneNode(true);
        footer.appendChild(cloneFooter);
    };*

// Llama a mostrarFooter al cargar la página para que el footer inicial se muestre correctamente*/
mostrarFooter();

//--------------------------------------------- BTN ACCION
const btnAccion = e =>{
    console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        carrito[e.target.dataset.id] = {...producto}
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
            mostrarCarrito()
        }else{
            carrito[e.target.dataset.id] = {...producto}
        }
        mostrarCarrito()
    }
    e.stopPropagation
}