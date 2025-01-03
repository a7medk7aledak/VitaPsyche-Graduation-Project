import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;
  console.log("Received message:", message); // للتتبع

  try {
    const response = await fetch("http://127.0.0.1:8000/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Chatbot API response:", data); // للتتبع

    if (data && data.response) {
      return res.status(200).json({ response: data.response });
    } else {
      console.error("Invalid response format:", data);
      return res.status(500).json({
        response: "I apologize, but I couldn't process your request properly.",
      });
    }
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return res.status(500).json({
      response:
        "I apologize, but I'm having trouble processing your request right now.",
    });
  }
}
