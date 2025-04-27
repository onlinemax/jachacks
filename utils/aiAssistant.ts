// src/utils/aiAssistant.ts

const analyzeFinances = (expenses: number[], income: number): string => {
  // Basic financial analysis logic
  const totalExpenses = expenses.reduce((acc, val) => acc + val, 0);
  const remainingIncome = income - totalExpenses;

  if (remainingIncome > 0) {
    return "You have a healthy financial balance. Consider saving or investing.";
  } else {
    return "You are currently over budget. Review your expenses.";
  }
};

const getGoingOutRecommendation = (dayOfWeek: string, expenses: number[], income: number, ticketCost: number, foodExpenses: number): string => {
  const totalExpenses = expenses.reduce((acc, val) => acc + val, 0);
  const remainingIncome = income - totalExpenses - ticketCost - foodExpenses;

  if (remainingIncome > 0) {
    return `You can go out on ${dayOfWeek}. Enjoy!`;
  } else {
    return `Going out on ${dayOfWeek} is not recommended based on your current finances.`;
  }
};

const calculateTaxSavings = (income: number, taxRate: number): number => {
  return income * taxRate;
};

export { analyzeFinances, getGoingOutRecommendation, calculateTaxSavings };