import { useLoaderData } from 'react-router-dom';
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  });

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-5xl text-center py-3 pl-2 underline text-black'>
        <span className='italic'>{budget.name}</span> Overview{' '}
      </h1>
      <div className='flex flex-col gap-5'>
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />

        {expenses && expenses.length > 0 && (
          <div className='flex flex-col border rounded-md py-5 px-2 mb-4'>
            <h2 className='text-center text-xl text-bold'>
              {budget.name} Expenses
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </div>
  );
};
export default BudgetPage;
