import prisma from '../../../prisma/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch all donations and include the donor details
    const donations = await prisma.donation.findMany({
      include: {
        donor: true, // This brings in the Donor's name/email automatically
      },
      orderBy: {
        date: 'desc', // Newest first
      },
    });

    return res.status(200).json(donations);
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ message: 'Error fetching donations' });
  }
}