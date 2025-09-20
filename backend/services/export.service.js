const ExcelJS = require('exceljs');
const { Readable } = require('stream');

exports.exportToXLSX = async (expenses) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Expenses');
  
  worksheet.columns = [
    { header: 'Date', key: 'date', width: 12 },
    { header: 'Description', key: 'description', width: 30 },
    { header: 'Category', key: 'category', width: 15 },
    { header: 'Type', key: 'type', width: 10 },
    { header: 'Amount', key: 'amount', width: 12 }
  ];
  
  expenses.forEach(expense => {
    worksheet.addRow({
      date: expense.date,
      description: expense.description,
      category: expense.category,
      type: expense.type,
      amount: parseFloat(expense.amount)
    });
  });
  
  return await workbook.xlsx.writeBuffer();
};

exports.exportToCSV = async (expenses) => {
  const csvData = [
    'Date,Description,Category,Type,Amount',
    ...expenses.map(expense => 
      `${expense.date},"${expense.description}",${expense.category},${expense.type},${expense.amount}`
    )
  ].join('\n');
  
  return Readable.from([csvData]);
};