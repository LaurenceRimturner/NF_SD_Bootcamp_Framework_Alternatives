import seed from "./seed.json";
import type { Book } from "./types";

export const STORAGE_KEY = "reading-list:books";

type ReadableStorage = Pick<Storage, "getItem">;
type WritableStorage = Pick<Storage, "setItem">;

/**
 * Reads the books from `localStorage`. Falls back to the seed data when
 * nothing is stored, the stored text is broken or the storage is blocked.
 */
export function loadBooks(storage: ReadableStorage = localStorage): Book[] {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as Book[];
      }
    }
  } catch {
    // Broken or blocked storage: fall back to the seed data.
  }
  return seed as Book[];
}

export function saveBooks(
  books: Book[],
  storage: WritableStorage = localStorage
): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // Blocked or full storage: the app keeps working without saving.
  }
}
