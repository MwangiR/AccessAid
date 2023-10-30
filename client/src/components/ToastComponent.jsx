export default function ShowToast(message, type) {
  return (
    <>
      <div className='toast toast-start toast-middle'>
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
        </div>
      </div>
    </>
  );
}
