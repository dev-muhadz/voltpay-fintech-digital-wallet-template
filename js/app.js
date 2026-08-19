/* VoltPay interactions: calculator, tabs, mobile navigation and metric counters. */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCalculator();
  initFeatureTabs();
  initCounters();
  initSignup();
});

/* Mobile off-canvas navigation. */
function initNavigation() {
  const button = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
    });
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
  if (!amount) return;

  const rates = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1535 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.85, NGN: 1670 },
    GBP: { USD: 1.28, EUR: 1.18, GBP: 1, NGN: 1965 },
    NGN: { USD: 0.000651, EUR: 0.000599, GBP: 0.000509, NGN: 1 }
  };

  function update() {
    const value = Math.max(0, Number(amount.value) || 0);
    const rate = rates[from.value][to.value];
    const fee = value * 0.0075;
    const converted = value * rate;
    const received = Math.max(0, converted - fee * rate);

    result.value = converted.toLocaleString(undefined, { maximumFractionDigits: 2 });
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

/* Accessible-looking tab switcher using simple Vanilla JS. */
function initFeatureTabs() {
  const buttons = document.querySelectorAll(".tabs button");
  const panels = document.querySelectorAll(".feature-content");
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      panels.forEach(panel => panel.classList.remove("active"));

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
      document.querySelector(`[data-panel="${button.dataset.tab}"]`)?.classList.add("active");
    });
  });
}

/* Animate statistics once when they enter the viewport. */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      const duration = 1100;
      const start = performance.now();
      element.dataset.done = "true";

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

  form.addEventListener("submit", event => {
    event.preventDefault();
    const input = form.querySelector("input");
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const button = form.querySelector("button");
    button.textContent = "You're on the list ✓";
    button.disabled = true;
  });
}
