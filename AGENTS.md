# AGENTS.md --- The Engineer's Journey

## Mission

Build Naman Khurana's personal developer portfolio as a **continuous
cinematic interactive experience**, not a conventional portfolio
template.

The approved concept is:

> **The Engineer's Journey --- one world, one character, one continuous
> movie.**

The user scrolls through an evolving workspace. Scrolling advances
**time in the story**. The engineer character physically moves through
the environment, interacts with screens/objects, and progresses through
seven content phases.

The experience must feel like a movie controlled by scroll, not a
slideshow of images.

------------------------------------------------------------------------

# NON-NEGOTIABLE RULES

## 1. No new image generation

**Do NOT generate new artwork or request new image-generation assets.**

For the current implementation phase, use **ONLY the four
already-provided/approved artwork frames** supplied by the user:

1.  seated at laptop
2.  standing from desk
3.  walking toward wall
4.  standing at thinking wall

Treat these as the approved visual source material.

You may: - crop them - mask them - isolate existing visual regions when
technically possible - layer them - animate them - apply subtle
effects - use CSS/DOM overlays - use procedural/CSS/SVG elements - use
real HTML UI

You may NOT: - generate replacement images - invent additional AI
artwork - silently replace the four approved frames - introduce random
stock images - introduce unrelated generated devices/environments

If a future visual asset appears genuinely necessary, STOP and ask for
approval instead of generating it.

------------------------------------------------------------------------

## 2. Seven phases are story beats, NOT seven images

The seven phases are:

1.  Introduction
2.  About Me
3.  Projects
4.  Experience
5.  Engineering
6.  Problem Solving
7.  Connect

Do NOT implement them as:

``` text
image → zoom → image → zoom → image
```

Do NOT use zoom/pan as a substitute for actual storytelling.

The intended experience is:

``` text
character acts
    ↓
character moves
    ↓
camera follows
    ↓
environment evolves
    ↓
character arrives
    ↓
next phase naturally begins
```

------------------------------------------------------------------------

## 3. Scroll advances time

Scrolling represents **time advancing in the movie**.

A scroll range should correspond to a continuous timeline.

For example:

``` text
scroll
  ↓
time
  ↓
character action
  ↓
camera movement
  ↓
environment response
  ↓
content progression
```

Do not make scrolling simply reveal sections.

------------------------------------------------------------------------

## 4. Infinite-scroll requirement

The experience must feel **continuous and effectively infinite**.

There must be no abrupt page bottom.

After the seven-phase journey reaches Connect, the visual world should
continue naturally and transition back toward the beginning/next cycle
rather than ending with a conventional footer.

The implementation may use a controlled repeating timeline rather than
literally rendering infinite DOM.

The user should be able to keep scrolling without encountering:

-   blank space
-   abrupt reset
-   page-end footer
-   hard reload
-   obvious jump to top

The loop must be visually hidden through continuity.

If a perfect loop cannot be achieved without introducing new artwork,
use the existing environments/assets and procedural/DOM transitions to
create the continuity.

------------------------------------------------------------------------

## 5. Motion is the primary animation library

Use:

-   `motion`
-   Motion for React APIs
-   scroll-linked MotionValues
-   transforms/springs where appropriate

Do not add GSAP unless explicitly approved.

Do not add unnecessary animation libraries.

The animation architecture should be understandable and maintainable.

------------------------------------------------------------------------

## 6. The character is the protagonist

The character should feel like a real person moving through the
workspace.

Use the four existing frames as the visual anchor.

The first transition must make the following illusion:

``` text
Frame 1:
seated

        ↓ actual movement

Frame 2:
standing

        ↓ actual movement

Frame 3:
walking

        ↓ actual movement

Frame 4:
arrived at wall
```

Do not simply crossfade between these states.

Where true intermediate character motion is unavailable, use carefully
choreographed transforms/cropping/parallax and the existing frames to
create the strongest possible illusion.

------------------------------------------------------------------------

# 7. Do not overbuild

This is a portfolio website, not a game and not a full animated film
production.

Prefer:

-   CSS
-   DOM
-   SVG
-   Motion
-   existing images
-   real HTML UI

before introducing:

-   Three.js
-   React Three Fiber
-   WebGL
-   heavy character rigs
-   video pipelines

Only introduce 3D if the existing assets and implementation prove that
it is genuinely necessary.

------------------------------------------------------------------------

# 8. Content must remain editable

Projects, experience, skills, coding profiles and contact information
must be data-driven.

Do not bake portfolio text into the artwork.

Project information should live in structured data.

Adding a project later should require changing data, not rewriting the
animation system.

------------------------------------------------------------------------

# 9. Real UI inside screens

Laptop/monitor screens should use actual HTML/React wherever possible.

Use real UI for:

-   name
-   role
-   projects
-   experience
-   technologies
-   coding profiles
-   architecture
-   contact
-   navigation

Do not generate screenshots of text that could instead be rendered by
React.

------------------------------------------------------------------------

# 10. Visual direction

The approved visual direction:

-   modern
-   premium
-   sophisticated
-   technology-oriented
-   cinematic
-   professional
-   restrained
-   slightly editorial
-   warm/neutral workspace atmosphere

Avoid:

-   cyberpunk
-   space
-   galaxies
-   excessive neon
-   gaming HUDs
-   random futuristic gadgets
-   generic SaaS gradients
-   excessive particles
-   childish cartoon styling
-   visual clutter

------------------------------------------------------------------------

# DEVELOPMENT PROCESS --- MANDATORY

## Build phase-by-phase with approval gates.

Do NOT implement all seven phases in one pass.

### Phase 0 --- Foundation

Build:

-   app shell
-   side navigation
-   global timeline
-   Motion scroll system
-   asset loader
-   content/data model
-   reduced-motion fallback

Then STOP and ask for approval.

### Phase 1 --- Introduction

Implement only the opening environment and hero behavior.

STOP and ask for approval.

### Phase 1 → 2

Implement:

``` text
seated
→ stops typing
→ stands
→ turns
→ walks
→ camera follows
→ arrives at wall
```

STOP and ask for approval.

### Phase 2 --- About

Implement the wall destination and its content.

STOP and ask for approval.

### Phase 2 → 3

Implement the physical/narrative transition to Projects.

STOP and ask for approval.

Continue this exact pattern through Phase 7.

------------------------------------------------------------------------

# APPROVAL RULE

After each milestone:

1.  Run the app.
2.  Verify there are no errors.
3.  Summarize what was implemented.
4.  Do NOT continue into the next phase.
5.  Wait for explicit user approval.

Never assume approval.

------------------------------------------------------------------------

# CODE QUALITY

Use:

-   TypeScript
-   reusable React components
-   clean separation between content and animation
-   reusable Motion utilities
-   semantic HTML
-   accessible navigation
-   responsive layout
-   `prefers-reduced-motion`

Avoid:

-   giant components
-   duplicated animation logic
-   hardcoded project markup
-   magic numbers scattered everywhere
-   unnecessary dependencies
-   unmaintainable scroll event chains

------------------------------------------------------------------------

# PERFORMANCE

Prioritize:

-   transforms
-   opacity
-   optimized images
-   lazy loading where appropriate
-   avoiding unnecessary React renders
-   avoiding expensive per-frame JavaScript
-   avoiding continuous WebGL

The animation should remain smooth on normal modern laptops.

------------------------------------------------------------------------

# DO NOT CHANGE THE CONCEPT

If you think a different visual concept would be better:

STOP.

Do not redesign.

The creative direction has already been approved.

Your role is to implement it faithfully.
