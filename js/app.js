/* VoltPay interactions: calculator, tabs, mobile navigation and metric counters. */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCalculator();
  initFeatureTabs();
  initCounters();
  initSignup();
});

/* Mobile off-canvas navigation with keyboard focus containment. */
function initNavigation() {
  const button = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#nav");
  if (!button || !nav) return;

  const links = [...nav.querySelectorAll("a")];
  let lastFocused = null;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    button.textContent = open ? "×" : "☰";

    if (open) {
      lastFocused = document.activeElement;
      links[0]?.focus();
      document.addEventListener("keydown", trapFocus);
    } else {
      document.removeEventListener("keydown", trapFocus);
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }
  }

  function close() {
    if (nav.classList.contains("open")) setOpen(false);
  }

  function trapFocus(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !nav.classList.contains("open")) return;

    const focusable = [button, ...links].filter(element => !element.hasAttribute("disabled"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  button.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  links.forEach(link => link.addEventListener("click", close));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) close();
  });
}

/* Static demo exchange-rate calculator. Replace the object with live API data in production. */
function initCalculator() {
  const amount = document.querySelector("#amount");
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  const result = document.querySelector("#result");
  const rateOutput = document.querySelector("#rate");
  const feeOutput = document.querySelector("#fee");
  const receiveOutput = document.querySelector("#receive");
  const swap = document.querySelector("#swap");
  const ratePill = document.querySelector(".rate-pill");
  if (!amount || !from || !to || !result || !rateOutput || !feeOutput || !receiveOutput || !swap) return;

  const rates = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1535 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.85, NGN: 1670 },
    GBP: { USD: 1.28, EUR: 1.18, GBP: 1, NGN: 1965 },
    NGN: { USD: 0.000651, EUR: 0.000599, GBP: 0.000509, NGN: 1 }
  };

  if (ratePill) ratePill.lastChild.textContent = " Simulated rates · demo only";
  rateOutput.setAttribute("aria-live", "polite");
  feeOutput.setAttribute("aria-live", "polite");
  receiveOutput.setAttribute("aria-live", "polite");

  function update() {
    const value = Math.max(0, Number(amount.value) || 0);
    const rate = rates[from.value][to.value];
    const fee = value * 0.0075;
    const converted = value * rate;
    const received = Math.max(0, converted - fee * rate);

    result.value = received.toLocaleString(undefined, { maximumFractionDigits: 2 });
    rateOutput.textContent = `1 ${from.value} = ${rate} ${to.value}`;
    feeOutput.textContent = `${fee.toFixed(2)} ${from.value}`;
    receiveOutput.textContent = `${received.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to.value}`;
  }

  [amount, from, to].forEach(element => element.addEventListener("input", update));

  swap.addEventListener("click", () => {
    const oldFrom = from.value;
    from.value = to.value;
    to.value = oldFrom;
    update();
  });

  update();
}

/* Feature switcher implemented as an accessible keyboard-navigable tablist. */
function initFeatureTabs() {
  const buttons = [...document.querySelectorAll(".tabs button")];
  const panels = [...document.querySelectorAll(".feature-content")];
  if (!buttons.length) return;

  buttons.forEach((button, index) => {
    const tabId = `feature-tab-${index + 1}`;
    const panel = panels.find(item => item.dataset.panel === button.dataset.tab);
    button.id = tabId;
    button.setAttribute("aria-selected", String(index === 0));
    button.setAttribute("tabindex", index === 0 ? "0" : "-1");

    if (panel) {
      const panelId = `feature-panel-${index + 1}`;
      panel.id = panelId;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tabId);
      panel.hidden = index !== 0;
    }

    button.addEventListener("click", () => activate(index));
    button.addEventListener("keydown", event => {
      let nextIndex = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex === null) return;

      event.preventDefault();
      activate(nextIndex, true);
    });
  });

  function activate(index, moveFocus = false) {
    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.setAttribute("tabindex", selected ? "0" : "-1");
    });

    panels.forEach(panel => {
      const selected = panel.dataset.panel === buttons[index].dataset.tab;
      panel.classList.toggle("active", selected);
      panel.hidden = !selected;
    });

    if (moveFocus) buttons[index].focus();
  }
}

/* Animate statistics once when they enter the viewport. */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length || !("IntersectionObserver" in window)) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      element.dataset.done = "true";

      if (reduceMotion) {
        element.textContent = target;
        return;
      }

      const duration = 1100;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* Demo signup state — replace with your own endpoint/form handler. */
function initSignup() {
  const form = document.querySelector("#signup");
  if (!form) return;

  const button = form.querySelector("button");
  const input = form.querySelector("input");
  if (!button || !input) return;

  button.setAttribute("aria-live", "polite");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    button.textContent = "You're on the list ✓";
    button.disabled = true;
  });
}
