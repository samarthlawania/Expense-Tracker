const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.extractReceiptData = async (file) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const imageBuffer = fs.readFileSync(file.path);
    const base64Image = imageBuffer.toString('base64');
    
    const prompt = "Extract the following information from this receipt image and return as JSON: amount (number), description (string), date (YYYY-MM-DD format), category (one of: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Health & Fitness, Travel, Education, Other). If any field cannot be determined, omit it from the response.";
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      }
    ]);
    
    const content = result.response.text();
    
    // Clean up uploaded file
    fs.unlinkSync(file.path);
    
    try {
      return JSON.parse(content);
    } catch (e) {
      const match = content.match(/(\{[\s\S]*\})/);
      return match ? JSON.parse(match[1]) : {};
    }
  } catch (error) {
    console.error('OCR extraction error:', error);
    // Clean up file on error
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    return {};
  }
};