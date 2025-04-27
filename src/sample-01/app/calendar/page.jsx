"use client";

import React, { useState, useEffect } from 'react';

export default function FinancialApp() {
  // State for expenses and financial data
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0); // Initialize to 0 instead of hardcoded value
  const [bonusIncome, setBonusIncome] = useState('');
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [weeklyLimits, setWeeklyLimits] = useState({});
  const [overflow, setOverflow] = useState({});
  const [addedExpenses, setAddedExpenses] = useState({}); // New state to track added expenses
  const [monthlyHouseholdExpenses, setMonthlyHouseholdExpenses] = useState(0);

  // Expense categories with subcategories
  const expenseCategories = {
    'Housing': ['Child care', 'Pet care', 'Others'],
    'Personal care': ['Education', 'Subscriptions', 'Extra'],
    'Transportation': ['Public transportation', 'Personal transportation', 'Others'],
    'Food': ['Groceries', 'Dining out', 'Others'],
    'Healthcare': ['Drug store', 'Others'],
    'Leisure': ['Entertainment', 'Traveling', 'Others'],
    'Extra Expenses': ['Clothing', 'Cosmetics', 'Gifts', 'Others']
  };

  // Function to update limits from settings
  const updateFromSettings = () => {
    const savedSettings = localStorage.getItem('financialSettings');
    if (savedSettings) {
      const { 
        incomeAfterTax, 
        totalHouseholdExpenses, 
        expensePercentages 
      } = JSON.parse(savedSettings);

      // Set the monthly household expenses
      const householdExpenses = parseFloat(totalHouseholdExpenses) || 0;
      setMonthlyHouseholdExpenses(householdExpenses);

      // Set the income amount from saved settings (after subtracting household expenses)
      const annualIncome = parseFloat(incomeAfterTax) || 0;
      setIncomeAmount(annualIncome - householdExpenses);

      // Calculate weekly budget and limits using income after household expenses
      const weeklyBudget = (annualIncome - householdExpenses) / 52;

      console.log('Updating limits with:', {
        annualIncome,
        householdExpenses,
        weeklyBudget,
        expensePercentages
      });

      // Set weekly limits based on percentages
      const limits = {};
      Object.entries(expensePercentages).forEach(([category, percentage]) => {
        limits[category] = (weeklyBudget * (parseInt(percentage) || 0)) / 100;
      });
      setWeeklyLimits(limits);

      // Initialize overflow tracking
      const initialOverflow = {};
      Object.keys(expenseCategories).forEach(category => {
        initialOverflow[category] = 0;
      });
      setOverflow(initialOverflow);
    }
  };

  // Initial load of settings
  useEffect(() => {
    updateFromSettings();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'financialSettings') {
        updateFromSettings();
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Poll for changes every second as a backup
  useEffect(() => {
    const interval = setInterval(updateFromSettings, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle bonus income change
  const handleBonusIncomeChange = (value) => {
    // Allow only numbers and decimal point
    value = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setBonusIncome(value);
  };

  // Function to validate amount input
  const validateAmount = (value) => {
    value = value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    return value;
  };

  // Function to add expense category to the list
  const addExpenseCategory = (category, subcategory = '') => {
    const key = `${category}-${subcategory}-${Date.now()}`;
    setExpenseEntries([
      ...expenseEntries,
      {
        key,
        category,
        subcategory,
        amount: ''
      }
    ]);
  };

  // Function to update expense amount in state
  const handleExpenseChange = (index, value) => {
    const updatedEntries = [...expenseEntries];
    updatedEntries[index].amount = validateAmount(value);
    setExpenseEntries(updatedEntries);
  };

  // Function to check if amount exceeds weekly limit
  const checkWeeklyLimit = (category, amount) => {
    const limit = weeklyLimits[category] || 0;
    // Get current total from actually added expenses
    const currentTotal = addedExpenses[category] || 0;
    const newTotal = currentTotal + amount;
    const availableLimit = limit + (overflow[category] || 0);

    if (newTotal > availableLimit) {
      const excess = newTotal - availableLimit;
      setOverflow(prev => ({
        ...prev,
        [category]: excess
      }));
      return {
        exceeds: true,
        excess,
        available: availableLimit,
        currentTotal
      };
    }

    return {
      exceeds: false,
      excess: 0,
      available: availableLimit,
      currentTotal
    };
  };

  // Function to add expense
  const updateExpense = (index) => {
    const entry = expenseEntries[index];
    const amount = parseFloat(entry.amount) || 0;
    
    // Check weekly limit
    const limitCheck = checkWeeklyLimit(entry.category, amount);
    if (limitCheck.exceeds) {
      const confirmAdd = window.confirm(
        `This expense would bring your total ${entry.category} expenses to $${(limitCheck.currentTotal + amount).toFixed(2)}, ` +
        `which exceeds your weekly limit of $${limitCheck.available.toFixed(2)} by $${limitCheck.excess.toFixed(2)}. ` +
        `The excess will be deducted from next week's limit. Continue?`
      );
      if (!confirmAdd) return;
    }

    // Update total expenses
    const newTotal = totalExpenses + amount;
    setTotalExpenses(newTotal);
    
    // Update added expenses for the category
    setAddedExpenses(prev => ({
      ...prev,
      [entry.category]: (prev[entry.category] || 0) + amount
    }));
    
    // Clear the input
    const updatedEntries = [...expenseEntries];
    updatedEntries[index].amount = '';
    setExpenseEntries(updatedEntries);
    
    // Show feedback with more detailed information
    alert(
      `Added $${amount.toFixed(2)} for ${entry.category}\n` +
      (limitCheck.exceeds 
        ? `Weekly limit: $${limitCheck.available.toFixed(2)}\n` +
          `Total category expenses: $${(limitCheck.currentTotal + amount).toFixed(2)}\n` +
          `Excess amount: $${limitCheck.excess.toFixed(2)} (will be deducted from next week's limit)`
        : `Remaining weekly limit: $${(limitCheck.available - limitCheck.currentTotal - amount).toFixed(2)}`)
    );
  };

  // Currency formatting helper
  const formatCurrency = (amount) => {
    return `$${parseFloat(amount || 0).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Calendar</h1>
        
        {/* Status Cards */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-green-50 border-l-4 border-green-500 rounded-md p-3 text-center shadow-sm">
            <h2 className="text-sm mb-1 font-semibold">Income After Household Expenses</h2>
            <div className="text-xl font-bold">{formatCurrency(parseFloat(incomeAmount) + parseFloat(bonusIncome || 0))}</div>
            <div className="text-xs text-gray-500 mt-1">
              Monthly household expenses: {formatCurrency(monthlyHouseholdExpenses)}
            </div>
          </div>
          
          <div className="flex-1 bg-red-50 border-l-4 border-red-500 rounded-md p-3 text-center shadow-sm">
            <h2 className="text-sm mb-1 font-semibold">Additional Expenses</h2>
            <div className="text-xl font-bold">{formatCurrency(totalExpenses)}</div>
          </div>
          
          <div className="flex-1 bg-blue-50 border-l-4 border-blue-500 rounded-md p-3 text-center shadow-sm">
            <h2 className="text-sm mb-1 font-semibold">Net Balance</h2>
            <div className="text-xl font-bold">{formatCurrency(parseFloat(incomeAmount) + parseFloat(bonusIncome || 0) - totalExpenses)}</div>
          </div>
        </div>
        
        {/* Calendar Container */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 h-96 flex items-center justify-center text-gray-500">
          Google Calendar Integration Space
        </div>

        {/* Income Management Section */}
        <div className="bg-white rounded-lg p-5 shadow-md mb-6">
          <h2 className="text-xl text-gray-800 mb-4 font-semibold">Manage Income</h2>
          <div className="flex items-center mb-4">
            <label className="text-gray-700 mr-4" htmlFor="bonusIncome">
              Do you have additional income bonus/prime?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-600">$</span>
              <input
                type="text"
                id="bonusIncome"
                name="bonusIncome"
                value={bonusIncome}
                onChange={(e) => handleBonusIncomeChange(e.target.value)}
                placeholder="0.00"
                className="pl-6 py-1 border border-gray-300 rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Weekly Limits Display */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Weekly Category Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(weeklyLimits).map(([category, limit]) => (
                <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">{category}:</span>
                  <span className="font-medium">{formatCurrency(limit)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-xl text-gray-800 mb-4 font-semibold">Manage Expenses</h2>
        
        {/* Expense Section */}
        <div className="flex gap-6">
          {/* Expense Options */}
          <div className="w-1/3 bg-white rounded-lg p-3 shadow-md h-96 overflow-y-auto">
            {Object.entries(expenseCategories).map(([category, subcategories]) => (
              <div key={category} className="mb-4">
                <div 
                  className="py-2 px-3 bg-gray-100 font-semibold cursor-pointer hover:bg-gray-200"
                  onClick={() => addExpenseCategory(category)}
                >
                  {category}
                </div>
                <div className="ml-4">
                  {subcategories.map(sub => (
                    <div 
                      key={`${category}-${sub}`}
                      className="py-1 px-3 border-l border-gray-200 cursor-pointer hover:bg-gray-50"
                      onClick={() => addExpenseCategory(category, sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Expense List */}
          <div className="w-2/3 bg-white rounded-lg p-5 shadow-md">
            {expenseEntries.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                Choose an expense category from the left to add an expense
              </div>
            ) : (
              expenseEntries.map((entry, index) => (
                <div key={entry.key} className="flex items-center py-3 border-b border-gray-100 mb-2">
                  <div className="flex-1 font-medium">
                    {entry.category}
                    {entry.subcategory && <span className="text-gray-500 ml-2">- {entry.subcategory}</span>}
                  </div>
                  <div className="flex items-center">
                    <div className="relative flex items-center">
                      <span className="absolute left-3 font-bold">$</span>
                      <input
                        type="text"
                        className="pl-6 py-1 border border-gray-300 rounded w-24 text-sm"
                        placeholder="0.00"
                        value={entry.amount}
                        onChange={(e) => handleExpenseChange(index, e.target.value)}
                      />
                      <button
                        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        onClick={() => updateExpense(index)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}