# Reading List

A reading list built with <!-- TODO: Vue 3 | Svelte 5 | Angular 22 --> and TypeScript. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

The app lives in the folder `app`. The folder `core` is the shared, tested logic.

## Commands

<!-- TODO: Keep the commands of your framework, delete the others. Run them in the folder `app`. -->

- Vue: `npm run dev`, `npm run test:unit -- --run`, `npm run build` (this also checks the types)
- Svelte: `npm run dev`, `npm run check`, `npm run build` (and `npm run test:run` after you set up Vitest)
- Angular: `npm start`, `npm test -- --no-watch`, `npm run build`
- Logic tests, in the folder `core`: `npm run test:run` and `npm run check`

## Rules

- **Do not change** the files in `app/src/core` (`types.ts`, `books.ts`, `storage.ts`, `seed.json`). They are copies of the folder `core`, they are tested and the same in every framework. Only build the view layer. If you think the logic must change, stop and ask.
- Use the filter, validation and list functions from `core`. Do not write them again in a component.
- No `any`. Type props, inputs and events.
- Keep components small. One component per file.
- No UI library, no CSS framework, no state library, no router. Plain CSS in the component styles of the framework.
- Install a package only after you told me why, and only if the framework docs recommend it.
- Run the type check, the tests and the build before you say a task is done.

## Framework rules

<!-- TODO: Keep the section of your framework, delete the others. Check the official docs for the version in `app/package.json` before you write the rules. -->

### Vue 3

- Single file components with `<script setup lang="ts">`. Composition API only, no Options API.
- Local state with `ref`, derived values with `computed`. Props with `defineProps`, events with `defineEmits`.
- Use `v-model` for form fields and `:key` in every `v-for`.

### Svelte 5

- Use runes: `$state`, `$derived`, `$effect`, `$props`. No `export let`, no `$:` and no `on:click` (use `onclick`).
- Events from a child to its parent are callback props.
- Prefer `$derived` over `$effect` for values that depend on other values.
- Every `{#each}` block has a key.

### Angular 22

- Standalone components, no NgModules, and no `standalone: true` in the decorator (it is the default).
- State with `signal`, derived values with `computed`. Inputs with `input()`, events with `output()`.
- Templates use `@if` and `@for` (with `track`), not `*ngIf` and `*ngFor`.
- Do not set `ChangeDetectionStrategy.OnPush` explicitly, it is the default in Angular 22.

## Quality rules

- Every interactive element must work with the keyboard and show a visible focus.
- Dialogs open with the focus inside, close with Escape and return the focus to the button that opened them.
- Colors and spacing come from one place (CSS custom properties), do not invent new values.
- Check the layout at 360px and at 1280px.
