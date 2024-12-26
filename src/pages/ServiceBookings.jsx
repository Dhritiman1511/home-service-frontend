import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingsByServiceId } from "../services/serviceProviderService";
import { updateBookingStatus } from "../services/bookingService";
import { useAuth } from '../context/AuthContext';

const ServiceBookings = () => {
  const { serviceId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which booking is being updated
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
        setError('Unable to fetch bookings.');
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
    setUpdatingStatus(bookingId); // Show loading state for this booking
    try {
      const updatedBooking = await updateBookingStatus(bookingId, newStatus);
      
      // Immediately update the UI with the new status
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
      
      setError(null);
    } catch (err) {
      console.error("Error updating booking status:", err);
      setError('Unable to update booking status.');
      
      // Revert the status in case of error
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
      setUpdatingStatus(null); // Clear loading state
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      confirmed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (authLoading || loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings for Service</h1>
      {bookings.length === 0 ? (
        <p>No bookings found for this service.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">Booking ID: {booking._id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="font-medium">User: {booking.user.name}</p>
                <p>
                  Scheduled Date:{" "}
                  {new Date(booking.scheduledDate).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p>Address: {booking.address}</p>
                <p>Phone: {booking.phone}</p>
                <div className="mt-4">
                  <label htmlFor={`status-${booking._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Update Status:
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      id={`status-${booking._id}`}
                      value={booking.status}
                      onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                      disabled={updatingStatus === booking._id}
                      className="mt-1 block w-full sm:w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                    {updatingStatus === booking._id && (
                      <span className="text-sm text-gray-500">Updating...</span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceBookings;