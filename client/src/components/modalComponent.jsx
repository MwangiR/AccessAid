export default function modalComponent(Component, btnName) {
  return (
    <>
      <button
        className='btn btn-outline btn-secondary '
        onClick={() => document.getElementById('modalComponent').showModal()}
      >
        {btnName}
      </button>
      <dialog id='modalComponent' className='modal text-navGray'>
        <div className='modal-box w-11/12 max-w-5xl bg-[#D4E6B5]'>
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
