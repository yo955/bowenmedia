// Scroll bar
let el = document.querySelector(".scroller");
if (el) {
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  console.log(document.documentElement.scrollHeight);
  console.log(document.documentElement.clientHeight);
  console.log(height);

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    el.style.width = `${(scrollTop / height) * 100}%`;
  });
}

// GSAP Card Animation for digital_section
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // انيميشن الكاردات في السيكشن digital_section
  const cardAnimates = document.querySelectorAll(".card-animate");

  if (cardAnimates.length > 0) {
    // انيميشن للكاردات الرئيسية
    gsap.fromTo(
      cardAnimates,
      {
        y: 300,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".digital_section",
          start: "top 50%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          markers: false,
        },
      }
    );

    // انيميشن خاص للكاردات الفردية (dgBox)
    const dgBoxes = document.querySelectorAll(".dgBox");
    if (dgBoxes.length > 0) {
      gsap.fromTo(
        dgBoxes,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".digital_section",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // انيميشن للنصوص داخل الكاردات
    const cardTexts = document.querySelectorAll(
      ".dgBox h2, .dgBox p, .bg_box h2, .bg_box p"
    );
    if (cardTexts.length > 0) {
      gsap.fromTo(
        cardTexts,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".digital_section",
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }

  // تحسين الأداء
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
});

// Navbar scroll effect function - Improved version
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const colExpertise = document.querySelector(".col_expertise");
  const navList = document.querySelectorAll(".nav_list");
  const menu_button = document.querySelector(".menu-button");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const body = document.body;

  // Mobile menu functions
  function openMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.style.display = "flex";
      mobileMenuOverlay.classList.add("active");
      body.style.overflow = "hidden";
    }
  }

  function closeMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.style.display = "none";
      mobileMenuOverlay.classList.remove("active");
      body.style.overflow = "";
    }
  }

  // Mobile menu event listeners
  if (menu_button) {
    menu_button.addEventListener("click", openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu);
  }

  // ESC key closes menu
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      mobileMenuOverlay &&
      mobileMenuOverlay.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  // Update time in overlay
  function updateMobileMenuTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const timeString = `NY ${hour12}:${minutes}:${seconds} ${ampm}`;
    const el = document.getElementById("mobileMenuTime");
    if (el) el.textContent = timeString;
  }

  setInterval(updateMobileMenuTime, 1000);
  updateMobileMenuTime();

  // Scroll event listener
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    if (colExpertise) {
      colExpertise.classList.toggle("hide-on-scroll", window.scrollY > 50);
    }

    // Hide navList elements on scroll only if menu is not open
    const navLinks = document.querySelector(".nav_list");
    if (navLinks && !navLinks.classList.contains("active")) {
      navList.forEach((item) => {
        item.classList.toggle("hide-on-scroll", window.scrollY > 150);
      });
    }

    if (menu_button) {
      menu_button.classList.toggle("show-on-scroll", window.scrollY > 150);
    }
  });
});

// tab
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab) => {
  tab.addEventListener("mouseenter", () => {
    // Hide all content
    contents.forEach((content) => {
      content.classList.remove("active");
    });

    // Show corresponding content
    const targetContent = document.getElementById(tab.dataset.content);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

// Keep dropdown open when hovering over content
const dropdownContent = document.querySelector(".dropdown-content");
if (dropdownContent) {
  dropdownContent.addEventListener("mouseleave", () => {
    // Optional: Add any cleanup if needed
  });
}

// footer
function updateDateTime() {
  const now = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, "0") : "12"; // the hour '0' should be '12'

  const dateTimeString = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  const dateTimeElement = document.getElementById("dateTime");
  if (dateTimeElement) {
    dateTimeElement.textContent = dateTimeString;
  }

  let greeting = "";
  if (now.getHours() < 12) {
    // greeting = 'Good Morning!';
  } else if (now.getHours() < 18) {
    // greeting = 'Good Afternoon!';
  } else {
    // greeting = 'Good Evening!';
  }

  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    greetingElement.textContent = greeting;
  }
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to display immediately

// تغيير لون زر Expertise واللوجو عند فتح القائمة المنسدلة
const expertiseTab = document.querySelector("._tab");
const dropdown = document.querySelector(".dropdown-content");
const navbar = document.querySelector(".navbar");

function openMenuStyle() {
  if (expertiseTab) expertiseTab.classList.add("menu-open");
  if (navbar) navbar.classList.add("menu-open");
}

function closeMenuStyle() {
  if (expertiseTab) expertiseTab.classList.remove("menu-open");
  if (navbar) navbar.classList.remove("menu-open");
}

if (expertiseTab && dropdown && navbar) {
  expertiseTab.addEventListener("mouseenter", openMenuStyle);
  dropdown.addEventListener("mouseenter", openMenuStyle);
  expertiseTab.addEventListener("mouseleave", closeMenuStyle);
  dropdown.addEventListener("mouseleave", closeMenuStyle);
}

// Custom Cursor Button Movement
const headerSection = document.querySelector(".header_section");
const customCursor = document.querySelector(".custom-cursor");
const heroActionsBar = document.querySelector(".hero-actions-bar");

if (headerSection && customCursor) {
  // Hide cursor when leaving header section
  headerSection.addEventListener("mouseleave", () => {
    customCursor.style.display = "none";
  });
  // Show cursor when entering header section
  headerSection.addEventListener("mouseenter", () => {
    customCursor.style.display = "block";
  });
}

// Hide custom cursor when hovering hero-actions-bar
if (heroActionsBar && customCursor) {
  heroActionsBar.addEventListener("mouseenter", () => {
    customCursor.classList.add("hide-cursor");
  });
  heroActionsBar.addEventListener("mouseleave", () => {
    customCursor.classList.remove("hide-cursor");
  });
  // Also handle focus for accessibility
  heroActionsBar.addEventListener("focusin", () => {
    customCursor.classList.add("hide-cursor");
  });
  heroActionsBar.addEventListener("focusout", () => {
    customCursor.classList.remove("hide-cursor");
  });
}

// ===== Video Overlay Fullscreen Logic =====
(function () {
  // حدد عناصر الفيديو والـ overlay
  const headerSection = document.querySelector(".header_section");
  const backVideo = document.querySelector(".main-bg-video");
  const overlay = document.getElementById("videoOverlay");
  const fullscreenVideo = document.getElementById("fullscreenVideo");
  const closeOverlay = document.getElementById("closeOverlay");

  if (
    headerSection &&
    backVideo &&
    overlay &&
    fullscreenVideo &&
    closeOverlay
  ) {
    headerSection.style.cursor = "pointer";
    headerSection.addEventListener("click", function (e) {
      // تجاهل الضغط على زر الإغلاق أو الفيديو نفسه داخل overlay
      if (e.target.closest("#videoOverlay")) return;
      fullscreenVideo.src = backVideo.currentSrc || backVideo.src;
      overlay.classList.add("active");
      fullscreenVideo.play();
    });
    closeOverlay.addEventListener("click", function () {
      overlay.classList.remove("active");
      fullscreenVideo.pause();
      fullscreenVideo.currentTime = 0;
      fullscreenVideo.src = "";
    });
    // إغلاق overlay عند الضغط خارج الفيديو
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        fullscreenVideo.pause();
        fullscreenVideo.currentTime = 0;
        fullscreenVideo.src = "";
      }
    });
  }
})();

// ===== GSAP Overlay Scroll Animation =====
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".color-overlay").forEach((overlay) => {
    // Set initial position - overlay starts from top (like a curtain)
    gsap.set(overlay, {
      y: 0,
      opacity: 1,
      transformOrigin: "top center",
    });

    gsap.to(overlay, {
      y: overlay.parentElement.offsetHeight, // Move down to bottom of parent
      duration: 1.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: overlay.parentElement,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray(".scroll-animate").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });
}

// ===== Improved Custom Cursor Movement =====
(function () {
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  // تتبع حركة الماوس مباشرة
  document.addEventListener("mousemove", function (e) {
    setTimeout(() => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + -5 + "px";
    }, 100);
  });
})();

// white cursor
const white_cursor = document.querySelector(".white-cursor");
if (white_cursor) {
  document.querySelectorAll(".faet_body").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      white_cursor.style.display = "flex";

      setTimeout(() => {
        white_cursor.classList.add("show");
      }, 300);
    });

    item.addEventListener("mouseleave", () => {
      white_cursor.style.display = "none";
      white_cursor.classList.remove("show");
    });
  });

  // تتبع حركة الماوس مباشرة
  document.addEventListener("mousemove", function (e) {
    setTimeout(() => {
      white_cursor.style.left = e.clientX + "px";
      white_cursor.style.top = e.clientY + -5 + "px";
    }, 100);
  });
}

// Sidebar functionality
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const body = document.body;

  if (sidebar && overlay) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }
}

// Close sidebar when pressing Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && sidebar.classList.contains("active")) {
      toggleSidebar();
    }
  }
});

// Close sidebar when clicking outside (overlay)
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (
    event.target === overlay &&
    sidebar &&
    sidebar.classList.contains("active")
  ) {
    toggleSidebar();
  }
});

// footer menu toggle
const toggleGBT = document.getElementById("toggleGBT");
if (toggleGBT) {
  toggleGBT.addEventListener("click", function () {
    this.classList.toggle("on");
    const menuGPT = document.getElementById("menuGBT");
    if (menuGPT) {
      if (menuGPT.style.display === "none" || menuGPT.style.display === "") {
        menuGPT.style.display = "block";
      } else {
        menuGPT.style.display = "none";
      }
    }
  });
}

// slider progress bar
if (typeof Swiper !== "undefined") {
  var swiper = new Swiper(".swiper-container", {
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
      draggable: true,
    },
  });

  var swiperFastest = new Swiper(".swiper-fastest", {
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
      draggable: true,
    },
  });
}

gsap.registerPlugin(ScrollTrigger);

// دالة لتقسيم النص إلى span لكل كلمة
function splitTextToWords(element) {
  const text = element.textContent.trim();
  element.innerHTML = "";
  const words = text.split(" ");

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    element.appendChild(span);

    // إضافة مسافة بين الكلمات (إلا إذا كانت الكلمة الأخيرة)
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
}

// تطبيق التقسيم على كل scroll-float
Array.from(document.querySelectorAll(".scroll-float")).forEach((el) =>
  splitTextToWords(el)
);

// الجملة الأولى: تدور للأعلى وتختفي (rotationX: 90)
gsap.fromTo(
  ".price-title .word",
  {
    opacity: 1,
    y: 0,
    rotationX: 0,
    transformOrigin: "50% 100%",
  },
  {
    opacity: 0,
    y: -80,
    rotationX: 80,
    transformOrigin: "50% 100%",
    stagger: { each: 0.05, from: "end" },
    ease: "cubic.inOut",
    duration: 0.5,
    scrollTrigger: {
      trigger: ".priceSection",
      start: "top center",
      end: "+=500",
      scrub: true,
    },
  }
);

// الجملة الثانية: تظهر من الأسفل وتدور للأمام (rotationX: -90 → 0)
gsap.fromTo(
  ".approach-title .word",
  {
    opacity: 0,
    y: 60,
    rotationX: -90,
    transformOrigin: "50% 0%",
  },
  {
    opacity: 1,
    y: 0,
    rotationX: 0,
    transformOrigin: "50% 0%",
    stagger: { each: 0.15, from: "start" },
    ease: "cubic.inOut",
    duration: 0.5,
    scrollTrigger: {
      trigger: ".priceSection",
      start: "top center",
      end: "+=400",
      scrub: true,
    },
  }
);

// ===== Scroll Velocity Marquee Effect =====
(function () {
  const scroller = document.getElementById("velocity-scroller");
  if (!scroller) return;

  // إعدادات
  const baseVelocity = 100; // px/sec
  let velocity = baseVelocity;
  let lastScrollY = window.scrollY;
  let lastTime = Date.now();
  let direction = 1;
  let x = 0;

  // تكرار النص ليملأ العرض
  function fillScroller() {
    const minWidth = window.innerWidth * 2;
    while (scroller.scrollWidth < minWidth) {
      scroller.innerHTML += scroller.innerHTML;
    }
  }
  fillScroller();

  // تحديث السرعة حسب سرعة الاسكرول
  window.addEventListener("scroll", () => {
    const now = Date.now();
    const scrollY = window.scrollY;
    const deltaY = scrollY - lastScrollY;
    const deltaTime = now - lastTime;
    let scrollVelocity = deltaY / (deltaTime || 1);

    // clamp السرعة
    scrollVelocity = Math.max(-2, Math.min(2, scrollVelocity));

    // عكس الاتجاه إذا كان الاسكرول للأعلى
    direction = scrollVelocity < 0 ? -1 : 1;

    // سرعة إضافية حسب سرعة الاسكرول
    velocity = baseVelocity + Math.abs(scrollVelocity) * 400;

    lastScrollY = scrollY;
    lastTime = now;
  });

  // حركة النص
  function animate() {
    x -= direction * velocity * (1 / 20); // 60fps تقريبًا
    // إعادة التكرار عند النهاية
    if (x < -scroller.scrollWidth / 2) x = 0;
    if (x > 0) x = -scroller.scrollWidth / 2;
    scroller.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // إعادة ملء النص عند تغيير الحجم
  window.addEventListener("resize", fillScroller);
})();

// Hover image for .item in precision_section
(function () {
  const items = document.querySelectorAll(".precision_section .item");
  const hoverBox = document.querySelector(".precision-section-image-hover");
  if (!hoverBox) return;

  let hideTimeout;

  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      clearTimeout(hideTimeout); // إلغاء أي إخفاء معلق
      const imgSrc = item.getAttribute("data-image");
      if (imgSrc) {
        hoverBox.innerHTML = `<img src='${imgSrc}' alt='' />`;
        hoverBox.classList.add("show");
        hoverBox.style.display = "flex";
      }
    });

    item.addEventListener("mousemove", function (e) {
      if (!hoverBox.classList.contains("show")) return;

      const boxWidth = hoverBox.offsetWidth;
      const boxHeight = hoverBox.offsetHeight;

      hoverBox.style.left = `${e.clientX - boxWidth / 2}px`;
      hoverBox.style.top = `${e.clientY - boxHeight / 2}px`;
    });

    item.addEventListener("mouseleave", function () {
      hideTimeout = setTimeout(() => {
        hoverBox.classList.remove("show");
        hoverBox.style.display = "none";
        hoverBox.innerHTML = "";
      }, 700); // زمن الإخفاء
    });
  });
})();

// Fluid Cursor for Footer
function initFluidCursor() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  // Create canvas for fluid effect
  const canvas = document.createElement("canvas");
  canvas.id = "footer-fluid-cursor";
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  `;

  footer.style.position = "relative";
  footer.appendChild(canvas);

  // Fluid simulation configuration
  const config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
    BACK_COLOR: { r: 0.5, g: 0, b: 0 },
    TRANSPARENT: true,
    PAUSED: false,
  };

  let pointers = [
    {
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: [0, 0, 0],
    },
  ];

  // WebGL setup
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    console.warn("WebGL2 not supported, falling back to WebGL");
    return;
  }

  // Get WebGL extensions
  const ext = {
    formatRGBA: gl.RGBA16F,
    formatRG: gl.RG16F,
    formatR: gl.R16F,
    halfFloatTexType: gl.HALF_FLOAT,
    supportLinearFiltering: gl.getExtension("OES_texture_float_linear"),
  };

  // Shader compilation helper
  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  // Create program helper
  function createProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
    }
    return program;
  }

  // Get uniforms helper
  function getUniforms(program) {
    const uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }

  // Vertex shader
  const vertexShader = compileShader(
    gl.VERTEX_SHADER,
    `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `
  );

  // Fragment shaders
  const copyShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
  `
  );

  const splatShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
  `
  );

  const displayShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a * 0.5);
    }
  `
  );

  // Create programs
  const copyProgram = createProgram(vertexShader, copyShader);
  const splatProgram = createProgram(vertexShader, splatShader);
  const displayProgram = createProgram(vertexShader, displayShader);

  // Get uniforms
  const copyUniforms = getUniforms(copyProgram);
  const splatUniforms = getUniforms(splatProgram);
  const displayUniforms = getUniforms(displayProgram);

  // Create FBO helper
  function createFBO(w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      w,
      h,
      0,
      format,
      type,
      null
    );

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1.0 / w,
      texelSizeY: 1.0 / h,
      attach(id) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  // Create double FBO
  function createDoubleFBO(w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(value) {
        fbo1 = value;
      },
      get write() {
        return fbo2;
      },
      set write(value) {
        fbo2 = value;
      },
      swap() {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  // Blit helper
  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target, clear = false) => {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  // Initialize framebuffers
  let dye, velocity;
  function initFramebuffers() {
    const simRes = { width: 128, height: 128 };
    const dyeRes = { width: 512, height: 512 };

    dye = createDoubleFBO(
      dyeRes.width,
      dyeRes.height,
      ext.formatRGBA,
      gl.RGBA,
      ext.halfFloatTexType,
      gl.LINEAR
    );
    velocity = createDoubleFBO(
      simRes.width,
      simRes.height,
      ext.formatRG,
      gl.RG,
      ext.halfFloatTexType,
      gl.LINEAR
    );
  }

  // Generate color
  function generateColor() {
    const c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
  }

  function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return { r, g, b };
  }

  // Splat function
  function splat(x, y, dx, dy, color) {
    gl.uniform1i(splatUniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatUniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatUniforms.point, x, y);
    gl.uniform3f(splatUniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatUniforms.radius, config.SPLAT_RADIUS);
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatUniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatUniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  // Render function
  function render() {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.useProgram(displayProgram);
    gl.uniform1i(displayUniforms.uTexture, dye.read.attach(0));
    blit(null);
  }

  // Update function
  function update() {
    if (resizeCanvas()) {
      initFramebuffers();
    }

    // Apply inputs
    pointers.forEach((p) => {
      if (p.moved) {
        p.moved = false;
        splat(
          p.texcoordX,
          p.texcoordY,
          p.deltaX * config.SPLAT_FORCE,
          p.deltaY * config.SPLAT_FORCE,
          p.color
        );
      }
    });

    render();
    requestAnimationFrame(update);
  }

  // Resize canvas
  function resizeCanvas() {
    const rect = footer.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  // Pointer event handlers
  function updatePointerDownData(pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
  }

  function updatePointerMoveData(pointer, posX, posY) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
    pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
    pointer.moved =
      Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  }

  // Event listeners
  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    updatePointerMoveData(pointers[0], posX, posY);
  });

  footer.addEventListener("mouseenter", (e) => {
    const rect = footer.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    updatePointerDownData(pointers[0], -1, posX, posY);
  });

  // Initialize and start
  initFramebuffers();
  update();
}

// Initialize fluid cursor when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initFluidCursor();
});

// change logo color
// var navLogo = document.getElementById('navLogo');
// window.onscroll = function () {
//         if (window.pageYOffset >= 1500) {
//             //        console.log('hello')
//             navLogo.style.color = '#000';
//         } else {
//             navLogo.style.color = 'red';
//         }
//     }

const colors = [
  "#ffffffc7",
  "#bacb0ac7",
  "#000000c7",
  "#ffb165c7",
  "#fff",
  "#000",
  "#ffffffc7",
  "#ffffffc7",
  "#ffffffc7",
  "#000",
  "#ffb165c7",
  "#ffb165c7",
  "#000",
  "#000",
  "#ffffffc7",
];
const navLogo = document.getElementById("navLogo");

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const colorIndex = Math.min(
    Math.floor(scrollPosition / 550),
    colors.length - 1
  );

  navLogo.style.color = colors[colorIndex];
});



////////////////////////////////////////

// ///////////////////////////////////

//// animateScroll20 text

const scrollers = document.querySelectorAll(".scroller20");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller20) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller20.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller20.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

//
// AOS.init(); animate




// Pin Section and videos section
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // تأكد من وجود العناصر
  const pinSection = document.querySelector(".animate-black");
  const videosSection = document.querySelector(".min-h-screen.hiddenLGScrean");

  if (pinSection && videosSection) {
    // Pin the animateScroll20 section and change background to black
    ScrollTrigger.create({
      trigger: pinSection,
      start: "top top",
      end: () => "+=" + videosSection.offsetHeight,
      pin: true,
      pinSpacing: false,
      scrub: true,
      onEnter: () => {
        pinSection.style.background = "#111";
        pinSection.style.zIndex = "10";
      },
      onLeave: () => {
        pinSection.style.background = "";
        pinSection.style.zIndex = "";
      },
      onEnterBack: () => {
        pinSection.style.background = "#111";
        pinSection.style.zIndex = "10";
      },
      onLeaveBack: () => {
        pinSection.style.background = "";
        pinSection.style.zIndex = "";
      },
    });

    // الفيديوهات تطلع فوق السيكشن المثبت
    gsap.to(videosSection, {
      y: () => -pinSection.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: pinSection,
        start: "top top",
        end: () => "+=" + videosSection.offsetHeight,
        scrub: true,
      },
    });
  } else {
    console.warn("لم يتم العثور على العناصر المطلوبة. تحقق من الكلاسات.");
  }
});