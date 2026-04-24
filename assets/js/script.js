// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Ensure elements exist before accessing them
    const hero = document.querySelector('.hero');
    const grid = document.querySelector('.grid-bg');

    if (!hero || !grid) {
        // console.error("Required elements not found on the page");
        return;
    }

    let iterations = 5;   // Start with 5 initial squares

    // Function to add grid square with opacity
    const addGridSquare = (x, y, color = '#FFD734', opacity = 1) => {
        const gridSize = 40;

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
            const y = 120; // Position them nicely
            addGridSquare(x, y, '#FFD734', 0.65);   // Initial squares more visible
        }
    };

    // Initialize grid
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

    // Initialize particlesJS for the first div
    if (typeof particlesJS !== 'undefined') {
        const particlesContainer = document.getElementById("particles-js");
        const particlesContainer1 = document.getElementById("particles-js1");

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
            }
        });
    } else {
        console.error("particlesJS library not found");
    }
});


window.addEventListener('scroll', function () {
    var header = document.querySelector('.header');
    if (window.scrollY > 0) {
        // When the page is scrolled, add the 'scrolled' class
        header.classList.add('scrolled');
    } else {
        // When the page is at the top, remove the 'scrolled' class
        header.classList.remove('scrolled');
    }
});



// const el = document.getElementById("animatedText");

// // Keep arrow separate
// const arrow = '<span class="fw-bold me-1">→</span>';
// const text = el.innerText.replace("→", "").trim();

// // Split into words
// const words = text.split(" ");

// // Wrap each word
// el.innerHTML = arrow + " " + words.map(word =>
//     `<span class="text-secondary opacity-50">${word}</span>`
// ).join(" ");

// // Animate word by word
// let i = 0;
// const spans = el.querySelectorAll("span:not(:first-child)");

// setInterval(() => {
//     if (i < spans.length) {
//         spans[i].classList.remove("text-secondary", "opacity-50");
//         spans[i].classList.add("text-dark");
//         i++;
//     } else {
//         i = 0;
//         spans.forEach(span => {
//             span.classList.remove("text-dark");
//             span.classList.add("text-secondary", "opacity-50");
//         });
//     }
// }, 120);



function initAnimatedText() {
    const el = document.getElementById("animatedText");
    
    if (!el) {
        console.warn("Element with id 'animatedText' not found");
        return;
    }
    
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
    let animationInterval = null;
    const spans = el.querySelectorAll("span:not(:first-child)");
    
    function startAnimation() {
        if (animationInterval) return; // Already animating
        
        animationInterval = setInterval(() => {
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
    }
    
    function resetAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        i = 0;
        spans.forEach(span => {
            span.classList.remove("text-dark");
            span.classList.add("text-secondary", "opacity-50");
        });
    }
    
    // Use Intersection Observer to trigger animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
            } else {
                resetAnimation();
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of element is visible
    
    observer.observe(el);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedText);
} else {
    initAnimatedText();
}



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




// finance

    // const financeSection = document.getElementById("finance-section");

    // const financeObserver = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       entry.target.classList.add("show");
    //     }
    //   });
    // }, {
    //   threshold: 0.25
    // });

    // financeObserver.observe(financeSection);


// process

// Using querySelector to select by class or ID
const processSection = document.querySelector(".process-section"); 

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.25
});

// Check if element exists before observing
if (processSection) {
  processObserver.observe(processSection);
} else {
  console.error("Process section not found!");
}



// solution


    const solutionsSection = document.getElementById("solutionsSection");

    const solutionsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, {
      threshold: 0.2
    });

    solutionsObserver.observe(solutionsSection);



    // pulse



    const pulseSection = document.getElementById("pulseSection");

    const pulseObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, {
      threshold: 0.2
    });

    pulseObserver.observe(pulseSection);





    // footprint


    const section = document.getElementById("footprintSection");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);



    const downIcon = `
<svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L8 8L15 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

    const upIcon = `
<svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 8L8 1L15 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

    document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", function () {
        const item = this.parentElement;
        const allItems = document.querySelectorAll(".faq-item");

        allItems.forEach((faq) => {
          if (faq !== item) {
            faq.classList.remove("active");
            faq.querySelector(".faq-icon").innerHTML = downIcon;
          }
        });

        item.classList.toggle("active");
        const icon = item.querySelector(".faq-icon");

        icon.innerHTML = item.classList.contains("active")
          ? upIcon
          : downIcon;
      });
    });



document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 100));

    function updateCounter() {
      current += increment;

      if (current < target) {
        counter.textContent = current;
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    }

    updateCounter();
  });
});





// mainservice-page


// Get all pricing cards
const cards = document.querySelectorAll('.prcing-card-section .card');

// Add active class to the first card
cards[0].classList.add('active');

// Handle hover
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
