import React, { useState } from 'react';

const initialState = {
  type: 'expense',
  category: '',
  amount: '',
  date: '',
  description: ''
};

const TransactionForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.date) {
      alert('Category, amount, and date are required.');
      return;
    }

    onSubmit({
      ...form,
      amount: Number(form.amount)
    });

    setForm(initialState);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-row">
        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g., Food, Rent, Salary"
        />
      </div>

      <div className="form-row">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-row">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Description</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional note"
        />
      </div>

      <button type="submit" className="btn primary">
        Add
      </button>
    </form>
  );
};

export default TransactionForm;
