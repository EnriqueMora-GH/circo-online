// Simulando la carga del JSON
const mockData = {
    funciones: [
        { id: 1, hora: "15:00", tipo: "Matinée" },
        { id: 2, hora: "18:00", tipo: "Gala" },
        { id: 3, hora: "21:00", tipo: "Estelar" }
    ],
    precios: { general: 10, preferencial: 20, vip: 35 }
};

const form = document.getElementById('ticket-form');
const selectFuncion = document.getElementById('funcion');
const selectCategoria = document.getElementById('categoria');
const inputCantidad = document.getElementById('cantidad');
const displayTotal = document.getElementById('total-price');

// Cargar funciones al inicio
function inicializar() {
    mockData.funciones.forEach(f => {
        const option = document.createElement('option');
        option.value = f.id;
        option.textContent = `${f.tipo} - ${f.hora}`;
        selectFuncion.appendChild(option);
    });
    calcularTotal();
}

function calcularTotal() {
    const precioUnitario = mockData.precios[selectCategoria.value];
    const cantidad = parseInt(inputCantidad.value);
    displayTotal.textContent = `$${precioUnitario * cantidad}`;
}

// Eventos
[selectCategoria, inputCantidad].forEach(el => {
    el.addEventListener('change', calcularTotal);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("🤡 ¡Reserva exitosa! Te esperamos en el circo.");
});

inicializar();