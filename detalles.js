document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const productos = Array.from(document.querySelectorAll('.producto'));
    const modal = document.getElementById('modalDetalle');
    const btnCerrar = document.querySelector('.cerrar-modal');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const filterButtons = document.querySelectorAll('.filtro-btn');
    let productoActual = null;
    let productosFiltrados = [];
    
    // Orden de las categorías para navegación
    const ordenCategorias = ['Tortas', 'Galletas', 'Postres'];
    
    // Descripciones detalladas para cada producto
    const descripcionesDetalladas = {
        "1": [
            "Sabor refrescante: El toque cítrico del limón realza el dulzor, creando una experiencia única y vibrante.",
            "Perfecta para: Celebraciones, postres después de comer o simplemente para consentirte en cualquier momento.",
            "Ingredientes selectos: Elaborada con limones frescos y productos de la más alta calidad para garantizar un sabor inigualable."
        ],
        "2": [
            "Sabor intenso: Una explosión de chocolate de alta calidad que satisface los paladares más exigentes.",
            "Perfecta para: Cumpleaños, aniversarios o cualquier ocasión especial.",
            "Ingredientes selectos: Utilizamos cacao premium y mantequilla fresca para lograr la textura perfecta."
        ],
        "3": [
            "Textura única: La combinación de tres leches crea una experiencia cremosa e inolvidable.",
            "Perfecta para: Eventos familiares y reuniones con amigos.",
            "Ingredientes selectos: Leche entera, leche evaporada y leche condensada de la mejor calidad."
        ],
        "4": [
        "Sabor clásico con estilo: Vetas de vainilla y chocolate que se fusionan en cada rebanada.",
        "Perfecta para: Brunch, reuniones familiares o cuando no puedes decidir entre dos sabores.",
        "Ingredientes selectos: Mezcla artesanal de masas para lograr el marmoleado perfecto."
        ],
        "5": [
            "Sabor delicado: Dulce, esponjosa y con un aroma que enamora.",
            "Perfecta para: Bodas, baby showers o como base para decoraciones personalizadas.",
            "Ingredientes selectos: Vainilla de Madagascar y huevos frescos para una textura suave."
        ],
        "6": [
            "Sabor sofisticado: Ligeramente a cocoa, con un frosting cremoso que complementa su tono rojo.",
            "Perfecta para: Fechas románticas, cenas elegantes o simplemente para lucir en la mesa.",
            "Ingredientes selectos: Coloración natural y queso crema para el frosting perfecto."
        ],
        "7": [
            "Sabor exótico: Tan rica que parece derretirse en tu boca, con un intenso sabor a cacao",
            "Perfecta para: Regalos gourmet, reuniones de amigos o para satisfacer antojos intensos.",
            "Ingredientes selectos: Chocolate 70% y un toque de café para resaltar su profundidad."   
        ],
        "8": [
            "Sabor Irresistible: Intenso cacao que se derrite en tu boca, con un equilibrio perfecto entre dulce y amargo.",
            "Perfecta para: Acompañar el café, la merienda o esos antojos de medianoche.",
            "Ingredientes selectos: Hechas con chocolate premium y mantequilla de primera calidad para un sabor profundo y decadente."
        ],
        "9": [
            "Sabor clásico: Aroma suave y dulce que evoca recuerdos de hogar.",
            "Perfectas para: Compartir en reuniones o disfrutar con un vaso de leche.",
            "Ingredientes selectos: Vainilla natural y harina seleccionada para una textura perfecta."
        ],  
        "10": [
            "Sabor elegante: Notas sutiles de cocoa y un toque cremoso que las hace únicas.",
            "Perfectas para: Momentos especiales o para consentirte con un detalle sofisticado.",
            "Ingredientes selectos: Color natural y cocoa de alta calidad para ese distintivo tono rojo."
        ],
          "11": [
            "Sabor crujiente y caramelizado: Textura irresistible con un dulce toque tostado.",
            "Perfectas para: Los que aman lo crocante y un sabor con carácter.",
            "Ingredientes selectos: Azúcar caramelizado y mantequilla para ese crujido perfecto."
        ],
        "12": [
            "Sabor refrescante: El toque cítrico del limón realza el dulzor, creando una experiencia única y vibrante.",
            "Perfectas para: Días calurosos o cuando buscas un postre ligero y alegre.",
            "Ingredientes selectos: Elaboradas con limones frescos y productos de la más alta calidad para garantizar un sabor inigualable."
        ],
        "13": [
            "Sabor divertido: Dulces, alegres y llenas de color, ¡una fiesta en cada bocado!",
            "Perfectas para: Celebraciones infantiles, fiestas temáticas o simplemente para alegrar el día.",
            "Ingredientes selectos: Chispas de colores sin conservantes y masa de vainilla premium."
        ],
        "14": [
            "Sabor elegante: Simples pero perfectas, con ese inconfundible toque dorado y mantecoso.",
            "Perfectas para: Cualquier ocasión, desde desayunos hasta postres elegantes.",
            "Ingredientes selectos: Mantequilla fresca y harina fina para una textura perfecta."
        ],
        "15": [
            "Sabor exótico: El toque cítrico del limón realza el dulzor, creando una experiencia única y vibrante.",              
            "Perfecta para: Postres veraniegos, reuniones familiares o como contraste a platillos fuertes.",
            "Ingredientes selectos: Relleno de limón natural y una crujiente base de galleta artesanal."
        ],
        "16": [
            "Sabor Irresistible: Dulce, ácido y exótico, con el toque único de la fruta de la pasión.",
            "Perfecta para: Sorprender a tus invitados con un sabor diferente y vibrante.",
            "Ingredientes selectos: Parchita fresca y un balance perfecto de azúcar para evitar lo empalagoso."
        ],
        "17": [
            "Sabor cremoso y equilibrado: Ligera acidez del queso crema con una base de galleta mantecosa.",
            "Perfecto para: Cenas elegantes, postres gourmet o para disfrutar con frutos rojos.",
            "Ingredientes selectos: Queso crema fresco y vainilla natural para una textura sedosa."
        ],
        "18": [
            "Sabor intenso y húmedo: Con trozos de chocolate que se funden en cada bocado.",
            "Perfecto para: Acompañar con helado, servir caliente o disfrutar solo.",
            "Ingredientes selectos: Chocolate semiamargo y nueces tostadas para un crunch delicioso."
        ],

        // Agrega más descripciones para otros productos según sea necesario
    };
    
    // Mapeo de datos de productos
    const productosData = productos.map(producto => {
        return {
            id: producto.getAttribute('data-id'),
            categoria: producto.getAttribute('data-categoria'),
            imagen: producto.querySelector('.producto-imagen').src,
            titulo: producto.querySelector('h3').textContent,
            descripcion: producto.querySelector('.descripcion').textContent,
            precio: producto.querySelector('.precio').innerHTML,
            elemento: producto
        };
    });
    
    // Evento para abrir modal al hacer clic en "Ver detalles"
    productos.forEach(producto => {
        producto.querySelector('.btn-ver').addEventListener('click', function(e) {
            e.stopPropagation();
            const id = producto.getAttribute('data-id');
            mostrarDetalleProducto(id);
        });
        
        // También permitir hacer clic en cualquier parte del producto
        producto.addEventListener('click', function() {
            const id = producto.getAttribute('data-id');
            mostrarDetalleProducto(id);
        });
    });
    
    // Cerrar modal
    btnCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Navegación entre productos
    btnAnterior.addEventListener('click', navegarAnterior);
    btnSiguiente.addEventListener('click', navegarSiguiente);
    
    // Filtrado de productos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const categoria = this.getAttribute('data-categoria');
            filtrarProductos(categoria);
        });
    });
    
    // Función para mostrar detalles del producto
    function mostrarDetalleProducto(id) {
        const producto = productosData.find(p => p.id === id);
        if (!producto) return;
        
        productoActual = producto;
        
        // Filtrar productos de la misma categoría para la navegación
        productosFiltrados = productosData.filter(p => p.categoria === producto.categoria);
        
        // Obtener la descripción detallada
        const descripcionDetallada = descripcionesDetalladas[id] || [
            "Descripción detallada no disponible."
        ];
        
        // Crear HTML para la descripción detallada
        let descripcionHTML = '';
        descripcionDetallada.forEach(texto => {
            descripcionHTML += `<p class="seccion-descripcion">${texto}</p>`;
        });
        
        // Actualizar UI del modal
        document.getElementById('detalleImagen').src = producto.imagen;
        document.getElementById('detalleImagen').alt = producto.titulo;
        document.getElementById('detalleTitulo').textContent = producto.titulo;
        document.getElementById('detalleDescripcion').innerHTML = descripcionHTML;
        document.getElementById('detallePrecio').innerHTML = producto.precio;
        
        // Actualizar estado de los botones de navegación
        actualizarBotonesNavegacion(id);
        
        // Mostrar productos relacionados
        mostrarProductosRelacionados(producto.categoria, producto.id);
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Función para navegar al producto anterior
    function navegarAnterior() {
        if (!productoActual) return;
        
        const indexActual = productosFiltrados.findIndex(p => p.id === productoActual.id);
        
        // Si hay productos anteriores en la misma categoría
        if (indexActual > 0) {
            mostrarDetalleProducto(productosFiltrados[indexActual - 1].id);
        } else {
            // Si es el primer producto, buscar en la categoría anterior
            const catIndex = ordenCategorias.indexOf(productoActual.categoria);
            const prevCatIndex = (catIndex - 1 + ordenCategorias.length) % ordenCategorias.length;
            const prevCategory = ordenCategorias[prevCatIndex];
            
            // Filtrar productos de la categoría anterior
            const prevCategoryProducts = productosData.filter(p => p.categoria === prevCategory);
            
            if (prevCategoryProducts.length > 0) {
                // Ir al último producto de la categoría anterior
                mostrarDetalleProducto(prevCategoryProducts[prevCategoryProducts.length - 1].id);
            } else {
                // Si no hay productos, buscar en categorías anteriores recursivamente
                buscarEnCategoriasAnteriores(catIndex - 1);
            }
        }
    }
    
    // Función para navegar al siguiente producto
    function navegarSiguiente() {
        if (!productoActual) return;
        
        const indexActual = productosFiltrados.findIndex(p => p.id === productoActual.id);
        
        // Si hay más productos en la misma categoría
        if (indexActual < productosFiltrados.length - 1) {
            mostrarDetalleProducto(productosFiltrados[indexActual + 1].id);
        } else {
            // Si es el último producto, buscar en la siguiente categoría
            const catIndex = ordenCategorias.indexOf(productoActual.categoria);
            const nextCatIndex = (catIndex + 1) % ordenCategorias.length;
            const nextCategory = ordenCategorias[nextCatIndex];
            
            // Filtrar productos de la siguiente categoría
            const nextCategoryProducts = productosData.filter(p => p.categoria === nextCategory);
            
            if (nextCategoryProducts.length > 0) {
                // Ir al primer producto de la siguiente categoría
                mostrarDetalleProducto(nextCategoryProducts[0].id);
            } else {
                // Si no hay productos, buscar en categorías siguientes recursivamente
                buscarEnCategoriasSiguientes(catIndex + 1);
            }
        }
    }
    
    // Función auxiliar para buscar en categorías anteriores recursivamente
    function buscarEnCategoriasAnteriores(index) {
        if (index < 0) index = ordenCategorias.length - 1;
        
        const category = ordenCategorias[index];
        const categoryProducts = productosData.filter(p => p.categoria === category);
        
        if (categoryProducts.length > 0) {
            mostrarDetalleProducto(categoryProducts[categoryProducts.length - 1].id);
        } else if (index - 1 !== ordenCategorias.indexOf(productoActual.categoria)) {
            buscarEnCategoriasAnteriores(index - 1);
        }
    }
    
    // Función auxiliar para buscar en categorías siguientes recursivamente
    function buscarEnCategoriasSiguientes(index) {
        if (index >= ordenCategorias.length) index = 0;
        
        const category = ordenCategorias[index];
        const categoryProducts = productosData.filter(p => p.categoria === category);
        
        if (categoryProducts.length > 0) {
            mostrarDetalleProducto(categoryProducts[0].id);
        } else if (index + 1 !== ordenCategorias.indexOf(productoActual.categoria)) {
            buscarEnCategoriasSiguientes(index + 1);
        }
    }
    
    // Función para actualizar el estado de los botones de navegación
    function actualizarBotonesNavegacion(id) {
        const indexActual = productosFiltrados.findIndex(p => p.id === id);
        btnAnterior.disabled = false;
        btnSiguiente.disabled = false;
        
        // Ocultar tooltips si existen
        if (btnAnterior.title) btnAnterior.removeAttribute('title');
        if (btnSiguiente.title) btnSiguiente.removeAttribute('title');
    }
    
    function mostrarProductosRelacionados(categoria, idExcluir) {
        const contenedor = document.getElementById('productosRelacionados');
        contenedor.innerHTML = '';
        
        // Obtener todos los productos excepto el actual
        const productosDisponibles = productosData.filter(p => p.id !== idExcluir);
        
        // Mezclar el array de productos aleatoriamente
        const productosMezclados = mezclarArray([...productosDisponibles]);
        
        // Seleccionar los primeros 4 productos del array mezclado
        const productosMostrar = productosMezclados.slice(0, 4);
        
        // Mostrar los productos seleccionados
        productosMostrar.forEach(producto => {
            const productoHTML = `
                <div class="producto-relacionado" data-id="${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <h4>${producto.titulo}</h4>
                    <div class="precio">${producto.precio}</div>
                </div>
            `;
            contenedor.innerHTML += productoHTML;
        });
        
        // Agregar eventos a los productos relacionados
        document.querySelectorAll('.producto-relacionado').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                mostrarDetalleProducto(id);
            });
        });
    }

    // Función para mezclar un array (algoritmo Fisher-Yates)
    function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Función para filtrar productos por categoría
    function filtrarProductos(categoria) {
        productos.forEach(producto => {
            const productoCategoria = producto.getAttribute('data-categoria');
            producto.style.display = (categoria === 'todas' || productoCategoria === categoria) 
                ? 'block' 
                : 'none';
        });
    }
    
    // Inicializar mostrando todos los productos
    filtrarProductos('todas');
});

// Asegurar que los botones de navegación sean visibles
setTimeout(() => {
    const modalContent = document.querySelector('.modal-contenido');
    const navButtons = document.querySelector('.navegacion-productos');
    
    if (modalContent && navButtons && navButtons.getBoundingClientRect().bottom > modalContent.getBoundingClientRect().bottom) {
        modalContent.scrollTop = navButtons.offsetTop - 20;
    }
}, 50);