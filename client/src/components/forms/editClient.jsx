export default function EditClient(prop) {
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
        <div className='modal-box w-11/12 max-w-5xl bg-[#98B9AB]'>
          <h3 className='font-bold text-lg'>Hello! {prop.Id}</h3>
          <p className='py-4'>Click the button below to close</p>
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
