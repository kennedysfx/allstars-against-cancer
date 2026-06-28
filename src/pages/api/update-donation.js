import prisma from '../../../prisma/lib/prisma';
import { sendEmail } from '../../../prisma/lib/mailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { id, status, declineReason } = req.body; // Added declineReason

    const updatedDonation = await prisma.giftCardDonation.update({
      where: { id },
      data: { status, declineReason: declineReason || null }, 
    });

    let subject, htmlContent;

    if (status === 'APPROVED') {
      subject = 'Payment Succesful: Your Gift Card Donation has been Approved';
      htmlContent = `
        <h1>Thank You for Your Generosity</h1>
        <p>Dear ${updatedDonation.donorName},</p>
        <p>We are pleased to notify you that your recent gift card donation to <strong>AllStars Against Cancer Foundation</strong> has been successfully verified and approved.</p>
        <p><strong>Donation Details:</strong></p>
        <ul>
          <li><strong>Type:</strong> ${updatedDonation.cardType}</li>
          <li><strong>Amount:</strong> $${updatedDonation.amount}</li>
        </ul>
        <p>Your contribution plays a vital role in our ongoing mission. We deeply appreciate your commitment to our cause.</p>
        <p>Sincerely,<br>The AllStars Against Cancer Team</p>
      `;
    } else {
      subject = 'Payment Declined..';
      htmlContent = `
        <h1>Donation Status Update</h1>
        <p>Dear ${updatedDonation.donorName},</p>
        <p>Thank you for your interest in supporting AllStars Against Cancer Foundation. After careful review, we regret to inform you that we are unable to accept your gift card donation at this time for the following reason</p>
        <p><strong>Reason for decline:</strong> ${declineReason || 'The gift card provided did not meet our verification criteria.'}</p>
        <p>We invite you to consider attempting your donation again through our official portal:</p>
        <p><a href="https://allstars-against-cancer.vercel.app/donate?from=home" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Return to Donation Page</a></p>
        <p>We truly appreciate your desire to help and hope to see your contribution in the future.</p>
        <p>Sincerely,<br>The AllStars Against Cancer Team</p>
      `;
    }

    await sendEmail(updatedDonation.donorEmail, subject, 'Please view this email in an HTML-enabled client.', htmlContent);

    return res.status(200).json({ success: true, updatedDonation });
  } catch (error) {
    console.error("Update Donation Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update donation" });
  }
}