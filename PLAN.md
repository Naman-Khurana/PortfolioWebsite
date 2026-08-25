# PLAN.md --- Implementation Plan

## Product

Personal developer portfolio for Naman Khurana.

## Core Experience

A cinematic, scroll-driven journey through one evolving workspace.

The user does not navigate between traditional pages.

Instead:

> **scroll = time**

The character physically progresses through the world while the camera
follows.

------------------------------------------------------------------------

# Technology

## Required

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   Motion for React

## Avoid unless explicitly required

-   GSAP
-   Three.js
-   React Three Fiber
-   Lenis
-   Lottie
-   Rive
-   particle libraries

Start with the smallest viable stack.

------------------------------------------------------------------------

# Global Architecture

``` text
App
│
├── Journey
│   ├── Timeline
│   ├── Camera
│   ├── Scene01Introduction
│   ├── Scene02About
│   ├── Scene03Projects
│   ├── Scene04Experience
│   ├── Scene05Engineering
│   ├── Scene06ProblemSolving
│   └── Scene07Connect
│
├── SideNavigation
│
├── Content
│   ├── projects
│   ├── experience
│   ├── skills
│   └── codingProfiles
│
└── Shared
    ├── Screen
    ├── ProjectView
    ├── ArchitectureView
    └── Motion utilities
```

------------------------------------------------------------------------

# Timeline Model

Use normalized progress:

``` text
0.00 → 1.00
```

Map the seven phases to timeline ranges.

Example only:

``` text
01 Introduction       0.00–0.14
02 About              0.14–0.28
03 Projects           0.28–0.45
04 Experience         0.45–0.60
05 Engineering        0.60–0.75
06 Problem Solving    0.75–0.89
07 Connect            0.89–1.00
```

These values are not sacred.

Adjust based on the actual cinematic pacing.

The important principle is:

> phase boundaries are points in time, not image swaps.

------------------------------------------------------------------------

# Infinite Scroll

Implement a seamless conceptual loop.

Preferred approach:

-   maintain a normalized journey progress value
-   allow the document to provide enough scrollable length
-   when the user approaches the end, continue the visual timeline
    seamlessly
-   avoid an obvious jump
-   reuse the same approved artwork
-   use procedural/DOM transitions to hide the loop

Do not create an infinite DOM.

Do not duplicate hundreds of scene nodes.

The user should experience:

``` text
Introduction
   ↓
About
   ↓
Projects
   ↓
Experience
   ↓
Engineering
   ↓
Problem Solving
   ↓
Connect
   ↓
continuous visual continuation
   ↓
Introduction again
```

The loop should feel like continuation, not a restart.

------------------------------------------------------------------------

# Phase-by-Phase Plan

## PHASE 0 --- Foundation

### Build

-   Next.js application shell
-   global styles
-   Motion integration
-   timeline state
-   side navigation skeleton
-   asset loading
-   data models
-   reduced-motion behavior
-   responsive structure

### Artwork

Use only the existing four frames.

No new image generation.

### Approval

STOP.

------------------------------------------------------------------------

# PHASE 1 --- Introduction

## Visual

Use existing seated frame as the primary hero reference.

Character:

-   seated
-   laptop
-   headphones
-   desk
-   city background

## Content

Hero identity:

-   Naman Khurana
-   Backend Software Engineer
-   core technologies
-   concise positioning

## Motion

Subtle:

-   laptop UI activation
-   ambient environment movement
-   tiny character idle movement where possible
-   camera settling

No excessive effects.

## Approval

STOP.

------------------------------------------------------------------------

# TRANSITION 01 → 02

## Required story

``` text
character typing
→ stops
→ hands leave keyboard
→ leans back
→ stands
→ chair moves
→ turns
→ walks toward wall
→ camera follows
→ desk recedes
→ wall approaches
→ character arrives
```

Use the existing:

1.  seated frame
2.  standing frame
3.  walking frame
4.  wall frame

as key visual references.

Do not generate new images.

Use Motion, transforms, masking, parallax and carefully timed state
changes to create the strongest continuous illusion possible.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 2 --- About

Destination is the existing thinking-wall frame.

The wall becomes a real interactive information surface.

Content should be rendered as HTML/SVG overlays where practical.

Possible content:

-   engineering mindset
-   approach to building software
-   backend-first thinking
-   learning/building philosophy

Do not generate new artwork.

## Approval

STOP.

------------------------------------------------------------------------

# TRANSITION 02 → 03

The wall contains a project concept.

The user scrolls.

The character's attention shifts toward the project.

Then the journey transitions toward the Projects experience using the
existing visual world and procedural/HTML elements.

Because no new artwork may be generated, prefer:

-   camera travel
-   layered crops
-   UI transformation
-   existing frame reuse
-   SVG/DOM-generated workstation/interface elements

Do not fabricate a new AI-rendered room.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 3 --- Projects

Projects are data-driven.

Initial projects:

-   Wealth Tracker
-   Placement Portal
-   AI Customer Service / RAG system

Projects should appear as interactive artifacts/applications rather than
generic cards.

Use real React UI.

Allow future projects to be added via data.

Motion should animate:

-   selection
-   expansion
-   architecture preview
-   details
-   technologies

No new artwork generation.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 4 --- Experience

Show Onelap experience through real UI and visualized information.

Use:

-   system diagrams
-   metrics
-   GPS processing visualization
-   AI/RAG workflow
-   query-resolution concept

Avoid fake 3D server rooms.

Use HTML/SVG/DOM visualizations.

No new artwork.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 5 --- Engineering

Reveal technical depth.

Technologies can include:

-   Java
-   Spring Boot
-   Spring Security
-   PostgreSQL
-   MySQL
-   Docker
-   Redis
-   REST APIs
-   AI/RAG

Architecture should be represented as real SVG/HTML where practical.

The visual language becomes more technical but remains professional.

No new artwork.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 6 --- Problem Solving

Show coding profiles:

-   LeetCode
-   Codeforces
-   AlgoZenith

Use real links and data-driven UI.

The visual should feel like a focused engineering workspace.

No new artwork.

## Approval

STOP.

------------------------------------------------------------------------

# PHASE 7 --- Connect

End with a calm visual state.

Show:

-   email
-   GitHub
-   LinkedIn
-   resume

Use real links.

The final message should be subtle and integrated into the environment.

No new artwork.

## Approval

STOP.

------------------------------------------------------------------------

# Final Polish

Only after all phases are individually approved:

-   smooth global transitions
-   side navigation synchronization
-   infinite-loop continuity
-   mobile layout
-   reduced-motion mode
-   performance
-   preload/asset optimization
-   accessibility
-   SEO
-   metadata
-   final cleanup

------------------------------------------------------------------------

# Definition of Success

The final experience should feel like:

> "I am following an engineer through his work."

It should NOT feel like:

> "I am scrolling through seven portfolio sections."

------------------------------------------------------------------------

# Current Hard Constraint

For the initial version:

> **USE ONLY THE FOUR PROVIDED ARTWORK FRAMES. NO NEW IMAGE
> GENERATION.**

Any additional visual content must be created through:

-   HTML
-   CSS
-   SVG
-   Motion
-   existing assets
-   procedural graphics

If that becomes visually insufficient, stop and request approval.
