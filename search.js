document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { name: "Torta de Limón", link: "productos.html#torta-limon", id: "1" },
        { name: "Torta de Chocolate", link: "productos.html#torta-chocolate", id: "2" },
        { name: "Torta Tres Leches", link: "productos.html#torta-tres-leches", id: "3" },
        { name: "Torta Marmoleada", link: "productos.html#torta-marmoleada", id: "4" },
        { name: "Torta de Vainilla", link: "productos.html#torta-vainilla", id: "5" },
        { name: "Torta Red Velvet", link: "productos.html#torta-red-velvet", id: "6" },
        { name: "Torta Húmeda de Chocolate", link: "productos.html#torta-humeda-chocolate", id: "7" },
        { name: "Galletas de Chocolate", link: "productos.html#galletas-chocolate", id: "8" },
        { name: "Galletas de Vainilla", link: "productos.html#galletas-vainilla", id: "9" },
        { name: "Galletas Red Velvet", link: "productos.html#galletas-red-velvet", id: "10" },
        { name: "Galletas Craqueladas", link: "productos.html#galletas-craqueladas", id: "11" },
        { name: "Galletas de Limón", link: "productos.html#galletas-limon", id: "12" },
        { name: "Galletas de Chispitas", link: "productos.html#galletas-chispitas", id: "13" },
        { name: "Galletas Tradicionales de Mantequilla", link: "productos.html#galletas-mantequilla", id: "14" },
        { name: "Pie de Limón", link: "productos.html#pie-limon", id: "15" },
        { name: "Pie de Parchita", link: "productos.html#pie-parchita", id: "16" },
        { name: "Cheesecake", link: "productos.html#cheesecake", id: "17" },
        { name: "Brownie", link: "productos.html#brownie", id: "18" },
    ].sort((a, b) => a.name.localeCompare(b.name));

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Función mejorada de búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            searchResults.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );

        displayResults(filteredProducts);
    }

    // Mostrar resultados
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No se encontraron productos</div>';
        } else {
            results.forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = product.link;
                resultItem.className = 'result-item';
                resultItem.textContent = product.name;
                
                // Asegurar que el enlace funcione
                resultItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = product.link;
                    searchResults.style.display = 'none';
                });
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.style.display = results.length > 0 ? 'block' : 'none';
    }

    // Eventos mejorados
    searchInput.addEventListener('input', function() {
        performSearch();
    });

    searchInput.addEventListener('focus', function() {
        if (searchInput.value.trim() !== '') {
            performSearch();
        }
    });

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (searchResults.children.length > 0) {
            window.location.href = searchResults.children[0].href;
        }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Versión para móviles
    document.addEventListener('touchstart', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    }, { passive: true });
});