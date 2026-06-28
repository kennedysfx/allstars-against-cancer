// pages/api/subscribe.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName } = req.body;
    
    const subscriber = await prisma.subscriber.create({
      data: { email, firstName, lastName },
    });
    
    return res.status(200).json({ success: true, subscriber });
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({ success: false, message: "Subscription failed" });
  }
}