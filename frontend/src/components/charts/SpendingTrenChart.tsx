import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { monthlyTrends } from "../../data/dummyData";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingTrendChart = () => {
  return (
    <Card className="card-gradient fade-in">
      <CardHeader>
        <CardTitle>Monthly Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(215, 16%, 47%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(215, 16%, 47%)"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(158, 64%, 52%)"
                strokeWidth={3}
                dot={{ fill: "hsl(158, 64%, 52%)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(158, 64%, 52%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};