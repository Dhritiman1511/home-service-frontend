import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCategories } from '../services/categoryService';
import { getProviderServices, addService, updateService } from '../services/serviceService';
import ServiceForm from './adminComponents/ServiceForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ServiceProviderDashboard = () => {
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    availability: 'Available',
  });
  const [categories, setCategories] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const { authData, loading, logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!authData || !authData.token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(authData.token);
      
      // Fetch both categories and services in parallel
      Promise.all([getCategories(), getProviderServices(decodedToken.id)])
        .then(([categoriesData, servicesData]) => {
          setCategories(categoriesData);
          setServices(servicesData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          if (error.response?.status === 401) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate("/login");
    }
  }, [authData, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prevService => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        const updatedService = await updateService(editingService._id, newService);
        setServices(prevServices =>
          prevServices.map(service =>
            service._id === editingService._id ? updatedService : service
          )
        );
        setEditingService(null);
      } else {
        const newServiceData = await addService(newService);
        setServices(prevServices => [...prevServices, newServiceData]);
      }
      
      // Reset form
      setNewService({
        name: '',
        description: '',
        price: '',
        category: '',
        availability: 'Available',
      });
    } catch (error) {
      console.error('Error handling service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  const handleViewBookings = (serviceId) => {
    navigate(`/bookings/${serviceId}`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Service Provider Dashboard</h1>

      {/* Logout Button */}
      <div className="mb-6">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <ServiceForm
        newService={newService}
        categories={categories}
        editingService={editingService}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <h2 className="text-xl font-semibold mt-6 mb-4">Your Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-medium">{service.name}</h3>
            <p>{service.description}</p>
            <p className="font-bold">Price: ${service.price}</p>
            <p className="italic">Availability: {service.availability}</p>
            <button
              onClick={() => handleEditService(service)}
              className="text-blue-500 hover:underline mt-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleViewBookings(service._id)}
              className="text-green-500 hover:underline mt-2 ml-4"
            >
              View Bookings
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceProviderDashboard;
