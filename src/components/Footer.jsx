const Footer = () => {
  return (
    <footer className="bg-[#F3F4FF] text-gray-600 py-16 px-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Section */}
          <div>
            <h3 className="text-black font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">About us</a></li>
              <li><a href="#" className="hover:text-gray-800">Our team</a></li>
              <li><a href="#" className="hover:text-gray-800">Careers</a></li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-black font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-800">Customer reviews</a></li>
              <li><a href="#" className="hover:text-gray-800">Blog</a></li>
              <li><a href="#" className="hover:text-gray-800">Contact us</a></li>
            </ul>
          </div>

          {/* Be a partner Section */}
          <div>
            <h3 className="text-black font-semibold mb-4">Be a partner</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-800">Signup as professional</a></li>
              <li><a href="#" className="hover:text-gray-800">Recruiting</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="bg-[#E8E9FF] p-6 rounded-2xl">
            <h3 className="text-black font-semibold mb-4">Subscribe</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-lg border-0"
              />
              <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="text-sm">
              Hello, we are CallOnce. Our goal is to provide you the best service at your doorstep by considering all security.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="">
              <img src="/MAINLOGO.svg" alt="callonce" className="w-12 h-12" />
            </div>
            <span className="text-black font-extrabold text-4xl">CallOnce</span>
          </div>

          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-800">Terms</a>
            <a href="#" className="hover:text-gray-800">Privacy</a>
            <a href="#" className="hover:text-gray-800">Cookies</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        <p className="text-center mt-8">&copy; Copyright 2024 Call Once. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;