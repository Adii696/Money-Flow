const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// Helper: build MongoDB query from filters
const buildFilters = (query, userId) => {
  const filters = { user: userId };
  const { startDate, endDate, category, minAmount, maxAmount, type } = query;

  if (startDate || endDate) {
    filters.date = {};
    if (startDate) {
      filters.date.$gte = new Date(startDate);
    }
    if (endDate) {
      filters.date.$lte = new Date(endDate);
    }
  }

  if (category && category !== 'all') {
    filters.category = category;
  }

  if (type && ['income', 'expense'].includes(type)) {
    filters.type = type;
  }

  if (minAmount || maxAmount) {
    filters.amount = {};
    if (minAmount) {
      filters.amount.$gte = Number(minAmount);
    }
    if (maxAmount) {
      filters.amount.$lte = Number(maxAmount);
    }
  }

  return filters;
};

// All routes below are protected
router.use(auth);

// @route   GET /api/transactions
// @desc    Get transactions with optional filters + sorting for logged-in user
router.get('/', async (req, res) => {
  try {
    const filters = buildFilters(req.query, req.user._id);

    const sortBy = req.query.sortBy || 'date';
    const order = req.query.order === 'asc' ? 1 : -1;

    const transactions = await Transaction.find(filters).sort({ [sortBy]: order });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error fetching transactions' });
  }
});

// @route   POST /api/transactions
// @desc    Create a new transaction for logged-in user
router.post('/', async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || amount == null || !date) {
      return res.status(400).json({ message: 'type, category, amount, and date are required' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      date,
      description
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error creating transaction' });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction (only if it belongs to this user)
router.put('/:id', async (req, res) => {
  try {
    let transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    Object.assign(transaction, req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Server error updating transaction' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction (only if it belongs to this user)
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server error deleting transaction' });
  }
});

module.exports = router;
