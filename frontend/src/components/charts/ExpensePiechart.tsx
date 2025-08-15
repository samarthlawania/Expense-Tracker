import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { categorySpending } from "../../data/dummyData";

const COLORS = [
  'hsl(158, 64%, 52%)', // Primary teal
  'hsl(142, 76%, 36%)', // Success green
  'hsl(45, 93%, 58%)',  // Warning yellow
  'hsl(215, 25%, 17%)', // Dark gray
  'hsl(158, 64%, 70%)', // Light teal
  'hsl(220, 14%, 96%)'  // Light gray
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const ExpensePieChart = () => {
  return (
    <Card className="card-gradient fade-in">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySpending}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};