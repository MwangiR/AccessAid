import { useState } from 'react';

/* eslint-disable react/prop-types */
export default function MedicationTable({ medicationObj }) {
  const [medications, setMedications] = useState(medicationObj);

  const handleCheckboxChange = (medId) => {
    const updatedMedications = medications.map((medication) => {
      if (medication._id === medId) {
        const newQuantity = medication.quantity - medication.dosage;
        const newStatus = newQuantity === 0 ? 'Finished' : medication.status;
        return { ...medication, quantity: newQuantity, status: newStatus };
      }
      return medication;
    });
    setMedications(updatedMedications);
  };

  console.log('Meds loaded...', medicationObj);
  return (
    <>
      <section>
        <div className='overflow-x-auto'>
          {medicationObj.length === 0 ? (
            <div className='alert alert-info w-full mt-2'>
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
              <span>No medications at the moment</span>
            </div>
          ) : (
            <table className='table'>
              {/* head */}
              <thead>
                <tr>
                  <th>Medication Name</th>
                  <th>Client Name</th>
                  <th>Status</th>
                  <th>Administered</th>
                </tr>
              </thead>
              <tbody>
                {medicationObj.map((medication) => {
                  return (
                    <tr key={medication._id}>
                      <td>
                        <div className='flex items-center space-x-3'>
                          <div>
                            <div className='font-bold'>{medication.medicationName}</div>
                            <div className='text-sm opacity-50'>{medication.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {medication.clientName}
                        <br />
                        <span className='badge badge-ghost badge-sm'>
                          Meds Remaining: {medication.quantity}
                        </span>
                      </td>
                      <td>
                        {medication.status}
                        <div className='text-sm opacity-50'>
                          <div className='badge badge-neutral badge-sm'>
                            Frequency: {medication.frequency}
                          </div>
                          <div className='badge badge-secondary badge-sm ml-3'>
                            Dosage: {medication.dosage}
                          </div>
                        </div>
                      </td>
                      <th>
                        <div className='form-control'>
                          <label className='cursor-pointer label'>
                            <input
                              type='checkbox'
                              checked={medication.status === 'Finished'}
                              className='checkbox checkbox-default'
                              onChange={() => handleCheckboxChange(medication._id)}
                            />
                          </label>
                        </div>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
