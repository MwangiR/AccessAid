import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../utils/queries';

export default function EventsFeed() {
  const { loading, data } = useQuery(GET_EVENTS);

  const eventsData = data?.events || [];

  console.log('Events', eventsData);

  if (loading) {
    <span className='loading loading-dots loading-lg'></span>;
  }
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full px-10 my-4 mx-20 py-6 bg-white rounded-lg shadow-md '>
          <div className='mt-2'>
            <a className='text-2xl text-gray-700 font-bold hover:text-gray-600' href='#'>
              Events
            </a>
          </div>
          <ul
            aria-label='User feed'
            role='feed'
            className='relative my-5 flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 '
          >
            {eventsData &&
              eventsData.map((event) => {
                return (
                  <li role='article' className='relative pl-8 ' key={event._id}>
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
                          <span className='text-base font-normal text-slate-500'>
                            {' '}
                            has a new {event.eventCategory}
                          </span>
                        </span>
                        <span className='text-sm font-normal text-slate-400'>
                          {event.createdAt}
                        </span>
                        {event.status === false ? (
                          <div className='badge badge-primary cursor-pointer ml-6'>Pending</div>
                        ) : null}
                      </h4>
                      <p className=' text-slate-500'>{event.notes}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
