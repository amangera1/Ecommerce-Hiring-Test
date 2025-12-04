# GSAP and WOW.js Animations Implementation Documentation

## Overview
This document explains the implementation of GSAP (GreenSock Animation Platform) and WOW.js animations and parallax effects in the Shopify theme. The implementation enhances the homepage with smooth, performant animations that trigger on scroll and interactive hover effects.

## Libraries Integrated

### 1. GSAP (GreenSock Animation Platform)
- **Version**: 3.12.5
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **Purpose**: Provides powerful animation capabilities with excellent performance
- **Plugin Used**: ScrollTrigger (for scroll-based animations)

### 2. WOW.js
- **Version**: 1.1.2
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js`
- **Purpose**: Triggers CSS animations when elements scroll into view
- **CSS Library**: Animate.css (4.1.1) for additional animation classes

## Files Modified/Created

### 1. `layout/theme.liquid`
**Changes Made:**
- Added GSAP core library script
- Added GSAP ScrollTrigger plugin script
- Added WOW.js library script
- Added Animate.css stylesheet
- Added custom `gsap-animations.js` script reference

**Location in File:**
- Libraries added in the `<head>` section before closing tag
- Custom script added before closing `</body>` tag

### 2. `assets/gsap-animations.js` (NEW FILE)
**Purpose:** Main JavaScript file containing all animation logic

**Key Functions:**

#### `initGSAPAnimations()`
Initializes scroll-triggered animations using GSAP:
- **Zoom-in animations** (`.gsap-zoom-in`): Headings scale from 0.8 to 1 with fade-in
- **Fade-in animations** (`.gsap-fade-in`): Text elements fade in from bottom (30px offset)
- **Slide-left animations** (`.gsap-slide-left`): Images slide in from left (-100px)
- **Slide-right animations** (`.gsap-slide-right`): Images slide in from right (100px)
- **Button enter animations** (`.gsap-button-enter`): Buttons scale in with bounce effect

**Easing Functions Used:**
- `power3.out`: Smooth deceleration for zoom and slide animations
- `power2.out`: Medium deceleration for fade animations
- `back.out(1.7)`: Bounce effect for buttons

#### `initParallaxEffects()`
Implements parallax scrolling effects:
- **Background parallax** (`.parallax-bg`): Moves at 50% of scroll speed
- **Image parallax** (`.parallax-image`): Moves at 30% of scroll speed
- **Text parallax** (`.parallax-text`): Moves at -20% of scroll speed (opposite direction)

**ScrollTrigger Configuration:**
- `scrub: true`: Smooth, continuous animation tied to scroll position
- `start: 'top bottom'`: Animation starts when element top reaches viewport bottom
- `end: 'bottom top'`: Animation ends when element bottom reaches viewport top

#### `initButtonHoverEffects()`
Adds bounce effect on button hover:
- Scale animation: 1 → 1.05 → 1
- Duration: 0.3 seconds
- Easing: `back.out(1.7)` for bounce effect
- Applies to: `.gsap-bounce-hover`, `.the-gift-guide-button`, `.text-container a`, `.mob-btn`

#### `initProductGridAnimations()`
Animates product grid items:
- Staggered animation: Items animate sequentially with 0.15s delay
- Initial state: opacity 0, y: 50px, scale: 0.9
- Final state: opacity 1, y: 0, scale: 1
- Plus icons animate with bounce effect

### 3. Section Files Updated

#### `sections/Banner-with-text.liquid`
**Animation Classes Added:**
- Banner image: `parallax-bg` class for parallax effect
- Heading: `gsap-zoom-in wow animate__animated`
- Subheading: `gsap-fade-in wow animate__animated`
- Button: `gsap-button-enter gsap-bounce-hover wow animate__animated`
- Bottom text: `gsap-fade-in wow animate__animated`

#### `sections/The-Gift-Guide.liquid`
**Animation Classes Added:**
- Upper image: `parallax-image` for parallax effect
- Heading: `gsap-zoom-in wow animate__animated`
- Subheading: `gsap-fade-in wow animate__animated`
- Button: `gsap-button-enter gsap-bounce-hover wow animate__animated`
- Bottom right image: `gsap-slide-right parallax-image`
- Mobile image: `parallax-image`

#### `sections/Product-grid.liquid`
**Animation Classes Added:**
- Grid items: `wow animate__animated` class
- Product images: `gsap-slide-left` class
- Plus icons: Animated via JavaScript with bounce effect

## Animation Classes Reference

### GSAP Animation Classes

| Class Name | Effect | Use Case |
|------------|--------|----------|
| `.gsap-zoom-in` | Scale from 0.8 to 1 with fade | Headings, titles |
| `.gsap-fade-in` | Fade in from bottom (30px) | Text content, descriptions |
| `.gsap-slide-left` | Slide in from left (-100px) | Images, product cards |
| `.gsap-slide-right` | Slide in from right (100px) | Images, product cards |
| `.gsap-button-enter` | Scale in with bounce | Buttons, CTAs |
| `.gsap-bounce-hover` | Bounce effect on hover | Interactive buttons |

### Parallax Classes

| Class Name | Effect | Speed |
|------------|--------|-------|
| `.parallax-bg` | Background parallax | 50% scroll speed |
| `.parallax-image` | Image parallax | 30% scroll speed |
| `.parallax-text` | Text parallax (reverse) | -20% scroll speed |
| `.parallax-container` | Container for parallax elements | N/A |

### WOW.js Classes

| Class Name | Purpose |
|------------|---------|
| `.wow` | Required base class for WOW.js |
| `.animate__animated` | Animate.css base class |

## Performance Optimizations

### 1. Reduced Motion Support
- All animations check for `prefers-reduced-motion` media query
- Animations are skipped if user prefers reduced motion (accessibility)

### 2. Mobile Optimization
- Animation durations reduced by 30% on mobile devices
- ScrollTrigger refreshes on window resize
- Throttled resize handler (250ms delay)

### 3. ScrollTrigger Configuration
- `once: true`: Animations play only once when element enters viewport
- `toggleActions: 'play none none reverse'`: Play on enter, reverse on leave
- Efficient intersection observers for scroll detection

### 4. Lazy Loading
- Product images use `loading: 'lazy'` attribute
- Scripts loaded with `defer` attribute for non-blocking execution

## Responsive Behavior

### Desktop (> 768px)
- Full animation effects enabled
- Parallax effects active
- All hover effects functional

### Mobile (≤ 768px)
- Animation durations reduced by 30%
- Parallax effects maintained but optimized
- Touch-friendly hover states

## Accessibility Features

1. **Reduced Motion Support**: Respects user's motion preferences
2. **Keyboard Navigation**: All interactive elements remain keyboard accessible
3. **Screen Reader Friendly**: Animations don't interfere with screen readers
4. **Performance**: Smooth 60fps animations without jank

## Shopify Theme Editor Support

The implementation includes support for Shopify's theme editor:
- Animations reinitialize when sections are loaded in editor
- ScrollTrigger refreshes on section reorder
- Design mode detection and handling

## Usage Examples

### Adding Animation to a New Element

**HTML:**
```liquid
<h2 class="gsap-zoom-in wow animate__animated">My Heading</h2>
```

**For Images:**
```liquid
{{ image | image_tag: class: 'parallax-image gsap-slide-left' }}
```

**For Buttons:**
```liquid
<a href="#" class="gsap-button-enter gsap-bounce-hover">Click Me</a>
```

## Troubleshooting

### Animations Not Working
1. Check browser console for JavaScript errors
2. Verify GSAP and WOW.js libraries are loaded
3. Ensure elements have correct animation classes
4. Check if `prefers-reduced-motion` is enabled

### Parallax Not Smooth
1. Verify ScrollTrigger plugin is loaded
2. Check if element has `.parallax-container` parent
3. Ensure sufficient scroll distance for effect

### Performance Issues
1. Reduce number of animated elements
2. Use `once: true` in ScrollTrigger configs
3. Optimize images (use appropriate sizes)
4. Check for conflicting CSS transitions

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Opera**: Full support
- **IE11**: Not supported (use polyfills if needed)

## Future Enhancements

Potential improvements:
1. Add more animation presets
2. Create theme settings for animation toggles
3. Add animation speed controls
4. Implement scroll progress indicators
5. Add more parallax variations

## References

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [WOW.js GitHub](https://github.com/matthieua/WOW)
- [Animate.css](https://animate.style/)

---

**Implementation Date**: Current
**Developer**: Shopify Development Team
**Version**: 1.0

