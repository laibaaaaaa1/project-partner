import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Trash2, DollarSign, TrendingUp, Edit2, RefreshCw, Receipt, Loader2 } from 'lucide-react';
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
import { useExchangeRates, convertCurrency } from '@/hooks/useExchangeRates';
import { ExpenseCategory, expenseCategoryConfig, Expense } from '@/types/trip';
import { currencies, formatCurrency } from '@/lib/currency';
import { ReceiptUpload } from './ReceiptUpload';
import { cn } from '@/lib/utils';

interface BudgetTrackerProps {
  tripId: string;
  totalBudget?: number;
  currency?: string;
}

export function BudgetTracker({ tripId, totalBudget = 0, currency = 'USD' }: BudgetTrackerProps) {
  const { data: expenses = [], isLoading } = useExpenses(tripId);
  const { data: ratesData, isLoading: isLoadingRates, refetch: refetchRates } = useExchangeRates(currency);
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
    receipt_url: '',
  });

  const rates = ratesData?.rates || {};
  const ratesSource = ratesData?.source || 'fallback';

  // Calculate totals with live currency conversion
  const { totalSpentInBaseCurrency, expensesByCategory } = useMemo(() => {
    let total = 0;
    const byCategory: Record<string, number> = {};

    expenses.forEach((exp) => {
      const convertedAmount = Object.keys(rates).length > 0
        ? convertCurrency(Number(exp.amount), exp.currency || 'USD', currency, rates)
        : Number(exp.amount);
      
      total += convertedAmount;
      
      const cat = exp.category;
      byCategory[cat] = (byCategory[cat] || 0) + convertedAmount;
    });

    return { totalSpentInBaseCurrency: total, expensesByCategory: byCategory };
  }, [expenses, currency, rates]);

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
      receipt_url: newExpense.receipt_url || undefined,
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
      receipt_url: newExpense.receipt_url || undefined,
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
      receipt_url: expense.receipt_url || '',
    });
  };

  const resetForm = () => {
    setNewExpense({
      category: 'other',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      currency: currency,
      receipt_url: '',
    });
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
      <div className="space-y-2">
        <Label>Receipt (optional)</Label>
        <ReceiptUpload
          tripId={tripId}
          expenseId={isEdit ? editingExpense?.id : undefined}
          currentReceiptUrl={newExpense.receipt_url}
          onUploadComplete={(url) => setNewExpense({ ...newExpense, receipt_url: url })}
          onRemove={() => setNewExpense({ ...newExpense, receipt_url: '' })}
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
              <p className="text-2xl font-bold">{formatCurrency(totalBudget, currency)}</p>
            </div>
            <DollarSign className="h-10 w-10 opacity-50" />
          </div>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent (converted to {currency})</span>
            <span className="font-medium">{formatCurrency(totalSpentInBaseCurrency, currency)}</span>
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
              {formatCurrency(remaining, currency)}
            </span>
          </div>
          {expenses.some(exp => exp.currency !== currency) && (
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
              <div className="flex items-center gap-2">
                {isLoadingRates ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
                <span>
                  {ratesSource === 'live' 
                    ? `Live rates from ${ratesData?.timestamp ? new Date(ratesData.timestamp).toLocaleTimeString() : 'API'}`
                    : 'Using approximate exchange rates'
                  }
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => refetchRates()}
                disabled={isLoadingRates}
              >
                Refresh
              </Button>
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
                    formatter={(value: number) => formatCurrency(value, currency)}
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
                const config = expenseCategoryConfig[expense.category as ExpenseCategory];
                const isMultiCurrency = expense.currency !== currency;
                const convertedAmount = Object.keys(rates).length > 0
                  ? convertCurrency(Number(expense.amount), expense.currency || 'USD', currency, rates)
                  : Number(expense.amount);

                return (
                  <div 
                    key={expense.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{config?.emoji || '📦'}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {expense.description || config?.label}
                          </p>
                          {expense.receipt_url && (
                            <a 
                              href={expense.receipt_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-teal hover:text-teal-dark"
                            >
                              <Receipt className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
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
                            ≈ {formatCurrency(convertedAmount, currency)}
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
