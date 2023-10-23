import LoginForm from './loginForm';
import SignupForm from './signupForm';
const Navbar = () => {
  return (
    <div className='navbar bg-navGray text-anti-white'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost normal-case text-xl'>AccessAid</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className='btn' onClick={() => document.getElementById('my_modal_3').showModal()}>
          open modal
        </button>
        <dialog id='my_modal_3' className='modal'>
          <div className='modal-box w-11/12 max-w-5xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
            </form>
            <div className='flex flex-row justify-center'>
              {/* Login Component  */}
              <LoginForm />
              {/* Signup Component */}
              <div className='divider divider-horizontal py-10'>OR</div>
              <SignupForm />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
