import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Lightbulb, 
  TrendingUp, 
  Trophy, 
  AlertTriangle,
  Brain,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { aiInsights, budgetAlerts } from "../data/dummyData";

export const Insights = () => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return Lightbulb;
      case 'achievement':
        return Trophy;
      case 'alert':
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'text-primary';
      case 'achievement':
        return 'text-success';
      case 'alert':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'danger':
        return 'destructive';
      case 'warning':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Brain className="h-8 w-8 text-primary" />
            <span>AI Insights</span>
          </h1>
          <p className="text-muted-foreground">
            Personalized financial insights and recommendations powered by AI.
          </p>
        </div>
        <Button variant="outline" className="space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Insights</span>
        </Button>
      </div>

      {/* Budget Alerts */}
      <Card className="card-gradient border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            <span>Budget Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {budgetAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-lg border border-warning/20 bg-background p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{alert.category}</span>
                    <Badge variant={getAlertVariant(alert.type)}>
                      {alert.percentage}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.message}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const iconColor = getInsightColor(insight.type);
          
          return (
            <Card key={insight.id} className="card-gradient fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <span>{insight.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {insight.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(insight.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Features Preview */}
      <Card className="card-gradient border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span>Coming Soon: Advanced AI Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>Predictive Analytics</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                AI will predict your future spending patterns and suggest budget adjustments.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Smart Categorization</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Automatic expense categorization using machine learning algorithms.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                <span>Personalized Recommendations</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Get tailored advice based on your unique spending habits and goals.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-success" />
                <span>Goal Tracking</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                AI-powered goal setting and progress tracking for your financial objectives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};