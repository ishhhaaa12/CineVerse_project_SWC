/**
 * Unit tests for src/services/actorApi.ts
 * Tests the static actor dataset and search logic.
 */

import { actorApi, actorDataset } from "@/services/actorApi";

// ─── Dataset integrity ────────────────────────────────────────────────────────

describe("actorDataset — static data integrity", () => {
  test("contains at least 20 actors", () => {
    expect(actorDataset.length).toBeGreaterThanOrEqual(20);
  });

  test("every actor has a non-empty name", () => {
    actorDataset.forEach((actor) => {
      expect(actor.name).toBeTruthy();
      expect(typeof actor.name).toBe("string");
    });
  });

  test("every actor has at least one movie", () => {
    actorDataset.forEach((actor) => {
      expect(actor.movies.length).toBeGreaterThan(0);
    });
  });

  test("every actor has at least one genre", () => {
    actorDataset.forEach((actor) => {
      expect(actor.genres.length).toBeGreaterThan(0);
    });
  });

  test("every actor has a valid birth year", () => {
    actorDataset.forEach((actor) => {
      expect(actor.birthYear).toBeGreaterThan(1900);
      expect(actor.birthYear).toBeLessThanOrEqual(new Date().getFullYear());
    });
  });
});

// ─── actorApi.searchActors() ──────────────────────────────────────────────────

describe("actorApi.searchActors()", () => {
  test("returns results for a known actor name", async () => {
    const results = await actorApi.searchActors("Tom Hanks");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("Tom Hanks");
  });

  test("is case-insensitive", async () => {
    const results = await actorApi.searchActors("tom hanks");
    expect(results.length).toBeGreaterThan(0);
  });

  test("returns empty array for empty query", async () => {
    const results = await actorApi.searchActors("");
    expect(results).toEqual([]);
  });

  test("returns empty array for unknown actor", async () => {
    const results = await actorApi.searchActors("zzzunknownactorxxx");
    expect(results).toEqual([]);
  });

  test("strips 'movies by' prefix from query", async () => {
    const results = await actorApi.searchActors("movies by Leonardo DiCaprio");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("Leonardo DiCaprio");
  });
});

// ─── actorApi.getMoviesByActor() ──────────────────────────────────────────────

describe("actorApi.getMoviesByActor()", () => {
  test("returns movie list for known actor", async () => {
    const result = await actorApi.getMoviesByActor("Meryl Streep");
    expect(result.Response).toBe("True");
    expect(result.Search.length).toBeGreaterThan(0);
  });

  test("returns Response False for unknown actor", async () => {
    const result = await actorApi.getMoviesByActor("unknownactorxyz");
    expect(result.Response).toBe("False");
    expect(result.Search).toEqual([]);
  });

  test("each returned movie has required OMDB fields", async () => {
    const result = await actorApi.getMoviesByActor("Brad Pitt");
    result.Search.forEach((movie) => {
      expect(movie).toHaveProperty("imdbID");
      expect(movie).toHaveProperty("Title");
      expect(movie).toHaveProperty("Year");
      expect(movie).toHaveProperty("Poster");
      expect(movie).toHaveProperty("Type");
    });
  });
});

// ─── actorApi.getPopularActors() ─────────────────────────────────────────────

describe("actorApi.getPopularActors()", () => {
  test("returns exactly 10 actors", () => {
    const actors = actorApi.getPopularActors();
    expect(actors).toHaveLength(10);
  });

  test("returns actor objects with name property", () => {
    const actors = actorApi.getPopularActors();
    actors.forEach((actor) => {
      expect(actor.name).toBeTruthy();
    });
  });
});

// ─── actorApi.getActorDetails() ───────────────────────────────────────────────

describe("actorApi.getActorDetails()", () => {
  test("returns actor object for known name", () => {
    const actor = actorApi.getActorDetails("Denzel Washington");
    expect(actor).not.toBeNull();
    expect(actor?.name).toBe("Denzel Washington");
  });

  test("returns null for unknown actor", () => {
    expect(actorApi.getActorDetails("unknownxyz")).toBeNull();
  });

  test("is case-sensitive (exact match required)", () => {
    // getActorDetails uses exact lowercase comparison
    const actor = actorApi.getActorDetails("denzel washington");
    expect(actor?.name).toBe("Denzel Washington");
  });
});
