import prisma from '../../../prisma/lib/prisma'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { name, email, amount, paymentMethod } = req.body;

    // 1. Create or connect the Donor
    const donor = await prisma.donor.upsert({
      where: { email: email },
      update: { name: name },
      create: { email: email, name: name },
    });

    // 2. Create the Donation linked to the Donor
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        paymentMethod: paymentMethod,
        donorId: donor.id, // Linking the two
      },
    });

    return res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: 'Error saving to database' });
  }
}