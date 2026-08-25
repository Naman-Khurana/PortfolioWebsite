# BUILD PROMPT --- Paste This Into Your Coding LLM

You are the implementation agent for a personal developer portfolio
called **The Engineer's Journey**.

Before doing anything, read:

-   `AGENTS.md`
-   `PLAN.md`
-   `STORYBOARD.md`
-   `ASSET_PLAN.md`

These files are the source of truth.

## Your mission

Build the portfolio as a **continuous cinematic, scroll-driven
experience**.

The experience must feel like one movie.

The user scrolls.

Scrolling advances time.

The engineer character physically moves through the environment.

The camera follows the character.

The environment and UI evolve.

The seven phases are destinations in one continuous journey, NOT seven
images.

## Seven phases

1.  Introduction
2.  About Me
3.  Projects
4.  Experience
5.  Engineering
6.  Problem Solving
7.  Connect

## Critical artwork constraint

For the initial implementation:

> **DO NOT GENERATE ANY NEW IMAGES.**

Use only the four already-provided approved artwork frames in the
repository/user-provided assets:

1.  seated at laptop
2.  standing
3.  walking
4.  standing at thinking wall

Do not replace them.

Do not invent additional AI artwork.

Use HTML, CSS, SVG, Motion and existing assets to create the rest of the
experience.

## Animation requirement

Do NOT build:

``` text
image 1
→ zoom
→ image 2
→ zoom
→ image 3
```

Build:

``` text
character action
→ physical movement
→ camera follows
→ environment changes
→ next phase
```

The first critical transition must feel like:

``` text
character typing
→ stops
→ stands
→ turns
→ walks toward wall
→ camera follows
→ desk recedes
→ wall approaches
→ character arrives
```

Use the four existing frames as key visual states.

## Infinite scroll

The experience must be effectively infinite.

There must be no abrupt footer/end.

After Phase 07, continued scrolling should continue the visual journey
and eventually return to Phase 01 through a seamless timeline/world
loop.

Do not create an infinite DOM.

Do not visibly jump to the top.

## Technology

Use:

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   Motion for React

Do not add GSAP or other animation libraries unless explicitly approved.

Do not introduce Three.js unless the existing assets prove it is
genuinely necessary.

## Content

Keep content data-driven.

Projects must be editable/addable without rewriting animation code.

Use real React UI for:

-   portfolio text
-   projects
-   experience
-   skills
-   architecture
-   coding profiles
-   contact

## Development process

You MUST work phase-by-phase.

### Step 1

Inspect the existing repository and assets.

Do not modify anything yet.

Report:

-   existing structure
-   current implementation status
-   where the four artwork files are
-   what can be reused
-   what is missing

Then STOP and ask for approval.

### Step 2

After approval, implement only the foundation:

-   app shell
-   Motion setup
-   timeline
-   side navigation
-   asset handling
-   content data model
-   reduced-motion handling

Do not build all seven phases.

Then STOP and ask for approval.

### Step 3

Implement Phase 01.

Then STOP.

### Step 4

Implement the Phase 01 → Phase 02 continuous movement.

Then STOP.

### Step 5 onward

Proceed one phase/transition at a time.

After every milestone:

1.  run/build the app
2.  verify no errors
3.  summarize changes
4.  do not continue automatically
5.  wait for explicit approval

## Design constraints

The visual language must remain:

-   premium
-   sophisticated
-   modern
-   professional
-   technology-oriented
-   restrained

Avoid:

-   cyberpunk
-   space
-   galaxies
-   excessive neon
-   generic gradients
-   random devices
-   gaming HUDs
-   particle spam
-   generic portfolio templates

## Important

Do not redesign the concept.

Do not decide that a slideshow would be easier.

Do not replace the four approved images.

Do not generate new artwork.

Do not implement all seven phases in one response.

The goal is to prove the cinematic experience **one approved milestone
at a time**.

Start by inspecting the repository and reporting the current state.
