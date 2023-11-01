export default function Introduciton() {
  return (
    <section
      className='py-28'
      style={{
        background:
          'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
      }}
    >
      <div className='max-w-screen-xl mx-auto px-4 md:text-center md:px-8'>
        <div className='max-w-xl space-y-3 md:mx-auto'>
          <h3 className='text-indigo-600 font-semibold'>Professional services</h3>
          <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
            Build the future with us
          </p>
          <p className='text-gray-600 text-justify'>
            We understand the importance of professional caregiving in today`&apos`s world. Our
            mission is to make a positive impact on the lives of those in need by delivering
            high-quality care and support. We believe that everyone deserves to live a life filled
            with dignity, comfort, and happiness.
          </p>
        </div>
        <div className='mt-4'>
          <a
            // href='javascript:void(0)'
            className='inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none cursor-pointer'
            onClick={() => document.getElementById('login').showModal()}
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
