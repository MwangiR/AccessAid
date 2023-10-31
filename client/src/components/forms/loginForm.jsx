import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { useState } from 'react';
import auth from '../../utils/auth';

const LoginForm = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = useState(null);
  // const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { loginInput: { ...userFormData } },
      });
      const { token, user } = data.loginUser;
      auth.login(token);
    } catch (err) {
      console.error('GraphQL Error:', err.message);
      setAlertMessage(err.message);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <section className='text-navGray'>
      <div className='flex flex-col justify-center min- py-12 sm:px-6 lg:px-8'>
        {alertMessage && (
          <div className='alert alert-error rounded-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>{alertMessage}</span>
          </div>
        )}
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-3xl font-extrabold text-center text-neutral-600'>LOGIN</h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='px-4 py-5 sm:px-10'>
            <form className='space-y-6' onSubmit={handleFormSubmit} data-bitwarden-watching='1'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    placeholder='Your Email'
                    name='email'
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    type='password'
                    name='password'
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                    placeholder='Password'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
              </div>

              <div>
                <button
                  className='btn btn-active btn-neutral flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  disabled={!(userFormData.email && userFormData.password)}
                  type='submit'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
