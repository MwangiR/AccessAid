import { useQuery } from '@apollo/client';
import { GET_MEDICATIONS } from '../utils/queries';
import MedicationTable from '../components/manage_Medication_tables/Medicationtable';

export default function ManageMedications() {
  const { loading, data } = useQuery(GET_MEDICATIONS);

  const medications = data?.medications || [];
  console.log('Medications', data?.medications);

  const morningMedications = medications.filter((medication) => medication.timeOfDay === 'Morning');
  const afternoonMedications = medications.filter(
    (medication) => medication.timeOfDay === 'Afternoon',
  );
  const nightMedications = medications.filter((medication) => medication.timeOfDay === 'Night');
  const asNeededMedications = medications.filter((medication) => medication.timeOfDay === 'PRN');

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }
  return (
    <>
      <div className='m-4'>
        <section className='w-full divide-y divide-slate-200 rounded bg-white shadow-md shadow-slate-200'>
          <details className='group p-4'>
            <summary className='relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
              Morning Medication
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'
                aria-labelledby='title-ac14 desc-ac14'
              >
                <title id='title-ac14'>Open icon</title>
                <desc id='desc-ac14'>icon that represents the state of the summary</desc>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
            </summary>
            <MedicationTable medicationObj={morningMedications} />
          </details>
          <details className='group p-4'>
            <summary className='relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
              Afternoon Medication
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'
                aria-labelledby='title-ac15 desc-ac15'
              >
                <title id='title-ac15'>Open icon</title>
                <desc id='desc-ac15'>icon that represents the state of the summary</desc>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
            </summary>
            <MedicationTable medicationObj={afternoonMedications} />
          </details>
          <details className='group p-4'>
            <summary className='relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
              Night Medication
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'
                aria-labelledby='title-ac16 desc-ac16'
              >
                <title id='title-ac16'>Open icon</title>
                <desc id='desc-ac16'>icon that represents the state of the summary</desc>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
            </summary>
            <MedicationTable medicationObj={nightMedications} />
          </details>
          <details className='group p-4'>
            <summary className='relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
              PRN Medication
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1.5'
                aria-labelledby='title-ac16 desc-ac16'
              >
                <title id='title-ac16'>Open icon</title>
                <desc id='desc-ac16'>icon that represents the state of the summary</desc>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
            </summary>
            <MedicationTable medicationObj={asNeededMedications} />
          </details>
        </section>
      </div>
    </>
  );
}
