import React from 'react'

// Routing components for navigation
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate,
} from "react-router-dom"
import {Toaster} from "react-hot-toast"

// Page components for different sections of the app
import Login from './pages/Auth/Login.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Home from './pages/Dashboard/Home.jsx'
import Income from './pages/Dashboard/Income.jsx'
import Expense from './pages/Dashboard/Expense.jsx'

// Context provider for user authentication state
import UserProvider from './context/userContext.jsx'

// Main App component with routing configuration
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Root route with authentication check */}
            <Route path='/' element={<Root />} />

            {/* Authentication routes */}
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<SignUp />} />

            {/* Protected dashboard routes */}
            <Route path='/dashboard' exact element={<Home/>} />
            <Route path='/income' exact element={<Income/>} />
            <Route path='/expense' exact element={<Expense/>} />
          </Routes>
        </Router>
      </div>

      {/* Global toast notifications for user feedback */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

export default App

// Root component that handles initial authentication routing
const Root = () => {
  // Check if user is authenticated by looking for token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login page
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  );
}