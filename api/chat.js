export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { messages } = req.body;
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: `You are Aditi Maurya's AI assistant. She is a Data & AI Engineer at Daivergent New York building Smart Audit, an AI multi agent system using LangGraph. MS Information Systems from Northeastern. Open to full time roles in AI and data engineering.`,
      messages
    })
  });
  const data = await response.json();
  res.status(200).json({ reply: data.content?.[0]?.text || "Reach Aditi at maurya.ad@northeastern.edu" });
}
