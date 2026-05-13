# Pinnacle Shield Insurance

A multi-page fictional insurance website built with HTML, CSS, and vanilla JavaScript. Users can get instant premium quotes for auto, home, and life insurance, compare quotes side-by-side, save quotes locally, and print results.

## Pages

| Page | File | Description |
| --- | --- | --- |
| Home | `index.html` | Hero section, insurance type cards, "Why Choose Us" highlights |
| Get a Quote | `quote.html` | Interactive multi-step quote form with live results |
| About Us | `about.html` | Company overview, values, and team cards |
| FAQ | `faq.html` | Accordion FAQ with live search/filter |

## Features

### Quote Form

- Choose from **Auto**, **Home**, or **Life** insurance using styled radio cards
- Type-specific field sets shown/hidden dynamically
- 3-step progress indicator updates as the user moves through the form
- Full JavaScript validation — no reliance on HTML5 `required`/`pattern` attributes
- 1.5-second loading spinner before results appear
- Results fade in with a CSS keyframe animation

### Premium Calculator

Each insurance type uses a multiplier-based mock calculator:

- **Auto** — base $75/mo × age, vehicle age, mileage, driving record, and coverage level factors
- **Home** — base from home value × year built, construction type, security/sprinkler discounts, square footage, and coverage level
- **Life** — base from coverage amount × age, smoker status, exercise frequency, pre-existing conditions, gender, and coverage level

Results include a summary card (monthly + annual premium) and a per-factor breakdown table.

### Compare, Save & Print

- **Compare** — save the current quote, fill out a second, and view both side-by-side with differing rows highlighted
- **Save** — persists quote data to `localStorage`; saved quotes are listed below the form with a delete option
- **Print** — `@media print` stylesheet hides navigation and form, shows only the results; a separate "Print Comparison" path uses a `body.printing-comparison` class to switch which section is printed

### Other

- FAQ accordion with live search that filters items as the user types
- Active nav link highlighted automatically by `js/main.js` based on the current URL
- Smooth scroll for in-page anchor links

## Tech Stack

- **HTML5** — semantic markup, `aria-current`, `role` attributes
- **CSS3** — custom `@keyframes` animations (`heroFadeUp`, `fadeSlideIn`, `shieldBeat`, `cardPop`), CSS print stylesheet, `@media (prefers-reduced-motion)` support, flex layout
- **Vanilla JavaScript** — DOM manipulation via `textContent`/`createElement` (no `innerHTML` on user data), `localStorage` API, form validation
- **Bootstrap 5.3** — grid, cards, accordion, `btn-check` radio pattern, spinner, utility classes
- **Bootstrap Icons** — shield icon in navbar brand

## File Structure

```text
├── index.html
├── quote.html
├── about.html
├── faq.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js       # nav highlighting, smooth scroll
│   └── quote.js      # quote form, calculator, compare, save, print
└── .github/
    └── workflows/
        └── deploy.yml
```

## Deployment

The site is deployed to **GitHub Pages** via GitHub Actions. On every push to `main`, the workflow:

1. Validates that all required HTML, CSS, and JS files are present
2. Checks each HTML file for `<!DOCTYPE html>` and a `lang` attribute
3. Deploys the repository root to GitHub Pages
