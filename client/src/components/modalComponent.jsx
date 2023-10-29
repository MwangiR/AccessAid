export default function modalComponent(Component, btnName) {
  return (
    <>
      <button
        className='btn btn-outline btn-secondary'
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        {btnName}
      </button>
      <dialog id='my_modal_4' className='modal text-navGray'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <Component />
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
