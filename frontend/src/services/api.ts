const API_BASE_URL =  'https://expense-tracker-gamma-coral.vercel.app/api'; // Replace with your backend URL


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  // Expense endpoints
  getExpenses: async (filters?: { category?: string; dateFrom?: string; dateTo?: string }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    
    const queryString = params.toString();
    const url = queryString ? `${API_BASE_URL}/expenses?${queryString}` : `${API_BASE_URL}/expenses`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Session expired. Please login again.');
    }
    
    return response.json();
  },

  createExpense: async (expense: {
    date: string;
    description: string;
    amount: number;
    category: string;
    type: 'expense' | 'income';
    isRecurring?: boolean;
  }) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(expense)
    });
    return response.json();
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/expenses/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return response.json();
  },

  // Budget endpoints
  getBudget: async (month: number, year: number) => {
    const response = await fetch(`${API_BASE_URL}/budget?month=${month}&year=${year}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  setBudget: async (month: number, year: number, amount: number) => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ month, year, amount })
    });
    return response.json();
  },

  // Insights endpoint
  getInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/insights`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Alerts endpoint
  getAlerts: async () => {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // OCR endpoint for receipt processing
  extractReceiptData: async (file: File) => {
    const formData = new FormData();
    formData.append('receipt', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/expenses/extract-receipt`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return response.json();
  }
};