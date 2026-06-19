// pages/api/check-auth.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    
    // This runs on the server, so it can see your Vercel ADMIN_PASSWORD
    if (password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}