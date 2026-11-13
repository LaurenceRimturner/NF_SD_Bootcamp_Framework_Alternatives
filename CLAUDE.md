# Reading List

A reading list built with Angular 22 and TypeScript. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

The app lives in the folder `app`. The folder `core` is the shared, tested logic.

## Commands

- Angular (in `app`): `npm start`, `npm test -- --no-watch`, `npm run build`
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
