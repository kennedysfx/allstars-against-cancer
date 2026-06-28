import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, text, html) => {
  try {
    const data = await resend.emails.send({
      // Until your domain is verified, you must use 'onboarding@resend.dev'
      from: 'AllStars Against Cancer Team <onboarding@resend.dev>',
      to: [to], // Resend expects an array for the 'to' field
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};