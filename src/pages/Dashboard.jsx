// loader
import { Link, useLoaderData } from 'react-router-dom';
import { fetchData, createBudget, createExpense, deleteItem } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm.jsx';
import BudgetItem from '../components/BudgetItem.jsx';
import Table from '../components/Table.jsx';

import { toast } from 'react-toastify';
import { useState } from 'react';

export function dashboardLoader() {
  //Uses fetchData helper to get data from localstorage
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // _action is the name of a hidden form field for each form. Replacing an OnSubmit callback
  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Time to budget for ${values.userName}!`);
    } catch (e) {
      throw new Error('There was a problem creating your account.');
    }
  }

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
  const { userName, budgets, expenses: loadedExpenses } = useLoaderData();
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const expenses = loadedExpenses || [];
  const displayedExpenses = showAllExpenses
    ? expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0) // Show first 5 expenses
    : expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5); // Show all expenses

  return (
    <div className='flex flex-col items-center pl-2'>
      {userName ? (
        <div className='flex flex-col align-items-center '>
          <h1 className='text-5xl text-center font-medium py-3 pl-2 my-2 underline underline-offset-4 text-black'>
            Lets go to
            <span className='text-green-500'> {userName}</span>!
          </h1>
          {budgets && budgets.length > 0 ? (
            <div>
              <div className='flex flex-col items-center gap-2'>
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
              <div className='border rounded-md p-2 my-3'>
                <h2 className='text-center font-bold text-lg p-5'>
                  Budget Areas
                </h2>
                <div className='grid place-content-evenly grid-cols-3 gap-2'>
                  {budgets.map((budget) => (
                    <BudgetItem
                      key={budget.id}
                      budget={budget}
                      dashboard={true}
                    />
                  ))}
                </div>
              </div>

              {expenses.length > 0 ? (
                <div className='border rounded-md py-5 px-2 mb-4'>
                  <h1 className='text-center text-xl font-bold'>
                    Recent Expenses
                  </h1>
                  <Table expenses={displayedExpenses} />
                  <div className='flex justify-center gap-5'>
                    <Link
                      to='expenses'
                      className='border p-2 rounded-md hover:bg-green-300 hover:text-white'
                    >
                      View all Expenses
                    </Link>
                    {expenses.length > 5 ? (
                      <button
                        onClick={() => setShowAllExpenses(!showAllExpenses)}
                        className='border p-2 rounded-md hover:bg-green-300 hover:text-white'
                      >
                        {showAllExpenses
                          ? 'Hide Expenses'
                          : 'Show Older Expenses'}
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div>
              <p className='text-center my-5'>
                Let's get budgeting! Add your first budget now.
              </p>
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
