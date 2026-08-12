# Kanban Project

## Business Requirements

- An MVP of a Kanban style Project Management application as a web app  
- The web app should only have 1 board
- The board has fixed 5 columns that can be renamed  
- Each card has a title and details only
- Drag and drop interface to move cards between columns
- Add a new card to a column; delete an existing card
- Additional functionality: archive, search/filter, but Keep it simple.
- The priority is a slick, professional, gorgeous UI/UX with very simple features
- The app should open with dummy data populated for the single board
- Review guide.md for the requirements. Each part of the appendix should be a separate tab that I can access and edit and changes should persist.

## Technical Details

- Implemented as a modern NextJS app, client rendered
- The NextJS app should be created in a subdirectory `frontend`
- Local persistence
- No user management for the MVP
- Use popular libraries
- As simple as possible but with an elegant UI

## Color Scheme

-## Color Palette
 
### Primary Brand Colors
 
| Color Name | Hex | Usage |
|------------|-----|-------|
| Brand Blue | `#3A55FF` | Primary accent, CTA buttons, key highlights, hyperlinks |
| Bright Blue | `#009BFF` | Gradient start, secondary accent, charts |
| Brand Purple | `#770BFF` | Gradient end, premium/emphasis elements |
| Brand Cyan | `#0096FA` | Logo gradient start, data visualizations, icons |
| Light Cyan | `#84C9F7` | Subtle highlights, light chart fills, tag backgrounds |
 
### Neutral Colors
 
| Color Name | Hex | Usage |
|------------|-----|-------|
| Dark Primary | `#090A0F` | Dark backgrounds, primary text on light backgrounds (never pure black) |
| Dark Secondary | `#10121A` | Alternate dark backgrounds, secondary dark panels |
| Light Gray | `#EBF0F5` | Light section backgrounds, card fills |
| Muted Gray | `#C4D3E3` | Muted text, icons, borders, dividers |
| White | `#FFFFFF` | Primary light background, text on dark backgrounds |
 
### Brand Gradient
 
Signature gradient, left-to-right, cyan to purple:
 
```css
background: linear-gradient(90deg, #0096FA 0%, #770BFF 100%);
```
 
Use for accent bars, divider lines, header underlines, chart emphasis — sparingly, never as a full background fill.
 
### CTA / Button Gradient
 
```css
background: linear-gradient(95deg, #009BFF 0%, #3A55FF 100%);
```
 
### Chart Colors (in order)
 
`#3A55FF`, `#009BFF`, `#770BFF`, `#84C9F7`, `#C4D3E3`
 
### Color Application Rules
 
- Light graphics: White (#FFFFFF) background, Dark Primary (#090A0F) heading text, Dark Secondary (#10121A) body text
- Dark graphics: Dark Primary (#090A0F) background, White (#FFFFFF) heading/body text, Brand Blue or Light Cyan for accents
- Never use colors outside this palette
---
 
## Typography
 
| Role | Font | Fallback |
|------|------|----------|
| Display/Headings | Wix Madefor Display | Inter, system-ui, sans-serif |
| Body text | Wix Madefor Display | Inter, system-ui, sans-serif |
| Serif Accent | STIX Two Text (italic only) | Georgia, serif |
| Data/Monospace | Inconsolata | Consolas, monospace |
 
**STIX Two Text** is reserved for exactly two uses:
1. One italic accent word per headline (the noun or verb, never an adjective)
2. Section numbers in decks (`01.`, `02.`, etc.)
Always Bright Blue `#009BFF`, except a single permitted Blue→Violet gradient (`linear-gradient(135deg, #009BFF 0%, #770BFF 100%)`) on a hero H1 accent word. When STIX appears alongside Wix in a headline, Wix must be SemiBold (600), never Bold (700).
 
### Type Scale
 
| Element | Size | Weight | Letter-spacing |
|---------|------|--------|-----------------|
| H1 (display) | 66px | SemiBold (600) | -2px |
| H2 | 48px | SemiBold (600) | -1px |
| H3 | 30px | SemiBold (600) | -0.5px |
| H4 | 24px | Medium (500) | -0.5px |
| H5 | 20px | Medium (500) | -0.5px |
| Body Copy 1 | 18px | Medium (500) | -0.5px |
| Body Copy 2 | 16px | Regular (400) | 0 |
| Body Copy 3 / Caption | 14px | Regular (400) | 0 |
| Overline / Label | 12px UPPERCASE | Medium (500) | 1.5px |
| Big Metric | 48–70px | SemiBold (600) | -2px |
 
### Typography Rules
 
- Headings are sentence case
- Overline labels are UPPERCASE, letter-spacing 1.5px
- Never use more than 2 font families in a single graphic
- No underlines for emphasis — use bold or Brand Blue instead
---
 
## Logo Usage
 
| File | Icon Mark | Wordmark | Use When |
|------|-----------|----------|----------|
| `pattern_logo_blue_black.svg` | Blue `#009BFF` | Black `#231F20` | Light backgrounds — preferred |
| `pattern_logo_black.svg` | Black | Black | Light backgrounds — monochrome |
| `pattern_footer_logo.svg` | Gradient | Gradient | Light backgrounds — legacy gradient |
| `pattern_logo_blue_white.svg` | Blue `#009BFF` | White `#F2F2F2` | Dark backgrounds — preferred |
| `pattern_logo_white.svg` | White | White | Dark backgrounds — monochrome |
| `pattern_icon_mark.svg` | Gradient | — | Compact placements, watermarks |
 
**Rules:** Maintain clear space equal to the icon mark's height on all sides. Never stretch, rotate, recolor, or add drop shadows to the logo. Never place it on busy/low-contrast backgrounds. Include the logo on every graphic.
 
### Piagonal Mark
 
Pattern's geometric shape (two overlapping diagonal parallelograms) — decorative only, not a logo replacement.
 
- `piagonal_black.svg` — light backgrounds
- `piagonal_white.svg` — dark backgrounds (low opacity as watermark)
- `piagonal_gradient.svg` — either, for gradient treatment
Opacity as watermark: 3–8% on dark, 4–10% on light. Full opacity for smaller accent use.
 
---
 
## Shadows
 
**Light theme:**
- Base: `0 2px 3px rgba(7,7,8,0.1)`
- Large: `0 2px 3px rgba(7,7,8,0.1), 0 14px 14px rgba(7,7,8,0.1), 0 45px 45px rgba(7,7,8,0.1)`
**Dark theme:**
- Base: `0 2px 3px rgba(7,7,8,0.5)`
- Large: `0 2px 3px rgba(7,7,8,0.5), 0 14px 14px rgba(7,7,8,0.5), 0 45px 45px rgba(7,7,8,0.5)`
**Special:** Blue Inner Shadow: `inset 0 -10px 40px #3a55ff, inset 0 -4px 10px #0096fa`
 
---
 
## Visual Elements
 
| Element | Style |
|---------|-------|
| Cards | Fill `#EBF0F5`, radius 12px, no border |
| Dark cards | Fill `#090A0F`, text white, radius 12px |
| Divider lines | 1px solid `#C4D3E3` (or gradient for emphasis) |
| Accent bars | Height 4px, brand gradient fill |
| CTA buttons | CTA gradient fill, radius 8px, 12px UPPERCASE White SemiBold text, padding 12px 24px |
| Tags/Badges | Fill `#EBF0F5`, radius 20px (pill), text 10px UPPERCASE `#3A55FF` |
| Table header | Fill `#090A0F`, text White 12px SemiBold |
| Table rows | Alternating White / `#EBF0F5`, borders 0.5px `#C4D3E3` horizontal only |
 
**Corner radii:** Cards 12px · Buttons 8px · Images 12px · Tags 20px (pill)
 
**Icons:** Outline-style (Lucide/Tabler). Light backgrounds: `#C4D3E3` default, `#3A55FF` for emphasis. Dark backgrounds: `#FFFFFF` or `#84C9F7`.

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
