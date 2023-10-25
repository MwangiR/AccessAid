export default function ViewClients() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full px-10 my-4 mx-20 py-6 bg-white rounded-lg shadow-md '>
          <div className='mt-2'>
            <a className='text-2xl text-gray-700 font-bold hover:text-gray-600' href='#'>
              Clients
            </a>
          </div>

          <div className='py-2 flex flex-wrap md:flex-nowrap'>
            <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
              <span className='mt-1 text-gray-500 text-sm'>LAST UPDATED: 12 Jun 2019</span>
              <span className='font-semibold title-font text-gray-700'>Client Name</span>
            </div>
            <div className='md:flex-grow my-0'>
              <div className='w-full divide-y divide-slate-200 rounded'>
                <details className='group p-4' open>
                  <summary className='relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6  shrink-0  stroke-gray-500  '
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      aria-labelledby='title-ac07 desc-ac07'
                    >
                      {/* <title id='title-ac07'>Leading icon</title>
                      <desc id='desc-ac07'>Icon that describes the summary</desc> */}
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z'
                      />
                    </svg>
                    <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>
                      Client Details
                    </h2>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      aria-labelledby='title-ac08 desc-ac08'
                    >
                      <title id='title-ac08'>Open icon</title>
                      <desc id='desc-ac08'>icon that represents the state of the summary</desc>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                    </svg>
                  </summary>

                  <p className='leading-relaxed my-1'>
                    Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up
                    snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke
                    vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.
                  </p>
                </details>
              </div>
            </div>
          </div>
          <div className='divider mx-16'></div>
          <div className='py-2 flex flex-wrap md:flex-nowrap'>
            <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
              <span className='mt-1 text-gray-500 text-sm'>LAST UPDATED: 12 Jun 2019</span>
              <span className='font-semibold title-font text-gray-700'>Client Name</span>
            </div>
            <div className='md:flex-grow my-0'>
              <div className='w-full divide-y divide-slate-200 rounded'>
                <details className='group p-4' open>
                  <summary className='relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6  shrink-0  stroke-gray-500  '
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      aria-labelledby='title-ac07 desc-ac07'
                    >
                      {/* <title id='title-ac07'>Leading icon</title>
                      <desc id='desc-ac07'>Icon that describes the summary</desc> */}
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z'
                      />
                    </svg>
                    <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>
                      Client Details
                    </h2>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      aria-labelledby='title-ac08 desc-ac08'
                    >
                      <title id='title-ac08'>Open icon</title>
                      <desc id='desc-ac08'>icon that represents the state of the summary</desc>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                    </svg>
                  </summary>
                  <p className='leading-relaxed my-1'>
                    Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up
                    snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke
                    vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
