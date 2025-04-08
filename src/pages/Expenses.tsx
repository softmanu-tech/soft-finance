import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Filter, MoreVertical, Trash2, Edit, Tag } from 'lucide-react';
import { AddExpenseForm } from '@/components/Expenses/AddExpenseForm';
import { EditExpenseForm } from '@/components/Expenses/EditExpenseForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const expenses = [
  { 
    id: 1, 
    name: "Groceries", 
    category: "Food & Supplies", 
    amount: 78.35, 
    date: "2023-09-15" 
  },
  { 
    id: 2, 
    name: "Electricity Bill", 
    category: "Utilities", 
    amount: 120.50, 
    date: "2023-09-10" 
  },
  { 
    id: 3, 
    name: "Movie Tickets", 
    category: "Entertainment", 
    amount: 32.00, 
    date: "2023-09-08" 
  },
  { 
    id: 4, 
    name: "Gas", 
    category: "Transportation", 
    amount: 45.25, 
    date: "2023-09-05" 
  },
  { 
    id: 5, 
    name: "Dinner", 
    category: "Food & Drinks", 
    amount: 65.80, 
    date: "2023-09-02" 
  },
  { 
    id: 6, 
    name: "Internet", 
    category: "Utilities", 
    amount: 79.99, 
    date: "2023-08-28" 
  },
  { 
    id: 7, 
    name: "Clothing", 
    category: "Shopping", 
    amount: 120.45, 
    date: "2023-08-25" 
  },
];

const categories = [
  "All Categories",
  "Food & Supplies", 
  "Utilities", 
  "Entertainment", 
  "Transportation", 
  "Food & Drinks", 
  "Shopping", 
  "Healthcare",
  "Education",
  "Other"
];

const Expenses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<typeof expenses[0] | null>(null);
  
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || 
      expense.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEditExpense = (expense: typeof expenses[0]) => {
    setSelectedExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleDeleteExpense = (expense: typeof expenses[0]) => {
    setSelectedExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteExpense = () => {
    if (selectedExpense) {
      console.log(`Deleting expense with id: ${selectedExpense.id}`);
      toast({
        title: "Success",
        description: `Expense "${selectedExpense.name}" deleted successfully`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-cinzel">Expenses</h2>
            <p className="text-muted-foreground font-rowdies">Track and manage your spending</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="finance-gradient text-white font-lobster text-lg">
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-cinzel text-xl">Add New Expense</DialogTitle>
                <DialogDescription className="font-rowdies">
                  Track your spending by adding your expenses here.
                </DialogDescription>
              </DialogHeader>
              <AddExpenseForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-cinzel">Expense History</CardTitle>
            <CardDescription className="font-rowdies">
              View, filter, and manage your recent expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-cinzel">Name</TableHead>
                    <TableHead className="font-cinzel">Category</TableHead>
                    <TableHead className="text-right font-cinzel">Amount</TableHead>
                    <TableHead className="font-cinzel">Date</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium font-lobster">{expense.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Tag className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="font-rowdies text-sm">{expense.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-lobster">${expense.amount.toFixed(2)}</TableCell>
                        <TableCell className="font-rowdies text-sm">{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="font-cinzel">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditExpense(expense)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteExpense(expense)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground font-rowdies">
                        No expenses found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Expense Dialog */}
        {selectedExpense && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-cinzel text-xl">Edit Expense</DialogTitle>
                <DialogDescription className="font-rowdies">
                  Make changes to your expense details.
                </DialogDescription>
              </DialogHeader>
              <EditExpenseForm 
                expense={selectedExpense} 
                onClose={() => setIsEditDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-cinzel text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="font-rowdies">
                This will permanently delete the expense "{selectedExpense?.name}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-rowdies">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteExpense}
                className="bg-red-600 hover:bg-red-700 font-lobster"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Expenses;
