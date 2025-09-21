import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { 
  LayoutDashboard, 
  Plus, 
  Receipt, 
  Brain, 
  LogOut,
  CreditCard 
} from "lucide-react";

export const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">ExpenseAI</span>
          </div>
          
          <nav className="ml-8 flex space-x-6">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/add-expense" 
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              <span>Add Expense</span>
            </Link>
            <Link 
              to="/expenses" 
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Receipt className="h-4 w-4" />
              <span>Expenses</span>
            </Link>
            <Link 
              to="/insights" 
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Brain className="h-4 w-4" />
              <span>Insights</span>
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};