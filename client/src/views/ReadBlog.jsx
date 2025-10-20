import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import MarkdownEditor from '@uiw/react-markdown-editor';

function ReadBlog() {
  const {slug} = useParams();
  const [blog,setBlog]=useState({});

  const fetchBlog=async()=>{
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    setBlog(response.data.data);
  };

  useEffect(()=>{
    fetchBlog();
  },[]);
  
  return(
   <div className='container mx-auto mb-4'>
    <h1 className='text-3xl font-bold'>{blog.title}</h1>
    <p>
      Published On: {new Date(blog.createdAt).toLocaleString()}
    </p>

    <div className='flex items-center mb-4 '>
    <span className='text-xl bg-amber-400 rounded-full px-4 py-1 text-white'>{blog.category}</span>
    <div className='flex items-center gap-4 mt-2 mb-4'>
        <div className='flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-center rounded-full text-3xl'>
          {blog?.author?.name?.substring(0, 1)}
        </div>
        <div>
          <p>{blog?.author?.name}</p>
          <p>{blog?.author?.email}</p>
        </div>
      </div>
    </div>
    <MarkdownEditor.Markdown source={blog.content} readOnly />
  </div>
  );
}

export default ReadBlog;
