import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Search, Download, Filter, Plus } from "lucide-react";
import { dummyExpenses, categories } from "../data/dummyData";
import { Link } from "react-router-dom";

export const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter expenses based on search and filters
  const filteredExpenses = dummyExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    const matchesType = typeFilter === "all" || expense.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(expense => [
        expense.date,
        `"${expense.description}"`,
        expense.category,
        expense.type,
        expense.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage all your financial transactions.
          </p>
        </div>
        <Button asChild className="primary-gradient">
          <Link to="/add-expense">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>
            Transactions ({filteredExpenses.length} results)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found matching your criteria.
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{expense.description}</h4>
                      <Badge
                        variant={expense.type === 'income' ? 'default' : 'secondary'}
                        className={expense.type === 'income' ? 'success-gradient text-white' : ''}
                      >
                        {expense.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{expense.category}</span>
                      <span>•</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${
                    expense.type === 'income' 
                      ? 'text-success' 
                      : 'text-foreground'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};