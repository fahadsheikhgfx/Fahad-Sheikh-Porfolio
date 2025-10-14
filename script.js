document.addEventListener('DOMContentLoaded', () => {
  const details = document.querySelectorAll('.faq-item');

  details.forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.faq-item-content');
    const icon = summary.querySelector('.icon-toggle');

    if (!content) return;

    // Initialize state
    if (detail.hasAttribute('open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
      icon?.classList.add('rotated');
    } else {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
      icon?.classList.remove('rotated');
    }

    // Toggle FAQ item
    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (!detail.hasAttribute('open')) {
        // --- OPENING ---
        detail.setAttribute('open', true);
        icon?.classList.add('rotated');

        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
        });
      } else {
        // --- CLOSING ---
        content.style.maxHeight = content.scrollHeight + 'px';
        icon?.classList.remove('rotated');

        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
        });

        setTimeout(() => {
          detail.removeAttribute('open');
        }, 600);
      }
    });
  });
});

// LocomotiveScroll initialization
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: true,
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Stop the default jump

    const target = this.getAttribute('href');
    const targetElem = document.querySelector(target);

    if (targetElem) {
      // Tell Locomotive Scroll to scroll to it smoothly
      scroll.scrollTo(targetElem);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('dropdown-wheel-fix loaded');

  const optionsList = document.querySelectorAll('.custom-options');
  if (!optionsList.length) console.warn('No .custom-options found — check selector');

  optionsList.forEach(options => {
    options.addEventListener('wheel', function (e) {
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

  // Optional: for LocomotiveScroll issues
  document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('...');
    // placeholder for extra logic
  });
});

// Custom Select Dropdown
document.querySelectorAll(".custom-select").forEach(select => {
  const trigger = select.querySelector(".custom-select-trigger");
  const options = select.querySelectorAll(".custom-option");

  // Toggle dropdown
  trigger.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach(s => {
      if (s !== select) s.classList.remove("open");
    });
    select.classList.toggle("open");
  });

  // Option selection
  options.forEach(option => {
    option.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");
      trigger.textContent = option.textContent;
      select.classList.remove("open");

      // Save value in hidden input for form data
      const hidden = select.querySelector("input") || document.createElement("input");
      hidden.type = "hidden";
      hidden.name = select.dataset.name;
      hidden.value = option.dataset.value;
      select.appendChild(hidden);
    });
  });
});

// Close dropdown on outside click
document.addEventListener("click", e => {
  if (!e.target.closest(".custom-select")) {
    document.querySelectorAll(".custom-select").forEach(s => s.classList.remove("open"));
  }
});

