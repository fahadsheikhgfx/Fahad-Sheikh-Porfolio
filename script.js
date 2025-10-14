document.addEventListener('DOMContentLoaded', () => {
  console.log('Scripts loaded');

  // --- FAQ toggle ---
  const details = document.querySelectorAll('.faq-item');
  details.forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.faq-item-content');
    const icon = summary.querySelector('.icon-toggle');

    if (!content) return;

    // Initialize
    if (detail.hasAttribute('open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
      icon?.classList.add('rotated');
    } else {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
      icon?.classList.remove('rotated');
    }

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (!detail.hasAttribute('open')) {
        detail.setAttribute('open', true);
        icon?.classList.add('rotated');
        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
        });
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon?.classList.remove('rotated');
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
        });
        setTimeout(() => detail.removeAttribute('open'), 600);
      }
    });
  });

  // --- Locomotive Scroll ---
  const scrollContainer = document.querySelector('[data-scroll-container]');
  if (scrollContainer) {
    const scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      smoothMobile: true,
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElem = document.querySelector(anchor.getAttribute('href'));
        if (targetElem) scroll.scrollTo(targetElem);
      });
    });
  } else {
    console.warn('No [data-scroll-container] found');
  }

  // --- Dropdown wheel fix ---
  const optionsList = document.querySelectorAll('.custom-options');
  optionsList.forEach(options => {
    options.addEventListener('wheel', (e) => {
      const select = options.closest('.custom-select');
      if (!select || !select.classList.contains('open')) return;

      const delta = e.deltaY;
      const atTop = options.scrollTop <= 0;
      const atBottom = Math.ceil(options.scrollTop + options.clientHeight) >= options.scrollHeight;

      if ((delta > 0 && atBottom) || (delta < 0 && atTop)) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.stopPropagation();
      }
    }, { passive: false });
  });

  // --- Custom Select ---
  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".custom-select-trigger");
    const options = select.querySelectorAll(".custom-option");

    trigger.addEventListener("click", () => {
      document.querySelectorAll(".custom-select").forEach(s => {
        if (s !== select) s.classList.remove("open");
      });
      select.classList.toggle("open");
    });

    options.forEach(option => {
      option.addEventListener("click", () => {
        options.forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
        trigger.textContent = option.textContent;
        select.classList.remove("open");

        let hidden = select.querySelector("input");
        if (!hidden) {
          hidden = document.createElement("input");
          hidden.type = "hidden";
          select.appendChild(hidden);
        }
        hidden.name = select.dataset.name;
        hidden.value = option.dataset.value;
      });
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".custom-select")) {
      document.querySelectorAll(".custom-select").forEach(s => s.classList.remove("open"));
    }
  });
});
