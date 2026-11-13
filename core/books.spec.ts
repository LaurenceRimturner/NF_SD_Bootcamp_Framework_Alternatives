import { describe, expect, test } from "vitest";

import {
  addBook,
  deleteBook,
  filterBooks,
  STATUS_LABELS,
  updateBook,
  validateBook,
} from "./books";
import seed from "./seed.json";
import type { Book } from "./types";

const books = seed as Book[];

describe("STATUS_LABELS", () => {
  test("has a label for every status", () => {
    expect(STATUS_LABELS).toEqual({
      "want-to-read": "Want to read",
      reading: "Reading",
      done: "Done",
    });
  });
});

describe("filterBooks", () => {
  test("returns all books for the status 'all' and an empty query", () => {
    expect(filterBooks(books, { status: "all", query: "" })).toHaveLength(10);
  });

  test("filters by status", () => {
    const result = filterBooks(books, { status: "reading", query: "" });
    expect(result.map((book) => book.title)).toEqual([
      "Neuromancer",
      "Project Hail Mary",
    ]);
  });

  test("finds a title regardless of upper and lower case", () => {
    const result = filterBooks(books, { status: "all", query: "dune" });
    expect(result.map((book) => book.title)).toEqual(["Dune"]);
  });

  test("ignores spaces around the search text", () => {
    expect(filterBooks(books, { status: "all", query: " Dune " })).toHaveLength(
      1
    );
  });

  test("combines status and query", () => {
    expect(filterBooks(books, { status: "done", query: "the" })).toHaveLength(
      2
    );
    expect(filterBooks(books, { status: "reading", query: "dune" })).toEqual(
      []
    );
  });
});

describe("validateBook", () => {
  test("accepts a title and an author", () => {
    expect(validateBook({ title: "Dune", author: "Frank Herbert" })).toEqual(
      {}
    );
  });

  test("reports an empty or blank title and author", () => {
    expect(validateBook({ title: "", author: "  " })).toEqual({
      title: "Title is required",
      author: "Author is required",
    });
  });
});

describe("list helpers", () => {
  test("addBook puts a new book with a new id first and keeps the old list", () => {
    const result = addBook(books, {
      title: "Emma",
      author: "Jane Austen",
      status: "want-to-read",
      rating: null,
      notes: "",
    });
    expect(result).toHaveLength(11);
    expect(result[0]?.title).toBe("Emma");
    expect(books.some((book) => book.id === result[0]?.id)).toBe(false);
    expect(books).toHaveLength(10);
  });

  test("updateBook changes only the book with the id", () => {
    const result = updateBook(books, "b3", { status: "done", rating: 4 });
    expect(result.find((book) => book.id === "b3")).toMatchObject({
      status: "done",
      rating: 4,
      title: "Gone Girl",
    });
    expect(result.filter((book) => book.status === "done")).toHaveLength(6);
    expect(books.find((book) => book.id === "b3")?.status).toBe("want-to-read");
  });

  test("deleteBook removes the book with the id", () => {
    const result = deleteBook(books, "b1");
    expect(result).toHaveLength(9);
    expect(result.some((book) => book.id === "b1")).toBe(false);
  });
});
