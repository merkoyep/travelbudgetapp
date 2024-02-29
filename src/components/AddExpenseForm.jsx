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
      <fetcher.Form method='post' ref={formRef} className='flex flex-col'>
        <div
          hidden={budgets.length === 1}
          className='flex place-content-between gap-2 my-2'
        >
          <label htmlFor='newExpenseBudget'>Budget Category</label>
          <select
            name='newExpenseBudget'
            id='newExpenseBudget'
            className='border p-1'
            required
          >
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
        <div className='flex place-content-between gap-2 my-2'>
          <label htmlFor='newExpense'>Expense Name</label>
          <input
            type='text'
            name='newExpense'
            id='newExpense'
            placeholder='e.g., Coffee'
            ref={focusRef}
            required
            className='border p-1'
          />
        </div>
        <div className='flex place-content-between gap-2 my-2'>
          <label htmlFor='newExpenseAmount'>Expense Amount</label>
          <input
            type='number'
            step='0.01'
            inputMode='decimal'
            name='newExpenseAmount'
            id='newExpenseAmount'
            placeholder='e.g. $5.00'
            className='border p-1'
            required
          />
        </div>

        <input type='hidden' name='_action' value='createExpense' />
        <button
          type='submit'
          className='flex self-end items-center border mt-2 p-2 rounded-md hover:bg-green-300 hover:text-white'
        >
          <PlusCircleIcon width={20} />
          Add Expense
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;
