/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { REGISTER_EVENT } from '../../utils/mutations';
import { useReducer, useState } from 'react';
import { clientReducer } from '../../utils/reducers';

const initialState = { events: [] };

export default function AddNewEvent({ clientId }) {
  const [registerEvent] = useMutation(REGISTER_EVENT);

  const [state, dispatch] = useReducer(clientReducer, initialState);

  const [alertMessage, setAlertMessage] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleRegisterEvent = async (eventInput) => {
    try {
      const { data } = await registerEvent({
        variables: {
          eventInput,
        },
      });
      console.log('Register Event data', data);
      dispatch({ type: 'REGISTER_EVENT', payload: data.registerEvent });
      setAlertMessage('Event Registered Successfully');
      window.location.reload();
    } catch (err) {
      console.error('Error', err.graphQLErrors[0].message);
      setAlertMessage('Error registering event');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { dueDate, eventCategory, notes } = e.target;
    handleRegisterEvent({
      clientId,
      dueDate: dueDate.value,
      eventCategory: eventCategory.value,
      notes: notes.value,
    });
  };

  return (
    <>
      <button
        className='btn btn-outline btn-info'
        onClick={() => document.getElementById('registerEventModal').showModal()}
      >
        Add New Event
      </button>
      <dialog id='registerEventModal' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#D4E6B5] text-navGray'>
          <p>ClientId: {clientId}</p>
          <p className='py-4'>Add Event</p>

          <form className='space-y-4' onSubmit={handleFormSubmit}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <label className='sr-only' htmlFor='name'>
                Due Date
              </label>
              <input
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Client Name'
                type='date'
                name='dueDate'
              />
              <div>
                <select
                  className='select select-primary w-full max-w-xs'
                  value={selectedOption}
                  onChange={handleOptionChange}
                  name='eventCategory'
                >
                  <option disabled selected>
                    Event Category
                  </option>
                  <option value='1:1 Support'>1:1 Support</option>
                  <option value='Appointment'>Appointment</option>
                  <option value='Other'>Other...</option>
                </select>
              </div>
            </div>

            <div>
              <label className='sr-only' htmlFor='message'>
                Notes
              </label>

              <textarea
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Notes'
                rows='8'
                name='notes'
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
              >
                Register Event
              </button>
            </div>
          </form>

          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
