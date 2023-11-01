export default function AboutUs() {
  return (
    <section>
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
          <div className='grid gap-8 md:grid-cols-2 lg:gap-12'>
            <div>
              <div className='h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto'>
                <img
                  src='https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600&h=750'
                  loading='lazy'
                  alt='Photo by Martin Sanchez'
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>

            <div className='md:pt-8'>
              <p className='text-center font-bold text-indigo-500 md:text-left'>Who we are</p>

              <h1 className='mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left'>
                Our competitive advantage
              </h1>

              <p className='mb-6 text-gray-500 sm:text-lg md:mb-8'>
                We pride ourselves on being more than just a business – we're a dedicated team with
                a strong sense of purpose. Our competitive advantage is not just about providing a
                product or service; it's about making a positive impact on the lives of our
                customers. We believe in delivering excellence, and we're committed to doing so in
                every aspect of our work. Our team is driven by a common goal:
                <br />
                <br />
                To enhance the lives of those we serve. We achieve this by offering innovative
                solutions, superior customer service, and a genuine passion for what we do. or
                otherwise generated. It may be used to display a sample of fonts or generate text
                for testing. Filler text is dummy text which has no meaning however looks very
                similar to real text.
              </p>

              <h2 className='mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left'>
                About us
              </h2>

              <p className='mb-6 text-gray-500 sm:text-lg md:mb-8'>
                AccessAid is not just a site; we're a community. We are united by our core values of
                integrity, compassion, and commitment. Our journey is not about generating profit;
                it's about making a difference. Our services go beyond meeting the needs of our
                clients – we strive to exceed their expectations. What sets us apart is our
                unwavering dedication to quality, our exceptional team of professionals, and our
                relentless pursuit of excellence. We take pride in the trust that our clients place
                in us, and we work diligently to uphold that trust every day. Our commitment is to
                continue evolving, adapting, and growing to meet the ever-changing needs of our
                clients. Together, we will shape a brighter and more promising future for everyone
                we serve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
