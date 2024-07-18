// Función para renderizar los datos en la tabla
function renderMovies(movies) {
    const movieTable = document.getElementById('movie-table');
    movieTable.innerHTML = ''; // Limpiar la tabla antes de renderizar nuevos datos
    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.pelicula}</td>
            <td>${movie.sala}</td>
            <td>${movie.hora}</td>
            <td>${new Date(movie.fecha).toLocaleDateString()}</td>
            <td>${movie.asiento}</td>
            <td>${movie.precio}</td>
        `;
        movieTable.appendChild(row);
    });
}

// Función para obtener los datos desde el servidor y renderizarlos
function fetchAndRenderMovies() {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => renderMovies(movies))
        .catch(error => console.error('Error fetching movies:', error));
}

// Llamada inicial para obtener los datos cuando el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderMovies();
    // Configurar la actualización cada 5 segundos
    setInterval(fetchAndRenderMovies, 5000);
});
