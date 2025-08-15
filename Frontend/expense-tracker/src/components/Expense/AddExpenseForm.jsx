import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

// Form component for adding new expense entries
const AddExpenseForm = ({onAddExpense}) => {
      // Local state to manage form input values
      const [expense, setExpense] = useState({
            category: "",    // Expense category (e.g., food, transport)
            amount: "",      // Expense amount in currency
            date: "",        // Date when expense occurred
            icon: "",        // Emoji icon representing the category
      });

      // Helper function to update specific form fields
      const handleChange = (key, value) => setExpense({...expense, [key]: value });

  return (
    <div> 
      {/* Emoji picker for selecting category icons */}
      <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Category input field */}
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      {/* Amount input field */}
      <Input 
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=" "
        type="number"
      />

      {/* Date input field */}
      <Input 
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=" "
        type="date"
      />

      {/* Submit button to add the expense */}
      <div className='flex justify-end mt-6'>
            <button
                  className='add-btn add-btn-fill'
                  type='button'
                  onClick={() => onAddExpense(expense)}
            >
                  Add Expense
            </button>
      </div>
    </div>
  )
}

export default AddExpenseForm