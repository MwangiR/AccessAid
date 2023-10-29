import { useMutation } from '@apollo/client';
import { REGISTER_CLIENT } from '../utils/mutations';
import { useReducer, useState } from 'react';
import { clientReducer } from '../utils/reducers';

export default function AddNewClient() {
  const [registerClient] = useMutation(REGISTER_CLIENT);

  const initialState = {
    clients: [],
  };
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const [alertMessage, setAlertMessage] = useState(null);

  const handleRegisterClient = async (clientInput) => {
    try {
      clientInput.guardianContact = parseInt(clientInput.guardianContact);
      const { data } = await registerClient({
        variables: {
          clientInput,
        },
      });
      dispatch({ type: 'REGISTER_CLIENT', payload: data.registerClient });
      setAlertMessage('Client Registered Successfully');
      window.location.reload();
    } catch (err) {
      console.error('Error', err.graphQLErrors[0].message);
      setAlertMessage('Error registering client');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, description, guardianName, guardianContact } = e.target;
    handleRegisterClient({
      name: name.value,
      email: email.value,
      description: description.value,
      guardianName: guardianName.value,
      guardianContact: guardianContact.value,
    });
  };

  return (
    <>
      <section className='bg-[#D4E6B5] '>
        {alertMessage && (
          <div className='alert alert-info rounded-none'>
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
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='m-4'>
            <article className='prose lg:prose-xl'>Register Client</article>
          </div>

          <form className='space-y-4' onSubmit={handleFormSubmit}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <label className='sr-only' htmlFor='name'>
                Name
              </label>
              <input
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Client Name'
                type='text'
                name='name'
              />
              <div>
                <label className='sr-only' htmlFor='email'>
                  Email
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder='Email address'
                  type='email'
                  name='email'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className='sr-only' htmlFor='email'>
                  Guardian Name
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder='Guardian Name'
                  type='text'
                  name='guardianName'
                />
              </div>

              <div>
                <label className='sr-only' htmlFor='phone'>
                  Guardian Contact
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder='Guardian Contact'
                  type='text'
                  name='guardianContact'
                />
              </div>
            </div>

            <div>
              <label className='sr-only' htmlFor='message'>
                Description
              </label>

              <textarea
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Description'
                rows='8'
                name='description'
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
              >
                Register Client
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
