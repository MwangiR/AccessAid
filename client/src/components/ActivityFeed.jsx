import { useQuery } from '@apollo/client';
import { GET_TIMELINE_EVENTS } from '../utils/queries';
// import dayjs from 'dayjs';

export default function ActivityFeed() {
  const { loading, data } = useQuery(GET_TIMELINE_EVENTS);
  const eventsData = data?.clients || [];

  if (loading) {
    <span className='loading loading-dots loading-lg'></span>;
  }
  console.log('events', eventsData);
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full px-10 my-4 mx-20 py-6 bg-white outline-10 rounded-lg shadow-md '>
          <div className='mt-2 my-3'>
            <a className='text-2xl text-gray-700 font-bold hover:text-gray-600' href='#'>
              Communication Diary
            </a>
          </div>
          <ul
            aria-label='Nested user feed'
            role='feed'
            className='relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 '
          >
            {eventsData &&
              eventsData.map((event) => {
                return (
                  <>
                    <li role='article' className='relative pl-6 ' key={event.name}>
                      <div className='flex flex-col flex-1 gap-2'>
                        <a
                          href='#'
                          className='absolute z-10 inline-flex items-center justify-center w-6 h-6 text-white rounded-full -left-3 ring-2 ring-white'
                        >
                          <img
                            src='https://i.pravatar.cc/48?img=1'
                            alt='user name'
                            title='user name'
                            width='48'
                            height='48'
                            className='max-w-full rounded-full'
                          />
                        </a>
                        <h4 className='flex flex-col items-start text-base font-medium leading-6 text-slate-700 md:flex-row lg:items-center'>
                          <span className='flex-1'>
                            {event.name}
                            <span className='text-sm font-normal text-slate-500'>
                              {' '}
                              created a new thread
                            </span>
                          </span>
                          <span className='text-xs font-normal text-slate-400'> 3 hours ago</span>
                        </h4>
                        <p className='text-sm text-slate-500'>
                          We just released windUI v1.5, which includes a brand new component. An
                          activity feed is a chronological record of system events or user actions.
                          Have a look at the feed page and let me know what you think. Feedback is
                          highly appreciated.{' '}
                        </p>
                        {event.timelineEvents &&
                          event.timelineEvents.map((feed) => {
                            return (
                              <>
                                <li role='article' className='relative pl-6 lg:pl-8 '>
                                  <div className='flex flex-col flex-1 gap-4'>
                                    <a
                                      href='#'
                                      className='absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white'
                                    >
                                      <img
                                        src='https://i.pravatar.cc/48?img=1'
                                        alt='user name'
                                        title='user name'
                                        width='48'
                                        height='48'
                                        className='max-w-full rounded-full'
                                      />
                                    </a>
                                    <h4 className='flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center'>
                                      <span className='flex-1'>
                                        Mary Jane{' '}
                                        <span className='text-base font-normal text-slate-500'>
                                          {' '}
                                          replied{' '}
                                        </span>
                                      </span>
                                      <span className='text-sm font-normal text-slate-400'>
                                        {' '}
                                        2 hours ago
                                      </span>
                                    </h4>
                                    <p className=' text-slate-500'>
                                      Hey john! Did you had a look at the new component?{' '}
                                    </p>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                      </div>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
