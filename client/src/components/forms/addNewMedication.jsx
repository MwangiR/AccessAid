import { useMutation } from '@apollo/client';
import { CREATE_MEDICATION } from '../../utils/mutations';
import { useState } from 'react';

/* eslint-disable react/prop-types */
export default function AddNewMedication({ clientId }) {
  const [addNewMedication] = useMutation(CREATE_MEDICATION);

  const [medicationInput, setMedicationInput] = useState({
    medicationName: '',
    timeOfDay: '',
    notes: '',
    description: '',
    quantity: 0,
    frequency: '',
    dosage: 0,
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicationInput({ ...medicationInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addNewMedication({
        variables: {
          medicationInput: {
            ...medicationInput,
            clientId,
          },
        },
      });
      console.log('New Medication Data', data);

      setMedicationInput({
        medicationName: '',
        timeOfDay: '',
        notes: '',
        description: '',
        quantity: 0,
        frequency: '',
        dosage: 0,
        status: '',
      });
      alert('Medication Added');
      window.location.reload();
    } catch (err) {
      console.error('Error', err.message);
      alert('Error adding medication. Please try again.', err.message);
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='btn btn-outline btn-info tooltip'
        data-tip='Select Client'
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Add New Meds
      </button>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#D4E6B5] text-navGray'>
          <p>ClientId: {clientId}</p>
          <form className='space-y-4 m-4' onSubmit={handleSubmit}>
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
                  onChange={handleInputChange}
                  value={medicationInput.medicationName}
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
                  onChange={handleInputChange}
                  value={medicationInput.frequency}
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
                  onChange={handleInputChange}
                  value={medicationInput.quantity}
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
                  onChange={handleInputChange}
                  value={medicationInput.dosage}
                  name='dosage'
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
                  onChange={handleInputChange}
                  value={medicationInput.status}
                >
                  <option disabled selected>
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
                  onChange={handleInputChange}
                  value={medicationInput.timeOfDay}
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
                onChange={handleInputChange}
                value={medicationInput.description}
                name='description'
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
                onChange={handleInputChange}
                value={medicationInput.notes}
              ></textarea>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto btn btn-outline btn-primary'
              >
                Add Medication
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
