export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Example: log to server (you can later connect email service)
    console.log("New message:", { name, email, message });

    return res
      .status(200)
      .json({ success: true, message: "Message received!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
