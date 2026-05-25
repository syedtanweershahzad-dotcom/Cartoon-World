/**
 * Cartoon World - Main JavaScript Logic
 * Handles Loader, Navigation, and Interactive UI Elements
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENT REFERENCES ---
  const loader = document.getElementById("loader");
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = mobileMenu?.querySelectorAll("a");

  // --- 1. PRELOADER LOGIC ---
  // Hides the loader smoothly once the window and all resources are fully loaded
  window.addEventListener("load", () => {
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease-out";
      
      // Remove from DOM after transition completes to prevent click blocking
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  });

  // Fallback: If 'load' event already fired or takes too long, hide loader after 2.5s
  setTimeout(() => {
    if (loader && loader.style.display !== "none") {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease-out";
      setTimeout(() => loader.style.display = "none", 500);
    }
  }, 2500);


  // --- 2. NAVBAR SCROLL STYLING ---
  // Modifies header styling dynamically based on scroll depth
  const handleNavbarScroll = () => {
    if (!navbar) return;
    
    if (window.scrollY > 20) {
      navbar.classList.add("bg-white/95", "shadow-md");
      navbar.classList.remove("bg-white/80", "shadow-sm");
    } else {
      navbar.classList.add("bg-white/80", "shadow-sm");
      navbar.classList.remove("bg-white/95", "shadow-md");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);


  // --- 3. MOBILE MENU TOGGLE ---
  // Toggles the mobile dropdown navigation interface
  const toggleMobileMenu = () => {
    if (!mobileMenu) return;

    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      // Open Menu
      mobileMenu.classList.remove("hidden");
      // Add a slight micro-interaction entry animation if desired
      mobileMenu.classList.add("animate-fade-in");
    } else {
      // Close Menu
      mobileMenu.classList.add("hidden");
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop propagation to avoid immediate document click trigger
      toggleMobileMenu();
    });
  }

  // Close mobile menu gracefully when clicking any link inside it
  if (mobileNavLinks) {
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Global UX: Close mobile menu automatically if user clicks anywhere outside of it
  document.addEventListener("click", (event) => {
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnBtn = mobileMenuBtn?.contains(event.target);

      if (!isClickInsideMenu && !isClickOnBtn) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});