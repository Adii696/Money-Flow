import React, { useEffect, useState } from 'react';
import { getTransactions, createTransaction, deleteTransaction, setAuthToken, logout } from './services/api';
import TransactionForm from './components/TransactionForm';
import Filters from './components/Filters';
import TransactionTable from './components/TransactionTable';
import DashboardCharts from './components/DashboardCharts';
import AuthForm from './components/AuthForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
    type: 'all',
    sortBy: 'date',
    order: 'desc',
    minAmount: '',
    maxAmount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('moneyflow_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAuthToken(parsed.token);
      setUser(parsed.user);
    }
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTransactions(filters);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), user]);

  const handleAddTransaction = async (transaction) => {
    try {
      await createTransaction(transaction);
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const handleAuthSuccess = ({ token, user }) => {
    setAuthToken(token);
    setUser(user);
    localStorage.setItem('moneyflow_auth', JSON.stringify({ token, user }));
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setTransactions([]);
    localStorage.removeItem('moneyflow_auth');
  };

  if (!user) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1>Money Flow</h1>
          <p>Login or create an account to track your finances.</p>
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header app-header-flex">
        <div>
          <h1>Money Flow</h1>
          <p>Welcome, {user.name}. Track your income, expenses, and see trends over time.</p>
        </div>
        <div className="user-info">
          <span>{user.email}</span>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="app-main">
        <section className="app-section">
          <h2>Add Transaction</h2>
          <TransactionForm onSubmit={handleAddTransaction} />
        </section>

        <section className="app-section">
          <h2>Filters</h2>
          <Filters filters={filters} setFilters={setFilters} />
        </section>

        <section className="app-section">
          <h2>Overview</h2>
          <DashboardCharts transactions={transactions} />
        </section>

        <section className="app-section">
          <h2>Transactions</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <TransactionTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        </section>
      </main>

      <footer className="app-footer">
        <small>Money Flow · MERN Stack · JWT Auth · Recharts</small>
      </footer>
    </div>
  );
};

export default App;
