const nodemailer = require('nodemailer');
const { User } = require('../models');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendBudgetAlert(userId, budget, totalSpent) {
  const user = await User.findByPk(userId);
  if (!user) return;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `Budget exceeded for ${budget.month}/${budget.year}`,
    text: `Hi ${user.name},\n\nYour budget of ${budget.amount} for ${budget.month}/${budget.year} has been exceeded. Total spent: ${totalSpent}.\n\nRegards,\nSmart Expense Tracker`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendBudgetAlert };
