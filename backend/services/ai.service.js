const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// prompt function to categorize a list of short transactions
async function categorizeTransactions(items) {
  // items: [{id, text}]
  // We'll send a single prompt with JSON response expected.
  const descriptions = items.map(it => `${it.id}: ${it.text}`).join('\n');

  const prompt = `
You are given transaction descriptions, one per line in the format "<id>: <description>".
Categorize each transaction into one of: Food, Travel, Utilities, Shopping, Medical, Rent, Other.
Also detect if it looks like a recurring subscription (true/false).
Return a JSON array with objects: { "id": <id>, "category": "<category>", "confidence": <0-1>, "isRecurring": true|false } only.
Here are the descriptions:
${descriptions}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const content = result.response.text();
  // Try to parse JSON from content
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    // If model sometimes returns text before JSON, extract last JSON substring
    const match = content.match(/(\[.*\])/s);
    parsed = match ? JSON.parse(match[1]) : [];
  }

  // Build map based on id order (ensure same indexes)
  const map = {};
  for (const obj of parsed) {
    const idx = parseInt(obj.id);
    map[idx] = { category: obj.category, confidence: parseFloat(obj.confidence), isRecurring: !!obj.isRecurring };
  }

  // return array aligned with original items (by index)
  const results = items.map((it, idx) => map[idx] || { category: 'Other', confidence: 0.0, isRecurring: false });
  return results;
}

async function summarizeSpendingPatterns(descriptions) {
  const prompt = `You are given a list of transactions. Analyze and provide:
- Top 3 spending categories with names and percentages (format: [{"name": "Food & Dining", "percentage": "45.2"}])
- Detect recurring subscriptions and list them as strings
- Suggestions to reduce spending as strings
Return JSON with keys: topCategories (array of objects), recurringSubscriptions (array of strings), suggestions (array of strings).
Transactions:
${descriptions.join('\n')}
`;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const content = result.response.text();
  try {
    return JSON.parse(content);
  } catch(e) {
    const match = content.match(/(\{[\s\S]*\})/);
    return match ? JSON.parse(match[1]) : { message: content };
  }
}


module.exports = { categorizeTransactions , summarizeSpendingPatterns };
