export default function ErrorPage() {
  return (
    <>
      <div className='grid h-screen px-4 bg-white place-content-center'>
        <h1 className='tracking-widest text-gray-500 uppercase'>404 | Not Found</h1>
        <a className='flex items-center hover:text-blue-700' href='/'>
          Back to Main Page
        </a>
      </div>
    </>
  );
}
