import { useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';
import { useState, useEffect } from 'react';

/* eslint-disable react/prop-types */
export default function ClientMedication({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  const [individualClientMedication, setIndividualClientMedication] = useState(
    data?.client?.Medications || [],
  );

  useEffect(() => {
    if (!loading) {
      setIndividualClientMedication(data?.client?.Medications || []);
    }
  }, [loading, data, clientId]);

  console.log('Indicidual Client Medication', individualClientMedication);

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }

  return (
    <>
      {individualClientMedication.length === 0 ? (
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
          <span>No Medication found for this client</span>
        </div>
      ) : (
        individualClientMedication.map((individualMedication) => {
          //   const statusClass =
          //     individualMedication.status === false ? 'badge badge-primary cursor-pointer' : '';
          return (
            <div
              className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'
              key={individualMedication._id}
            >
              <div className=' flex flex-col lg:px-6'>
                <div>
                  <div className='flex flex-wrap py-8 md:flex-nowrap'>
                    <div className='flex flex-col flex-shrink-0 px-2 mb-6 md:w-60 md:mb-0'>
                      <strong className='flex text-3xl font-thin leading-none text-left text-neutral-600 lg:text-4xl'>
                        {individualMedication.medicationName}
                        <span className='text-sm'>
                          <div className='badge badge-success gap-2'>
                            {individualMedication.status}
                          </div>
                        </span>
                      </strong>
                      <span className='mt-2 text-xs font-normal leading-relaxed text-gray-700'>
                        <div className='badge badge-primary badge-outline'>
                          {individualMedication.timeOfDay}
                        </div>
                        <p className='mt-1'>ID: {individualMedication._id}</p>
                      </span>
                    </div>
                    <div className='prose md:flex-grow prose-md'>
                      <div className='bg-[#E8F0FF]'>
                        <details className='group p-4'>
                          <summary className='relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6  shrink-0  stroke-emerald-500  '
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              aria-labelledby='title-ac09 desc-ac09'
                            >
                              <title id='title-ac09'>Leading icon</title>
                              <desc id='desc-ac09'>Icon that describes the summary</desc>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
                              />
                            </svg>
                            Medication Details
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              aria-labelledby='title-ac10 desc-ac10'
                            >
                              <title id='title-ac10'>Open icon</title>
                              <desc id='desc-ac10'>
                                icon that represents the state of the summary
                              </desc>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 4v16m8-8H4'
                              />
                            </svg>
                          </summary>
                          <div className='p-4'>
                            <div className='flex flex-row items-baseline rounded-lg border border-gray-700 px-2 hover:border-[#840032]'>
                              <strong className='font-medium text-white'>Description: </strong>
                              <p className='mt-1 text-s font-medium text-gray-300 ml-4'>
                                {individualMedication.description}
                              </p>
                            </div>
                            <div className='mt-2 flex flex-row items-baseline rounded-lg border border-gray-700 px-2 hover:border-[#840032]'>
                              <strong className='font-medium text-white'>Frequency: </strong>
                              <p className='mt-1 text-s font-medium text-gray-300 ml-4'>
                                {individualMedication.frequency}
                              </p>
                            </div>
                            <div className=' mt-2 flex flex-row items-baseline rounded-lg border border-gray-700 px-2 hover:border-[#840032]'>
                              <strong className='font-medium text-white'>Quantity: </strong>
                              <p className='mt-1 text-s font-medium text-gray-300 ml-4'>
                                {individualMedication.quantity}
                              </p>
                            </div>
                            <div className='mt-2 flex flex-row items-baseline rounded-lg border border-gray-700 px-2 hover:border-[#840032]'>
                              <strong className='font-medium text-white'>Duration: </strong>
                              <p className='mt-1 text-s font-medium text-gray-300 ml-4'>
                                {individualMedication.duration}
                              </p>
                            </div>
                            <div className='mt-2 flex flex-row items-baseline rounded-lg border border-gray-700 px-2 hover:hover:border-[#840032]'>
                              <strong className='font-medium text-white'>Notes: </strong>
                              <p className='mt-1 text-s font-medium text-gray-300 ml-4'>
                                {individualMedication.notes}
                              </p>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                    <div className='flex flex-col ml-3 mt-[-20px]'>
                      <div className='m-4'>
                        <button
                          className='btn btn-wide btn-sm btn-error m-2'
                          // onClick={() => handleDeleteEvent(individualEvent._id)}
                        >
                          Delete Medication
                        </button>
                        <button className='btn btn-wide btn-sm btn-neutral m-2'>
                          Edit Medication
                        </button>
                        {/* <EditEvent Id={individualEvent._id} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
