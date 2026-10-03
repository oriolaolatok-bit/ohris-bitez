# Ohris Bitez

A responsive bakery storefront built with plain HTML, CSS, and JavaScript. Open `index.html` in a browser to preview it.

## Hosting and custom domain

The site is deployed publicly through GitHub Pages. The current GitHub Pages URL is `https://oriolaolatok-bit.github.io/ohris-bitez/`.

Three bread-card photos in `assets/` correspond to the sardine, milk, and banana bread reference pins supplied for the site. The owner confirmed permission to publish them.

`ohrisbitez.com` was checked against the Verisign `.com` RDAP endpoint on 2026-10-03, which returned HTTP 404 (no registration record found). It has not been registered or configured. Register the domain with a registrar first; once registered, configure:

- Apex `A` records (`@`) to GitHub Pages' shared addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
- Optional apex `AAAA` records to GitHub Pages' shared IPv6 addresses: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.
- `www` `CNAME` to `oriolaolatok-bit.github.io`.

These are GitHub Pages' shared anycast frontend addresses, not a dedicated server IP for this site. After DNS resolves to GitHub Pages and domain ownership is verified, add `ohrisbitez.com` in repository **Settings → Pages → Custom domain**, enforce HTTPS, and add a root `CNAME` file to the published site. Then add the canonical URL and social URL metadata to `index.html`. Do not point a custom domain at Pages before registering and controlling it.

## Before accepting orders

- Menu illustrations and descriptions are original examples. Confirm actual products, ingredients, allergens, and availability with the bakery. Prices are intentionally omitted.
- The contact phone is linked as a tap-to-call number. Confirm its country code and add the verified business email, physical address, opening hours, and social links.
- The bag tracks requested items only; it does not submit orders or process payments. Connect a secure order flow and payment provider before taking online orders. Keep personal bank/mobile-money account details out of this public repository.
- Review privacy, accessibility, consumer terms, tax, delivery, and food-allergen requirements for the bakery's location.
