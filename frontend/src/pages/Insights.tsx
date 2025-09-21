import { useState, useEffect } from "react";
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
import { api } from "../services/api";

export const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInsights = async () => {
    try {
      const data = await api.getInsights();
      console.log('Insights data:', data);
      setInsights(data.insights);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInsights();
  };
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
        <Button variant="outline" className="space-x-2" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Insights'}</span>
        </Button>
      </div>

      {/* AI Insights */}
      {loading ? (
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="text-center py-8 text-muted-foreground">
              Loading insights...
            </div>
          </CardContent>
        </Card>
      ) : insights ? (
        <div className="space-y-6">
          {/* Top Categories */}
          {insights.topCategories && (
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Top Spending Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.topCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline">{category.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recurring Subscriptions */}
          {insights.recurringSubscriptions && (
            <Card className="card-gradient border-warning/20 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Recurring Subscriptions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.recurringSubscriptions.map((sub, index) => (
                    <div key={index} className="text-sm">
                      {sub}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {insights.suggestions && (
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>AI Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights.suggestions.map((suggestion, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {suggestion}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="text-center py-8 text-muted-foreground">
              No insights available. Add some expenses to get AI-powered insights.
            </div>
          </CardContent>
        </Card>
      )}



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