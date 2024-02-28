import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Form } from 'react-router-dom';

const AddBudgetForm = () => {
  return (
    <div className='w-full border rounded-md gap-3 p-5 gap shadow-md'>
      <h2 className='text-center text-lg font-semibold'>Create Budget</h2>
      <Form method='post' className='flex flex-col pt-3'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='newBudget' className='flex place-content-between'>
            Budget Name
            <input
              type='text'
              name='newBudget'
              id='newBudget'
              placeholder='e.g., Flights'
              className='border rounded-sm'
              required
            ></input>
          </label>
          <label
            htmlFor='newBudgetAmount'
            className='flex place-content-between gap-2'
          >
            New Budget Amount
            <input
              type='number'
              step='0.01'
              name='newBudgetAmount'
              id='newBudgetAmount'
              placeholder='$350'
              required
              inputMode='decimal'
              className='border rounded-sm'
            ></input>
          </label>
        </div>
        {/* create a hidden input that would pass a value to the parent to store form data */}
        <input type='hidden' name='_action' value='createBudget' />
        <button
          type='submit'
          className='flex self-end items-center border mt-2 p-1 rounded-md'
        >
          <CurrencyDollarIcon width={20} />
          Create Budget
        </button>
      </Form>
    </div>
  );
};
export default AddBudgetForm;
