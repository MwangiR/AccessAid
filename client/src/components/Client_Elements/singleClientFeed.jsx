/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';
import { DELETE_EVENT } from '../../utils/mutations';
import ShowToast from '../ToastComponent';
import { useEffect, useState } from 'react';
import EditEvent from '../forms/editEvent';

export default function SingleClientEvent({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

  // // const clientData = data || {};
  // // const eventsData = clientData.client || {};
  // // const individualClientEvents = eventsData.Events || {};
  // const individualClientEvents1 = data?.client?.Events || [];

  const [individualClientEvents, setIndividualClientEvents] = useState(data?.client?.Events || []);

  useEffect(() => {
    if (!loading && data) {
      setIndividualClientEvents(data?.client?.Events || []);
    }
  }, [loading, data, clientId]);

  // const individualClientEvents = data?.client.Events || [];
  console.log('Single Client Event...', individualClientEvents);

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }

  async function handleDeleteButtonClick(eventId) {
    console.log('Deleting event with ID:', eventId);
    try {
      await deleteEvent({
        variables: { eventId },
      });

      setIndividualClientEvents((events) => events.filter((event) => event._id !== eventId));

      <ShowToast message='Successfully Deleted' type='success' />;
    } catch (err) {
      console.error('Error', err.message);
      <ShowToast message='Unable to delete' type='Danger' />;
    }
  }

  const handleDeleteEvent = (eventId) => {
    handleDeleteButtonClick(eventId);
    console.log('Handling delete event with ID:', eventId);
  };

  return (
    <>
      <section className='flex flex-col'>
        {individualClientEvents.length === 0 ? (
          <div className='alert alert-info'>
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
            <span>No events found for this client</span>
          </div>
        ) : (
          individualClientEvents.map((individualEvent) => {
            const isCancelledorReschedule =
              individualEvent.status === 'Cancelled' || individualEvent.status === 'Rescheduled';
            return (
              <div
                className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md '
                key={individualEvent._id}
              >
                <div className=' flex flex-col lg:px-6'>
                  <div>
                    <div className='flex flex-wrap py-8 md:flex-nowrap'>
                      <div className='flex flex-col flex-shrink-0 px-2 mb-6 md:w-60 md:mb-0'>
                        <strong className='flex text-3xl font-thin leading-none text-left text-neutral-600 lg:text-4xl'>
                          {individualEvent.eventCategory}
                          <span className='text-sm'></span>
                        </strong>
                        <div
                          className={`badge badge-${
                            isCancelledorReschedule ? 'primary' : 'secondary'
                          } gap-2 my-2`}
                        >
                          {individualEvent.status}
                        </div>
                        <span className='mt-1 text-xs font-normal leading-relaxed text-gray-700'>
                          {individualEvent.clientName}
                          <p>EventID: {individualEvent._id}</p>
                        </span>
                      </div>
                      {/* <div className='prose md:flex-grow prose-md'> */}

                      <details className='w-full bg-[#E8F0FF] group rounded-lg border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden'>
                        <summary className='flex cursor-pointer items-center justify-between gap-1.5 '>
                          <h2 className='text-lg font-medium text-gray-900'>
                            <p>Event Details</p>
                            <div className='badge badge-info gap-2'>
                              Due Date: {individualEvent.dueDate}
                            </div>
                          </h2>

                          <span className='shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        </summary>

                        <p className='mt-4 leading-relaxed text-gray-700 '>
                          Event Notes: {individualEvent.notes}
                        </p>
                      </details>
                      {/* </div> */}
                      <div className='flex flex-col ml-3 mt-[-20px]'>
                        <div className='m-4'>
                          <button
                            className='btn btn-wide btn-sm btn-error m-2'
                            onClick={() => handleDeleteEvent(individualEvent._id)}
                          >
                            Delete
                          </button>
                          {/* <button className='btn btn-wide btn-sm btn-neutral m-2'>
                            Edit Event
                          </button> */}
                          <EditEvent Id={individualEvent._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}
