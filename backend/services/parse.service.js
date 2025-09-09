const fs = require('fs');
const csv = require('fast-csv');
const pdfParse = require('pdf-parse');
const aiService = require('./ai.service');

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', row => {
        // Expect columns like date, description, amount
        results.push({
          date: row.date || row.Date,
          description: row.description || row.Description,
          amount: parseFloat(row.amount || row.Amount || 0),
        });
      })
      .on('end', async rowCount => {
        resolve(results);
      });
  });
}

async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  // data.text contains raw text of statements — you must write regex/parsing rules per bank format.
  // For demo, we split by lines and try to extract items that match pattern
  const lines = data.text.split('\n').map(l => l.trim()).filter(Boolean);
  // naive approach:
  const txns = [];
  for (const line of lines) {
    // try to match "YYYY-MM-DD description amount" or any pattern you expect
    const m = line.match(/(\d{4}-\d{2}-\d{2})\s+(.+?)\s+([0-9,]+\.\d{2})$/);
    if (m) {
      txns.push({
        date: m[1],
        description: m[2],
        amount: parseFloat(m[3].replace(/,/g,'')),
      });
    }
  }
  return txns;
}

async function parseFileAndCategorize(file) {
  const ext = file.originalname.split('.').pop().toLowerCase();
  let parsed = [];
  if (ext === 'csv') parsed = await parseCSV(file.path);
  else if (ext === 'pdf') parsed = await parsePDF(file.path);
  else throw new Error('Unsupported file type');
  // send descriptions in batch to AI for categorization
  // prepare descriptions array
  const descriptions = parsed.map((p, idx) => ({ id: idx, text: p.description || '' }));
  const aiResults = await aiService.categorizeTransactions(descriptions);
  // aiResults should be keyed by id with category/confidence
  const mapped = parsed.map((p, idx) => {
    const ai = aiResults[idx] || {};
    return {
      date: p.date,
      description: p.description,
      amount: p.amount,
      category: ai.category || 'Other',
      isRecurring: ai.isRecurring || false
    };
  });
  return mapped;
}

module.exports = { parseFileAndCategorize };
