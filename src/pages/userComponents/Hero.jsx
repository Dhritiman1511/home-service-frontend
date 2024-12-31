const DownloadIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const WrenchIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-10 px-6 max-w-6xl">

        <h1 className="text-[70px] font-bold leading-[1.1] mt-4 mb-4">
          Expert Home Services, <br />
          Wherever You Need <br />
          Them
        </h1>

        <p className="text-gray-600 text-lg mb-10 max-w-2xl leading-[1.1]">
          Experience the convenience of professional home services right at your
          doorstep. From cleaning and maintenance to specialized tasks, find the
          help you need with just a click.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
            <DownloadIcon />
            <span>Download our app</span>
          </button>

          <button className="flex items-center px-6 py-3 border-2 border-black rounded-full hover:bg-gray-50 transition-colors">
            <WrenchIcon />
            <span>Get services</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
