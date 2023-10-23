const loginForm = () => {
  return (
    <section className='text-navGray'>
      <div className='flex flex-col justify-center min- py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-3xl font-extrabold text-center text-neutral-600'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='px-4 py-8 sm:px-10'>
            <form className='space-y-6' action='#' method='POST' data-bitwarden-watching='1'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  {' '}
                  Email address{' '}
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    placeholder='Type here'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  {' '}
                  Password{' '}
                </label>
                <div className='mt-1'>
                  <input
                    type='password'
                    placeholder='Type here'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <label htmlFor='remember-me' className='block ml-2 text-sm text-neutral-600'>
                    {' '}
                    Remember me{' '}
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                    {' '}
                    Forgot your password?{' '}
                  </a>
                </div>
              </div>

              <div>
                <button className='btn btn-active btn-neutral flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loginForm;
