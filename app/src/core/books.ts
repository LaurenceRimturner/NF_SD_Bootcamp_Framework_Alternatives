import type { Book, NewBook, Status, StatusFilter } from "./types";

export const STATUS_LABELS: Record<Status, string> = {
  "want-to-read": "Want to read",
  reading: "Reading",
  done: "Done",
};

/** The statuses in the order they are shown, for example in a select. */
export const STATUSES: Status[] = ["want-to-read", "reading", "done"];

type Filter = {
  status: StatusFilter;
  query: string;
};

export function filterBooks(books: Book[], { status, query }: Filter): Book[] {
  const normalizedQuery = query.trim().toLowerCase();
  return books.filter(
    (book) =>
      (status === "all" || book.status === status) &&
      book.title.toLowerCase().includes(normalizedQuery)
  );
}

export type BookErrors = { title?: string; author?: string };

/** Returns an error message per invalid field. An empty object means valid. */
export function validateBook(
  input: Pick<NewBook, "title" | "author">
): BookErrors {
  const errors: BookErrors = {};
  if (input.title.trim() === "") {
    errors.title = "Title is required";
  }
  if (input.author.trim() === "") {
    errors.author = "Author is required";
  }
  return errors;
}

/** Pure list helpers. They return a new array and never change the old one. */
export function addBook(books: Book[], newBook: NewBook): Book[] {
  return [{ ...newBook, id: crypto.randomUUID() }, ...books];
}

export function updateBook(
  books: Book[],
  id: string,
  changes: Partial<NewBook>
): Book[] {
  return books.map((book) => (book.id === id ? { ...book, ...changes } : book));
}

export function deleteBook(books: Book[], id: string): Book[] {
  return books.filter((book) => book.id !== id);
}
