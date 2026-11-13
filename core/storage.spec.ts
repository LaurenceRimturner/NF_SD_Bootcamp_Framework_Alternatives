import { describe, expect, test } from "vitest";

import { loadBooks, saveBooks, STORAGE_KEY } from "./storage";
import seed from "./seed.json";
import type { Book } from "./types";

function fakeStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(STORAGE_KEY, initial);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
}

describe("loadBooks", () => {
  test("returns the seed data when nothing is stored", () => {
    expect(loadBooks(fakeStorage())).toEqual(seed);
  });

  test("returns the stored books", () => {
    const stored: Book[] = [
      {
        id: "x",
        title: "Emma",
        author: "Jane Austen",
        status: "done",
        rating: 5,
        notes: "",
      },
    ];
    expect(loadBooks(fakeStorage(JSON.stringify(stored)))).toEqual(stored);
  });

  test("falls back to the seed data for broken text", () => {
    expect(loadBooks(fakeStorage("{not json"))).toEqual(seed);
    expect(loadBooks(fakeStorage('{"a":1}'))).toEqual(seed);
  });

  test("falls back to the seed data when the storage throws", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
    };
    expect(loadBooks(blocked)).toEqual(seed);
  });
});

describe("saveBooks", () => {
  test("writes the books so that loadBooks reads them again", () => {
    const storage = fakeStorage();
    const books = (seed as Book[]).slice(0, 2);
    saveBooks(books, storage);
    expect(loadBooks(storage)).toEqual(books);
  });

  test("does not throw when the storage is blocked", () => {
    const blocked = {
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(() => saveBooks([], blocked)).not.toThrow();
  });
});
