import { Link } from "react-router";

function BlogCard({
  title,
  category,
  author,
  status,
  slug,
  createdAt,

}) {
  return (
    <div className='border border-gray-500 rounded-md p-4 mb-8 relative'>
      <h2>
         {status != 'published'? (
        <span className='bg-yellow-200 text-yellow-500 text-sm font-semibold rounded-md px-2 py-1 mr-4 '>draft</span>
      ) : null}
        {title}
        </h2>
        <div className='flex items-center gap-4 mt-2 mb-4'>
        <div className='flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-center rounded-full text-3xl'>
          {author.name.substring(0, 1)}
        </div>
        <div>
          <p>{author.name}</p>
          <p>{author.email}</p>
        </div>
      </div>
      <p className='text-sm text-gray-600'>Published On: {new Date(createdAt).toLocaleString()}</p>

      <span className='absolute top-2 right-2 text-sm text-gray-800 bg-gray-200 rounded-md px-2'>{category}</span>

      {status === 'published' ? (

      <Link className='absolute bottom-4 right-4 text-sm px-6 py-2 text-white hover:underline cursor-pointer bg-gray-600 rounded-md' 
            to={`/blog/${slug}`}>
        Read More
      </Link>
      ) : (
        <Link className='absolute bottom-4 right-4 text-sm px-6 py-2 text-white hover:underline cursor-pointer bg-gray-600 rounded-md' 
            to={`/edit/${slug}`}>
        Edit Blog
      </Link>  )}
    </div>
  )
}

export default BlogCard;
