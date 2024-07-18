// Manejar el envío del formulario para agregar una nueva película
document.getElementById('movie-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const pelicula = document.getElementById('pelicula').value;
    const sala = document.getElementById('sala').value;
    const hora = document.getElementById('hora').value;
    const fecha = document.getElementById('fecha').value;
    const asiento = document.getElementById('asiento').value;
    const precio = document.getElementById('precio').value;

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pelicula, sala, hora, fecha, asiento, precio })
    })
    .then(response => response.json())
    .then(movie => {
        console.log('Película agregada:', movie);
        // Limpiar los campos del formulario
        document.getElementById('pelicula').value = '';
        document.getElementById('sala').value = '';
        document.getElementById('hora').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('asiento').value = '';
        document.getElementById('precio').value = '';
    })
    .catch(error => console.error('Error adding movie:', error));
});
