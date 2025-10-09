import React from 'react'
import { useState, useEffect} from 'react';
import { getCurrentUser } from './../util';

function AllBlogs() {
  const [user, setUser] =useState(null);

  useEffect(() => {
    const loggedInUser = getCurrentUser();
    setUser(loggedInUser);
  }, []);
  
  return <div>
    <h1>All Blogs</h1>
    {user ? <p>Welcome, {user.name}!</p> : <p>Please log in to see your blogs.</p>}{}
    </div>;
}

export default AllBlogs;
