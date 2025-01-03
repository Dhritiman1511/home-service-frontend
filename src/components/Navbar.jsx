import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { searchServiceByName } from "../services/serviceService";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authData, logout } = useAuth();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      handleSearch(value);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      const results = await searchServiceByName(query);
      setSearchResults(Array.isArray(results) ? results : []);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching services:", error);
      setSearchResults([]);
    }
  };

  const handleResultClick = (serviceId) => {
    setShowResults(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    navigate(`/service/${serviceId}`);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/MAINLOGO.svg" alt="Logo" className="w-12 h-12" />
            <span className="text-4xl font-bold">CallOnce</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to={authData ? 
                (authData.role === "admin" ? "/admin/dashboard" : 
                 authData.role === "service_provider" ? "/provider/dashboard" : 
                 "/user/dashboard") : "/"
              }
              className="text-black font-semibold hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to={authData ? 
                (authData.role === "admin" ? "/admin/dashboard" : 
                 authData.role === "service_provider" ? "/provider/dashboard" : 
                 "/services") : "/services"
              }
              className="text-black font-semibold hover:text-gray-900"
            >
              Services
            </Link>
            <Link to="/help" className="text-black font-semibold hover:text-gray-900">
              Help
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for 'AC Repairing'"
              className="w-[300px] pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 border-2 border-gray-500"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
                onMouseLeave={() => setShowResults(false)}
              >
                {searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleResultClick(result._id)}
                  >
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-600">{result.description}</div>
                    <div className="text-sm text-gray-500">₹{result.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile/Auth */}
          {authData ? (
            <div className="relative group">
              <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none">
                <img
                  src={authData.profileImage || "/user.svg"}
                  alt="Profile"
                  className="w-8 h-8 object-cover"
                />
              </button>
              <div className="absolute right-0 mt-0 w-28 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left font-semibold text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/MAINLOGO.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold">CallOnce</span>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar - Always visible */}
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for 'AC Repairing'"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 border-2 border-gray-500"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearchSubmit}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>

              {/* Mobile Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                  {searchResults.map((result) => (
                    <div
                      key={result._id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleResultClick(result._id)}
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-600">{result.description}</div>
                      <div className="text-sm text-gray-500">₹{result.price}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="pb-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to={authData ? 
                    (authData.role === "admin" ? "/admin/dashboard" : 
                     authData.role === "service_provider" ? "/provider/dashboard" : 
                     "/user/dashboard") : "/"
                  }
                  className="text-black font-semibold hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to={authData ? 
                    (authData.role === "admin" ? "/admin/dashboard" : 
                     authData.role === "service_provider" ? "/provider/dashboard" : 
                     "/services") : "/services"
                  }
                  className="text-black font-semibold hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/help"
                  className="text-black font-semibold hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Help
                </Link>
                {authData ? (
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 font-semibold hover:text-red-700"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-black font-semibold hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;