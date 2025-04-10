import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER as string,
    pass: process.env.NODEMAILER_PASS as string,
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
    from: '"Platform Team" <noreply@example.com>',
    to: email,
    subject,
    text: message,
  });
}