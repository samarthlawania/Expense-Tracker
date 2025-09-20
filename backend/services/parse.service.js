exports.parseFileAndCategorize = async (file) => {
  // Mock implementation - returns sample parsed data
  return [
    {
      date: new Date().toISOString().split('T')[0],
      description: 'Parsed transaction from file',
      amount: 25.99,
      category: 'Shopping',
      type: 'expense'
    }
  ];
};