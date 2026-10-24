document.addEventListener("DOMContentLoaded", () => {
  // Menú de navegación
  const menuToggle = document.querySelector(".menu-toggle");
  const navigationMenu = document.querySelector(".navigation-menu");

  if (menuToggle && navigationMenu) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      navigationMenu.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Abrir menú" : "Cerrar menú"
      );

      navigationMenu.classList.toggle("is-open", !isOpen);
    });

    navigationMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !menuToggle.contains(event.target) &&
        !navigationMenu.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Buscador de proyectos
  const searchInput = document.querySelector("#project-search");
  const projectsGrid = document.querySelector("#projects-grid");
  const searchMessage = document.querySelector("#search-message");

  if (searchInput && projectsGrid && searchMessage) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLocaleLowerCase("es");

      const projects = projectsGrid.querySelectorAll(".project-card");
      let visibleProjects = 0;

      projects.forEach((project) => {
        const searchableText = project.textContent.toLocaleLowerCase("es");
        const matches = searchableText.includes(query);

        project.hidden = !matches;

        if (matches) {
          visibleProjects++;
        }
      });

      if (projects.length === 0 && query !== "") {
        searchMessage.textContent =
          "Todavía no hay proyectos publicados para buscar.";
      } else if (query !== "" && visibleProjects === 0) {
        searchMessage.textContent = "No se encontraron proyectos.";
      } else if (query !== "") {
        searchMessage.textContent =
          `${visibleProjects} proyecto(s) encontrado(s).`;
      } else {
        searchMessage.textContent = "";
      }
    });
  }

  // Formulario de contacto
  const contactForm = document.querySelector("#contact-form");
  const formMessage = document.querySelector("#form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      console.log("Formulario de contacto completado:", {
        nombre: contactForm.elements.nombre.value,
        correo: contactForm.elements.correo.value,
        mensaje: contactForm.elements.mensaje.value
      });

      formMessage.textContent =
        "¡Gracias por escribirme! El formulario se ha validado correctamente.";

      contactForm.reset();
    });
  }

  // Año actualizado automáticamente
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
