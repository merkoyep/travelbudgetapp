const generateRandomColor = () => {
  const existingBudgetLength = fetchData('budgets')?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};
// Local Storage functions
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Get items from storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};
//delete item
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const createBudget = ({ name, amount }) => {
  // takes form data and stores it in local storage
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData('budgets') ?? [];
  return localStorage.setItem(
    'budgets',
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData('expenses') ?? [];
  return localStorage.setItem(
    'expenses',
    JSON.stringify([...existingExpenses, newItem])
  );
};

//spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData('expenses') ?? [];
  const budgetSpent = expenses.reduce((accumulator, expense) => {
    // check expense matches budget
    if (expense.budgetId !== budgetId) return accumulator;

    // add expense to accumulator
    return (accumulator += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
//Format Currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

//Format Precentage

export const formatPercent = (amount) => {
  return amount.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};

// Format Dates
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
