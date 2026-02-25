/* ===================================================
   ECOM Advisory | JavaScript Principal
   =================================================== */

"use strict";

// ---- Datos del equipo ----
const teamMembers = [
  {
    name: "Alejandro Ramírez",
    role: "CEO & Fundador",
    bio: "Más de 12 años liderando estrategias de ecommerce para marcas globales.",
    icon: "fas fa-user-tie",
    linkedin: "#", twitter: "#",
  },
  {
    name: "María Fernanda Torres",
    role: "Directora de Estrategia",
    bio: "Especialista en growth hacking y optimización de conversiones.",
    icon: "fas fa-user",
    linkedin: "#", twitter: "#",
  },
  {
    name: "Carlos Mendoza",
    role: "Head de Marketing Digital",
    bio: "Experto en SEO, SEM y campañas de performance para tiendas online.",
    icon: "fas fa-user",
    linkedin: "#", twitter: "#",
  },
  {
    name: "Valeria Soto",
    role: "Lead Developer",
    bio: "Arquitecta de soluciones tecnológicas para plataformas de comercio digital.",
    icon: "fas fa-user",
    linkedin: "#", twitter: "#",
  },
];

// ---- DOM Ready ----
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollEffects();
  initCounters();
  initTeamCards();
  initContactForm();
  initHeroParallax();   // blobs con parallax de mouse
  initHeroCanvas();     // partículas con líneas en canvas
  initBackToTop();
  initAOS();
});

// ===== NAVEGACIÓN =====
function initNavigation() {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const allLinks = document.querySelectorAll(".nav__link:not(.nav__link--cta)");

  // Sticky header
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Mobile toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  // Close on link click
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allLinks.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById("header").offsetHeight;
        window.scrollTo({ top: target.offsetTop - headerH - 16, behavior: "smooth" });
      }
    });
  });
}

// ===== COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll(".stat-card__number");
  let started = false;

  const startCounting = () => {
    if (started) return;
    const statsSection = document.getElementById("stats");
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      started = true;
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1800;
        const step = Math.max(1, Math.floor(target / (duration / 16)));
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          counter.textContent = current;
          if (current >= target) clearInterval(interval);
        }, 16);
      });
    }
  };

  window.addEventListener("scroll", startCounting, { passive: true });
  startCounting(); // check on load
}

// ===== TEAM CARDS =====
function initTeamCards() {
  const grid = document.querySelector(".team__grid");
  if (!grid) return;

  teamMembers.forEach((member, i) => {
    const delay = i * 100;
    const card = document.createElement("div");
    card.className = "team-card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", delay.toString());
    card.innerHTML = `
      <div class="team-card__photo-placeholder">
        <i class="${member.icon}"></i>
      </div>
      <div class="team-card__body">
        <p class="team-card__name">${member.name}</p>
        <p class="team-card__role">${member.role}</p>
        <p class="team-card__bio">${member.bio}</p>
        <div class="team-card__social">
          <a href="${member.linkedin}" aria-label="LinkedIn de ${member.name}"><i class="fab fa-linkedin-in"></i></a>
          <a href="${member.twitter}" aria-label="Twitter de ${member.name}"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    formName: { el: null, error: null, validate: (v) => v.trim().length >= 2 ? "" : "Ingresa tu nombre completo." },
    formEmail: { el: null, error: null, validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Ingresa un correo válido." },
    formMessage: { el: null, error: null, validate: (v) => v.trim().length >= 10 ? "" : "El mensaje debe tener al menos 10 caracteres." },
  };

  Object.keys(fields).forEach((key) => {
    fields[key].el = document.getElementById(key);
    fields[key].error = document.getElementById(key.replace("form", "").toLowerCase() + "Error");
  });

  const validateField = (key) => {
    const { el, error, validate } = fields[key];
    const msg = validate(el.value);
    error.textContent = msg;
    el.classList.toggle("invalid", !!msg);
    return !msg;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      if (fields[key].el.classList.contains("invalid")) validateField(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) return;

    const btn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("formSuccess");
    btn.disabled = true;
    btn.querySelector(".btn__text").textContent = "Enviando…";

    // Simulate async send
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.querySelector(".btn__text").textContent = "Enviar mensaje";
      successMsg.classList.add("visible");
      setTimeout(() => successMsg.classList.remove("visible"), 5000);
    }, 1500);
  });
}

// ===== HERO PARALLAX (mouse interaction sobre los blobs del fondo) =====
function initHeroParallax() {
  const hero = document.getElementById("quienes-somos");
  const bg = hero ? hero.querySelector(".hero__bg") : null;
  if (!hero || !bg) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const STRENGTH = 18; // px máximo de desplazamiento

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  hero.addEventListener("mouseleave", () => { targetX = 0; targetY = 0; });

  const lerp = (a, b, t) => a + (b - a) * t;

  (function animate() {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);
    // Mover todo el fondo: los blobs mantienen sus keyframes CSS sin conflicto
    bg.style.transform = `translate(${currentX * STRENGTH}px, ${currentY * STRENGTH}px)`;
    requestAnimationFrame(animate);
  })();
}

// ===== HERO CANVAS PARTICLES =====
function initHeroCanvas() {
  const canvas = document.getElementById("heroParticles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("quienes-somos");

  // Ajustar tamaño del canvas al hero
  const resize = () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // Crear partículas
  const N = 55;
  const particles = Array.from({ length: N }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
  }));

  // Posición del mouse para conectar líneas
  let mx = -9999, my = -9999;
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => { mx = -9999; my = -9999; });

  const LINK_DIST = 120;
  const MOUSE_DIST = 150;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar partículas
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Rebote en bordes
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Dibujar punto
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(98, 191, 221, ${p.alpha})`;
      ctx.fill();
    });

    // Líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(98, 191, 221, ${0.12 * (1 - d / LINK_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Líneas hacia el mouse
      const dx = particles[i].x - mx;
      const dy = particles[i].y - my;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(98, 191, 221, ${0.3 * (1 - d / MOUSE_DIST)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ===== AOS (Simple Intersection Observer) =====
function initAOS() {
  const elements = document.querySelectorAll("[data-aos]");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  elements.forEach((el) => observer.observe(el));
}
