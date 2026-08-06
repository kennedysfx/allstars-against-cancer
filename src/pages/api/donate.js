import prisma from '../../../prisma/lib/prisma';
import { sendEmail } from '../../../prisma/lib/mailer'; // 1. Add this import

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

    // 3. If it's a crypto donation, notify the admin
    if (paymentMethod && paymentMethod.toLowerCase() === 'crypto') {
      try {
        await sendEmail(
          'kennedysezebilo@gmail.com',
          'New Crypto Donation Received!',
          `A new crypto donation of $${amount} was made by ${name} (${email}).`,
          `<h1>New Crypto Donation</h1>
           <p><strong>Donor:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Amount:</strong> $${amount}</p>
           <p><strong>Payment Method:</strong> Crypto</p>
           <br /><br />
           <p>Log in to your Admin Dashboard to view full details.</p>`
        );
      } catch (emailError) {
        // Don't fail the whole donation if the email fails — just log it
        console.error("Admin notification email failed:", emailError);
      }
    }

    return res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: 'Error saving to database' });
  }
}