import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Send the message to Django backend
      const response = await fetch('http://127.0.0.1:8000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      // Get the response from Django and forward it to the frontend
      const data = await response.json();
      res.status(200).json({ response: data.response });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({ message: 'Error communicating with the backend.' });
    }
  } else {
    // Return a 405 status code if the method is not POST
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
