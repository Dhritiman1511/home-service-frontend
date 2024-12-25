import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // For accessing query params
import { createBooking } from '../services/bookingService';
import { getServiceById } from '../services/serviceService';

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId'); // Extract service ID from query params

  const [service, setService] = useState(null); // Holds the service details
  const [formData, setFormData] = useState({
    scheduledDate: '',
    address: '',
    phone: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch service details when the component loads
  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId)
        .then((data) => setService(data))
        .catch((err) => {
          console.log('Error fetching service:', err);
          setError('Unable to fetch service details.');
        });
    }
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingDetails = { 
        ...formData, 
        service: serviceId, 
        status: 'pending' 
      };
      await createBooking(bookingDetails);
      setSuccessMessage('Booking created successfully!');
      setFormData({ scheduledDate: '', address: '', phone: '' });
    } catch (err) {
      console.log('Error creating booking:', err);
      setError('Unable to create booking. Please try again.');
    }
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Form</h1>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {service && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p>{service.description}</p>
          <p className="font-bold">Price: ${service.price}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
