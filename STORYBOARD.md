# STORYBOARD.md --- Continuous Cinematic Storyboard

## Core Rule

This is one movie.

The seven phases are **beats in the movie**, not individual frames.

Scrolling advances time.

The character moves physically.

The camera follows.

The environment changes because something happens.

------------------------------------------------------------------------

# Existing Visual Assets

The user has already approved four artwork frames:

### Frame A --- Seated

Engineer sitting at desk with laptop and AirPods Max.

### Frame B --- Standing

Engineer has stood up from the desk.

### Frame C --- Walking

Engineer walking toward the thinking wall.

### Frame D --- Wall

Engineer has reached the thinking wall.

These are the only supplied artwork frames currently available.

**No new artwork generation is permitted for the initial build.**

------------------------------------------------------------------------

# PHASE 01 --- INTRODUCTION

## Opening Shot

Camera is positioned behind/side of engineer.

Engineer is seated at desk.

Laptop is open.

City is visible.

This is the visual anchor.

### Scroll time

Engineer is working.

Laptop screen contains the real portfolio hero UI.

Subtle ambient motion only.

------------------------------------------------------------------------

# 01 → 02 --- THE WALK

This is the first proof that the portfolio is a movie.

### Beat 1

Engineer types.

### Beat 2

He stops typing.

### Beat 3

Hands leave keyboard.

### Beat 4

He leans back.

### Beat 5

He stands.

Use Frame B as the key visual state.

Camera rises slightly.

Chair moves naturally.

### Beat 6

Engineer turns toward the wall.

### Beat 7

He begins walking.

Use Frame C as the key visual state.

Camera follows.

The desk moves behind the camera.

### Beat 8

The wall becomes increasingly dominant.

### Beat 9

Engineer reaches the wall.

Use Frame D.

### Beat 10

He stops.

He studies the wall.

**Phase 02 begins.**

No hard cut.

------------------------------------------------------------------------

# PHASE 02 --- ABOUT ME

The thinking wall is the destination.

The engineer stands in front of it.

The wall contains visualized ideas.

The content is rendered through HTML/SVG overlays rather than baked into
artwork.

### Scroll

The engineer studies different parts of the wall.

Subtle camera movement can shift attention between concepts.

No generic card animation.

The wall is the interface.

------------------------------------------------------------------------

# 02 → 03 --- FROM THINKING TO BUILDING

One project concept on the wall becomes active.

The engineer notices it.

He interacts with it.

The visual focus shifts.

He turns away from the wall.

The camera follows.

Because no new artwork is allowed, the transition is constructed from:

-   existing artwork
-   camera movement
-   layered crops
-   SVG/HTML interface elements
-   Motion transforms

The destination is the Projects interface.

------------------------------------------------------------------------

# PHASE 03 --- PROJECTS

Projects are presented as real applications/systems.

Initial project data:

### Wealth Tracker

Backend-focused financial tracking system.

### Placement Portal

Full-stack placement management system.

### AI Customer Service

AI/RAG workflow and customer-service system.

Projects are rendered through React.

The project presentation can include:

-   overview
-   architecture
-   technologies
-   key engineering decisions
-   outcomes

No generic static cards unless they naturally fit the visual world.

------------------------------------------------------------------------

# 03 → 04 --- PROJECT TO EXPERIENCE

The selected project becomes a system view.

The interface evolves.

The user sees the work becoming real-world engineering.

The character interacts with the workstation/system.

The experience content emerges.

------------------------------------------------------------------------

# PHASE 04 --- EXPERIENCE

Focus on professional engineering experience.

Onelap Telematics can be represented through visual system interfaces.

Potential visualizations:

``` text
GPS records
      ↓
processing
      ↓
trip/stoppage detection
```

and:

``` text
customer query
      ↓
resolution workflow
      ↓
reduced escalation
```

and:

``` text
RAG
 ↓
retrieval
 ↓
AI response
```

These are actual UI/SVG visualizations, not generated images.

------------------------------------------------------------------------

# 04 → 05 --- EXPERIENCE TO ENGINEERING

A system visualization becomes increasingly technical.

The camera focuses on architecture.

Layers become visible.

Example:

``` text
API
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

Additional technical systems can appear.

The transition is:

> real-world work → underlying engineering.

------------------------------------------------------------------------

# PHASE 05 --- ENGINEERING

This is the deepest technical phase.

Show technical depth through interactive diagrams and interfaces.

Potential topics:

-   Java
-   Spring Boot
-   Spring Security
-   REST
-   PostgreSQL
-   MySQL
-   Redis
-   Docker
-   AI/RAG
-   system architecture
-   data processing

Avoid a fake futuristic command center.

Keep it sophisticated.

------------------------------------------------------------------------

# 05 → 06 --- ENGINEERING TO PROBLEM SOLVING

The large technical interface becomes quieter.

The engineer moves toward a focused problem-solving state.

The visual density decreases.

The story changes from:

> systems

to:

> the engineer solving problems inside those systems.

------------------------------------------------------------------------

# PHASE 06 --- PROBLEM SOLVING

The focus is the engineer's continuous learning and problem-solving
practice.

Coding profiles:

-   LeetCode
-   Codeforces
-   AlgoZenith

Use actual links.

Use data-driven UI.

Do not invent metrics that are not provided.

------------------------------------------------------------------------

# 06 → 07 --- RELEASE

Engineer finishes.

He stands.

He leaves the focused workspace.

The camera follows.

The technical UI falls behind.

The environment becomes calmer.

------------------------------------------------------------------------

# PHASE 07 --- CONNECT

Engineer reaches the final open visual area.

The city/window becomes the final backdrop.

Contact information is integrated into the environment.

Show:

-   Email
-   GitHub
-   LinkedIn
-   Resume

Final message:

> **LET'S BUILD SOMETHING AMAZING.**

Keep it restrained.

------------------------------------------------------------------------

# INFINITE CONTINUATION

The portfolio does not end with a conventional footer.

After Connect, continued scrolling should transition naturally into a
continuation of the workspace/timeline.

The implementation should reuse existing visual material and procedural
UI rather than generating new artwork.

The visual loop should eventually return to the Introduction state.

The return must be disguised through:

-   camera movement
-   lighting evolution
-   interface transition
-   spatial continuity
-   controlled timeline wrapping

No visible "reset to top."

------------------------------------------------------------------------

# Motion Principles

Use Motion for:

-   character movement
-   camera movement
-   parallax
-   screen transformations
-   UI transitions
-   timeline interpolation
-   side-navigation progress

Do NOT use Motion merely for:

-   fade-in sections
-   random floating elements
-   generic card reveals

------------------------------------------------------------------------

# The Story Must Remain Physical

If the character is at the wall, he remains there until an action moves
him.

If the character walks to a workstation, the workstation must become the
next destination.

If the character interacts with a screen, that interaction must motivate
the next visual change.

Every transition answers:

> "Why did this happen?"

If there is no answer, remove the animation.
