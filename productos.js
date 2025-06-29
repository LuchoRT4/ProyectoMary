document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de productos
    const filtros = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtros.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const categoria = this.dataset.categoria;
            
            // Mostrar/ocultar productos según categoría
            productos.forEach(producto => {
                if(categoria === 'todas' || producto.dataset.categoria === categoria) {
                    producto.style.display = 'block';
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });

    // Efecto hover para móviles
    productos.forEach(producto => {
        producto.addEventListener('touchstart', function() {
            this.classList.add('hover');
        }, {passive: true});
    });

    // Simulación de añadir al carrito
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const producto = this.closest('.producto');
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('.precio').textContent;
            
            alert(`✅ ${nombre} (${precio}) añadido al carrito`);
            
            // Aquí podrías agregar lógica real para el carrito
        });
    });
});