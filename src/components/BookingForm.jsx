import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createBooking } from '../services/bookingService';
import { getServiceById } from '../services/serviceService';

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    scheduledDate: '',
    address: '',
    phone: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId)
        .then((data) => {
          setService(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Error fetching service:', err);
          setError('Unable to fetch service details.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookingDetails = { 
        ...formData, 
        service: serviceId, 
        status: 'pending' 
      };
      await createBooking(bookingDetails);
      setSuccessMessage('Booking created successfully!');
      setFormData({ scheduledDate: '', address: '', phone: '' });
      setError(null);
      // Redirect to payment page
      navigate('/payment');
    } catch (err) {
      console.log('Error creating booking:', err);
      setError('Unable to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Your Service</h1>
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                <p className="font-medium">{successMessage}</p>
              </div>
            )}
            {service && (
              <div className="mb-8 p-6 bg-slate-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h2>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <p className="text-lg font-bold text-slate-600">Price: ${service.price}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  id="scheduledDate"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500 transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-slate-600 text-white font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
