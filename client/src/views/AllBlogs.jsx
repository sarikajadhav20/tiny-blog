import { useState, useEffect, use } from 'react';
import axios from 'axios';
import BlogCard from './../components/BlogCard';
import { getCurrentUser } from './../util';

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ''}`);
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    const loggedInUser = getCurrentUser();
    setUser(loggedInUser);
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  return (
    <div>
      <h1>All Blogs</h1>
      {user ? <p>Hello, {user.name}!</p> : <p>Please log in to create a blog post.</p>}
      
      <div className='mt-4'> 
        {blogs.map((blog) => {
          const {
            _id,
            title,
            category,
            content,
            author,
            status,
            slug,
            createdAt,
            updatedAt
          } = blog;

          return (
            <BlogCard
              key={_id}
              title={title}
              category={category}
              content={content}
              author={author}
              status={status}
              slug={slug}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllBlogs;

