import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Custom plugin to mock the Vercel /api/telegram function in local dev
const telegramApiPlugin = () => ({
  name: 'telegram-api-mock',
  configureServer(server: any) {
    server.middlewares.use('/api/telegram', (req: any, res: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { name, message } = JSON.parse(body);
            
            // Load environment variables from .env.local
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const token = env.TELEGRAM_BOT_TOKEN;
            const chatId = env.TELEGRAM_CHAT_ID;

            res.setHeader('Content-Type', 'application/json');

            if (!token || !chatId) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ message: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local' }));
            }

            const text = `📩 *New Portfolio Message*\n\n*From:* ${name}\n\n*Message:*\n${message}`;

            const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
            });

            if (telegramRes.ok) {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } else {
              const err = await telegramRes.text();
              console.error('Telegram API Error:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ message: 'Telegram API failed' }));
            }
          } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Server error' }));
          }
        });
      } else {
        res.statusCode = 405;
        res.end();
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    telegramApiPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
