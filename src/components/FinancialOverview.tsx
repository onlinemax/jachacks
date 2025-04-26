import React from 'react';
import { analyzeFinances, calculateTaxSavings } from '../utils/aiAssistant';

const FinancialOverview = () => {
  const expenses = [10, 20, 30]; // Example expenses
  const income = 1000; // Example income
  const taxRate = 0.25; // Example tax rate

  const financialAnalysis = analyzeFinances(expenses, income);
  const taxSavings = calculateTaxSavings(income, taxRate);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>
      <p className="mb-2">{financialAnalysis}</p>
      <p className="mb-2">Tax Savings: ${taxSavings}</p>
      <div>{/* Financial overview content here */}</div>
    </div>
  );
};

export default FinancialOverview;