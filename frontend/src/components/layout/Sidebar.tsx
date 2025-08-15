import { NavLink } from "react-router-dom";
import { cn } from "../../utils/utils";
import {
  LayoutDashboard,
  Plus,
  Receipt,
  AlertCircle,
  CreditCard,
  PieChart,
  X
} from "lucide-react";
import { Button } from "../../components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Expense",
    href: "/add-expense",
    icon: Plus,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    name: "Insights",
    href: "/insights",
    icon: PieChart,
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: AlertCircle,
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <CreditCard className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">ExpenseAI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )
                }
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="text-xs text-sidebar-foreground/60">
              Smart Expense Tracker v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};