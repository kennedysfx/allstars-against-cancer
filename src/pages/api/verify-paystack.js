export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { reference } = req.body;
  if (!reference) {
    return res.status(400).json({ success: false, message: 'Missing reference' });
  }

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await verifyRes.json();

    if (data?.data?.status === 'success') {
      return res.status(200).json({ success: true, data: data.data });
    }

    return res.status(400).json({ success: false, message: 'Payment not verified' });
  } catch (err) {
    console.error('Paystack verify error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}