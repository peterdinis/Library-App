import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export async function sendEmail({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) {
  await transport.sendMail({
    from: '"SPŠT Knižnica" <noreply@example.com>',
    to: email,
    subject,
    text: message,
  });
}
