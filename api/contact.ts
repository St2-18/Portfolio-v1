import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // This will be changed later
      to: ["harshitsharma77117@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent from your portfolio contact form</small></p>
      `,
      // Also send a plain text version
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        Sent from your portfolio contact form
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
