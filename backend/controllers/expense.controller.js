const expenseService = require('../services/expense.service');
const parseService = require('../services/parse.service');
const excelExporter = require('../services/export.service');

exports.list = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };
    const expenses = await expenseService.listExpenses(req.user.id, filters);
    res.json(expenses);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const payload = {
      date: req.body.date,
      description: req.body.description,
      amount: parseFloat(req.body.amount),
      category: req.body.category,
      isRecurring: req.body.isRecurring || false,
      type: req.body.type || 'expense'
    };
    const expense = await expenseService.addExpense(req.user.id, payload);
    res.status(201).json(expense);
  } catch (err) { next(err); }
};

exports.upload = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });
    const parsedTxns = await parseService.parseFileAndCategorize(file);
    const created = await expenseService.bulkCreateFromParsed(req.user.id, parsedTxns);
    res.status(201).json({ createdCount: created.length, items: created });
  } catch (err) { next(err); }
};

exports.extractReceipt = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No receipt image uploaded' });
    
    const ocrService = require('../services/ocr.service');
    const extractedData = await ocrService.extractReceiptData(file);
    res.json(extractedData);
  } catch (err) { next(err); }
};

exports.export = async (req, res, next) => {
  try {
    const format = req.query.format || 'xlsx';
    const filters = { 
      category: req.query.category, 
      dateFrom: req.query.dateFrom, 
      dateTo: req.query.dateTo 
    };
    const expenses = await expenseService.listExpenses(req.user.id, filters);
    
    if (format === 'csv') {
      const csvStream = await excelExporter.exportToCSV(expenses);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
      csvStream.pipe(res);
    } else {
      const buffer = await excelExporter.exportToXLSX(expenses);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="expenses.xlsx"');
      res.send(buffer);
    }
  } catch (err) { next(err); }
};
