import { useFetcher } from 'react-router-dom';
import { useRef } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  return (
    <div className='w-full shadow-md border rounded-md gap-3 p-5 gap'>
      <h2 className='text-center text-lg font-semibold'>
        Add New{' '}
        <span>
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)} `}
        </span>
        Expense
      </h2>
      <fetcher.Form method='post' ref={formRef}>
        <div className='flex gap-2'>
          <label htmlFor='newExpense'>Expense Name</label>
          <input
            type='text'
            name='newExpense'
            id='newExpense'
            placeholder='e.g., Coffee'
            ref={focusRef}
            required
            className='border'
          />
        </div>
        <div>
          <label htmlFor='newExpenseAmount'>Expense Amount</label>
          <input
            type='number'
            step='0.01'
            inputMode='decimal'
            name='newExpenseAmount'
            id='newExpenseAmount'
            placeholder='e.g. $5.00'
            required
          />
        </div>
        <div hidden={budgets.length === 1}>
          <label htmlFor='newExpenseBudget'>Budget Category</label>
          <select name='newExpenseBudget' id='newExpenseBudget' required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type='hidden' name='_action' value='createExpense' />
        <button type='submit'>
          <PlusCircleIcon width={20} />
          Add Expense
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;
