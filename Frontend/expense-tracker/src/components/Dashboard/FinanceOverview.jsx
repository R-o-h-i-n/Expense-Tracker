import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

// Color scheme for the pie chart segments
const COLORS = ["#875CF5", "#FA2C37", "#FF6900" ];

// Component to display financial summary in a pie chart format
const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

      // Prepare data for the pie chart visualization
      const balanceData = [
            { name: "Total Balance", amount: totalBalance},    // Available funds
            { name: "Total Expenses", amount: totalExpense},   // Money spent
            { name: "Total Income", amount: totalIncome},      // Money earned
      ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
      </div>

      {/* Render pie chart with financial data */}
      <CustomPieChart
       data={balanceData}
       label="Total Balance"
       totalAmount={`₹${totalBalance}`}
       colors={COLORS}
       showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview