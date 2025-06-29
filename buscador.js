   document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filtro-btn');
            const productos = document.querySelectorAll('.producto');

            // Función para filtrar productos
            function filtrarProductos(categoria) {
                productos.forEach(producto => {
                    const productoCategoria = producto.getAttribute('data-categoria');
                    
                    if (categoria === 'todas' || productoCategoria === categoria) {
                        producto.style.display = 'block';
                    } else {
                        producto.style.display = 'none';
                    }
                });
            }

            // Evento para cada botón de filtro
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remover clase 'active' de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Añadir clase 'active' al botón clickeado
                    button.classList.add('active');
                    
                    // Filtrar productos según la categoría
                    const categoria = button.getAttribute('data-categoria');
                    filtrarProductos(categoria);
                });
            });
        });