# uzupo — Website Build Brief
# READ THIS ENTIRE FILE COMPLETELY BEFORE WRITING A SINGLE LINE OF CODE.
# EVERY ANSWER YOU NEED IS IN THIS DOCUMENT. DO NOT ASK QUESTIONS. JUST BUILD.

---

## FOLDER STRUCTURE

```
uzupo-website/
├── CLAUDE.md
├── reference-websites/
│   ├── reference1.PNG    (POSTRED facilities — full-bleed photo + text overlay)
│   ├── reference2.PNG    (POSTRED services — giant stacked type with dividers)
│   ├── reference3.PNG    (POSTRED foley — large condensed type over dark photo)
│   ├── reference4.PNG    (Rev Rooms hero — full-bleed video + massive headline)
│   ├── reference5.PNG    (Sweet Justice hero — centered logo over video)
│   ├── reference6.PNG    (POSTRED about — two-column dark split)
│   ├── reference7.PNG    (POSTRED projects — split image/title card layout)
│   └── reference8.PNG    (POSTRED about — massive left text + right body copy)
├── assets/
│   ├── logos/
│   │   ├── uzupologoamber.png     PRIMARY — used everywhere except footer
│   │   └── uzupologowhite.png     SECONDARY — footer only
│   ├── video/
│   │   ├── hero.mp4               Foley service page background
│   │   ├── commercials-reel.mp4   Advertising service page background
│   │   └── fieldrecording-reel.mp4  Field Recording service page background
│   ├── images/
│   │   ├── festivals/
│   │   │   ├── annecy.png
│   │   │   ├── poff.png
│   │   │   ├── sarajevo.png
│   │   │   └── seattle.png
│   │   ├── projects/
│   │   │   ├── air-blue-silk.jpg
│   │   │   ├── blackbird.jpg
│   │   │   ├── bog-christmas.jpg
│   │   │   ├── elene-dariani.jpg
│   │   │   ├── field.jpg
│   │   │   ├── horse-fly.jpg
│   │   │   ├── inhale.jpg
│   │   │   ├── oh-mother-mother.jpg
│   │   │   ├── silent-blues.jpg
│   │   │   ├── tbc-bank-game.jpg
│   │   │   ├── the-gamers.jpg
│   │   │   ├── touching-the-sky.jpg
│   │   │   ├── what-made-you-tired.jpg
│   │   │   └── wynflair.jpg
│   │   ├── studio/
│   │   │   ├── field-recording-1.jpg   (black and white)
│   │   │   ├── field-recording-2.jpg   (black and white)
│   │   │   ├── field-recording-3.jpg   (black and white)
│   │   │   ├── process-feet.jpg
│   │   │   ├── process-feet-2.jpg
│   │   │   ├── process-feet-3.jpg
│   │   │   ├── process-feet-4.jpg
│   │   │   ├── process-foleytracks.jpg
│   │   │   ├── process-monitors.jpg
│   │   │   ├── process-props.jpg
│   │   │   ├── process-props-2.jpg
│   │   │   ├── process-props-3.jpg
│   │   │   ├── process-sounddesign.jpg
│   │   │   ├── studio-atmosphere.jpg
│   │   │   └── studio-atmosphere-2.jpg
│   │   └── team/
│   │       └── contact-gio.jpg
```

---

## 1. BRAND IDENTITY

### Name
uzupo
Always lowercase. Everywhere. HTML, CSS, JS, alt text, meta tags.
Never "Uzupo". Never "UZUPO". Always "uzupo".

### Hero statement (homepage only, very large)
WE DISAPPEAR INTO THE SOUND OF THE WORLD WE'RE BUILDING.

### Tagline (footer, meta, browser tab)
Built for the story.

### Core belief (its own full-width section)
Great sound is found, not forced.

### Name origin
uzu = Uzumaki (Naruto). po = Post Production.
Named at 3am in a basement during the first recording session.
Named after a character with an impossible goal who became the greatest
through pure obsession and refusal to quit.

### What uzupo is
Audio post-production studio based in Tbilisi, Georgia.
Founded 2023. Grown from 2 people to 10.
Services: Foley, Sound Design, Field Recording, Advertising.
Work shown at Annecy, Sarajevo, Tallinn Black Nights, Seattle Short Film Festival.

### Logo rules
uzupologoamber.png — nav, hero, loading screen, all pages
uzupologowhite.png — footer ONLY
Never stretch, rotate, or alter either logo.

### Contact
Email: hello@uzuposnd.com
Instagram: https://www.instagram.com/uzuposnd
LinkedIn: https://www.linkedin.com/company/uzupo
Domain: uzuposnd.com

---

## 2. DESIGN SYSTEM

### The feel
Dark and cinematic. Warm amber accents only. Minimal. Focused.
Like walking into a recording studio at night.
Purposeful, quiet intensity. Intimate and deeply confident.
Hard reference: postredaudio.com — same level of premium, same structural confidence.
Do NOT copy their red color or brand identity. Take their layout confidence and typographic scale.

### Color palette — define in :root, never hardcode
```css
:root {
  --bg:           #0E0E0E;
  --bg-section:   #111111;
  --bg-card:      #1A1A1A;
  --white:        #FFFFFF;
  --light:        #CCCCCC;
  --muted:        #888888;
  --amber:        #E8943A;
  --divider:      #2A2A2A;
}
```

Amber (#E8943A) is the ONLY accent color.
Used on: active nav link, hover states, section labels, CTA buttons,
play button, cursor dot, scrollbar thumb, accordion active border.
Never use amber on more than two elements per section.
Never use pure black (#000000). Always --bg (#0E0E0E).

### Typography
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Plus+Jakarta+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display:  'Barlow Condensed', sans-serif;
  --font-heading:  'Playfair Display', serif;
  --font-body:     'Plus Jakarta Sans', sans-serif;

  --size-display:  clamp(64px, 11vw, 160px);
  --size-hero:     clamp(48px, 7vw, 96px);
  --size-h2:       clamp(36px, 5vw, 72px);
  --size-h3:       clamp(24px, 3vw, 42px);
  --size-body:     clamp(15px, 1.2vw, 18px);
  --size-label:    11px;

  --leading-tight:  0.92;
  --leading-normal: 1.05;
  --leading-body:   1.75;

  --tracking-tight: -0.02em;
  --tracking-label: 0.15em;
}
```

Display (hero, massive left-column words):
Font: Barlow Condensed 900, uppercase
Size: --size-display, line-height: --leading-tight

Headings:
Font: Playfair Display 700
Size: --size-h2, line-height: --leading-normal

Body:
Font: Plus Jakarta Sans 400
Size: --size-body, line-height: --leading-body, color: --light

Labels:
Font: Plus Jakarta Sans 500, uppercase
Size: --size-label, letter-spacing: --tracking-label, color: --amber

Pull quotes:
Font: Playfair Display 400 italic
Size: --size-h3

### Spacing system
Base: 8px. Use multiples only.
Section padding: clamp(80px, 12vh, 160px) top and bottom
Horizontal padding: clamp(24px, 6vw, 120px)

### What makes this expensive — ALL MANDATORY

**Grain texture overlay**
```css
.grain-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  mix-blend-mode: overlay;
}
```

**Custom cursor — desktop only**
```css
.cursor-dot {
  position: fixed;
  width: 10px; height: 10px;
  background: var(--amber);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  position: fixed;
  width: 40px; height: 40px;
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
}
.cursor-ring.is-hovering {
  width: 60px; height: 60px;
  background: rgba(232,148,58,0.15);
}
```

Ring follows dot with lerp lag (0.12 smoothing factor).
Disable on touch devices completely.

**Custom scrollbar**
```css
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--amber); }
```

**Loading screen — 1.4s total**
Full dark screen (#0E0E0E)
0.0s: amber logo opacity 0, translateY 30px
0.3s: logo opacity 1, translateY 0 (0.5s, power3.out)
0.8s: amber underline scaleX 0 to 1 (0.3s ease)
1.1s: screen opacity 0 (0.3s ease)
1.4s: display none, begin page

**Smooth scroll — Lenis**
```html
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```
```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

**Text reveals — ALL section headings**
Each headline: split into lines, each line in overflow:hidden wrapper.
Text slides up — not fades, slides.
```css
.reveal-line { overflow: hidden; display: block; }
.reveal-line .inner {
  display: block;
  transform: translateY(110%);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-line.is-visible .inner { transform: translateY(0); }
```
Stagger: line 1 = 0ms, line 2 = 100ms, line 3 = 200ms.
Trigger: ScrollTrigger start "top 80%"

**Image reveals — clip-path wipe**
```css
.img-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1);
}
.img-reveal.is-visible { clip-path: inset(0 0% 0 0); }
```

**Magnetic buttons — CTA buttons only**
Content follows cursor max 12px. Spring return on mouseleave.
Disable on touch devices.

**Navigation behavior**
Transparent on load.
Scroll > 80px: background rgba(14,14,14,0.92), backdrop-filter blur(12px)
Transition: 0.4s ease

**AVOID — generic AI website patterns**
No card grids with rounded corners and box shadows
No three equal feature columns
No gradient backgrounds or gradient text
No simple opacity fade-ins (AOS slop)
No circular team avatar photos
No testimonial carousels with stars
No Inter or Roboto for body text
No words: premium, seamless, innovative, solutions, deliverables
No animations faster than 0.5s

---

## 3. SITE STRUCTURE

```
index.html          Home
about.html          About
services.html       Services (navigation hub — list of 4 services)
services/
  foley.html        Foley dedicated page
  sound-design.html Sound Design dedicated page
  field-recording.html  Field Recording dedicated page
  advertising.html  Advertising dedicated page
work.html           Work
contact.html        Contact
css/
  reset.css
  variables.css
  global.css
  nav.css
  footer.css
  home.css
  about.css
  services.css
  work.css
  contact.css
js/
  main.js           lenis, cursor, grain, loading screen, nav scroll
  animations.js     all GSAP ScrollTrigger reveals
  home.js           horizontal scroll, counter
  work.js           project filter
```

### Navigation — all pages
Logo left: uzupologoamber.png — links to index.html
Links right: About · Services · Work · Contact
CTA button: "Get in touch" — amber bg, dark text, no border radius
Mobile: hamburger → full-screen overlay menu
Full-screen menu: large Barlow Condensed links, centered, staggered slide-up

### Footer — all pages
Left: uzupologowhite.png + "Built for the story." small muted text below
Center: About · Services · Work · Contact
Right: Instagram icon · LinkedIn icon
Bottom line: © 2025 uzupo. All rights reserved.
Top border: 1px solid var(--divider)
Background: var(--bg)

---

## 4. LAYOUT PATTERNS

Study reference-websites/ folder before building any layout.

### Pattern A — Two-column statement
Left (40%): Barlow Condensed 900, 2-3 words only, display scale
Right (60%): Playfair Display heading + Plus Jakarta Sans body
Both on dark background. No border between columns.
Used for: WHO WE ARE, HOW WE DO IT, WHY WE DO IT, WHAT WE BELIEVE

### Pattern B — Stacked giant service list
Service name: Barlow Condensed 900, full width
clamp(48px, 8vw, 110px)
1px var(--divider) line between items
Name left, small amber arrow right
On hover: color → amber, translateX 8px, 0.3s ease

### Pattern C — Split project layout
Left 60%: project poster image, fills column
Right 40%: var(--bg-card), project info
Right content: amber label (category), title in Barlow Condensed,
director name muted, divider line, next project title
Counter top right: "01 / 14" muted

### Pattern D — Full-bleed photo with text overlay
Full width image, dark overlay rgba(0,0,0,0.55)
Text bottom-left or center
Amber label small caps above heading
Large bold white heading over image

### Pattern E — Photo gallery slider
Multiple images in horizontal draggable/swipeable slider
Dark gaps between images (4px, var(--bg))
No captions
All images use img-reveal for clip-path animation

---

## 5. HOMEPAGE (index.html)

Hard reference: postredaudio.com homepage structure.
Same section order, same two-column pattern approach.
All text is uzupo's own — nothing copied from POSTRED.

### Section 1 — Hero
Background: var(--bg) solid dark. No video on homepage.
uzupologoamber.png centered or top-left.

Hero statement (Barlow Condensed 900, --size-display, uppercase, centered):
WE DISAPPEAR INTO THE
SOUND OF THE WORLD
WE'RE BUILDING.

Two buttons below (centered):
Button 1 (amber bg, magnetic): See our work → work.html
Button 2 (white outline, magnetic): Get in touch → contact.html

No subline. No cycling text. Just the statement and the buttons.

### Section 2 — WHO WE ARE (Pattern A)
Background: studio-atmosphere.jpg full bleed, overlay rgba(0,0,0,0.6)

Label (amber, small caps): WHO WE ARE

Left display text (Barlow Condensed 900):
A STUDIO
BUILT ON
OBSESSION.

Right heading (Playfair Display 700):
We find the sounds your story needs.

Right body (Plus Jakarta Sans 400, --light):
We are a sound design and foley studio based in Tbilisi, Georgia.
Ten people who fell in love with the craft and built a studio around
that love. We work on feature films, animations, games, and commercials
with one consistent standard — we go further than we are asked to go,
every time.

Right link (amber, arrow): Our story → about.html

### Section 3 — OUR STORY (Pattern A)
Label (amber, small caps): OUR STORY

Left display text (Barlow Condensed 900):
WHERE
WE COME
FROM.

Right heading (Playfair Display 700):
It started underground. Literally.

Right body (Plus Jakarta Sans 400, --light):
A rented basement in Tbilisi. A founder who fell so deep in love with
telling stories through sound that the craft became inseparable from
who he was. Not a choice he made. A calling that found him. And when
a calling finds you, stopping is not an option.

He needed a name. He thought about what he loved — and landed on a
kid from a hidden village with an impossible goal and an unbreakable
will. Uzumaki. Post-production. uzupo.

Right link (amber, arrow): Read more → about.html

### Section 4 — FESTIVAL CREDITS
Label (amber, small caps, centered): OUR WORK HAS BEEN HEARD AT

Infinite scrolling marquee — two directions, slow and continuous.
Use festival logo images from assets/images/festivals/
Order: annecy.png · poff.png · sarajevo.png · seattle.png
Repeat the sequence to fill the marquee seamlessly.
Logos: white or light colored, consistent height (60px), spacing between each.
If logos have color backgrounds — apply CSS filter: brightness(0) invert(1) to make them white.

### Section 5 — HOW WE DO IT (Pattern A)
Background: process-monitors.jpg full bleed, overlay rgba(0,0,0,0.65)

Label (amber, small caps): HOW WE DO IT

Left display text (Barlow Condensed 900):
GREAT
SOUND IS
FOUND.

Right heading (Playfair Display 700):
Not forced. Not faked. Found.

Right body (Plus Jakarta Sans 400, --light):
The world is already full of sound. Our job is to listen deeper than
anyone else — to find what belongs in a scene, in a story, in a world —
and place it exactly where it needs to be. We don't manufacture.
We discover.

That philosophy changes how we approach every project. We don't reach
for quick answers. We push further than the brief asks us to go, past
where our feet still touch the ground. That is where the real work
happens.

### Section 6 — THE STUDIO (Pattern E — Photo gallery slider)
Label (amber, small caps): THE STUDIO

Heading (Playfair Display 700):
Where the work happens.

Horizontal draggable photo slider using these images:
studio-atmosphere-2.jpg
process-feet.jpg
process-feet-2.jpg
process-feet-3.jpg
process-feet-4.jpg
process-props.jpg
process-props-2.jpg
process-props-3.jpg
process-monitors.jpg
process-foleytracks.jpg
process-sounddesign.jpg

All images same height. Dark gaps between. No captions.
Draggable on desktop. Swipeable on mobile.

### Section 7 — WHY WE DO IT (Pattern A)
Label (amber, small caps): WHY WE DO IT

Left display text (Barlow Condensed 900):
THIS IS
NOT A
JOB.

Right heading (Playfair Display 700):
When you choose sound, you choose a way to live.

Right body (Plus Jakarta Sans 400, --light):
The artist's life does not clock out. It does not follow a ladder.
It finds inspiration in a footstep, a breath, a door hinge at 3am.
It is honest about what it loves and uncompromising in its pursuit.

Most people do not choose this path.

We did. That is what makes uzupo something other than a studio —
and the work something other than a service.

### Section 8 — OUR VISION
Full width section. Dark background. Centered.

Label (amber, small caps): OUR VISION

Quote (Playfair Display 400 italic, --size-h2, centered, white):
"To be the team whose names the world associates
with the finest sound storytelling —
regardless of where we come from."

Body below (Plus Jakarta Sans 400, --muted, centered, small):
Not the biggest studio. The most respected one.

Link (amber, centered): Our story → about.html

### Section 9 — RECENT WORK
Label (amber, small caps): RECENT WORK

Heading (Playfair Display 700):
Some of what we've made.

Horizontal scroll — GSAP ScrollTrigger pin.
Desktop: user scrolls vertically, projects move horizontally.
Mobile: swipeable carousel.

Show films and animations only (11 projects):
touching-the-sky, blackbird, air-blue-silk, field, the-gamers,
elene-dariani, oh-mother-mother, what-made-you-tired,
inhale, horse-fly, silent-blues

Each project card:
- Project poster image
- Category label (amber, small caps)
- Project title (Barlow Condensed)
- Director name (muted, small)
- Festival credit if applicable (amber, very small)

Link below (amber): View all work → work.html

### Section 10 — CONTACT CTA
Full width dark section.

Heading (Playfair Display 700, large): Got a project?
Body (Plus Jakarta Sans 400, --light): We'd love to hear what you're making.
Button (amber bg, magnetic): Get in touch → contact.html

---

## 6. ABOUT PAGE (about.html)

Hard reference: postredaudio.com/about — same depth and structure.

### Section 1 — Page hero
Label (amber, small caps): OUR STORY
Heading (Playfair Display 700, large): Who we are.

### Section 2 — The story (Pattern D)
Background: studio-atmosphere.jpg, overlay rgba(0,0,0,0.6)

Heading (Barlow Condensed 900, large):
IT STARTED UNDERGROUND.
LITERALLY.

Body (Plus Jakarta Sans 400, --light):
A rented basement in Tbilisi. A founder who fell so deep in love
with telling stories through sound that the craft became inseparable
from who he was. Not a choice he made. A calling that found him.
And when a calling finds you, stopping is not an option.

That's where uzupo comes from. Not a business plan. Not a gap in
the market. An obsession that had nowhere else to go.

From that basement, we grew. Two people became ten. Short films
became feature films. Local work became work heard at Annecy,
Sarajevo, and Tallinn. Projects with brands like Bank of Georgia
and Chivas Regal. And we know, with full clarity, that this is
still the beginning.

### Section 3 — WHAT WE BELIEVE (Pattern A)
Label (amber, small caps): WHAT WE BELIEVE

Left display text (Barlow Condensed 900):
GREAT
SOUND IS
FOUND.

Right heading (Playfair Display 700):
Not forced. Not pulled from a shelf. Found.

Right body (Plus Jakarta Sans 400, --light):
The world is already full of sound. Our job is to listen deeper
than anyone else, to find what belongs in a scene, in a story,
in a world, and to place it exactly where it needs to be.
We don't manufacture. We discover.

That philosophy changes how we approach every project. It means
we don't reach for quick answers. It means we push further than
the brief asks us to go, past where our feet still touch the
ground. That is where the real work happens.

### Section 4 — THE STUDIO (Pattern E)
Label (amber, small caps): HOW WE WORK

Heading (Playfair Display 700): The craft.

Photo gallery slider — same images as homepage studio section.
Asymmetric grid on desktop: mix large and small.
All images clip-path reveal animation.

### Section 5 — WHY WE DO IT (Pattern A)
Label (amber, small caps): WHY WE DO IT

Left display text (Barlow Condensed 900):
THIS IS
NOT A
JOB.

Right heading (Playfair Display 700):
A way to live.

Right body (Plus Jakarta Sans 400, --light):
When you choose sound, you are choosing a way to live. The
artist's life does not clock out. It does not follow a ladder.
It finds inspiration in a footstep, a breath, a door hinge at
3am. It is honest about what it loves and uncompromising in its
pursuit.

Most people do not choose this path. The people at uzupo did.
And that is the difference between a studio that fills a brief
and one that disappears into the sound of the world it's building.

### Section 6 — OUR VISION (Pattern A)
Label (amber, small caps): WHERE WE'RE GOING

Left display text (Barlow Condensed 900):
OUR
GOAL IS
NOT
MODEST.

Right heading (Playfair Display 700):
From a basement in Tbilisi to every screen in the world.

Right body (Plus Jakarta Sans 400, --light):
We want the name uzupo to be associated with the finest sound
storytelling in the world — not despite coming from Tbilisi,
but in part because of it. We want to show that world-class
artistry has no address.

We are making Georgia a name the world associates with
world-class sound talent. One project at a time.

### Section 7 — Contact CTA
Heading (Playfair Display 700): Want to work together?
Button (amber, magnetic): Get in touch → contact.html

---

## 7. SERVICES PAGE (services.html)

Hard reference: postredaudio.com/services — exact same approach.
This page is ONLY a navigation hub. Four clickable items. Nothing else.

### Section 1 — Page hero
Label (amber, small caps): SERVICES
Heading (Playfair Display 700, large): What we do.

### Section 2 — Services list (Pattern B)
Four full-width clickable rows.
Each row: service name left (Barlow Condensed 900, giant), amber arrow right.
1px var(--divider) line between each.
On hover: name color → amber, translateX 8px.
On click: navigate to dedicated service page.

FOLEY → services/foley.html
SOUND DESIGN → services/sound-design.html
FIELD RECORDING → services/field-recording.html
ADVERTISING → services/advertising.html

No descriptions on this page.
No accordion.
Just the four names and the arrows.

---

## 8. SERVICE PAGES

### FOLEY (services/foley.html)

**Hero section**
Video background: assets/video/hero.mp4
Autoplay, muted, loop, playsinline, object-fit cover
Dark overlay: rgba(0,0,0,0.5)
Label (amber, small caps): FOLEY
Heading (Barlow Condensed 900, very large, white over video):
THERE IS NO SHORTCUT
FOR THE RIGHT FOOTSTEP.

**About the service (Pattern A)**
Left display: THE CRAFT
Right heading (Playfair Display 700): Performed, not manufactured.
Right body:
Foley is where uzupo began and where our deepest expertise lives.
We record and perform foley for every kind of production — from
feature films to animation to games. Our recordings are clean,
organized, and built around what the scene actually needs rather
than what is close enough.

We perform foley the way a scene deserves: with full attention,
real materials, and the patience to find the sound that is
actually right. Every footstep, every cloth movement, every prop
is performed specifically for your project. Nothing pulled from
a shelf.

What we cover: footsteps, cloth movement, props, water, and any
specific performance the story calls for.

**Process photos**
Photo grid using:
process-feet.jpg, process-feet-2.jpg, process-feet-3.jpg,
process-feet-4.jpg, process-props.jpg, process-props-2.jpg,
process-props-3.jpg, process-foleytracks.jpg

**Projects (Pattern C — split layout)**
Label: FOLEY CREDITS
Show these projects:
- touching-the-sky.jpg / Touching the Sky / Jonathan Griffith / Foley
- blackbird.jpg / Blackbird / Giorgi Chumburidze / Full Audio Post · 5.1 Mix
- air-blue-silk.jpg / Air Blue Silk / Irine Jordania / Foley / AMBER LABEL: Tallinn Black Nights 2024
- field.jpg / Field / Lasha Tskvitinidze / Foley
- the-gamers.jpg / The Gamers: Dornkess Falls / 2026 / Full Foley
- inhale.jpg / Inhale / Melana Sokhadze / Sound Design & Foley
- horse-fly.jpg / Horse Fly / Alex Park / Foley / AMBER LABEL: Seattle Short Film Festival

**CTA**
Heading: Ready to work together?
Button (amber, magnetic): Get in touch → contact.html

---

### SOUND DESIGN (services/sound-design.html)

**Hero section**
No video. Static dark background var(--bg).
Background image: process-sounddesign.jpg, overlay rgba(0,0,0,0.7)
Label (amber, small caps): SOUND DESIGN
Heading (Barlow Condensed 900, very large):
THE SOUNDS THAT MAKE
A WORLD REAL.

**About the service (Pattern A)**
Left display: THE CRAFT
Right heading (Playfair Display 700): Discovered, not generated.
Right body:
We design sound effects for productions that need something beyond
a library. Whether that means the specific atmosphere of an
unfamiliar place, the internal logic of a fantasy world, or the
precise sonic texture of an abstract concept — we build it from
source recordings and shaped imagination.

We have designed sounds for things that don't exist. That is some
of our favourite work. Every sound in our sessions was recorded,
shaped, and placed specifically for the story it lives in.
Nothing here is fake.

**Single image**
process-sounddesign.jpg — full width, clip-path reveal

**Projects (Pattern C)**
Label: SOUND DESIGN CREDITS
Show these projects:
- elene-dariani.jpg / Elene Dariani / Fantasmagoria / Sound Design & Foley / AMBER: Annecy · Sarajevo
- oh-mother-mother.jpg / Oh, Mother Mother / Khatuna Tatuashvili / Full Audio Post
- what-made-you-tired.jpg / What Made You Tired? / Fantasmagoria / Full Audio Post · 5.1 Mix
- silent-blues.jpg / Silent Blues / Elene Dundua / Full Audio Post · 5.1 Mix

**CTA**
Heading: Got a project that needs a world?
Button (amber, magnetic): Get in touch → contact.html

---

### FIELD RECORDING (services/field-recording.html)

**Hero section**
Video background: assets/video/fieldrecording-reel.mp4
Autoplay, muted, loop, playsinline, object-fit cover
Dark overlay: rgba(0,0,0,0.5)
Label (amber, small caps): FIELD RECORDING
Heading (Barlow Condensed 900, very large):
WE GO INTO THE WORLD
TO FIND WHAT BELONGS
IN YOUR STORY.

**About the service (Pattern A)**
Left display: THE CRAFT
Right heading (Playfair Display 700): Found in the world. Placed in the story.
Right body:
Great sound is found, not forced. That belief sends us out into
the world with recorders, listening for what already exists —
the texture of a specific place, the sound of a particular
moment, the atmosphere that no library can replicate.

We record sound in the field specifically for the productions
we work on. Every recording is chosen, not defaulted. Every
texture is real. This is where our core philosophy lives in
its purest form — going out and listening until you find exactly
what the story needs.

**Photos — black and white only**
field-recording-1.jpg, field-recording-2.jpg, field-recording-3.jpg
Display in a clean grid or slider. Black and white must stay black
and white — do not apply any color filters or overlays that add color.

**No projects section** — this is a supporting service, not project-specific.

**CTA**
Heading: Need something the library doesn't have?
Button (amber, magnetic): Get in touch → contact.html

---

### ADVERTISING (services/advertising.html)

**Hero section**
Video background: assets/video/commercials-reel.mp4
Autoplay, muted, loop, playsinline, object-fit cover
Dark overlay: rgba(0,0,0,0.5)
Label (amber, small caps): ADVERTISING
Heading (Barlow Condensed 900, very large):
SOUND BUILT FOR BRANDS.
NOT BORROWED FROM
A SHELF.

**About the service (Pattern A)**
Left display: THE CRAFT
Right heading (Playfair Display 700): Every campaign deserves its own sound.
Right body:
We create sound for commercials, branded films, and campaigns
that need something specific — not library music dropped in, not
generic effects, but sound designed and performed for this brand,
this story, this moment.

Our approach to advertising is the same as our approach to film:
we go deeper than the brief, we treat every frame with the same
care we give to festival-bound features, and we deliver work that
makes the brand feel like it has a real sonic identity.

**Projects (Pattern C)**
Label: ADVERTISING CREDITS
Show these projects:
- tbc-bank-game.jpg / TBC Mobile Bank Game / Sound Design
- bog-christmas.jpg / BOG Christmas / Bank of Georgia / Sound Design
- wynflair.jpg / Cast Me If You Can / Wynflair / Sound Design

**CTA**
Heading: Working on a campaign?
Button (amber, magnetic): Get in touch → contact.html

---

## 9. WORK PAGE (work.html)

### Section 1 — Page hero
Label (amber, small caps): OUR WORK
Heading (Playfair Display 700, large): Our work.
Subline (Plus Jakarta Sans 400, --light):
Feature films, short films, animations, games, commercials.
Every project treated like the only one.

### Section 2 — Filter bar
Plus Jakarta Sans 500, small caps, letter-spacing 0.15em
ALL · FILM · ANIMATION · SHORT FILM · COMMERCIAL
Active filter: amber color + 2px amber underline
Default: ALL selected
Smooth filter transition — items fade and reposition

### Section 3 — Project grid (Pattern C)
All 14 projects. Each uses split layout.

Project data:

1. touching-the-sky.jpg
   Title: Touching the Sky
   Director: Jonathan Griffith
   Service: Foley
   Category: film

2. blackbird.jpg
   Title: Blackbird
   Director: Giorgi Chumburidze
   Service: Full Audio Post · 5.1 Mix
   Category: film

3. air-blue-silk.jpg
   Title: Air Blue Silk
   Director: Irine Jordania
   Service: Foley
   Category: film
   Festival: Tallinn Black Nights Film Festival 2024

4. field.jpg
   Title: Field
   Director: Lasha Tskvitinidze
   Service: Foley
   Category: film

5. the-gamers.jpg
   Title: The Gamers: Dornkess Falls
   Year: 2026
   Service: Full Foley
   Category: film

6. elene-dariani.jpg
   Title: Elene Dariani
   Studio: Fantasmagoria
   Service: Sound Design & Foley
   Category: animation
   Festival: Annecy Animation Film Festival · Sarajevo Film Festival

7. oh-mother-mother.jpg
   Title: Oh, Mother Mother
   Director: Khatuna Tatuashvili
   Service: Full Audio Post
   Category: animation

8. what-made-you-tired.jpg
   Title: What Made You Tired?
   Studio: Fantasmagoria
   Service: Full Audio Post · 5.1 Mix
   Category: animation

9. inhale.jpg
   Title: Inhale
   Director: Melana Sokhadze
   Service: Sound Design & Foley
   Category: short film

10. horse-fly.jpg
    Title: Horse Fly
    Director: Alex Park
    Service: Foley
    Category: short film
    Festival: Seattle Short Film Festival

11. silent-blues.jpg
    Title: Silent Blues
    Director: Elene Dundua
    Service: Full Audio Post · 5.1 Mix
    Category: short film

12. tbc-bank-game.jpg
    Title: TBC Mobile Bank Game
    Service: Sound Design
    Category: commercial

13. bog-christmas.jpg
    Title: BOG Christmas
    Client: Bank of Georgia
    Service: Sound Design
    Category: commercial

14. wynflair.jpg
    Title: Cast Me If You Can
    Client: Wynflair
    Service: Sound Design
    Category: commercial

Festival credits display in amber small caps above project title.

---

## 10. CONTACT PAGE (contact.html)

### Section 1 — Main heading
Heading (Playfair Display 700, very large): Let's work together.
Body (Plus Jakarta Sans 400, --light):
Tell us about your project.
We read everything and we respond to everything.

### Section 2 — Contact form
Name (text input)
Email (email input)
Project type (dropdown): Film · Animation · Game · Commercial · Other
Tell us about your project (textarea, min 5 rows)
Submit (amber bg, full width mobile, magnetic desktop)
Below button (Plus Jakarta Sans, --muted, small):
We typically respond within 24 hours.

Form: mailto:hello@uzuposnd.com or Formspree

### Section 3 — Contact person
Photo: assets/images/team/contact-gio.jpg
Small, 80x80px, circular crop
Name: Gio
Role: Founder, uzupo
Keep minimal. One face. Human, not corporate.

### Section 4 — Studio info
uzupo
Tbilisi, Georgia
hello@uzuposnd.com
instagram.com/uzuposnd
linkedin.com/company/uzupo

---

## 11. TECH STACK

Multi-page static website.
HTML5, CSS3 custom properties, vanilla JavaScript.
No React. No Vue. No frameworks.

External libraries — CDN only:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

Register Lenis with ScrollTrigger:
```js
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});
lenis.on('scroll', ScrollTrigger.update);
```

---

## 12. ANIMATIONS

**Loading screen — 1.4s total**
0.0s: dark screen, logo opacity 0, y 30px
0.3s: logo opacity 1, y 0 (0.5s, power3.out)
0.8s: amber underline scaleX 0→1 (0.3s)
1.1s: screen opacity 0 (0.3s)
1.4s: display none

**Headline text reveals**
All headings: split lines, overflow hidden, translateY 110%→0
Duration: 0.9s, cubic-bezier(0.16, 1, 0.3, 1)
Stagger: 0.1s per line
Trigger: ScrollTrigger "top 80%"

**Body text**
opacity 0→1, translateY 20px→0
Duration: 0.7s, power2.out, 0.2s delay after heading

**Image clip-path wipe**
clipPath inset(0 100% 0 0)→inset(0 0% 0 0)
Duration: 1.1s, cubic-bezier(0.16, 1, 0.3, 1)
Trigger: ScrollTrigger "top 75%"

**Service list entrance**
translateY 40px→0, opacity 0→1
Stagger: 0.08s, duration 0.6s, power3.out

**Service list hover**
color→amber, translateX 0→8px, 0.3s ease

**Magnetic buttons**
mousemove: content follows max 12px
mouseleave: spring return cubic-bezier(0.16, 1, 0.3, 1)
Desktop only

**Horizontal scroll — Recent Work**
GSAP ScrollTrigger pin
Horizontal translate tied to scroll
scrub: true
Mobile: swipeable carousel

**Festival marquee**
CSS infinite scroll animation
Two rows moving opposite directions
Slow and continuous — not fast

**Nav scroll**
scroll > 80px: rgba(14,14,14,0.92), blur(12px)
0.4s ease transition

**Page transitions**
Click: current page opacity 0 (0.3s)
New page: opacity 0→1 (0.4s)

---

## 13. TECHNICAL REQUIREMENTS

**Video fallback**
If any .mp4 file missing: use var(--bg) solid dark. No broken video elements.
Mobile: replace all video backgrounds with corresponding still photo.
Foley page mobile: process-feet.jpg
Field Recording mobile: field-recording-1.jpg
Advertising mobile: bog-christmas.jpg

**Performance**
Images: loading="lazy" except hero
Hero: preload, eager
Font: display=swap
will-change: transform on active animations only

**SEO meta — every page**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/png" href="../assets/logos/uzupologoamber.png">
<meta property="og:type" content="website">
```

Page-specific titles and descriptions:
index.html:         uzupo — Built for the story.
                    We build the worlds you hear. Sound design and foley studio from Tbilisi.
about.html:         Our Story — uzupo
                    How uzupo started in a basement in Tbilisi and where we're going.
services.html:      Services — uzupo
                    Foley, sound design, field recording, and advertising.
foley.html:         Foley — uzupo
                    Performed, not manufactured. Foley services for film, animation, and games.
sound-design.html:  Sound Design — uzupo
                    Discovered, not generated. Sound design for stories that need a world.
field-recording.html: Field Recording — uzupo
                    Going into the world to find what belongs in your story.
advertising.html:   Advertising — uzupo
                    Sound built for brands. Not borrowed from a shelf.
work.html:          Our Work — uzupo
                    14 projects. Every one treated like the only one.
contact.html:       Get in Touch — uzupo
                    Tell us about your project. hello@uzuposnd.com

**Accessibility**
All images: descriptive alt text
Interactive elements: keyboard accessible
Focus states: 2px amber outline
Minimum contrast: 4.5:1 body text
Custom cursor: hidden when JS disabled or touch device

**Mobile — designed not shrunk**
Custom cursor: disabled
Magnetic buttons: disabled
Horizontal scroll: swipeable carousel
Video backgrounds: replaced with still photos
Nav: hamburger → full-screen overlay
Hero text: scale down gracefully, never overflow
Service list: full width, readable at 375px
All font sizes: check readability at 375px minimum

**CSS reset**
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body { background: var(--bg); color: var(--white); overflow-x: hidden; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { cursor: none; border: none; background: none; font: inherit; }
```

---

## 14. REFERENCE SCREENSHOTS

reference-websites/ folder — study before building any layout.

reference1.PNG — POSTRED facilities: full-bleed photo, bottom-left text overlay
reference2.PNG — POSTRED services: giant stacked names with divider lines
reference3.PNG — POSTRED foley: condensed bold type over dark photo, two columns
reference4.PNG — Rev Rooms hero: full-bleed video, massive centered headline
reference5.PNG — Sweet Justice hero: centered logo over video, tagline
reference6.PNG — POSTRED about: two-column split, typographic scale
reference7.PNG — POSTRED projects: split image/title card, project counter
reference8.PNG — POSTRED about: massive left column text, right body copy

TAKE: typographic scale, layout confidence, section structure, spacing generosity
DO NOT COPY: red color, POSTRED brand identity, their copy, their specific content

---

## 15. BUILD ORDER

Follow this exact sequence:

1. variables.css and reset.css — design system first
2. global.css and nav.css and footer.css — shared components
3. main.js — lenis, cursor, grain, loading screen, nav scroll
4. index.html — homepage, section by section top to bottom
5. about.html
6. services.html — the hub page
7. services/foley.html
8. services/sound-design.html
9. services/field-recording.html
10. services/advertising.html
11. work.html — with working filter
12. contact.html
13. animations.js — all scroll reveals
14. Test all pages mobile at 375px
15. Check all video fallbacks work

Build complete. Do not stop to ask questions.
Every decision is in this document.
