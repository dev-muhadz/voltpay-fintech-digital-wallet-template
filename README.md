# VoltPay — Fintech & Digital Wallet Template

VoltPay is a premium dark-first fintech and digital wallet landing page template built for commercial projects, product demos and marketplace use.

It is built with **semantic HTML5, modern CSS3 and lightweight Vanilla JavaScript** — with no Bootstrap, Tailwind or other UI framework.

> **Demo template:** financial figures, exchange rates, security claims, pricing, names and other product claims shown in the demo are fictional/demo content. Replace them with verified, legally reviewed information before using VoltPay for a real financial product.

## Features

- Responsive layout from 320px to ultrawide screens
- Dark-first fintech visual system
- Digital card hero mockup
- Security/trust section
- Interactive currency exchange calculator
- Simulated exchange rates and transfer fee calculation
- Keyboard-accessible feature tabs
- Free, Premium and Metal pricing cards
- Scroll-triggered statistics counters
- Mobile off-canvas navigation
- Keyboard focus and reduced-motion accessibility support
- Demo email signup interaction
- SVG favicon
- SEO-ready title, description, canonical URL and Open Graph metadata
- `robots.txt` and `sitemap.xml`
- Custom 404 page
- Static About, Careers, Contact, Privacy and Terms pages
- CSS custom properties for fast rebranding
- Zero UI framework dependencies

## Project structure

```text
voltpay-fintech-digital-wallet-template/
├── index.html
├── 404.html
├── about.html
├── careers.html
├── contact.html
├── privacy.html
├── terms.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── css/
│   ├── styles.css
│   ├── phase-3-fixes.css
│   └── accessibility-fixes.css
├── js/
│   └── app.js
├── assets/
├── docs/
│   └── marketplace-customization.md
└── README.md
```

### What the CSS files do

- `styles.css` — main design system, layout and components
- `phase-3-fixes.css` — restored VoltPay sections and responsive/mobile repair layer
- `accessibility-fixes.css` — keyboard focus and accessibility polish

## Getting started

No build step is required.

1. Download or clone the template.
2. Open `index.html` in a browser, or deploy the project to any static host.
3. Edit the content and branding.
4. Replace the demo functionality/data before production use.

Because the template is static, it works with GitHub Pages and other static hosting services without a backend.

## Customize the theme

Open `css/styles.css`. The design tokens near the top control the core visual system:

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

For a quick rebrand, start with the background, surface, text and accent variables. The template also uses Google Fonts by default; replace the font import if your project uses a different type system.

## Update the calculator

Open `js/app.js` and locate the `rates` object inside `initCalculator()`.

The included values are **static demo rates**. They are not live market data.

```js
const rates = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1535 }
};
```

For a production product, replace the static object with your own trusted data source and add proper loading, failure and stale-data states.

The demo also applies a simulated 0.75% transfer fee:

```js
const fee = value * 0.0075;
```

Change the calculation to match your real pricing model.

## Customize the feature tabs

1. Add a new button inside `.tabs`.
2. Give it a unique `data-tab` value.
3. Add a `.feature-content` block using the same `data-panel` value.
4. The existing JavaScript handles tab switching.

Example:

```html
<button data-tab="savings" role="tab">◎ <span>Smart savings</span></button>

<div class="feature-content" data-panel="savings">
  <h3>Smart savings</h3>
  <p>Automate your savings goals.</p>
</div>
```

## Connect the signup form

The email form is intentionally frontend-only. `js/app.js` prevents the default submission and displays a demo success state.

Before launch, connect it to your own:

- Backend endpoint
- CRM
- Email marketing platform
- Form service
- Custom API

Do not collect real customer information until your privacy, security and data-handling setup is ready.

## Replace demo content

Before using VoltPay commercially, review and replace:

- Exchange rates
- Transfer fees
- Balance figures
- Transaction names and amounts
- Bitcoin/Ethereum prices
- Security and encryption claims
- Uptime percentages
- Processed-volume statistics
- Supported-country counts
- Customer-support claims
- Pricing and plan features
- App Store / Google Play buttons
- Signup destination
- Footer/company/legal links
- Brand name, logo and metadata

The current App Store and Google Play controls are visual placeholders. Add real destination URLs when the corresponding apps exist.

## SEO and deployment

The template includes a basic SEO foundation:

- Descriptive `<title>` and meta description
- Canonical URL
- Open Graph metadata
- SVG favicon
- `robots.txt`
- `sitemap.xml`
- A custom `404.html` page for GitHub Pages/static hosting

If you deploy the template under a different domain or path, update the canonical URL, Open Graph URL, sitemap URL and robots configuration accordingly.

Do not leave the demo GitHub Pages URL in a commercial deployment.

## Accessibility notes

The template includes:

- Semantic HTML
- Accessible navigation labels
- Keyboard-navigable feature tabs
- Visible `:focus-visible` states
- Reduced-motion handling
- Appropriate button types
- Accessible labels for calculator controls

Continue testing keyboard navigation, focus order, contrast and screen-reader output after making major customizations.

## Marketplace customization guide

See [`docs/marketplace-customization.md`](docs/marketplace-customization.md) for a practical buyer-facing checklist covering branding, content, functionality, SEO, deployment and production readiness.

## Production checklist

Before shipping a real product:

- [ ] Replace all fictional/demo financial claims.
- [ ] Connect the signup form to a real service.
- [ ] Replace simulated exchange rates with verified data.
- [ ] Review all pricing and fee calculations.
- [ ] Replace placeholder app-store controls with real links or remove them.
- [ ] Replace placeholder footer links.
- [ ] Add your real legal/privacy documentation.
- [ ] Replace the canonical and Open Graph URLs.
- [ ] Update `sitemap.xml` and `robots.txt`.
- [ ] Add a real social preview image if desired.
- [ ] Choose and publish the appropriate marketplace license before distribution.
- [ ] Test mobile, desktop and keyboard interactions.
- [ ] Run a final accessibility and performance check.

## License

This repository does not currently grant additional usage rights beyond the license terms you choose to publish with your marketplace product. If you sell or distribute this template, add a clear license file and state the permitted usage, redistribution and resale terms before launch.

## Credits

**VoltPay** — created by **Muhadz Techo / Mohammed Sani Yahaya**.

Built as a reusable frontend template with HTML, CSS and Vanilla JavaScript.
