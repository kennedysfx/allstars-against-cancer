import prisma from '../../../prisma/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const donation = await prisma.giftCardDonation.findUnique({ where: { id } });

  if (!donation || !donation.imageUrl) return res.status(404).send('Snapshot not found');

  // Simple HTML to display the image
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;">
        <img src="${donation.imageUrl}" style="max-width:100%;" />
      </body>
    </html>
  `);
}