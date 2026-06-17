/**
 * Integration tests for src/services/movieApi.ts
 * Uses fetch mocking so no real network calls are made.
 *
 * NOTE: NEXT_PUBLIC_OMDB_API_KEY is set to a dummy value in jest.env.ts
 * before this module is evaluated, so the module-level API_KEY constant
 * will be truthy during all tests.
 */

import { movieApi } from "@/services/movieApi";

// ─── Mock setup ───────────────────────────────────────────────────────────────

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

const mockSearchResponse = {
  Search: [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/poster.jpg",
    },
  ],
  totalResults: "1",
  Response: "True",
};

const mockMovieDetails = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
  Rated: "PG-13",
  Released: "16 Jul 2010",
  Runtime: "148 min",
  Genre: "Action, Adventure, Sci-Fi",
  Director: "Christopher Nolan",
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt",
  Plot: "A thief who steals corporate secrets...",
  imdbRating: "8.8",
  Response: "True",
};

// ─── searchMovies() ───────────────────────────────────────────────────────────

describe("movieApi.searchMovies()", () => {
  test("returns search results for a valid query", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    });

    const result = await movieApi.searchMovies("Inception");
    expect(result.Response).toBe("True");
    expect(result.Search).toHaveLength(1);
    expect(result.Search[0].Title).toBe("Inception");
  });

  test("returns empty results for 'Movie not found!' response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: "False",
        Error: "Movie not found!",
      }),
    });

    const result = await movieApi.searchMovies("xyznonexistentmovie");
    expect(result.Response).toBe("False");
    expect(result.Search).toEqual([]);
    expect(result.totalResults).toBe("0");
  });

  test("throws error for Invalid API key response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        Response: "False",
        Error: "Invalid API key!",
      }),
    });

    await expect(movieApi.searchMovies("test")).rejects.toThrow(
      "Invalid API key"
    );
  });

  test("throws error on HTTP 500 status", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(movieApi.searchMovies("test")).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });

  test("includes search query in the fetch URL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    });

    await movieApi.searchMovies("Batman");
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("Batman");
    expect(calledUrl).toContain("apikey=");
  });
});

// ─── getMovieDetails() ────────────────────────────────────────────────────────

describe("movieApi.getMovieDetails()", () => {
  test("returns movie details for a valid imdbID", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovieDetails,
    });

    const result = await movieApi.getMovieDetails("tt1375666");
    expect(result.Title).toBe("Inception");
    expect(result.Director).toBe("Christopher Nolan");
    expect(result.imdbRating).toBe("8.8");
  });

  test("includes imdbID in the fetch URL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovieDetails,
    });

    await movieApi.getMovieDetails("tt0468569");
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("tt0468569");
  });
});

// ─── searchMoviesWithPagination() ────────────────────────────────────────────

describe("movieApi.searchMoviesWithPagination()", () => {
  test("passes page parameter to the API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    });

    await movieApi.searchMoviesWithPagination("action", 2);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("page=2");
  });

  test("defaults to page 1 when not specified", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    });

    await movieApi.searchMoviesWithPagination("action");
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("page=1");
  });

  test("returns empty results for not-found on page 2+", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Response: "False", Error: "Movie not found!" }),
    });

    const result = await movieApi.searchMoviesWithPagination("obscure", 5);
    expect(result.Search).toEqual([]);
  });
});
