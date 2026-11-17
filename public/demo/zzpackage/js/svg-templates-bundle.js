/**
 * SVG template bundle for Brief Form Design Visualizer (BRIEF-VIZ-01).
 * Loaded once with the brief form — no per-product fetch needed.
 * Each template uses data-field attributes for JS binding.
 * viewBox is fixed per template; product cm dimensions are stored in design_viz metadata only.
 */
/* eslint-disable max-len */
const SVG_TEMPLATES = {

banner_landscape: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 500">
  <rect data-field="bg_color" width="100%" height="100%" fill="#1a1a2e"/>
  <image data-field="logo" x="5%" y="10%" width="25%" height="50%" href="" preserveAspectRatio="xMidYMid meet"/>
  <text data-field="line1" x="50%" y="40%" font-family="system-ui, sans-serif" font-size="72" font-weight="bold" fill="#ffffff" text-anchor="middle"><tspan>Bedrijfsnaam</tspan></text>
  <text data-field="line2" x="50%" y="64%" font-family="system-ui, sans-serif" font-size="48" fill="#009fe3" text-anchor="middle"><tspan>Slogan of telefoonnummer</tspan></text>
  <rect x="0.4%" y="0.8%" width="99.2%" height="98.4%" fill="none" stroke="#009fe3" stroke-width="2" stroke-dasharray="8 4" opacity="0.3"/>
</svg>`,

banner_portrait: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 850 2000">
  <rect data-field="bg_color" width="100%" height="100%" fill="#1a1a2e"/>
  <image data-field="logo" x="20.6%" y="5%" width="58.8%" height="25%" href="" preserveAspectRatio="xMidYMid meet"/>
  <text data-field="line1" x="50%" y="40%" font-family="system-ui, sans-serif" font-size="80" font-weight="bold" fill="#ffffff" text-anchor="middle"><tspan>Bedrijfsnaam</tspan></text>
  <text data-field="line2" x="50%" y="50%" font-family="system-ui, sans-serif" font-size="52" fill="#009fe3" text-anchor="middle"><tspan>Slogan of dienst</tspan></text>
  <line x1="14.7%" y1="60%" x2="85.3%" y2="60%" stroke="#009fe3" stroke-width="3" opacity="0.5"/>
  <rect x="0.5%" y="0.2%" width="99%" height="99.6%" fill="none" stroke="#009fe3" stroke-width="2" stroke-dasharray="8 4" opacity="0.3"/>
</svg>`,

visitekaartje: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 850 550">
  <rect data-field="bg_color" width="100%" height="100%" fill="#ffffff"/>
  <image data-field="logo" x="5.9%" y="7.3%" width="23.5%" height="36.4%" href="" preserveAspectRatio="xMidYMid meet"/>
  <text data-field="line1" x="50%" y="21.8%" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" fill="#1a1a2e" text-anchor="middle"><tspan>Naam Achternaam</tspan></text>
  <line x1="35.3%" y1="29.1%" x2="64.7%" y2="29.1%" stroke="#009fe3" stroke-width="3"/>
  <text data-field="line2" x="50%" y="40%" font-family="system-ui, sans-serif" font-size="32" fill="#555555" text-anchor="middle"><tspan>Functie / Bedrijf</tspan></text>
  <text data-field="phone" x="50%" y="60%" font-family="system-ui, sans-serif" font-size="30" fill="#1a1a2e" text-anchor="middle"><tspan>06 - 12 34 56 78</tspan></text>
  <text data-field="email" x="50%" y="70.9%" font-family="system-ui, sans-serif" font-size="28" fill="#1a1a2e" text-anchor="middle"><tspan>info@jouwbedrijf.nl</tspan></text>
  <text data-field="website" x="50%" y="81.8%" font-family="system-ui, sans-serif" font-size="28" fill="#009fe3" text-anchor="middle"><tspan>www.jouwbedrijf.nl</tspan></text>
  <rect x="0.2%" y="0.4%" width="99.5%" height="99.3%" fill="none" stroke="#cccccc" stroke-width="1" rx="4"/>
</svg>`,

sticker_rect: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 1000">
  <rect data-field="bg_color" width="100%" height="100%" fill="#ffffff" rx="20"/>
  <image data-field="logo" x="15%" y="10%" width="70%" height="35%" href="" preserveAspectRatio="xMidYMid meet"/>
  <text data-field="line1" x="50%" y="60%" font-family="system-ui, sans-serif" font-size="52" font-weight="bold" fill="#1a1a2e" text-anchor="middle"><tspan>Bedrijfsnaam</tspan></text>
  <text data-field="line2" x="50%" y="72%" font-family="system-ui, sans-serif" font-size="36" fill="#555555" text-anchor="middle"><tspan>06 - 12 34 56 78</tspan></text>
  <rect x="0.8%" y="0.4%" width="98.4%" height="99.2%" fill="none" stroke="#cccccc" stroke-width="1" rx="18"/>
</svg>`,

sticker_strip: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 500">
  <rect data-field="bg_color" width="100%" height="100%" fill="#ffffff" rx="4"/>
  <image data-field="logo" x="10%" y="5%" width="80%" height="28%" href="" preserveAspectRatio="xMidYMid meet"/>
  <text data-field="line1" x="50%" y="52%" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e" text-anchor="middle"><tspan>Bedrijfsnaam</tspan></text>
  <text data-field="line2" x="50%" y="68%" font-family="system-ui, sans-serif" font-size="8" fill="#555555" text-anchor="middle"><tspan>06 - 12 34 56 78</tspan></text>
  <rect x="2" y="2" width="96" height="496" fill="none" stroke="#cccccc" stroke-width="1" rx="3"/>
</svg>`

};
/* eslint-enable max-len */
