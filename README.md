# Bulkachuwa Delivery

Mobile-first website for **Bulkachuwa Delivery** (Maiduguri).

Live domain: [https://bulkachuwa.delivery](https://bulkachuwa.delivery)

- Delivery request form (Formspree)
- WhatsApp button with a prefilled request message
- SEO, Open Graph, favicons, and sitemap ready for Google Search Console

## Branding

All public copy uses **Bulkachuwa Delivery** (formerly Gidan Sauki).

Logo and icons:

- Header / footer: `asset/logo-header.webp` (small, fast)
- Full logo: `asset/logo.jpeg`
- Share / Google image: `asset/og-image.jpg`
- Favicons: `favicon.ico`, `apple-touch-icon.png`, and every file in `asset/favicon_io/`

## Google Search Console + domain

1. Buy / point **bulkachuwa.delivery** at this GitHub Pages site.
2. At your domain registrar, add GitHub Pages DNS:

   **A records** for `@` / apex:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Optional **CNAME** for `www` → `waleed0562.github.io`

3. Then in the repo: **Settings → Pages → Custom domain** → enter `bulkachuwa.delivery` (this creates the `CNAME` file). Do this only after DNS is set, or the current GitHub Pages link will redirect to a domain that is not live yet.
4. Wait for HTTPS to turn green in Pages settings.
5. Open [Google Search Console](https://search.google.com/search-console), add a **Domain** property for `bulkachuwa.delivery`, and verify with the DNS TXT record Google gives you (best method for this domain).
6. After verification, submit `https://bulkachuwa.delivery/sitemap.xml`.

If Search Console instead gives an HTML `<meta>` tag, paste it into `index.html` where the Google Search Console comment is.

Already on the site for Google / link previews:

- Canonical URL
- `robots.txt` + `sitemap.xml`
- Open Graph + Twitter card (`asset/og-image.jpg`)
- JSON-LD LocalBusiness schema
- Full favicon set (16, 32, 180, 192, 512, ico, manifest)

## Local preview

Open `index.html` in a browser, or serve the folder with any static server.

Formspree form ID and WhatsApp number are already set in `index.html` / `script.js`.
