import { Form, Link } from 'react-router-dom';
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercent,
} from '../helpers';
import { BanknotesIcon } from '@heroicons/react/24/solid';

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className='budget' style={{ '--accent': color }}>
      <div>
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercent(spent / amount)}
      </progress>
      <div>
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)}</small>
      </div>
      {showDelete ? (
        <Form>
          <p>Hi</p>
        </Form>
      ) : (
        <Form>
          <Link to={`budget/${id}`}>
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </Form>
      )}
    </div>
  );
};
export default BudgetItem;
