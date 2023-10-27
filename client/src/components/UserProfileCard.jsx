import { useContext } from 'react';
import UserContext from '../utils/userContext';

export default function UserProfile() {
  const data = useContext(UserContext);
  console.log('Context User', data);

  return (
    <div className='flex justify-center'>
      <div className='w-full px-10 my-4 mx-20 py-6 bg-white rounded-lg shadow-md '>
        <div className='mt-2'>
          <a className='text-2xl text-gray-700 font-bold hover:text-gray-600' href='#'>
            User Profile
          </a>
          <div className='flow-root m-3 max-w-xl'>
            <dl className='-my-3 divide-y divide-gray-100 text-sm'>
              <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Name</dt>
                <dd className='text-gray-700 sm:col-span-2'>{data.username}</dd>
              </div>
              <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Email</dt>
                <dd className='text-gray-700 sm:col-span-2'>{data.email}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <a className='text-blue-600 hover:underline' href='#'>
            Read more
          </a>
          <div>
            <a className='flex items-center' href='#'>
              <img
                className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
                src='https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80'
                alt='avatar'
              />
              <h1 className='text-gray-700 font-bold'>{data.username}</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
