document.addEventListener('DOMContentLoaded', function() {
    const glide = new Glide('.glide', {
        type: 'carousel',
        autoplay: 7000,
        hoverpause: true
    });

    // Desactiva el arrastre para mejor UX en clicks
    glide.on('mount.after', function() {
        const track = document.querySelector('.glide__track');
        track.style.touchAction = 'pan-y';
    });

    glide.mount();
});

// Agrega esto a tu carousel.js
document.querySelectorAll('.clickable-slide').forEach(slide => {
    slide.addEventListener('click', function() {
        window.location.href = this.dataset.target;
    });
});