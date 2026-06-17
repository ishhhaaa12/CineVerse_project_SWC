/**
 * Unit tests for Redux Toolkit slices
 * Tests: watchlistSlice, favoritesSlice
 */

import watchlistReducer, {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
  loadWatchlist,
} from "@/store/watchlistSlice";

import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  loadFavorites,
} from "@/store/favoritesSlice";

import type { Movie } from "@/types/movie";

const mockMovie1: Movie = {
  imdbID: "tt0468569",
  Title: "The Dark Knight",
  Year: "2008",
  Type: "movie",
  Poster: "https://via.placeholder.com/300x450",
};

const mockMovie2: Movie = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
  Type: "movie",
  Poster: "https://via.placeholder.com/300x450",
};

// ─── Watchlist Slice ──────────────────────────────────────────────────────────

describe("watchlistSlice", () => {
  const emptyState = { movies: [] };

  test("initial state is empty movies array", () => {
    expect(watchlistReducer(undefined, { type: "@@INIT" }).movies).toEqual([]);
  });

  test("addToWatchlist adds a movie", () => {
    const state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].imdbID).toBe("tt0468569");
  });

  test("addToWatchlist does NOT add duplicate", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, addToWatchlist(mockMovie1));
    expect(state.movies).toHaveLength(1);
  });

  test("addToWatchlist adds multiple distinct movies", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, addToWatchlist(mockMovie2));
    expect(state.movies).toHaveLength(2);
  });

  test("removeFromWatchlist removes the correct movie by imdbID", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, addToWatchlist(mockMovie2));
    state = watchlistReducer(state, removeFromWatchlist("tt0468569"));
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].imdbID).toBe("tt1375666");
  });

  test("removeFromWatchlist on non-existent ID is a no-op", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, removeFromWatchlist("tt9999999"));
    expect(state.movies).toHaveLength(1);
  });

  test("clearWatchlist empties the list", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, addToWatchlist(mockMovie2));
    state = watchlistReducer(state, clearWatchlist());
    expect(state.movies).toEqual([]);
  });

  test("loadWatchlist replaces the entire list", () => {
    let state = watchlistReducer(emptyState, addToWatchlist(mockMovie1));
    state = watchlistReducer(state, loadWatchlist([mockMovie2]));
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].imdbID).toBe("tt1375666");
  });
});

// ─── Favorites Slice ──────────────────────────────────────────────────────────

describe("favoritesSlice", () => {
  const emptyState = { movies: [] };

  test("initial state is empty", () => {
    expect(favoritesReducer(undefined, { type: "@@INIT" }).movies).toEqual([]);
  });

  test("addToFavorites adds a movie", () => {
    const state = favoritesReducer(emptyState, addToFavorites(mockMovie1));
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].Title).toBe("The Dark Knight");
  });

  test("addToFavorites does NOT add duplicate", () => {
    let state = favoritesReducer(emptyState, addToFavorites(mockMovie1));
    state = favoritesReducer(state, addToFavorites(mockMovie1));
    expect(state.movies).toHaveLength(1);
  });

  test("removeFromFavorites removes correct movie", () => {
    let state = favoritesReducer(emptyState, addToFavorites(mockMovie1));
    state = favoritesReducer(state, addToFavorites(mockMovie2));
    state = favoritesReducer(state, removeFromFavorites("tt1375666"));
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].imdbID).toBe("tt0468569");
  });

  test("clearFavorites empties the list", () => {
    let state = favoritesReducer(emptyState, addToFavorites(mockMovie1));
    state = favoritesReducer(state, clearFavorites());
    expect(state.movies).toEqual([]);
  });

  test("loadFavorites replaces the entire list", () => {
    const state = favoritesReducer(
      emptyState,
      loadFavorites([mockMovie1, mockMovie2])
    );
    expect(state.movies).toHaveLength(2);
  });
});
