/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';

export default function SingleClientEvent({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  const individualClientEvents = data?.client.Events || [];
  console.log('Single Client Event', individualClientEvents);

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }
  return (
    <>
      <section className='flex flex-col'>
        {individualClientEvents.map((individualEvent) => {
          const statusClass =
            individualEvent.status === false ? 'badge badge-primary cursor-pointer' : '';
          return (
            <div
              className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'
              key={individualEvent._id}
            >
              <div className=' flex flex-col lg:px-6'>
                <div>
                  <div className='flex flex-wrap py-8 md:flex-nowrap'>
                    <div className='flex flex-col flex-shrink-0 px-2 mb-6 md:w-60 md:mb-0'>
                      <strong className='flex text-3xl font-thin leading-none text-left text-neutral-600 lg:text-4xl'>
                        {individualEvent.clientName} <span className='text-sm'>PPI </span>
                      </strong>
                      <span className='mt-1 text-xs font-normal leading-relaxed text-gray-700'>
                        {individualEvent.eventCategory}
                      </span>
                    </div>
                    <div className='prose md:flex-grow prose-md'>
                      <p>{individualEvent.notes}</p>
                      {individualEvent.status === false && (
                        <div className={statusClass}>Pending</div>
                      )}
                    </div>
                    <div className='flex flex-col ml-3 mt-[-20px]'>
                      <div className='m-4'>
                        <button className='btn btn-wide btn-sm btn-error m-2'>Delete</button>
                        <button className='btn btn-wide btn-sm btn-neutral m-2'>Edit Event</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
