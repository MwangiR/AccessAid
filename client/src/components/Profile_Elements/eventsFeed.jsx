/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';
import formatDate from '../../utils/dateFormat';

const EventItem = ({ event }) => {
  const statusClass = event.status === false ? 'badge badge-primary cursor-pointer ml-6' : '';
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
          <span className='text-sm font-normal text-slate-400'>{formatDate(event.createdAt)}</span>
          {event.status === false && <div className={statusClass}>Pending</div>}
        </h4>
        <p className=' text-slate-500'>{event.notes}</p>
      </div>
    </li>
  );
};

export default function EventsFeed() {
  const { loading, data } = useQuery(GET_EVENTS);
  const eventsData = data?.events?.sort((a, b) => b.createdAt - a.createdAt) || [];

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
          {eventsData.map((event) => (
            <EventItem event={event} key={event._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
