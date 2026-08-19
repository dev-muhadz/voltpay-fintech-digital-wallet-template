# VoltPay — Fintech & Digital Wallet

VoltPay is a premium dark-first fintech landing page template built for commercial marketplaces. It uses semantic HTML5, modern CSS3 and lightweight Vanilla JavaScript with zero external UI frameworks.

## Project structure

```text
voltpay-fintech-digital-wallet/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
└── README.md
```

## Included

- Responsive fintech landing page from 320px to ultrawide screens
- Security/trust section
- Digital card hero mockup
- Interactive currency and transfer-fee calculator
- Feature switcher tabs
- Free, Premium and Metal pricing cards
- Scroll-triggered statistics counters
- Mobile off-canvas navigation
- Email signup interaction
- CSS custom properties for quick rebranding
- Zero UI framework dependencies

## Customize the theme

Open `css/styles.css`. The variables at the top control the core visual system:

```css
:root {
  --bg: #080b0f;
  --surface: #10151b;
  --text: #f3f6f8;
  --muted: #89949f;
  --lime: #b8ff42;
  --cyan: #54e6d3;
  --purple: #8b7cff;
  --radius: 18px;
}
```

Change `--lime` and `--cyan` to create a different fintech accent palette. Change `--bg` and `--surface` to adjust the dark theme. The font variables can also be replaced with your preferred typefaces.

## Update calculator exchange rates

Open `js/app.js` and locate the `rates` object inside `initCalculator()`:

```js
const rates = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1535 }
};
```

Add or edit currency pairs there. For a production application, replace the static object with a trusted exchange-rate API and add proper loading/error states.

The demo calculator also applies a simulated 0.75% transfer fee:

```js
const fee = value * 0.0075;
```

Change that percentage to match your product's pricing model.

## Add a feature tab

1. Add a new button inside `.tabs`.
2. Give it a unique `data-tab` value.
3. Add a `.feature-content` block with the same `data-panel` value.
4. The existing JavaScript automatically handles switching.

Example:

```html
<button data-tab="savings" role="tab">◎ <span>Smart savings</span></button>

<div class="feature-content" data-panel="savings">
  <h3>Smart savings</h3>
  <p>Automate your savings goals.</p>
</div>
```

## Production checklist

The exchange rates are intentionally simulated. Replace them with verified live data before production.

Security claims, compliance badges, regulatory statements, transaction figures and financial pricing are demo content. Replace them with real, legally reviewed information for a commercial fintech product.

Connect the signup form to your own backend, CRM or email service before launch.

## Marketplace sales tips

Use screenshots of the digital card, calculator, feature switcher, pricing cards and mobile navigation in your marketplace listing. Emphasize the zero-framework architecture, responsive layout and working JavaScript interactions.
