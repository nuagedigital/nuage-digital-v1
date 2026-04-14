const hero = document.querySelector('.hero');
const grid = document.querySelector('.grid-bg');

let iterations = 5;   // Start with 5 initial squares

// Function to add grid square with opacity
const addGridSquare = (x, y, color = '#FFD734', opacity = 1) => {
    const gridSize =40;

    const slice = document.createElement('div');
    slice.classList.add('color-slice');
    
    slice.style.position = 'absolute';
    slice.style.left = `${x}px`;
    slice.style.top = `${y}px`;
    slice.style.width = `${gridSize}px`;
    slice.style.height = `${gridSize}px`;
    slice.style.backgroundColor = color;
    slice.style.opacity = opacity;
    slice.style.pointerEvents = 'none';     // Don't block mouse
    slice.style.zIndex = '2';

    grid.appendChild(slice);
};

// Fill 5 initial grid squares on load
const fillInitialGridSquares = () => {
    const gridSize = 40;
    
    for (let i = 0; i < 5; i++) {
        const x = (i * gridSize) + 60;     // Nice horizontal spacing
        const y = 120;                     // Position them nicely
        addGridSquare(x, y, '#FFD734', 0.65);   // Initial squares more visible
    }
};

// Initialize
fillInitialGridSquares();

// Hover Effect - Fill grid squares as mouse moves over hero
hero.addEventListener('mousemove', (e) => {
    const gridSize = 40;
    const x = Math.floor(e.clientX / gridSize) * gridSize;
    const y = Math.floor(e.clientY / gridSize) * gridSize;

    // Limit total colored squares
    if (iterations < 40) {
        addGridSquare(x, y, '#FFD734', 0.4);   // 0.4 opacity as you wanted
        iterations++;
    } else {
        // Clear all squares when limit is reached
        document.querySelectorAll('.color-slice').forEach(slice => slice.remove());
        iterations = 0;
    }
});

// Optional: Clear everything when mouse leaves the hero area
hero.addEventListener('mouseleave', () => {
    document.querySelectorAll('.color-slice').forEach(slice => slice.remove());
    iterations = 0;
});

document.addEventListener("DOMContentLoaded", function() {
    const particlesContainer = document.getElementById("particles-js");
    const particlesContainer1 = document.getElementById("particles-js1");

    // Initialize particlesJS for the first div
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 20,
                density: { enable: true, value_area: 1282.7 }
            },
            color: { value: "#FFD734" },
            shape: {
                type: "edge",
                stroke: { width: 0, color: "#FFD734" },
                polygon: { nb_sides: 4 }
            },
            opacity: {
                value: 0.15,
                random: true,
                anim: { enable: true, speed: 1.5, opacity_min: 0.1, sync: false }
            },
            size: { value: 21, random: false },
            move: {
                enable: true, direction: "none", random: true, straight: false, out_mode: "out",
                bounce: true, speed: 0.5
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "push" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: { push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Initialize particlesJS for the second div
    particlesJS("particles-js1", {
        particles: {
            number: {
                value: 20,
                density: { enable: true, value_area: 1282.7 }
            },
            color: { value: "rgba(255, 215, 52, 0.65)" }, // Different color for the second div
            shape: {
                type: "edge",
                stroke: { width: 0, color: "rgba(255, 215, 52, 0.65)" },
                polygon: { nb_sides: 4 }
            },
            opacity: {
                value: 0.15,
                random: true,
                anim: { enable: true, speed: 50, opacity_min: 0.9, sync: false }
            },
            size: { value: 21, random: false },
            move: {
                enable: true, direction: "none", random: true, straight: false, out_mode: "out",
                bounce: true, speed: 0.1
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "push" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: { push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Function to start the smooth pulse effect for particles
    function startPulseEffect() {
        const containers = [particlesContainer, particlesContainer1];
        containers.forEach(container => {
            const canvas = container.querySelector("canvas");

            if (canvas) {
                const ctx = canvas.getContext("2d");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                let pulseEffectActive = true;

                // Pulse effect: Toggle opacity smoothly
                setInterval(() => {
                    // Clear the canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Apply the color with opacity for the pulse effect
                    const opacity = pulseEffectActive ? 0.65 : 0; // Toggle opacity between 0.65 (visible) and 0 (hidden)
                    ctx.fillStyle = "rgba(255, 215, 52, " + opacity + ")"; // Set opacity in the fill color
                    ctx.globalAlpha = opacity; // Set global opacity for particles

                    // Generate random positions for particles
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;

                    // Draw circles representing particles
                    ctx.beginPath();
                    ctx.arc(x, y, 10, 0, Math.PI * 2);
                    ctx.fill();

                    // Toggle pulse effect (between 0.65 and 0) to show/hide particles
                    pulseEffectActive = !pulseEffectActive; // Alternate opacity every interval

                }, 1500); // Pulse every 1.5 seconds (adjust to your preference)
            }
        });
    }

    startPulseEffect(); // Start the pulse effect
});





window.addEventListener('scroll', function() {
  var header = document.querySelector('header.header');
  
  if (window.scrollY > 0) {
    // When the page is scrolled, add the 'scrolled' class
    header.classList.add('scrolled');
  } else {
    // When the page is at the top, remove the 'scrolled' class
    header.classList.remove('scrolled');
  }
});




const el = document.getElementById("animatedText");

// Keep arrow separate
const arrow = '<span class="fw-bold me-1">→</span>';
const text = el.innerText.replace("→", "").trim();

// Split into words
const words = text.split(" ");

// Wrap each word
el.innerHTML = arrow + " " + words.map(word =>
  `<span class="text-secondary opacity-50">${word}</span>`
).join(" ");

// Animate word by word
let i = 0;
const spans = el.querySelectorAll("span:not(:first-child)");

setInterval(() => {
  if (i < spans.length) {
    spans[i].classList.remove("text-secondary", "opacity-50");
    spans[i].classList.add("text-dark");
    i++;
  } else {
    i = 0;
    spans.forEach(span => {
      span.classList.remove("text-dark");
      span.classList.add("text-secondary", "opacity-50");
    });
  }
}, 120);



document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll('.bar-about');
    
    function checkScroll() {
        const triggerPoint = window.innerHeight * 0.75;
        
        let hasAnimated = false;

        bars.forEach((bar, index) => {
            const barTop = bar.getBoundingClientRect().top;

            if (barTop < triggerPoint && !bar.classList.contains('animate')) {
                // Sequential delay: first bar starts immediately, then others follow
                const delay = index * 120;   // 120ms delay between each bar
                
                setTimeout(() => {
                    bar.classList.add('animate');
                }, delay);
                
                hasAnimated = true;
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
});



$(document).ready(function () {
    $('#teamSlider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      speed: 400,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 768,  settings: { slidesToShow: 2 } },
        { breakpoint: 480,  settings: { slidesToShow: 1 } }
      ]
    });

    $('#teamPrev').on('click', function () {
      $('#teamSlider').slick('slickPrev');
    });

    $('#teamNext').on('click', function () {
      $('#teamSlider').slick('slickNext');
    });
  });