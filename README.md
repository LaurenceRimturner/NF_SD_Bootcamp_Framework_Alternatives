# Frontend Framework Alternatives: Reading List Start

You know the Reading List from the CSS day: the same app, built in React. Today you build it **again in a different framework**: Vue, Svelte or Angular. You choose one. The coding agent writes most of the code, **you** direct it and review the result, in a framework you do not know yet.

This README describes the whole task. Read it completely before you start.

## The task

Build the Reading List from `SPEC.md` in **one** of these frameworks, with Claude Code:

- **Vue 3** with Vite
- **Svelte 5** with Vite
- **Angular 22** with the Angular CLI

The app is the same in every framework: cards, add and edit dialog, delete confirmation, toast, filter, search, empty state, 360px to 1280px, keyboard only. The full description (user stories, screens and acceptance criteria) is in `SPEC.md`. **Read it first.**

### What is already done

You do **not** write the logic. It is in the folder `core`, it is plain TypeScript without any framework, and it is tested:

- `types.ts` and `seed.json`: the data model and ten books.
- `books.ts`: `filterBooks`, `validateBook`, the list helpers `addBook`, `updateBook` and `deleteBook`, `STATUSES` and `STATUS_LABELS`.
- `storage.ts`: `loadBooks` and `saveBooks` for `localStorage`.
- `*.spec.ts`: the tests.

You copy these files into your app and **do not change them**. You only build the view layer: components, state, templates and styles. Notice what this means: the part of an app that is the same in every framework is small. The part that differs is how a framework turns state into a screen.

### Choose your framework

| Framework  | Good reasons to choose it                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Vue 3      | You like HTML templates with a few directives, and a gentle start.                                      |
| Svelte 5   | You want the least code and the closest look to plain HTML, CSS and JavaScript.                         |
| Angular 22 | You want to see a full framework with everything built in, and you accept more concepts and more files. |

Angular has the most concepts to learn, Vue and Svelte are lighter. No choice is wrong. If you work in a group, try to cover different frameworks, so you have someone to compare notes with at the end.

## Steps

1. **Set up the repository.** In this folder run `git init -b main`, `git add .` and `git commit -m "Initial commit"`. Run the tests of the logic once:

   ```bash
   cd core
   npm i
   npm run test:run
   npm run check
   cd ..
   ```

2. **Scaffold your framework** with its official tool, into the folder `app` (node_modules and `dist` are ignored by git already). Use the commands for your framework below. Run them in this folder.

3. **Copy the logic** into the app, from this folder (the commands for each framework are below).

4. **Prepare `CLAUDE.md`.** Fill in the TODOs: your framework, its commands and its rules. Delete what does not apply. Check the version in `app/package.json` and read the section about components and reactivity in the official documentation (links below) **before** you write the rules. You can not review rules you do not understand.

5. **Start Claude Code in this folder** and plan with the agent in **plan mode**. Ask it to remove the example content of the scaffold, explain the plan in terms of the framework (which component, which state, which template) and build the app in small steps. Read the plan, correct it and only then approve it. Commit after each working step.

6. **Build the UI:** layout, book card, add and edit dialog, delete confirmation, toast, filter and search.

7. **Check the app** at 360px and at 1280px width, and with the keyboard only. Open and close a dialog with the keyboard and check the focus.

8. Run the type check, the tests and the build (commands below). Commit when everything passes.

If you run out of time, skip the toast and the search first. **Never skip the keyboard check and the review.**

### Vue 3

```bash
npm create vue@latest app -- --ts --vitest
cd app
npm i -D vitest@^5.1.0
mkdir src/core
cp ../core/types.ts ../core/books.ts ../core/storage.ts ../core/seed.json src/core/
```

- The flags `--ts --vitest` skip the questions of the tool: TypeScript and Vitest are added, nothing else (no router, no state library).
- The scaffold asks for `vitest@^4`. On 2026-11-11 `npm i` failed with it on npm 10 (`Cannot read properties of null (reading 'edgesOut')`). `npm i -D vitest@^5.1.0` fixes this and installs everything. If the tool has changed, plain `npm i` may work.
- In Vue files, `@/` is an alias for `src/`, for example `import { filterBooks } from "@/core/books"`.
- Commands, in `app`: `npm run dev`, `npm run test:unit -- --run` (tests once), `npm run build` (type check and build).

### Svelte 5

```bash
npm create vite@latest app -- --template svelte-ts --no-interactive
cd app
npm i
mkdir src/core
cp ../core/types.ts ../core/books.ts ../core/storage.ts ../core/seed.json src/core/
```

- This is Svelte with Vite, a single page app, like the React setup you know. `npx sv create` is the official tool for SvelteKit, the application framework on top of Svelte with routing and server features. You do not need it today.
- Commands, in `app`: `npm run dev`, `npm run check` (type check), `npm run build`.
- The scaffold has no test setup. Add it before you let the agent write component tests:

  ```bash
  npm i -D vitest jsdom @testing-library/svelte @testing-library/jest-dom @testing-library/user-event
  ```

  Replace `vite.config.ts`:

  ```ts
  import { svelte } from "@sveltejs/vite-plugin-svelte";
  import { svelteTesting } from "@testing-library/svelte/vite";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    plugins: [svelte(), svelteTesting()],
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"],
    },
  });
  ```

  Create `src/setupTests.ts` with the line `import "@testing-library/jest-dom/vitest";`. Add `"test:run": "vitest run"` to the `scripts` in `package.json`.

### Angular 22

```bash
npx @angular/cli@latest new app --defaults --skip-git --ssr=false --style=css --routing=false --ai-config=none
cd app
mkdir src/core
cp ../core/types.ts ../core/books.ts ../core/storage.ts ../core/seed.json src/core/
rm src/app/app.spec.ts
```

- The flags skip all questions: no git repository (you have one already), no server side rendering, plain CSS, no router, no agent configuration files (you have your own `CLAUDE.md`).
- `app.spec.ts` of the scaffold tests the welcome page that the agent removes. Delete it, or it fails.
- Create components with the CLI, so they follow the project conventions: `npx ng generate component book-card --skip-tests`. Without `--skip-tests` the generated test fails for a component with required inputs. You or the agent write real tests.
- Commands, in `app`: `npm start` (dev server), `npm test -- --no-watch` (tests once), `npm run build`.
- `npm test` ends with an error as long as the project has no test file (the scaffold test was deleted). This is expected until the first test exists.
- Angular needs Node.js 22.22.3 or newer (`node -v`).

### Documentation

Read the page about components and reactivity of your framework before you write your rules:

- Vue: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html), [Components Basics](https://vuejs.org/guide/essentials/component-basics.html)
- Svelte: [$state](https://svelte.dev/docs/svelte/$state), [$derived](https://svelte.dev/docs/svelte/$derived), [$props](https://svelte.dev/docs/svelte/$props)
- Angular: [Signals](https://angular.dev/guide/signals), [Components](https://angular.dev/guide/components)

## Review your result

You review code in a framework you do not know. That is harder, and it is the normal situation in a job. Use the list, and **ask the agent** when you do not understand something: "Explain this file to me. I know React, so compare it to React where it helps." Then check the answer in the official documentation.

- **Logic:** are the files in `src/core` unchanged (`diff ../core/books.ts src/core/books.ts` for each file)? Is filtering, validation and saving done with the functions from `core`, or did the agent write them again inside a component?
- **Idioms of the framework:** is the code written in the current style of your framework (see the rules in `CLAUDE.md`)? Models often know the older styles better: the Options API in Vue, `export let` and `on:click` in Svelte, NgModules and `*ngIf` in Angular. Old style is not always wrong, but a mix of both styles is a problem.
- **State:** where does each piece of state live (the books, the filter, the open dialog)? Is a value that can be derived stored as a second state, and does it get out of sync?
- **Dependencies:** compare `package.json` before and after. Is there a package you did not ask for (UI library, state library, router, Tailwind)? Do the framework docs recommend it, or did the agent just like it?
- **Types:** is there an `any`, a `!`, or an `as` cast that hides a problem?
- **Dialogs and keyboard:** can you use the whole app with the keyboard only? Does a dialog open with the focus inside, close with Escape and return the focus?
- **Forms:** are the fields labelled? Is the validation message shown next to the field and not only in the console?
- **Tests:** do the tests check behaviour (what the reader sees) or the implementation? Does a test fail when you break the code on purpose?
- **Production build:** does `npm run build` pass, not only the dev server?
- **Secrets and data:** no keys or tokens in the code, no `console.log` of user data.

## Bonus

- **Component tests:** write tests for the book card and the filter in your framework (Vue Test Utils for Vue, Svelte Testing Library for Svelte, `TestBed` for Angular). Break the code on purpose and check that a test fails.
- **Routing:** add a detail page for one book (`/books/:id`) with the official router of your framework (Vue Router, `@angular/router`, or a hash based router for Svelte). Compare the effort with React Router.
- **A second framework:** build only the book card and the filter again in another framework from the list. Which part was the same, which part was different?
- **Look at the build:** run `npm run build` and look at the size of the output files. Why is the number not enough to choose a framework?

## What is in the starter

- `SPEC.md`: user stories, screens and acceptance criteria. The same as for the React version.
- `CLAUDE.md`: project rules for the coding agent, with TODOs for you to fill in.
- `core`: the framework-independent logic with tests (its own `package.json`).

## Development

Node.js 22.22.3 or newer is required.

- In `core`: `npm i`, then `npm run test` (watch mode), `npm run test:run` (once) and `npm run check` (types).
- In `app`: the commands of your framework, see above.
