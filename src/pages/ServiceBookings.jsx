import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingsByServiceId } from "../services/serviceProviderService";
import { updateBookingStatus } from "../services/bookingService";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Calendar, Clock, Phone, MapPin, User } from 'lucide-react';

const ServiceBookings = () => {
  const { serviceId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const { authData, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByServiceId(serviceId);
        setBookings(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error('Failed to fetch bookings. Please try again.');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (authLoading) return;

    if (!authData || !authData.token) {
      navigate('/login');
      return;
    }

    fetchBookings();
  }, [serviceId, authData, authLoading, navigate]);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    const loadingToast = toast.loading('Updating booking status...');
    setUpdatingStatus(bookingId);
    
    try {
      await updateBookingStatus(bookingId, newStatus);
      
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
      
      toast.success('Booking status updated successfully!', {
        id: loadingToast,
      });
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error('Failed to update booking status.', {
        id: loadingToast,
      });
      
      const originalBooking = bookings.find(b => b._id === bookingId);
      if (originalBooking) {
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId
              ? { ...booking, status: originalBooking.status }
              : booking
          )
        );
      }
      
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusBorderColor = (status) => {
    const colors = {
      completed: 'border-green-200',
      cancelled: 'border-red-200',
      confirmed: 'border-blue-200',
      pending: 'border-yellow-200'
    };
    return colors[status] || 'border-gray-200';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Bookings</h1>
        <p className="text-gray-600 mt-2">Manage your service bookings and their statuses</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No Bookings Found</h3>
          <p className="text-gray-600">There are currently no bookings for this service.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border-2 ${getStatusBorderColor(booking.status)}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <h3 className="text-lg font-medium text-gray-800">{booking._id}</h3>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="font-medium">{booking.user.name}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Scheduled Date</p>
                      <p>{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Scheduled Time</p>
                      <p>{new Date(booking.scheduledDate).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.address}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <label htmlFor={`status-${booking._id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Update Booking Status
                  </label>
                  <select
                    id={`status-${booking._id}`}
                    value={booking.status}
                    onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                    disabled={updatingStatus === booking._id}
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceBookings;