/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';

export default function SingleClientEvent({ clientId }) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: clientId },
  });

  const individualClientEvent = data?.client.Events || [];
  console.log('Single Client Event', individualClientEvent);

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }
  return <>Single Event</>;
}
