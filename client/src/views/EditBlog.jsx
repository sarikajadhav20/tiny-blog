import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState, useEffect } from 'react';
import { BLOG_CATEGORIES } from './../constants';
import axios from 'axios';
import { getCurrentUser } from './../util';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] =useState(null);
  const {slug} = useParams();

  const loadBlog = async () => {
    if(!slug) return;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    const blogData = response?.data?.data;
    setTitle(blogData?.title);
    setCategory(blogData?.category);
    setContent(blogData?.content);
  }
  
  useEffect(() => {
    setUser(getCurrentUser());
    loadBlog();
    PublishBlog();
  }, []);

  const saveBlog = async () => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${slug}`, 
      { title,
        category, 
        content
      });

    if(response?.data?.success) {
      toast.success("Blog saved successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Error saving blog");
    }
  }

  const PublishBlog=async()=>{
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`);

    if(response?.data?.success) {
      toast.success("Blog published successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Error publishing blog");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
      <input
       type="text" 
       placeholder='Title' 
       className='border border-gray-300 rounded-md p-2 w-full mb-4'
       value={title}
       onChange={(e) => setTitle(e.target.value)}
     />

     <select
       value={category}
       onChange={(e) => setCategory(e.target.value)}
       className='border border-gray-300 rounded-md p-2 mb-4'
        >
       {BLOG_CATEGORIES.map((cate) => (
         <option key={cate} value={cate}>
           {cate}
         </option>
       ))}
     </select>

     <MarkdownEditor
      value={content}
      onChange={(value) => {
        setContent(value);
      }}
      height='500px'
    />
    <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer' type="button" onClick={saveBlog}>Update Blog</button>
   
   <button className='bg-green-400 text-white px-4 py-2 mt-4 ml-4 roundes cursor-pointer'
     type="button"
     onClick={()=> {
      window.location.href = '/';             
     }}>
     Publish
   </button>

   <Toaster/>
    </div>
  );
}

export default EditBlog;

