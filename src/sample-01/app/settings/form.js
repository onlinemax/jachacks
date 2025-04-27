"use client";

import React, { useState } from 'react';

export default function UserInfoForm() {
  // State for user personal information
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    birthday: '',
    education: '',
    work: '',
    incomeAfterTax: '',
    salaryPerHour: '',
    workHours: ''
  });

  // State for household expenses
  const [householdExpenses, setHouseholdExpenses] = useState({
    rent: '',
    utilities: '',
    internet: '',
    insurance: '',
    maintenance: ''
  });

  // State for expense percentages
  const [expensePercentages, setExpensePercentages] = useState({
    Housing: '',
    'Personal care': '',
    Transportation: '',
    Food: '',
    Healthcare: '',
    Leisure: '',
    'Extra Expenses': ''
  });

  // Calculate total household expenses
  const calculateTotal = () => {
    return Object.values(householdExpenses)
      .reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
      .toFixed(2);
  };

  // Calculate weekly budget
  const calculateWeeklyBudget = () => {
    const income = parseFloat(personalInfo.incomeAfterTax) || 0;
    const totalExpenses = parseFloat(calculateTotal()) || 0;
    return ((income - (totalExpenses * 12)) / 52).toFixed(2);
  };

  // Handle changes to personal info fields
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for specific fields
    let validatedValue = value;
    
    if (name === 'age') {
      // Only allow integers for age
      validatedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'birthday') {
      // Format as DD/MM/YY
      validatedValue = value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
        .slice(0, 8);
    } else if (name === 'incomeAfterTax' || name === 'salaryPerHour' || name === 'workHours') {
      // Allow numbers and decimal point for financial fields
      validatedValue = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = validatedValue.split('.');
      if (parts.length > 2) {
        validatedValue = parts[0] + '.' + parts.slice(1).join('');
      }
    }
    
    setPersonalInfo(prev => ({ ...prev, [name]: validatedValue }));
  };

  // Handle changes to household expense fields
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    
    // Allow only numbers and decimal point for expenses
    let validatedValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = validatedValue.split('.');
    if (parts.length > 2) {
      validatedValue = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setHouseholdExpenses(prev => ({ ...prev, [name]: validatedValue }));
  };

  // Handle changes to expense percentages
  const handlePercentageChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value.replace(/[^0-9]/g, '');
    if (parseInt(validatedValue) > 100) validatedValue = '100';
    setExpensePercentages(prev => ({ ...prev, [name]: validatedValue }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save settings to localStorage
    const settings = {
      incomeAfterTax: personalInfo.incomeAfterTax,
      totalHouseholdExpenses: calculateTotal(),
      expensePercentages
    };
    
    localStorage.setItem('financialSettings', JSON.stringify(settings));
    alert('Settings saved successfully! Your expense limits will be updated in the calendar.');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Information Form</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="age">
                  Age (in years)
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={personalInfo.age}
                  onChange={handlePersonalInfoChange}
                  placeholder="Enter your age"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Birthday */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="birthday">
                  Birthday (DD/MM/YY)
                </label>
                <input
                  type="text"
                  id="birthday"
                  name="birthday"
                  value={personalInfo.birthday}
                  onChange={handlePersonalInfoChange}
                  placeholder="DD/MM/YY"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Education */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="education">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={personalInfo.education}
                  onChange={handlePersonalInfoChange}
                  placeholder="Highest level of education"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Work */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="work">
                  Work
                </label>
                <input
                  type="text"
                  id="work"
                  name="work"
                  value={personalInfo.work}
                  onChange={handlePersonalInfoChange}
                  placeholder="Current occupation"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Income After Tax */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="incomeAfterTax">
                  Income After Tax
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="incomeAfterTax"
                    name="incomeAfterTax"
                    value={personalInfo.incomeAfterTax}
                    onChange={handlePersonalInfoChange}
                    placeholder="Annual income after tax"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Salary Per Hour - Conditional */}
              {personalInfo.work && (
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="salaryPerHour">
                    Hourly Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2">$</span>
                    <input
                      type="text"
                      id="salaryPerHour"
                      name="salaryPerHour"
                      value={personalInfo.salaryPerHour}
                      onChange={handlePersonalInfoChange}
                      placeholder="Hourly rate"
                      className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-gray-600 italic mt-2">
                    If you do not have a fixed salary, just put in your number of hours:
                  </p>
                  <input
                    type="text"
                    id="workHours"
                    name="workHours"
                    value={personalInfo.workHours}
                    onChange={handlePersonalInfoChange}
                    placeholder="Hours worked per week"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Household Expenses Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Current Household Expenses</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Rent/Mortgage */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700" htmlFor="rent">
                  Rent/Mortgage:
                </label>
                <div className="relative w-1/3">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="rent"
                    name="rent"
                    value={householdExpenses.rent}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Utilities */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700" htmlFor="utilities">
                  Utilities (Electricity, Water, Gas):
                </label>
                <div className="relative w-1/3">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="utilities"
                    name="utilities"
                    value={householdExpenses.utilities}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Internet & Cable */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700" htmlFor="internet">
                  Internet & Cable:
                </label>
                <div className="relative w-1/3">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="internet"
                    name="internet"
                    value={householdExpenses.internet}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Home/Renters Insurance */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700" htmlFor="insurance">
                  Home/Renters Insurance:
                </label>
                <div className="relative w-1/3">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="insurance"
                    name="insurance"
                    value={householdExpenses.insurance}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Home Maintenance */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700" htmlFor="maintenance">
                  Home Maintenance/Repairs:
                </label>
                <div className="relative w-1/3">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="text"
                    id="maintenance"
                    name="maintenance"
                    value={householdExpenses.maintenance}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    className="w-full pl-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200">
                <label className="text-gray-800 font-bold">
                  Total Current Household Expenses:
                </label>
                <div className="bg-gray-100 px-6 py-2 rounded-md w-1/3 text-right font-bold">
                  ${calculateTotal()}
                </div>
              </div>
            </div>
          </div>

          {/* Expense Percentages Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
              Percentage of the income wanted to spend for different Expenses
            </h2>
            <p className="text-gray-600 mb-4">
              Set the maximum percentage of your weekly budget ({calculateWeeklyBudget() > 0 ? `$${calculateWeeklyBudget()}` : '$0.00'}) 
              that you want to allocate to each expense category.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {Object.keys(expensePercentages).map((category) => (
                <div key={category} className="flex justify-between items-center">
                  <label className="text-gray-700" htmlFor={category}>
                    {category}:
                  </label>
                  <div className="relative w-1/3">
                    <input
                      type="text"
                      id={category}
                      name={category}
                      value={expensePercentages[category]}
                      onChange={handlePercentageChange}
                      placeholder="0"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    />
                    <span className="absolute right-3 top-2">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}