import { useLoaderData } from 'react-router-dom';
import { deleteItem, fetchData } from '../helpers';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export async function expensesLoader() {
  const expenses = fetchData('expenses');
  return { expenses };
}

export async function expensesAction({ request }) {
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
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-5xl text-center py-3 pl-2 underline text-black'>
        All Expenses
      </h1>
      {expenses && expenses.length > 0 ? (
        <div className='flex flex-col items-center border rounded-md p-5'>
          <h2 className='text-xl font-bold'>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>Nothing to show.</p>
      )}
    </div>
  );
};
export default ExpensesPage;
