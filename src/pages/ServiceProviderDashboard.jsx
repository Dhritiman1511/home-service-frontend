import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getProviderServices } from "../services/serviceService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CalendarIcon, PencilIcon, PlusCircle } from "lucide-react";

const ServiceProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const { authData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!authData || !authData.token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(authData.token);
      getProviderServices(decodedToken.id)
        .then((servicesData) => {
          setServices(servicesData);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [authData, loading, navigate]);

  const handleEditService = (service) => {
    // Navigate to the form page with the service ID
    navigate(`/service-form/${service._id}`);
  };

  const handleViewBookings = (serviceId) => {
    navigate(`/bookings/${serviceId}`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Services</h2>
        <button
          onClick={() => navigate("/service-form")}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Service
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">
                &#8377;{service.price}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    service.availability === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {service.availability}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <PencilIcon className="w-5 h-5 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleViewBookings(service._id)}
                  className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-300"
                >
                  <CalendarIcon className="w-5 h-5 mr-1" />
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;