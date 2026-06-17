// Set dummy environment variables before any module is loaded.
// These are used by movieApi.ts, gemini.ts, and trailerApi.ts which
// read process.env at module evaluation time.
process.env.NEXT_PUBLIC_OMDB_API_KEY = "test_omdb_key_ci";
process.env.NEXT_PUBLIC_GEMINI_API_KEY = "test_gemini_key_ci";
process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = "test_youtube_key_ci";
