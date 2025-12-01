import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardCharts = ({ transactions }) => {
  const { monthlyNetData, categoryData } = useMemo(() => {
    const byMonth = {};
    const byCategory = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        byMonth[monthKey].income += t.amount;
      } else {
        byMonth[monthKey].expense += t.amount;
      }

      if (!byCategory[t.category]) {
        byCategory[t.category] = { name: t.category, value: 0 };
      }
      byCategory[t.category].value += t.amount * (t.type === 'expense' ? 1 : -1);
    });

    const monthlyNetData = Object.values(byMonth)
      .sort((a, b) => (a.month > b.month ? 1 : -1))
      .map((m) => ({
        ...m,
        net: m.income - m.expense
      }));

    const categoryData = Object.values(byCategory);

    return { monthlyNetData, categoryData };
  }, [transactions]);

  if (!transactions.length) {
    return <p>Add some transactions to see charts.</p>;
  }

  const pieColors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#AF19FF', '#FF4560'];

  return (
    <div className="charts-grid">
      <div className="card chart-card">
        <h3>Net Worth Over Time (Monthly)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyNetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#00C49F" name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#FF4560" name="Expense" />
            <Line type="monotone" dataKey="net" stroke="#0088FE" name="Net" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <h3>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData.filter((c) => c.value > 0)}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <h3>Income vs Expense (Bar)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyNetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#00C49F" />
            <Bar dataKey="expense" name="Expense" fill="#FF4560" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
