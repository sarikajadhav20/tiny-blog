import { createRoot } from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router';
import AllBlogs from './views/AllBlogs.jsx';
import NewBlog from './views/NewBlog.jsx';
import EditBlog from './views/EditBlog.jsx';
import ReadBlog from './views/ReadBlog.jsx';
import Login from './views/Login.jsx';
import SignUp from './views/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<AllBlogs/>}/>
    <Route path='/new' element={<NewBlog/>}/>
    <Route path='/edit/:id' element={<EditBlog/>}/>
    <Route path='/blog/:slug' element={<ReadBlog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='*' element={<h1 className='text-3xl font-bold text-center mt-20'>404 Not Found</h1>}/>
  </Routes>
  </BrowserRouter>
);
