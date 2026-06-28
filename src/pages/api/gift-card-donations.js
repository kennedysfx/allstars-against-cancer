// src/pages/api/gift-card-donations.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch donations that are currently "PENDING"
      const donations = await prisma.giftCardDonation.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch donations' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}