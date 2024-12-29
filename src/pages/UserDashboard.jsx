import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getServices } from "../services/serviceService";
import { Link, useNavigate } from "react-router-dom";
import { searchServiceByName } from "../services/serviceService"; // Adjust the path as needed

const UserDashboard = () => {
  const { authData, logout } = useAuth(); // Access the logout function from context
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredServices, setFilteredServices] = useState([]); // State for filtered services
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch user's bookings and available services
  useEffect(() => {
    if (authData) {
      getServices()
        .then((data) => {
          setServices(data);
          setFilteredServices(data); // Initialize filteredServices with all services
        })
        .catch((error) => console.log("Error fetching services:", error));
    }
  }, [authData]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search for services by name
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setFilteredServices(services);
      return;
    }
    
    try {
      const results = await searchServiceByName(searchQuery);
      setFilteredServices(Array.isArray(results) ? results : [results]);
    } catch (error) {
      console.error("Error searching services:", error);
      setFilteredServices([]);
    }
  };

  const handleViewBookings = () => {
    navigate("/booking-details"); // Redirect to the booking details page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a service..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/2 mb-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Button to View Booking Details */}
      <div className="mb-6">
        <button
          onClick={handleViewBookings}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          View My Bookings
        </button>
      </div>

      {/* Available Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Services</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <li key={service._id} className="p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-medium">{service.name}</h3>
                <p className="text-sm">{service.description}</p>
                <p className="text-sm font-bold">Price: ${service.price}</p>
                <p className="text-sm">Provider: {service.providerName}</p>
                <Link
                  to={`/service/${service._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))
          ) : (
            <p>No services found.</p>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;