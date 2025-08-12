import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import {validateEmail} from '../../utils/helper.js';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Handle Sign up form Submit
  const handleSignUp = async (e) => {

  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-2xl font-semibold text-black'> Create an Account</h3>
        <p className='text-sm text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below. 😁
        </p>

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <br/>

            <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            />

            <br/>

            <Input 
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="Password"
              placeholder="Min. 8 Characters"
              type="password"
            />
          
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp