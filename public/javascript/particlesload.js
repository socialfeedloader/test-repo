window.onload = function() {
    Particles.init({
        selector: '.background',
        color: ['#0099cc', '#e6b800', '#75a3a3', '#e60000'],
        connectParticles: true,
        sizeVariations: 8,
        minDistance: 180,
        speed: 0.9,
        responsive: [{
                breakpoint: 768,
                options: {
                    maxParticles: 200,
                    color: '#48F2E3',
                    connectParticles: false
                }
            }, {
                breakpoint: 425,
                options: {
                    maxParticles: 100,
                    connectParticles: true
                }
            },
            {
                breakpoint: 411,
                options: {
                    maxParticles: 100,
                    connectParticles: false
                }
            },
            {
                breakpoint: 320,
                options: {
                    maxParticles: 0

                    // disables particles.js
                }
            }
        ]
    });
};