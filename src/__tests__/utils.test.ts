/**
 * Unit tests for src/lib/utils.ts
 */

import { cn, searchHistoryUtils } from "@/lib/utils";

// ─── cn() ────────────────────────────────────────────────────────────────────

describe("cn() — Tailwind class name utility", () => {
  test("returns a single class unchanged", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  test("merges multiple class names", () => {
    const result = cn("flex", "items-center", "gap-4");
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("gap-4");
  });

  test("filters out falsy values", () => {
    const result = cn("base", false, null, undefined, "active");
    expect(result).toContain("base");
    expect(result).toContain("active");
    expect(result).not.toMatch(/false|null|undefined/);
  });

  test("resolves conflicting Tailwind classes (last wins)", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toContain("text-blue-500");
    expect(result).not.toContain("text-red-500");
  });

  test("returns empty string when called with no args", () => {
    expect(cn()).toBe("");
  });
});

// ─── searchHistoryUtils ───────────────────────────────────────────────────────

describe("searchHistoryUtils.formatRelativeTime()", () => {
  const now = Date.now();

  test('returns "Just now" for timestamps within 60 seconds', () => {
    expect(searchHistoryUtils.formatRelativeTime(now - 30_000)).toBe("Just now");
  });

  test("returns minutes ago for timestamps between 1-59 minutes", () => {
    const result = searchHistoryUtils.formatRelativeTime(now - 5 * 60_000);
    expect(result).toBe("5 minutes ago");
  });

  test("returns singular minute for exactly 1 minute ago", () => {
    const result = searchHistoryUtils.formatRelativeTime(now - 60_000);
    expect(result).toBe("1 minute ago");
  });

  test("returns hours ago for timestamps between 1-23 hours", () => {
    const result = searchHistoryUtils.formatRelativeTime(now - 3 * 60 * 60_000);
    expect(result).toBe("3 hours ago");
  });

  test("returns days ago for timestamps >= 24 hours", () => {
    const result = searchHistoryUtils.formatRelativeTime(now - 2 * 24 * 60 * 60_000);
    expect(result).toBe("2 days ago");
  });
});

describe("searchHistoryUtils.normalizeQuery()", () => {
  test("lowercases the query", () => {
    expect(searchHistoryUtils.normalizeQuery("INCEPTION")).toBe("inception");
  });

  test("trims surrounding whitespace", () => {
    expect(searchHistoryUtils.normalizeQuery("  batman  ")).toBe("batman");
  });

  test("removes special characters", () => {
    expect(searchHistoryUtils.normalizeQuery("spider-man!")).toBe("spiderman");
  });

  test("returns empty string for an empty input", () => {
    expect(searchHistoryUtils.normalizeQuery("")).toBe("");
  });
});

describe("searchHistoryUtils.highlightMatch()", () => {
  test("wraps matching text in a <mark> tag", () => {
    const result = searchHistoryUtils.highlightMatch("Inception", "ception");
    expect(result).toContain("<mark");
    expect(result).toContain("ception");
  });

  test("returns original text when query is empty", () => {
    expect(searchHistoryUtils.highlightMatch("Inception", "")).toBe("Inception");
  });

  test("is case-insensitive", () => {
    const result = searchHistoryUtils.highlightMatch("Inception", "INCEP");
    expect(result).toContain("<mark");
  });
});
