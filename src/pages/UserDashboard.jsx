import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getServices } from '../services/serviceService';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { authData, logout } = useAuth(); // Access the logout function from context
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch user's bookings and available services
  useEffect(() => {
    if (authData) {
      // Fetch all available services
      getServices()
        .then((data) => setServices(data))
        .catch((error) => console.log('Error fetching services:', error));
    }
  }, [authData]);

  const handleViewBookings = () => {
    navigate('/booking-details'); // Redirect to the booking details page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

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
          {services.map((service) => (
            <li key={service._id} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm">{service.description}</p>
              <p className="text-sm font-bold">Price: ${service.price}</p>
              <p className="text-sm">Provider: {service.providerName}</p> {/* Displaying the provider name */}
              <Link
                to={`/service/${service._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
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
