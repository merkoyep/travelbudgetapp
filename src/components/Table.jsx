import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className='table-auto p-2'>
      <table>
        <thead>
          {showBudget ? (
            <tr className='text-center'>
              {['Name', 'Amount', 'Date', 'Budget', 'Delete'].map(
                (i, index) => (
                  <th key={index} className='px-10 py-2'>
                    {i}
                  </th>
                )
              )}
            </tr>
          ) : (
            <tr className='text-center'>
              {['Name', 'Amount', 'Date', 'Delete'].map((i, index) => (
                <th key={index} className='px-10 py-2'>
                  {i}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
