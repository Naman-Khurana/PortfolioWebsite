# ASSET_PLAN.md --- Initial No-New-Artwork Asset Plan

## Hard Constraint

### NO NEW IMAGE GENERATION FOR THE INITIAL VERSION.

Use only the four existing approved artwork frames supplied by the user.

Do not generate:

-   new character images
-   new environments
-   new devices
-   new rooms
-   new backgrounds
-   new poses
-   new AI artwork

At least for the initial version.

------------------------------------------------------------------------

# Existing Artwork

Use these four frames:

``` text
assets/
└── journey/
    ├── frame-01-seated
    ├── frame-02-standing
    ├── frame-03-walking
    └── frame-04-wall
```

The exact filenames can be changed to match the actual repository.

------------------------------------------------------------------------

# How to Use the Four Frames

They are **key visual states**, not four webpage images.

Use them to support the first continuous sequence:

``` text
SEATED
  ↓
STANDING
  ↓
WALKING
  ↓
WALL
```

Motion and CSS create the perceived movement between states.

------------------------------------------------------------------------

# Asset Strategy

## Existing raster artwork

Use for:

-   character/environment visual anchor
-   atmosphere
-   major scene composition

## HTML/CSS

Use for:

-   text
-   UI
-   overlays
-   buttons
-   side navigation
-   project interfaces
-   content
-   responsive elements

## SVG

Use for:

-   architecture diagrams
-   lines
-   graphs
-   technical systems
-   decorative engineering drawings
-   timeline/checkpoint graphics

## Motion

Use for:

-   camera simulation
-   scene transforms
-   character state transitions
-   UI evolution
-   scroll-driven timeline

------------------------------------------------------------------------

# No New Artwork Means We Must Be Creative With Existing Assets

Allowed techniques:

-   clipping
-   masking
-   layered crops
-   scale
-   translation
-   rotation when visually plausible
-   parallax
-   blur
-   depth simulation
-   color/lighting overlays
-   perspective transforms
-   DOM/SVG overlays
-   procedural diagrams
-   screen UI

Do not overuse zoom as a scene transition.

------------------------------------------------------------------------

# Phase 01 Assets

Primary:

-   Frame 01 --- seated

Use real HTML UI over/inside the laptop area if practical.

Potential hero content:

``` text
NAMAN KHURANA
Backend Software Engineer
Java · Spring Boot · PostgreSQL
```

------------------------------------------------------------------------

# Phase 01 → 02 Assets

Use:

-   Frame 01 --- seated
-   Frame 02 --- standing
-   Frame 03 --- walking
-   Frame 04 --- wall

The coding implementation should choreograph the four states.

If a perfect physical walk is impossible with the supplied artwork:

-   prioritize cinematic continuity
-   use camera motion
-   use foreground/background parallax
-   use masks
-   use state interpolation
-   avoid obvious crossfade

Do not generate new poses.

------------------------------------------------------------------------

# Phase 02 Assets

Frame 04 is the primary destination.

Overlay real HTML/SVG content on the wall.

The wall can contain:

-   engineering principles
-   problem-solving concepts
-   system sketches
-   project nodes

Keep visual density controlled.

------------------------------------------------------------------------

# Phase 03 Assets

No new image.

Construct the project experience with:

-   HTML
-   CSS
-   SVG
-   Motion
-   existing artwork

Use an application/workstation illusion rather than a new generated
environment.

------------------------------------------------------------------------

# Phase 04 Assets

No new image.

Build visualizations using:

-   SVG
-   CSS
-   HTML
-   Motion

Potential components:

-   GPS data flow
-   query resolution flow
-   AI/RAG workflow
-   metrics
-   system diagrams

------------------------------------------------------------------------

# Phase 05 Assets

No new image.

Build architecture visually using SVG/HTML.

Example:

``` text
Client
  ↓
REST API
  ↓
Spring Boot
  ↓
Service Layer
  ↓
Repository
  ↓
PostgreSQL
```

Animate connections based on scroll.

------------------------------------------------------------------------

# Phase 06 Assets

No new image.

Build coding-profile UI using HTML.

Potential layout:

``` text
LeetCode
Codeforces
AlgoZenith
```

Use actual URLs and only verified/current user-provided metrics.

Do not fabricate rankings.

------------------------------------------------------------------------

# Phase 07 Assets

No new image.

Reuse existing visual world.

Create the final atmosphere through:

-   overlays
-   lighting
-   typography
-   camera position
-   existing background imagery

Contact links are real HTML.

------------------------------------------------------------------------

# Visual Consistency

Because no new artwork is being generated:

The four supplied images are the visual authority.

Do not try to "improve" them by replacing them.

Instead, design the UI and animation around them.

------------------------------------------------------------------------

# Future Asset Policy

If the first version proves the concept and the user later approves new
artwork:

new assets may be introduced only after explicit approval.

When that happens, update this file first.

Until then:

> **No new images.**
