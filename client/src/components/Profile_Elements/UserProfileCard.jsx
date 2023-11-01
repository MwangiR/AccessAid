import { useContext } from 'react';
import UserContext from '../../utils/userContext';
// import { useMutation } from '@apollo/client';
// import { DELETE_USER } from '../../utils/mutations';

export default function UserProfile() {
  const data = useContext(UserContext);
  console.log('Context User', data);

  // const [deleteUser] = useMutation(DELETE_USER);

  // async function handleDeleteUser() {
  //   console.log('Deleting user with ID:', data._id);
  //   try {
  //     await deleteUser({
  //       variables: { userId: data._id },
  //     });
  //     window.location.reload();
  //   } catch (err) {
  //     console.error('Error', err.message);
  //   }
  // }

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
        <div className='flex justify-between items-center'>
          {/* <a className='text-blue-600 hover:underline' href='#'>
            Read more
          </a> */}
          <div tabIndex={0} className='collapse collapse-close bg-base-200'>
            <div className='collapse-title text-xl font-medium flex flex-row justify-between items-center'>
              <div className='flex flex-col space-y-1'>
                <p>Profile</p>
                {/* <div>
                  <select className='select select-sm w-full max-w-xs'>
                    <option disabled value=''>
                      Manage Account
                    </option>
                    <option onClick={handleDeleteUser}>Delete Account</option>
                    <option>Edit Account</option>
                  </select>
                </div> */}
              </div>
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
            <div className='collapse-content'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
