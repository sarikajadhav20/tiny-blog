import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

function SignUp() {
    const [user, setUser] = React.useState({ name: '', email: '', password: '' });

    const signupUser = async () => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user);

        console.log(response.data);
    };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-20'>Sign Up</h1>

      <div>
        <form className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md'>
            <input 
            type="text" 
            placeholder='Name' 
            className='w-full mb-4 p-2 border border-gray-300 rounded cursor-pointer hover:border-blue-500'
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

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

            <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded' onClick={signupUser}>Sign Up</button>

            <p className='mt-4 text-center'>
                Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
