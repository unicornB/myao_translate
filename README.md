# Myao Translate

A culturally tuned translator that supports seamless switching between Chinese, Burmese, and English. The web app is built with Next.js (App Router) and Tailwind CSS, and it relies on SiliconFlow's `Qwen/QwQ-32B` chat-completions endpoint for high-quality translations.

## Prerequisites

- Node.js 18.17+ or 20+
- An API token for [SiliconFlow](https://siliconflow.cn). Store it as `SILICONFLOW_API_KEY`.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your SiliconFlow key to `.env.local`:

   ```bash
   echo "SILICONFLOW_API_KEY=your_token_here" >> .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) to use the app. Switch the site language (Burmese, Chinese, English) from the top-right selector and translate text between any pairing of the three languages.

## Deployment tips

- Set `SILICONFLOW_API_KEY` in your hosting provider.
- The translation route lives at `app/api/translate/route.js` and makes requests server-side; no client secrets are exposed.
- Tailwind styles are preconfigured; build with `npm run build`.
