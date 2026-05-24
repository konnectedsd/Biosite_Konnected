---
name: Kinetic Cyber-Emerald
colors:
  surface: '#111414'
  surface-dim: '#111414'
  surface-bright: '#373a39'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#191c1c'
  surface-container: '#1d2020'
  surface-container-high: '#282a2a'
  surface-container-highest: '#333535'
  on-surface: '#e1e3e2'
  on-surface-variant: '#bccac3'
  inverse-surface: '#e1e3e2'
  inverse-on-surface: '#2e3131'
  outline: '#86948e'
  outline-variant: '#3d4945'
  surface-tint: '#66daba'
  primary: '#66daba'
  on-primary: '#00382c'
  primary-container: '#28a789'
  on-primary-container: '#003529'
  inverse-primary: '#006b56'
  secondary: '#c5c7c6'
  on-secondary: '#2e3131'
  secondary-container: '#444747'
  on-secondary-container: '#b3b5b5'
  tertiary: '#c3c7c7'
  on-tertiary: '#2c3131'
  tertiary-container: '#919696'
  on-tertiary-container: '#2a2f2f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#84f7d5'
  primary-fixed-dim: '#66daba'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#005140'
  secondary-fixed: '#e1e3e2'
  secondary-fixed-dim: '#c5c7c6'
  on-secondary-fixed: '#191c1c'
  on-secondary-fixed-variant: '#444747'
  tertiary-fixed: '#dfe3e3'
  tertiary-fixed-dim: '#c3c7c7'
  on-tertiary-fixed: '#171c1c'
  on-tertiary-fixed-variant: '#434848'
  background: '#111414'
  on-background: '#e1e3e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for high-performance B2B technology, balancing the raw energy of cyber-tech with the refined precision of professional enterprise software. The brand personality is authoritative, cutting-edge, and secure. It aims to evoke a sense of "technical mastery" through a visual language inspired by high-end server architecture and bioluminescent digital interfaces.

The aesthetic blends **Minimalism** with **Modern Cyber-Tech** elements. It utilizes deep, ink-like blacks to create an infinite canvas, punctuated by sharp, high-intensity emerald accents. Visual interest is driven by functional geometry, subtle circuit-inspired patterns, and precise light-casting that suggests data flowing through a physical substrate.

## Colors

The palette is strictly nocturnal, optimized for high-contrast visibility and reduced eye strain during deep work.

- **Cyber Black (#050707):** The foundation. Used for the primary background to create depth.
- **Deep Charcoal & Circuit Gray:** Used for surface tiering (containers, cards, and navigation bars) to establish hierarchy.
- **Electric Emerald (#28A789):** The "Pulse." This color is reserved for primary actions, success states, and critical data highlights. It should be used sparingly to maintain its impact.
- **Text Tiers:** Pure White is reserved for headings. Silver Light is the standard for body copy. Clinical Muted Gray is used for non-interactive labels and metadata.

## Typography

This design system utilizes a dual-font strategy to balance character with utility.

**Space Grotesk** is the voice of the system. Its geometric, slightly eccentric letterforms provide the "tech-forward" personality required for headings and display hero sections. It should always be set with tighter letter-spacing in larger sizes.

**Inter** handles the heavy lifting of data and long-form content. Its neutral, highly legible structure ensures that complex technical information remains accessible. Use the uppercase label-sm style for table headers and categorization tags to evoke a "terminal" aesthetic.

## Layout & Spacing

The design system employs a **Fluid Grid** model based on a strictly enforced 8px base unit. 

- **Desktop (1440px+):** 12-column grid with 24px gutters and 64px side margins.
- **Tablet (768px - 1439px):** 8-column grid with 24px gutters and 32px side margins.
- **Mobile (0px - 767px):** 4-column grid with 16px gutters and 16px side margins.

Spacing should favor "breathing room" around content blocks to emphasize a high-end, premium feel. Use `lg` and `xl` spacing for vertical section separation to maintain a clean, uncluttered layout.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Neon Glows** rather than traditional shadows.

1.  **Floor:** Cyber Black (#050707) for the main canvas.
2.  **Surface:** Deep Charcoal (#0E1111) for primary containers. Use a subtle 1px border of Dark Circuit Gray (#141919) to define edges.
3.  **Floating:** Elements like dropdowns or modals use Dark Circuit Gray and include a "bloom" effect—a soft, low-opacity emerald outer glow (0px 8px 24px rgba(40, 167, 137, 0.15)) to indicate they are active or elevated.

**Geometric Circuit Patterns:** Use low-opacity (2-5%) SVG circuit patterns as background overlays on the Floor level to add texture without distracting from content.

## Shapes

The shape language is **Soft-Sharp**. While the overall vibe is aggressive and tech-driven, a minimal 4px (`rounded-sm`) radius is applied to UI components to prevent the interface from looking "retro" or unpolished.

- **Standard Elements:** 4px radius (Inputs, Cards, Buttons).
- **Decorative Elements:** 0px radius for accent lines and side decorators to maintain the "circuit board" precision.
- **Interactive States:** Use a clipped-corner (45-degree chamfer) aesthetic for primary CTA buttons to reinforce the cyber-tech narrative.

## Components

- **Buttons:** Primary buttons are solid Electric Emerald with black text. Hover states should trigger a "glow" transition where the box-shadow expands. Secondary buttons use a 1px emerald border with transparent backgrounds.
- **Inputs:** Dark backgrounds with a 1px Gray border. On focus, the border transitions to Emerald, and a subtle inner glow appears. Use monospaced numbers for data input fields.
- **Chips/Tags:** Small, pill-shaped with 0px roundedness on one side and 4px on the other (asymmetrical) for a custom tech feel. Use low-opacity emerald backgrounds with high-contrast text.
- **Cards:** No shadows. Use "lit edges"—a 1px top border that is slightly lighter than the rest of the frame to simulate an overhead light source.
- **Circuit Dividers:** Instead of plain lines, use dividers that terminate in a small 4x4px square or a 45-degree angle to mimic PCB traces.
- **Data Visualizations:** Use the Emerald primary color as the lead, with secondary data points in Silver or Muted Gray. Avoid multi-color "rainbow" charts; stay within the monochromatic emerald-to-gray spectrum.