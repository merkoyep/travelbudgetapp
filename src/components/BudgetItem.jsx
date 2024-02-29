import { Form, Link } from 'react-router-dom';
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercent,
} from '../helpers';
import { BanknotesIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({ budget, dashboard }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div
      id='budget'
      className='border p-3 rounded-md shadow-md'
      style={{ '--accent': color }}
    >
      <div className='flex flex-col gap-2 pb-2'>
        <h3 className='text-center text-lg'>{name} Spending</h3>
        <progress max={amount} value={spent} className='w-full'>
          {formatPercent(spent / amount)}
        </progress>
        <p className='text-sm text-center'>
          Budget:
          <span className='font-semibold'>{formatCurrency(amount)}</span>
        </p>
        {spent > amount ? (
          <div className='flex flex-col'>
            <small>
              <span className='text-red-600 font-bold'>
                {formatCurrency(spent)}
              </span>{' '}
              spent
            </small>
            <small className='font-bold text-red-600 underline decoration-double decoration-red-600'>
              {formatCurrency(amount - spent)} remaining
            </small>
          </div>
        ) : (
          <div className='flex flex-col'>
            <small>{formatCurrency(spent)} spent</small>
            <small>{formatCurrency(amount - spent)} remaining</small>
          </div>
        )}
      </div>
      {dashboard ? (
        <Form>
          <Link
            to={`budget/${id}`}
            className='flex items-center justify-center border rounded-md hover:bg-green-300 hover:text-white'
          >
            <BanknotesIcon width={20} />
            <span>View Spending</span>
          </Link>
        </Form>
      ) : (
        ''
      )}
    </div>
  );
};
export default BudgetItem;
