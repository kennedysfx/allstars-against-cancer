import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName } = req.body;
    
    const subscriber = await prisma.subscriber.create({
      data: { email, firstName, lastName },
    });

   await resend.emails.send({
  from: 'All Stars Against Cancer Team <onboarding@resend.dev>', // Use your verified sender
  to: 'kennedysezebilo@gmail.com', // Your verified test address
  subject: 'Welcome to the All Stars Against Cancer Foundation',
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #1e293b;">Welcome to our community, ${firstName}!</h2>
      <p>Thank you for choosing to support the <strong>All Stars Against Cancer Foundation</strong>.</p>
      
      <p>By subscribing to our updates, you are now part of a dedicated network working to provide support, resources, and hope to those navigating the challenges of cancer. Your commitment helps us drive our mission forward and ensures that no one faces this journey alone.</p>
      
      <p>We will keep you informed about our latest initiatives, upcoming events, and the impact of our collective efforts.</p>
      
      <p>Should you have any questions or wish to learn more about how you can contribute, please feel free to reach out to us at any time.</p>
      
      <p>With gratitude,<br>
      <strong>The All Stars Against Cancer Team</strong></p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">
        All Stars Against Cancer Foundation<br>
        <em>United in hope, relentless in our mission.</em>
      </p>
    </div>
  `,
});
    
    return res.status(200).json({ success: true, subscriber });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ success: false, message: "Subscription failed" });
  }
}