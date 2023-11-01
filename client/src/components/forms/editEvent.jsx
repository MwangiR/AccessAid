import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT } from '../../utils/mutations';
import { GET_SINGLE_EVENT } from '../../utils/queries';
import { useState } from 'react';

export default function EditEvent(prop) {
  const { loading, data } = useQuery(GET_SINGLE_EVENT, {
    variables: { id: prop.Id },
  });
  const singleEvent = data?.event || {};

  //   console.log('Edit event id', singleEvent);

  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [formData, setFormData] = useState({
    eventCategory: singleEvent.eventCategory,
    notes: singleEvent.notes,
    dueDate: singleEvent.dueDate,
    status: singleEvent.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        variables: {
          updateEventInput: {
            _id: singleEvent._id,
            eventCategory: formData.eventCategory,
            notes: formData.notes,
            dueDate: formData.dueDate,
            status: formData.status,
          },
        },
      });
      alert('successfully changed');
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-dots loading-lg'></span>
        </div>
      </>
    );
  }

  console.log('Edit single event', singleEvent);

  return (
    <>
      <button
        className='btn btn-wide btn-sm btn-neutral m-2'
        onClick={() => document.getElementById('editEventModal').showModal()}
      >
        Edit Event
      </button>
      <dialog id='editEventModal' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#98B9AB] space-y-2'>
          <h3 className='font-bold text-lg'>EventId: {prop.Id}</h3>
          <div tabIndex={0} className='collapse bg-base-200'>
            <div className='collapse-title text-xl font-medium'>Previous Info</div>
            <div className='collapse-content text-navGray'>
              <p className='prose prose-base'>
                <strong>Due Date:</strong> {singleEvent.dueDate}
              </p>
              <p className='prose prose-base'>
                <strong>Event Category:</strong> {singleEvent.eventCategory}
              </p>
              <p className='prose prose-base'>
                <strong>Status:</strong> {singleEvent.status}
              </p>
              <p className='prose prose-base'>
                <strong>Notes:</strong> {singleEvent.notes}
              </p>
            </div>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <label className='sr-only' htmlFor='name'>
                Due Date
              </label>
              <input
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Client Name'
                type='date'
                name='dueDate'
                value={formData.dueDate}
                onChange={handleInputChange}
              />
              <div>
                <select
                  className='select select-primary w-full max-w-xs'
                  name='eventCategory'
                  value={formData.eventCategory}
                  onChange={handleInputChange}
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
              <select
                className='select select-primary w-full max-w-xs'
                name='status'
                value={formData.status}
                onChange={handleInputChange}
              >
                <option disabled selected>
                  Event Status
                </option>
                <option value='Completed'>Complete</option>
                <option value='Cancelled'>Cancelled</option>
                <option value='Pending'>Pending</option>
                <option value='Rescheduled'>Rescheduled</option>
                <option value='Other'>Other...</option>
              </select>
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
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
              >
                Edit Event
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
