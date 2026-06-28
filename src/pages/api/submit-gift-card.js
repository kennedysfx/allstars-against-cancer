// src/pages/api/submit-gift-card.js
import prisma from '../../../prisma/lib/prisma'; 
import { sendEmail } from '../../../prisma/lib/mailer'; // 1. Add this import

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { donorName, donorEmail, cardType, amount, imageUrl } = req.body;
    
    // Save to the GiftCardDonation table
    const giftCard = await prisma.giftCardDonation.create({
      data: {
        donorName,
        donorEmail,
        cardType,
        amount: parseFloat(amount),
        imageUrl,
        status: 'PENDING'
      },
    });
    
    // 2. Add the email trigger right here after the save is successful
    await sendEmail(
      'kennedysezebilo@gmail.com', 
      'New Gift Card Donation Received!',
      `A new donation of $${amount} (${cardType}) was submitted by ${donorName}.`,
      `<h1>New Gift Card Donation</h1>
       <p><strong>Donor:</strong> ${donorName}</p>
       <p><strong>Email:</strong> ${donorEmail}</p>
       <p><strong>Amount:</strong> $${amount}</p>
       <p><strong>Card Type:</strong> ${cardType}</p>
      
       <br /><br />
       <p>Log in to your Admin Dashboard to approve or decline this donation.</p>`
    );
    
    return res.status(200).json({ success: true, giftCard });
  } catch (error) {
    console.error("Gift Card Submission Error:", error);
    return res.status(500).json({ success: false, message: "Failed to save gift card" });
  }
}