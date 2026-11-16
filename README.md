# Smart College Detection (India)

A college information chatbot with login, profiles, compare, bookmarks and dark mode.

## Setup
1. Install Node.js 20.6 or newer.
2. Copy `.env.example` to `.env` and paste your Anthropic API key.
3. Run `npm install`
4. Run `npm start`
5. Open http://localhost:5173

## Notes
- `npm start` runs the API proxy (port 3001) and the Vite dev server (port 5173) together.
- Accounts, chats and favourites are stored in the browser's localStorage. This is a demo login, not real security. For production use a real backend with proper authentication.
- Your API key stays on the server (`server.js`) and is never sent to the browser.
- The chatbot uses Anthropic's web search tool, which must be enabled for your API account.
