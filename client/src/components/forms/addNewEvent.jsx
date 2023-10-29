/* eslint-disable react/prop-types */
export default function AddNewEvent({ clientId }) {
  return (
    <>
      <button
        className='btn btn-outline btn-info'
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Add New Event
      </button>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <p>ClientId: {clientId}</p>
          <p className='py-4'>Add Event</p>
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
