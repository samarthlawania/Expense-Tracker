const ExcelJS = require('exceljs');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

async function exportToXLSX(expenses) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Expenses');
  sheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Description', key: 'description', width: 40 },
    { header: 'Amount', key: 'amount', width: 15 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Recurring', key: 'isRecurring', width: 10 }
  ];
  expenses.forEach(e => {
    sheet.addRow({
      date: e.date,
      description: e.description,
      amount: e.amount,
      category: e.category,
      isRecurring: e.isRecurring ? 'Yes' : 'No'
    });
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

async function exportToCSV(expenses) {
  const csvStringifier = createCsvWriter({
    header: [
      { id: 'date', title: 'Date' },
      { id: 'description', title: 'Description' },
      { id: 'amount', title: 'Amount' },
      { id: 'category', title: 'Category' },
      { id: 'isRecurring', title: 'Recurring' }
    ]
  });
  const records = expenses.map(e => ({
    date: e.date,
    description: e.description,
    amount: e.amount,
    category: e.category,
    isRecurring: e.isRecurring ? 'Yes' : 'No'
  }));
  const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  const readable = require('stream').Readable();
  readable._read = () => {};
  readable.push(csv);
  readable.push(null);
  return readable;
}

module.exports = { exportToXLSX, exportToCSV };
