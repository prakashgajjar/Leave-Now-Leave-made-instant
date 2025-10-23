import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // e.g., smtp.gmail.com
      port: process.env.SMTP_PORT || 587,
      secure: false,                      // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,      // your email
        pass: process.env.SMTP_PASS,      // your email password or app password
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"LeaveNow App" <${process.env.SMTP_USER}>`, // sender
      to,           // recipient
      subject,      // email subject
      text,         // plain text
      html,         // html content
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
