import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { UPDATE_MEDCHART } from '../../utils/mutations';

/* eslint-disable react/prop-types */
export default function MedicationTable({ medicationObj }) {
  const [medications, setMedications] = useState(medicationObj);
  const [checkedMedications, setCheckedMedications] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');

  const [updateMedchart] = useMutation(UPDATE_MEDCHART);

  const handleCheckboxChange = (medId) => {
    const updatedMedications = medications.map((medication) => {
      if (medication._id === medId) {
        const newQuantity = medication.quantity - medication.dosage;
        const newStatus = newQuantity === 0 ? 'Finished' : medication.status;
        console.log('New Status', newQuantity);
        return { ...medication, quantity: newQuantity, status: newStatus };
      }
      return medication;
    });
    setMedications(updatedMedications);
    const updatedCheckedMedications = { ...checkedMedications };
    updatedCheckedMedications[medId] = !updatedCheckedMedications[medId];
    setCheckedMedications(updatedCheckedMedications);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
        setCheckedMedications({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  async function handleUpdateMedchart() {
    const updateMedChart = medications.map((medication) => ({
      _id: medication._id,
      status: medication.status,
      quantity: medication.quantity.toString(),
    }));

    try {
      await updateMedchart({
        variables: {
          updateMedchart: updateMedChart,
        },
      });
      console.log('Medchart updated Successfully');
      setAlertType('success');
      setAlertMessage('Medchart updated Successfully');
    } catch (err) {
      console.error(err);
      setAlertType('error');
      setAlertMessage('Error updating medchart');
    }
  }

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
              {alertMessage && (
                <div>
                  <div className='toast toast-top toast-center'>
                    <div className={`alert alert-${alertType}`}>
                      <span>{alertMessage}</span>
                    </div>
                  </div>
                </div>
              )}
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
                  const isFinished =
                    medication.status === 'Finished' || medication.status === 'Ceased';
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
                              checked={checkedMedications[medication._id] || false}
                              className='checkbox checkbox-default'
                              onChange={() => handleCheckboxChange(medication._id)}
                              disabled={isFinished}
                            />
                          </label>
                        </div>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
              <button className='btn btn-info mt-6' onClick={handleUpdateMedchart}>
                Update MedChart
              </button>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
