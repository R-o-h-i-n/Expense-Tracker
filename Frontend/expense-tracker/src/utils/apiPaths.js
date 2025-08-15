// Base URL for the backend API server
export const BASE_URL = "http://localhost:8000"; 

// Centralized API endpoint definitions for consistent routing
export const API_PATHS = {
      // Authentication endpoints for user management
      AUTH: {
            LOGIN: "/api/v1/auth/login",           // User login
            REGISTER: "/api/v1/auth/register",     // User registration
            GET_USER_INFO: "/api/v1/auth/getUser", // Get current user profile
      },
      // Dashboard data endpoints for overview and analytics
      DASHBOARD: {
            GET_DATA: "/api/v1/dashboard",         // Get dashboard summary data
      },
      // Income management endpoints
      INCOME:{
            ADD_INCOME: "/api/v1/income/add",      // Add new income entry
            GET_ALL_INCOME: "/api/v1/income/get",  // Retrieve all income records
            DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`, // Delete specific income
            DOWNLOAD_INVOICE: `api/v1/income/downloadexcel` // Export income data to Excel
      },
      // Expense management endpoints
      EXPENSE:{
            ADD_EXPENSE: "/api/v1/expense/add",    // Add new expense entry
            GET_ALL_EXPENSE: "/api/v1/expense/get", // Retrieve all expense records
            DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // Delete specific expense
            DOWNLOAD_EXPENSE: `api/v1/expense/downloadexcel` // Export expense data to Excel
      },
      // File upload endpoints
      IMAGE: {
            UPLOAD_IMAGE: "/api/v1/auth/upload-image" // Upload profile picture
      },
};