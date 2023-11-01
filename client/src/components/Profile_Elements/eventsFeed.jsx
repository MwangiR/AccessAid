/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';
import formatDate from '../../utils/dateFormat';

const EventItem = ({ event }) => {
  // const statusClass = event.status === 'true' ? 'badge badge-primary cursor-pointer ml-6' : '';
  return (
    <li role='article' className='relative pl-8 mt-4' key={event._id}>
      <div className='flex flex-col flex-1 gap-4'>
        <a
          href='#'
          className='absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white'
        >
          <img
            src='https://i.pravatar.cc/48'
            alt='user name'
            title='user name'
            width='48'
            height='48'
            className='max-w-full rounded-full'
          />
        </a>
        <h4 className='flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center'>
          <span className='flex-1'>
            {event.clientName}
            <span className='ml-1 text-base font-normal text-slate-500'>
              has a new {event.eventCategory}
            </span>
          </span>
          <span className='text-sm font-normal text-slate-400'>
            Created On: {formatDate(event.createdAt)}
          </span>
          <div className='mx-3 badge badge-primary badge-outline'>{event.status}</div>
        </h4>
        <div className='collapse bg-[#AFBED1]'>
          <input type='checkbox' className='peer' />
          <div className='collapse-title bg-[#AFBED1] text-navGray peer-checked:bg-secondary peer-checked:text-secondary-content'>
            Event Notes
          </div>
          <div className='collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content'>
            <p className=' text-slate-500'>{event.notes}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function EventsFeed() {
  const { loading, data } = useQuery(GET_EVENTS);
  const eventsData = data?.events?.slice().sort((a, b) => b.createdAt - a.createdAt) || [];

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full px-10 my-4 mx-20 py-6 bg-white rounded-lg shadow-md '>
        <div className='mt-2 mb-4'>
          <a className='text-2xl text-gray-700 font-bold hover:text-gray-600 my-4' href='#'>
            Events
          </a>
        </div>
        <ul aria-label='User feed' role='feed'>
          {eventsData.length === 0 ? (
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
              <span>No New Events</span>
            </div>
          ) : (
            eventsData.map((event) => <EventItem event={event} key={event._id} />)
          )}
        </ul>
      </div>
    </div>
  );
}
