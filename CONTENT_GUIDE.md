# Updating your portfolio content

All portfolio copy and links live in one file:

`src/data/portfolio.ts`

You do not need to edit the animated scene components to update your profile.
Change the values in that file, save, and the website updates automatically.

## What to edit

- `identity`: your name, role, location, introduction, skills, and the three About-wall cards.
- `projects`: add, remove, or edit projects. Each project supplies the Projects scene, including its detail cards and topology labels.
- `experience`: roles, dates, achievements, and technology tags.
- `skills`: the Engineering scene. Update a category, its technologies, capability, and technical metric together.
- `problemSolving`: programming profiles, topics, profile status copy, and the closing philosophy.
- `contact`: email, résumé, GitHub, LinkedIn, Connect headline, and Connect introduction.

## Add a project

Duplicate one complete object inside the `projects` list, then update only its values. Keep the `id` unique and lowercase with hyphens (for example, `"inventory-platform"`).

Every project needs these fields: `id`, `title`, `role`, `tagline`, `description`, `technologies`, `metrics`, `focus`, `reliability`, `topology`, and `github`.

The `topology.details` value must contain exactly four short strings. They appear in the four small technical-stat cards.

## Safe editing rules

- Keep the quotation marks, commas, brackets, and object structure intact.
- Use a normal apostrophe (`'`) inside quoted text, or escape a double quote as `\"`.
- Do not edit files in `src/components/journey` for content-only changes; those contain the animation and layout.
- After an update, run `npm run build` to check your changes.
