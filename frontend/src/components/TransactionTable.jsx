import React from 'react';

const TransactionTable = ({ transactions, onDelete }) => {
  if (!transactions.length) {
    return <p>No transactions found for this filter.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const net = totalIncome - totalExpense;

  return (
    <div className="card">
      <div className="summary-row">
        <div>
          <strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}
        </div>
        <div>
          <strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}
        </div>
        <div>
          <strong>Net:</strong>{' '}
          <span className={net >= 0 ? 'positive' : 'negative'}>
            ₹{net.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount (₹)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{formatDate(t.date)}</td>
                <td className={t.type === 'income' ? 'positive' : 'negative'}>
                  {t.type}
                </td>
                <td>{t.category}</td>
                <td>{t.description || '-'}</td>
                <td>{t.amount.toFixed(2)}</td>
                <td>
                  <button className="btn danger" onClick={() => onDelete(t._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
