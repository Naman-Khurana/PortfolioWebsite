# Portfolio Build Specification

This folder contains the source-of-truth documents for building **The
Engineer's Journey**.

## Files

-   `AGENTS.md` --- hard rules for coding agents
-   `PLAN.md` --- technical implementation plan
-   `STORYBOARD.md` --- continuous seven-phase cinematic storyboard
-   `ASSET_PLAN.md` --- current asset constraints and allowed visual
    techniques
-   `BUILD_PROMPT.md` --- single master prompt to give a coding LLM

## Current artwork policy

Only the four existing approved frames are allowed for the initial
version.

**No new image generation.**

## Recommended workflow

1.  Copy these files into the portfolio repository root.
2.  Ensure the four existing artwork files are in the repository.
3.  Give the coding agent the contents of `BUILD_PROMPT.md`.
4.  The agent must first inspect the repo and stop for approval.
5.  Approve foundation.
6.  Approve Phase 01.
7.  Approve Phase 01 → 02.
8.  Continue one phase/transition at a time.

This prevents an agent from consuming resources by trying to design,
generate artwork, and implement the entire portfolio in one pass.
