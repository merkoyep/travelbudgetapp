// loader
import { Link, useLoaderData } from 'react-router-dom';
import { fetchData, createBudget, createExpense, deleteItem } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm.jsx';
import BudgetItem from '../components/BudgetItem.jsx';
import Table from '../components/Table.jsx';

import { toast } from 'react-toastify';

export function dashboardLoader() {
  //This is where the username needs to be passed in.
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error('There was a problem creating your account.');
    }
  }
  // If action is equal to a string, a helper function is called from helpers.js to add to db.
  if (_action === 'createBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success('Budget created!');
    } catch (e) {
      throw new Error('There was a Problem creating your budget');
    }
  }
  if (_action === 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success('Expense added!');
    } catch (e) {
      throw new Error('There was a problem adding your expense.');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Expense deleted.');
    } catch (e) {
      throw new Error('There was a problem deleting your expense.');
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div className='pl-2'>
      {userName ? (
        <div>
          <h1 className='text-5xl py-3 pl-2 underline text-green-300'>
            Welcome {userName}
          </h1>
          {budgets && budgets.length > 0 ? (
            <div>
              <div>
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
              <div className='budgets'>
                {budgets.map((budget) => (
                  <BudgetItem key={budget.id} budget={budget} />
                ))}
              </div>
              {expenses && expenses.length > 0 && (
                <div>
                  <h2>Recent Expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 8)}
                  />
                  {expenses.length > 8 && (
                    <Link to='expenses'>View all Expenses</Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>Let's get budgeting! Add your first budget now.</p>
              <AddBudgetForm />
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};
export default Dashboard;
