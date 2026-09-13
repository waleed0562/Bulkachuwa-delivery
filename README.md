# Gidan Sauki Delivery Website

Simple, mobile-first website for **Gidan Sauki Delivery** with:

- Delivery request form
- Email submission via Formspree
- WhatsApp button with prefilled message template

## Quick Setup

1. Open `index.html`
2. Find this line and replace with your real Formspree form ID:

```html
action="https://formspree.io/f/YOUR_FORMSPREE_ID"
```

3. Open `script.js`
4. Replace the WhatsApp number:

```js
const WHATSAPP_NUMBER = "2348000000000";
```

Use format: `countrycode + number` with no `+` and no spaces.

Example: `2348012345678`

## Run locally

Just open `index.html` in your browser.

## Deploy

You can deploy quickly with:
- GitHub Pages
- Netlify
- Vercel

## Notes

- The form submits to Formspree and sends to your email once Formspree is connected.
- The WhatsApp button opens chat with a pre-typed template users can edit and send.
