import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Trash2, DollarSign, TrendingUp, Edit2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExpenses, useCreateExpense, useUpdateExpense, useDeleteExpense } from '@/hooks/useTrips';
import { ExpenseCategory, expenseCategoryConfig, Expense } from '@/types/trip';
import { cn } from '@/lib/utils';

interface BudgetTrackerProps {
  tripId: string;
  totalBudget?: number;
  currency?: string;
}

// Exchange rates relative to USD (approximate rates)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1320.50,
  SGD: 1.34,
  THB: 35.50,
  NZD: 1.64,
  PKR: 278.50,
};

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
];

const getCurrencySymbol = (code: string) => {
  return currencies.find(c => c.code === code)?.symbol || code;
};

// Convert amount from one currency to another
const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

export function BudgetTracker({ tripId, totalBudget = 0, currency = 'USD' }: BudgetTrackerProps) {
  const { data: expenses = [], isLoading } = useExpenses(tripId);
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState({
    category: 'other' as ExpenseCategory,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    currency: currency,
  });

  // Calculate totals with currency conversion
  const { totalSpentInBaseCurrency, expensesByCategory } = useMemo(() => {
    let total = 0;
    const byCategory: Record<string, number> = {};

    expenses.forEach((exp) => {
      const convertedAmount = convertCurrency(
        Number(exp.amount),
        exp.currency || 'USD',
        currency
      );
      total += convertedAmount;
      
      const cat = exp.category;
      byCategory[cat] = (byCategory[cat] || 0) + convertedAmount;
    });

    return { totalSpentInBaseCurrency: total, expensesByCategory: byCategory };
  }, [expenses, currency]);

  const remaining = totalBudget - totalSpentInBaseCurrency;
  const percentUsed = totalBudget > 0 ? (totalSpentInBaseCurrency / totalBudget) * 100 : 0;

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: expenseCategoryConfig[category as ExpenseCategory]?.label || category,
    value: amount,
    color: expenseCategoryConfig[category as ExpenseCategory]?.color || 'hsl(var(--muted))',
  }));

  const handleAddExpense = async () => {
    if (!newExpense.amount || !newExpense.category) return;

    await createExpense.mutateAsync({
      trip_id: tripId,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      currency: newExpense.currency,
      description: newExpense.description,
      date: newExpense.date,
    });

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleUpdateExpense = async () => {
    if (!editingExpense || !newExpense.amount || !newExpense.category) return;

    await updateExpense.mutateAsync({
      id: editingExpense.id,
      tripId,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      currency: newExpense.currency,
      description: newExpense.description,
      date: newExpense.date,
    });

    resetForm();
    setEditingExpense(null);
  };

  const openEditDialog = (expense: Expense) => {
    setEditingExpense(expense);
    setNewExpense({
      category: expense.category as ExpenseCategory,
      amount: String(expense.amount),
      description: expense.description || '',
      date: expense.date,
      currency: expense.currency || currency,
    });
  };

  const resetForm = () => {
    setNewExpense({
      category: 'other',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      currency: currency,
    });
  };

  const formatCurrency = (amount: number, currencyCode: string = currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const ExpenseForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={newExpense.category}
          onValueChange={(value) => setNewExpense({ ...newExpense, category: value as ExpenseCategory })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(expenseCategoryConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.emoji} {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select
            value={newExpense.currency}
            onValueChange={(value) => setNewExpense({ ...newExpense, currency: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description (optional)</Label>
        <Input
          placeholder="What was this for?"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        />
      </div>
      <Button
        className="w-full bg-teal hover:bg-teal-dark"
        onClick={isEdit ? handleUpdateExpense : handleAddExpense}
        disabled={isEdit ? updateExpense.isPending : createExpense.isPending}
      >
        {isEdit 
          ? (updateExpense.isPending ? 'Updating...' : 'Update Expense')
          : (createExpense.isPending ? 'Adding...' : 'Add Expense')
        }
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Budget Overview Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-ocean p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
            <DollarSign className="h-10 w-10 opacity-50" />
          </div>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent (converted to {currency})</span>
            <span className="font-medium">{formatCurrency(totalSpentInBaseCurrency)}</span>
          </div>
          <Progress 
            value={Math.min(percentUsed, 100)} 
            className={cn(
              "h-3",
              percentUsed > 90 ? "[&>div]:bg-destructive" : 
              percentUsed > 70 ? "[&>div]:bg-golden" : 
              "[&>div]:bg-teal"
            )}
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className={cn(
              "font-medium",
              remaining < 0 ? "text-destructive" : "text-teal-dark"
            )}>
              {formatCurrency(remaining)}
            </span>
          </div>
          {expenses.some(exp => exp.currency !== currency) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
              <RefreshCw className="h-3 w-3" />
              <span>Amounts converted to {currency} using approximate exchange rates</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spending Breakdown */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal" />
              Spending Breakdown ({currency})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Expenses */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Expenses</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1 bg-teal hover:bg-teal-dark text-white">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Expense</DialogTitle>
                </DialogHeader>
                <ExpenseForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : expenses.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No expenses yet. Start tracking!
            </p>
          ) : (
            <div className="space-y-2">
              {expenses.slice(0, 10).map((expense) => {
                const config = expenseCategoryConfig[expense.category];
                const isMultiCurrency = expense.currency !== currency;
                const convertedAmount = convertCurrency(
                  Number(expense.amount),
                  expense.currency || 'USD',
                  currency
                );

                return (
                  <div 
                    key={expense.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{config?.emoji || '📦'}</span>
                      <div>
                        <p className="font-medium text-sm">
                          {expense.description || config?.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="font-semibold text-sm block">
                          {formatCurrency(expense.amount, expense.currency || currency)}
                        </span>
                        {isMultiCurrency && (
                          <span className="text-xs text-muted-foreground">
                            ≈ {formatCurrency(convertedAmount)}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => openEditDialog(expense)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteExpense.mutate({ id: expense.id, tripId })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Expense Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <ExpenseForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
}
