// Mock de datos (Simulando el JSON)
const datosCirco = {
    funciones: [
        { id: 1, nombre: "Gran Gala Estelar", hora: "18:00" },
        { id: 2, nombre: "Noche de Acróbatas", hora: "21:00" },
        { id: 3, nombre: "Show de Payasos", hora: "16:00" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('selectFuncion');
    
    // Cargar funciones en el select
    datosCirco.funciones.forEach(f => {
        let option = document.createElement('option');
        option.value = f.id;
        option.textContent = `${f.nombre} - ${f.hora}`;
        select.appendChild(option);
    });

    // Manejo del Formulario
    document.getElementById('circusForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;

        // Validación simple de correo
        if (validarEmail(email)) {
            alert(`🎪 ¡Felicidades ${nombre}! 🎪\nHemos enviado un enlace de validación a ${email}. Revisa tu bandeja de entrada.`);
        } else {
            alert("Por favor, ingresa un correo electrónico válido.");
        }
    });
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
const PRECIO_TICKET = 15000; // Ejemplo en pesos
let asientosSeleccionados = [];

// Simulación de asientos (6 ocupados aleatoriamente)
const asientosMock = Array.from({length: 24}, (_, i) => ({
    id: i + 1,
    ocupado: Math.random() < 0.2
}));

document.getElementById('circusForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validamos y mostramos la siguiente sección
    document.getElementById('seccionPasos').classList.remove('d-none');
    renderizarAsientos();
    this.querySelector('button').disabled = true;
});

function renderizarAsientos() {
    const contenedor = document.getElementById('mapaAsientos');
    contenedor.innerHTML = '';
    
    asientosMock.forEach(asiento => {
        const div = document.createElement('div');
        div.classList.add('asiento', asiento.ocupado ? 'ocupado' : 'disponible');
        
        if (!asiento.ocupado) {
            div.onclick = () => toggleAsiento(asiento.id, div);
        }
        
        contenedor.appendChild(div);
    });
}

function toggleAsiento(id, elemento) {
    if (asientosSeleccionados.includes(id)) {
        asientosSeleccionados = asientosSeleccionados.filter(a => a !== id);
        elemento.classList.remove('seleccionado');
    } else {
        asientosSeleccionados.push(id);
        elemento.classList.add('seleccionado');
    }
    actualizarTotal();
}

function actualizarTotal() {
    const total = asientosSeleccionados.length * PRECIO_TICKET;
    document.getElementById('totalPago').textContent = `$${total.toLocaleString()}`;
}

document.getElementById('btnIrAPago').onclick = () => {
    if (asientosSeleccionados.length === 0) return alert("¡Elige al menos un asiento!");
    document.getElementById('pasoPago').classList.remove('d-none');
};

document.getElementById('btnFinalizar').onclick = () => {
    alert("✨ ¡Compra exitosa! Tus tickets han sido enviados al correo.");
    location.reload();
};