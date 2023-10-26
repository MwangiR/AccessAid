export default function ErrorPage() {
  return (
    <>
      <div className='grid h-screen px-4 bg-white place-content-center'>
        <h1 className='tracking-widest text-gray-500 uppercase'>404 | Not Found</h1>
        <a
          className='flex items-center py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none'
          href='/'
        >
          Back to Main Page
        </a>
      </div>
    </>
  );
}
