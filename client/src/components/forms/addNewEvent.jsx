/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER_EVENT } from '../../utils/mutations';
import { useEffect, useState } from 'react';
import { GET_SINGLE_CLIENT } from '../../utils/queries';

// const initialState = { events: [] };

export default function AddNewEvent({ clientId }) {
  const [registerEvent] = useMutation(REGISTER_EVENT);

  // const [state, dispatch] = useReducer(clientReducer, initialState);
  // const [addNewEvent, setNewEvent] = usestate([])

  const [alertMessage, setAlertMessage] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [notes, setNotes] = useState('');

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  const { data } = useQuery(GET_SINGLE_CLIENT, {
    variables: {
      id: clientId,
    },
  });

  const handleRegisterEvent = async () => {
    try {
      const { data } = await registerEvent({
        variables: {
          eventInput: {
            clientId,
            dueDate,
            eventCategory,
            notes,
          },
        },
      });

      setAlertMessage('Event Registered Successfully');
      resetForm();
      // window.location.reload();
    } catch (err) {
      console.error('Error', err.message);
      setAlertMessage('Error registering event');
    }
  };

  const resetForm = () => {
    setSelectedOption('');
    setDueDate('');
    setEventCategory('');
    setNotes('');
  };

  return (
    <>
      <button
        className='btn btn-outline btn-info tooltip'
        data-tip='Select client'
        onClick={() => document.getElementById('registerEventModal').showModal()}
      >
        Add New Event
      </button>
      <dialog id='registerEventModal' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#D4E6B5] text-navGray'>
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
          <p>ClientId: {clientId}</p>
          <p className='py-4'>Add Event</p>

          <form
            className='space-y-4'
            onSubmit={(e) => {
              e.preventDefault();
              handleRegisterEvent();
            }}
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <label className='sr-only' htmlFor='name'>
                Due Date
              </label>
              <input
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Client Name'
                type='date'
                name='dueDate'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div>
                <select
                  className='select select-primary w-full max-w-xs'
                  value={selectedOption}
                  onChange={(e) => setEventCategory(e.target.value)}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
