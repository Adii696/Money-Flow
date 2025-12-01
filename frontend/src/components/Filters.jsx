import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'all',
      type: 'all',
      sortBy: 'date',
      order: 'desc',
      minAmount: '',
      maxAmount: ''
    });
  };

  return (
    <div className="card filters">
      <div className="filters-row">
        <div className="filters-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="filters-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="filters-group">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="filters-group">
          <label>Category</label>
          <input
            name="category"
            value={filters.category === 'all' ? '' : filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value || 'all'
              }))
            }
            placeholder="All or specific category"
          />
        </div>
      </div>

      <div className="filters-row">
        <div className="filters-group">
          <label>Min Amount</label>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleChange}
          />
        </div>
        <div className="filters-group">
          <label>Max Amount</label>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleChange}
          />
        </div>
        <div className="filters-group">
          <label>Sort By</label>
          <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="filters-group">
          <label>Order</label>
          <select name="order" value={filters.order} onChange={handleChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <div className="filters-group filters-actions">
          <button className="btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
