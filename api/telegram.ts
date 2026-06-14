export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ message: 'Missing name or message' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment variables');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const text = `📩 *New Portfolio Message*\n\n*From:* ${name}\n\n*Message:*\n${message}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) {
      const err = await telegramRes.text();
      console.error('Telegram API failed:', err);
      throw new Error('Telegram API failed');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
