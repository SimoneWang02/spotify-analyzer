# Moodify (Spotify Analyzer)

A web app that connects to your Spotify account and lets you explore your playlists by tempo (BPM). Pick a playlist, then search, sort and filter its songs.

> **Status: not maintained.** Built in December 2023 and not updated for Spotify's later API changes. Login, BPM data and song previews are not expected to work today. See [Spotify API changes](#spotify-api-changes).
>
> **Pre-AI project:** I wrote the app code without AI tools.

## Features

- **Spotify login:** connect with your Spotify account and log out from the navigation bar
- **Playlists:** browse your playlists as a grid of covers
- **BPM:** see the tempo of each song in a playlist
- **Sort:** order songs by name or BPM, ascending or descending
- **BPM filter:** narrow the list with a range slider
- **Search:** find songs by name
- **Preview:** click a cover to play a 30-second clip

## Tech stack

- [React 18](https://react.dev) with [Vite](https://vitejs.dev) and React Router
- [Mantine](https://mantine.dev) and [Tailwind CSS](https://tailwindcss.com)
- [Axios](https://axios-http.com) for requests to the [Spotify Web API](https://developer.spotify.com/documentation/web-api)

The app is entirely in `react/` and calls Spotify directly from the browser. The rest of the repository is an unmodified Laravel 10 skeleton, set up for a future backend and not needed to run the app.

## Project structure

```
react/src/
├── pages/Home.jsx               # Access token, logout, loads playlists
├── components/
│   ├── LoginScreen.jsx          # Link to Spotify login
│   ├── NavigationBar.jsx        # Logout button
│   ├── PlaylistsSection.jsx     # Playlist grid, loads tracks and BPM
│   └── TracksList.jsx           # Song table, sort, filter, search, preview
├── layouts/Layout.jsx
└── router.jsx
```

## Running locally

You need [Node.js](https://nodejs.org) and an app registered in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), with `http://127.0.0.1:3000/` as a redirect URI.

1. Install the dependencies:

   ```bash
   git clone https://github.com/SimoneWang02/spotify-analyzer.git
   cd spotify-analyzer/react
   npm install
   ```

2. Create `react/.env`:

   ```env
   VITE_CLIENT_ID=your_spotify_client_id
   VITE_REDIRECT_URI=http://127.0.0.1:3000/
   VITE_SCOPE=playlist-read-private
   VITE_AUTH_ENDPOINT=https://accounts.spotify.com/authorize
   VITE_RESPONSE_TYPE=token
   VITE_SPOTIFY_API_BASE_URL=https://api.spotify.com/v1
   ```

   Vite includes every `VITE_` variable in the browser code, so never put the Spotify client secret here.

3. Start the app and open <http://127.0.0.1:3000>. Port 3000 must be free, because it has to match the redirect URI:

   ```bash
   npm run dev -- --host 127.0.0.1 --strictPort
   ```

## Spotify API changes

Spotify has changed several things this app depends on:

- **Login:** the app uses the implicit grant flow, which Spotify [scheduled for removal on November 27, 2025](https://developer.spotify.com/blog/2025-10-14-reminder-oauth-migration-27-nov-2025).
- **BPM and previews:** audio features and 30-second previews were [restricted in November 2024](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api) for new apps and most apps in development mode.
- **Playlist tracks:** for apps in development mode, the playlist endpoints and fields were [renamed from `tracks` to `items` in February 2026](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide).

## Known issues

- Uppercase letters in the search never match
- Search and the BPM filter replace each other instead of combining
- Only the first page of playlists and songs is loaded
- Playlists without a cover, empty playlists and songs without audio features can crash the page

## Possible next steps

- Move login to Authorization Code with PKCE
- Find another source for BPM data
- Update the playlist requests to the current API
- Fix the known issues above
