import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_CLIENT } from '../../utils/queries';
import { UPDATE_CLIENT } from '../../utils/mutations';
import { useState, useEffect } from 'react';

export default function EditClient(prop) {
  const { loading, data } = useQuery(GET_SINGLE_CLIENT, {
    variables: { id: prop.Id },
  });
  const singleClient = data?.client || {};
  console.log('Edit client id', singleClient);

  const [alertMessage, setAlertMessage] = useState(null);

  const [updateClient] = useMutation(UPDATE_CLIENT);
  const [formData, setFormData] = useState({
    name: singleClient.name || '',
    email: singleClient.email || '',
    description: singleClient.description || '',
    guardianName: singleClient.guardianName || '',
    guardianContact: singleClient.guardianContact || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
        setFormData({});
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient({
        variables: {
          updateClientInput: {
            _id: singleClient._id,
            name: formData.name,
            email: formData.email,
            description: formData.description,
            guardianName: formData.guardianName,
            guardianContact: parseInt(formData.guardianContact),
          },
        },
      });
      setAlertMessage('Successfully Updated');
    } catch (err) {
      console.error(err.message);
      setAlertMessage(err.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-dots loading-lg'></span>
        </div>
      </>
    );
  }
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='btn btn-wide btn-sm btn-neutral m-2'
        onClick={() => document.getElementById('editClient').showModal()}
      >
        Edit Client
      </button>
      <dialog id='editClient' className='modal'>
        {alertMessage && (
          <div>
            <div className='toast toast-top toast-center'>
              <div className={`alert alert-info`}>
                <span>{alertMessage}</span>
              </div>
            </div>
          </div>
        )}
        <div className='modal-box w-11/12 max-w-5xl bg-[#98B9AB] space-y-2'>
          <h3 className='font-bold text-lg'>ClientId: {prop.Id}</h3>
          <div tabIndex={0} className='collapse collapse-arrow border border-base-300 bg-base-200'>
            <div className='collapse-title text-xl font-medium'>Previous Info</div>
            <div className='collapse-content text-navGray'>
              <p className='prose prose-base'>
                <strong>Client Name:</strong> {singleClient.name}
              </p>
              <p className='prose prose-base'>
                <strong>Client Email:</strong> {singleClient.email}
              </p>
              <p className='prose prose-base'>
                <strong>Guardian Name:</strong> {singleClient.guardianName}
              </p>
              <p className='prose prose-base'>
                <strong>Guardian Contact:</strong> {singleClient.guardianContact}
              </p>
              <p className='prose prose-base'>
                <strong>Description:</strong> {singleClient.description}
              </p>
            </div>
          </div>
          <form className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <label className='sr-only' htmlFor='name'>
                Name
              </label>

              <input
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder={`Previous Name ${singleClient.name}`}
                type='text'
                name='name'
                onChange={handleInputChange}
                value={formData.name}
              />
              <div>
                <label className='sr-only' htmlFor='email'>
                  Email
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder={`Previous Email: ${singleClient.email}`}
                  type='email'
                  name='email'
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className='sr-only' htmlFor='email'>
                  Guardian Name
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder={`Guardian ${singleClient.guardianName}`}
                  type='text'
                  name='guardianName'
                  onChange={handleInputChange}
                  value={formData.guardianName}
                />
              </div>

              <div>
                <label className='sr-only' htmlFor='phone'>
                  Guardian Contact
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder={`Guardian Contact ${singleClient.guardianContact}`}
                  type='text'
                  name='guardianContact'
                  onChange={handleInputChange}
                  value={formData.guardianContact}
                />
              </div>
            </div>

            <div>
              <label className='sr-only' htmlFor='message'>
                Description
              </label>

              <textarea
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Description'
                rows='8'
                name='description'
                onChange={handleInputChange}
                value={formData.description}
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
                onClick={handleSubmit}
              >
                Edit Client
              </button>
            </div>
          </form>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
