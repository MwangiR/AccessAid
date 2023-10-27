/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../utils/queries';

export default function BioData({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  const individualClient = data?.client || [];
  console.log('Single Client Data', individualClient);

  if (loading) {
    <span className='loading loading-dots loading-lg'></span>;
  }
  return (
    <>
      <div className='flex flex-col'>
        <div className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
            <div className='flex flex-row items-baseline'>
              <article className='prose lg:prose-xl'>Client Name:</article>
              <p className='font-mono ml-5'>{individualClient.name}</p>
            </div>
          </div>
        </div>
        <div className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
            <div className='flex flex-row items-baseline'>
              <article className='prose lg:prose-xl'>Client Email:</article>
              <p className='font-mono ml-5'>{individualClient.email}</p>
            </div>
          </div>
        </div>
        <div className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
            <div className='flex flex-row items-baseline'>
              <article className='prose lg:prose-xl'>Guardian Name:</article>
              <p className='font-mono ml-5'>{individualClient.guardianName}</p>
            </div>
          </div>
        </div>
        <div className='bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
            <div className='flex flex-row items-baseline'>
              <article className='prose lg:prose-xl'>Guardian Contact:</article>
              <p className='font-mono ml-5'>{individualClient.guardianContact}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
