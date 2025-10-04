import { Link } from 'react-router';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = React.useState({ email: '', password: '' });

    const loginUser = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user);

        console.log(response.data);
    };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-20'>Login</h1>

      <div>
        <form className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md'>
            <input
             type="email"
              placeholder='Email'
               className='w-full mb-4 p-2 border border-gray-300 rounded cursor-pointer hover:border-blue-500' 
               value={user.email} 
               onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

            <input
             type="password"
              placeholder='Password'
               className='w-full mb-4 p-2 border border-gray-300 rounded cursor-pointer hover:border-blue-500'
               value={user.password}
               onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

            <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded' onClick={loginUser}>Login</button>

            <p className='mt-4 text-center'>
                Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline' >Sign Up</Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Login
