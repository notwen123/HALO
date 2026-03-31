# Design System Strategy: High-End Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Luminous Aura."** 

This system moves beyond traditional flat web design, treating the screen as a canvas of depth, light, and motion. By drawing inspiration from fluid intelligence, we break the "template" look through intentional asymmetry—where content breathes in expansive negative space—and high-contrast typography scales that feel more like a premium magazine than a software interface. We prioritize tonal transitions over rigid borders, creating a digital experience that feels organic, authoritative, and deeply integrated.

## 2. Colors
Our color palette is built on a foundation of deep, ink-like blacks and crisp whites, punctuated by a sophisticated "vibrant-cool" spectrum.

### The Palette
- **Core:** `#000000` (Black), `#FFFFFF` (White)
- **Vibrant Accents:** `#F43881` (Siri Pink), `#5C20B6` (Royal Purple), `#14B5CC` (Cyan)
- **Functional Tokens:** Using the Material-mapped values like `primary` (`#D3BBFF`) and `surface` (`#131313`).

### Visual Rules
- **The "No-Line" Rule:** Explicitly prohibit the use of 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background creates a clean, sophisticated break without the "clutter" of lines.
- **Surface Hierarchy & Nesting:** Treat the UI as layers of stacked glass. Use `surface-container` tiers (Lowest to Highest) to define importance. An inner card should use `surface-container-high` while its parent section uses `surface`.
- **The "Glass & Gradient" Rule:** Floating elements must utilize Glassmorphism. Apply semi-transparent surface colors with a `backdrop-blur` of 20px–40px. 
- **Signature Textures:** Main CTAs and Hero headlines should utilize multi-stop linear gradients (e.g., `#F43881` to `#5C20B6`) at a 45-degree angle to provide a sense of "visual soul" and energy.

## 3. Typography
We use **SF Pro** to convey a sense of precision and modern luxury.

*   **Display (Display-LG/MD):** Large, tight-leading headlines set in SF Pro Display. Use these for high-impact statements. The scale is intentionally dramatic (3.5rem+) to create an editorial feel.
*   **Headline (Headline-LG):** Sub-headers that introduce new sections. These should feel authoritative and grounded.
*   **Body (Body-LG/MD):** SF Pro Text is utilized here for maximum legibility at smaller sizes. 
*   **Label (Label-MD/SM):** Reserved for technical data or small metadata, providing a "pro" utility feel.

**Hierarchy Strategy:** Use "Typographic Anchoring"—pairing a massive Display-LG headline with a significantly smaller Body-MD paragraph nearby. This extreme contrast in scale is a hallmark of high-end design.

## 4. Elevation & Depth
Depth is not a shadow; it is a **Tonal Layer.**

- **The Layering Principle:** Stack `surface-container` tiers to create lift. A `surface-container-lowest` card placed on a `surface-container-low` background provides a soft, natural "recessed" look.
- **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Value:* `0px 20px 40px rgba(0, 0, 0, 0.08)`
    *   The shadow color should never be pure black; it should be a tinted version of the background to mimic natural light refraction.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border" using `outline-variant` at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.
- **Interaction Depth:** Upon hover, containers should subtly increase in "luminosity" (shifting from `surface-container` to `surface-bright`) rather than just getting larger.

## 5. Components

### Buttons
*   **Primary:** A pill-shaped (`rounded-full`) container. In dark mode, use a white background with black text. In light mode, a black background with white text. No shadows.
*   **Tertiary (Text-only):** Use `on_primary` color with a trailing chevron (→). Ensure the chevron is part of the SF Pro glyph set for weight consistency.

### Navigation Bar
*   **Glass Header:** A fixed position bar with 70% opacity of the `surface` color and a heavy `backdrop-blur` (30px). 
*   **Micro-interaction:** Items should subtly fade in opacity when not hovered, returning to 100% on hover.

### Cards & Lists
*   **The No-Divider Rule:** Forbid the use of divider lines between list items. Use vertical white space (Spacing scale `6` or `8`) or a 2% tonal shift in background color to separate content.
*   **Interactive Cards:** Roundedness must follow the `xl` token (`3rem`) for a friendly yet premium "object" feel.

### Input Fields
*   **Minimalist State:** Use a `surface-container-highest` background. Only show a border on `focus` state, and even then, use the `primary` glow effect (soft glow, not a hard line).

## 6. Do's and Don'ts

### Do:
*   **Use Massive White Space:** Let the content "float" in the center of the viewport.
*   **Intentional Asymmetry:** Align text to the left while placing an image slightly off-center to the right to create a dynamic flow.
*   **Tonal Transitions:** When moving from a dark section to a light section, use a large "interstitial" space (Spacing `24`) to let the eye adjust.

### Don't:
*   **Don't use 1px Borders:** It breaks the "Luminous Aura" and makes the UI look like a legacy enterprise app.
*   **Don't Over-saturate:** Use gradients sparingly. If a headline is a gradient, the background must be a solid neutral.
*   **Don't use Standard Shadows:** Avoid the "drop shadow" look. If it looks like it was made in 2015, it's too heavy.
*   **Don't Grid-Lock:** Avoid making every column the same width. Use a 12-column grid but break it by having elements span 5 columns or 7 columns to create visual interest.