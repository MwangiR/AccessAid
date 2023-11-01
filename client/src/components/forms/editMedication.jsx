import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_MEDICATION } from '../../utils/queries';
import { UPDATE_MEDICATION } from '../../utils/mutations';
import { useEffect, useState } from 'react';

export default function EditMedication(prop) {
  console.log('Medication id accessed', prop.Id);
  const { loading, data } = useQuery(GET_SINGLE_MEDICATION, {
    variables: { id: prop.Id },
  });

  const [alertMessage, setAlertMessage] = useState(null);

  const singleMedication = data?.medication || {};

  //   console.log('Edit single medication', singleMedication);

  const [updateMedication] = useMutation(UPDATE_MEDICATION);
  const [formData, setFormData] = useState({
    medicationName: singleMedication.medicationName || '',
    timeOfDay: singleMedication.timeOfDay || '',
    frequency: singleMedication.frequency || '',
    quantity: singleMedication.quantity || 0,
    status: singleMedication.status || 'Active',
    dosage: singleMedication.dosage || 0,
    notes: singleMedication.notes || '',
    description: singleMedication.description || '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedication({
        variables: {
          updateMedicationInput: {
            _id: singleMedication._id,
            medicationName: formData.medicationName,
            timeOfDay: formData.timeOfDay,
            frequency: formData.frequency,
            quantity: formData.quantity,
            status: formData.status,
            dosage: formData.dosage,
            notes: formData.notes,
            description: formData.description,
          },
        },
      });
      setAlertMessage('Successfully changed');
    } catch (err) {
      console.log(err.message);
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
      {alertMessage && (
        <div>
          <div className='toast toast-top toast-center'>
            <div className={`alert alert-info`}>
              <span>{alertMessage}</span>
            </div>
          </div>
        </div>
      )}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='btn btn-wide btn-sm btn-neutral m-2'
        onClick={() => document.getElementById('editMedication').showModal()}
      >
        Edit Medication
      </button>
      <dialog id='editMedication' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#98B9AB]'>
          <h3 className='font-bold text-lg'>MedicationID: {prop.Id}</h3>
          <form className='space-y-4 m-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className='sr-only' htmlFor='name'>
                  Medication Name
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder='Medication Name'
                  type='text'
                  name='medicationName'
                  value={formData.medicationName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='sr-only' htmlFor='name'>
                  Frequency
                </label>
                <input
                  className='w-full rounded-lg border-gray-200 p-3 text-sm'
                  placeholder='Frequency'
                  type='text'
                  name='frequency'
                  value={formData.frequency}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Quantity</span>
                </label>
                <input
                  name='quantity'
                  value={formData.quantity}
                  onChange={handleInputChange}
                  type='number'
                  placeholder='Quantity'
                  className='input input-bordered w-full max-w-xs'
                />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Dosage</span>
                </label>
                <input
                  name='dosage'
                  value={formData.dosage}
                  onChange={handleInputChange}
                  type='number'
                  placeholder='Dosage'
                  className='input input-bordered w-full max-w-xs'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Med Status</span>
                </label>
                <select
                  className='select select-primary w-full max-w-xs'
                  name='status'
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option disabled value=''>
                    Status
                  </option>
                  <option value='Active'>Active</option>
                  <option value='Ceased'>Ceased</option>
                  <option value='Other'>Other...</option>
                </select>
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Med Status</span>
                </label>
                <select
                  className='select select-primary w-full max-w-xs'
                  name='timeOfDay'
                  value={formData.timeOfDay}
                  onChange={handleInputChange}
                >
                  <option disabled selected>
                    Time Of Day
                  </option>
                  <option value='Morning'>Morning</option>
                  <option value='Afternoon'>Afternoon</option>
                  <option value='Night'>Night</option>
                  <option value='PRN'>PRN</option>
                </select>
              </div>
            </div>

            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <input
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                type='text'
                placeholder='Description'
                className='input input-bordered w-full max-w-xs'
              />
            </div>

            <div>
              <label className='sr-only' htmlFor='message'>
                Notes
              </label>
              <textarea
                className='w-full rounded-lg border-gray-200 p-3 text-sm'
                placeholder='Notes'
                rows='8'
                name='notes'
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                onClick={handleSubmit}
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
              >
                Edit Medication
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
