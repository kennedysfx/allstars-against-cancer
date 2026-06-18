import prisma from '../../../prisma/lib/prisma';

export default async function handler(req, res) {
  // 1. Ensure it's a GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 2. Fetch the data from the database
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // 3. Return the data as JSON
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: 'Error fetching subscribers' });
  }
}