/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';
import { DELETE_CLIENT } from '../../utils/mutations';
import { useState, useEffect } from 'react';

export default function BioData({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  // const clientdata = data || {};
  const singleClienData = data?.client || {};
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const [individualClient, setIndividualClient] = useState(singleClienData);

  useEffect(() => {
    if (!loading && data) {
      setIndividualClient(data?.client || {});
    }
  }, [loading, data, clientId]);

  // const individualClient = data?.client || [];
  console.log('Single Client Data', individualClient);

  async function handleDeleteUser(clientId) {
    console.log('Deleting user with ID:', clientId);
    try {
      await deleteClient({
        variables: { clientId },
      });
      // setIndividualClient((client) => client.filter((client) => client._id !== clientId));
      const updatedClient = { ...individualClient };
      const updatedClientsArray = Object.values(updatedClient.client || {});

      const filterClients = updatedClientsArray.filter((client) => client._id !== clientId);

      setIndividualClient({ ...individualClient, client: filterClients });
      window.location.reload();
    } catch (err) {
      console.error('Error', err.message);
    }
  }

  if (loading) {
    <span className='loading loading-dots loading-lg'></span>;
  }
  return (
    <>
      {/* individual client */}
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
        <div className='m-4 justify-center'>
          <button
            className='btn btn-wide btn-sm btn-error m-2'
            onClick={() => handleDeleteUser(clientId)}
          >
            Delete Client
          </button>
          <button className='btn btn-wide btn-sm btn-neutral m-2'>Edit Client</button>
        </div>
      </div>
    </>
  );
}
