import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, updateBookingStatus } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authData, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async (userId) => {
      try {
        const data = await getBookings(userId);
        setBookings(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Unable to fetch bookings.');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    // Wait for auth to initialize
    if (authLoading) {
      return;
    }

    // Check if we have auth data
    if (!authData || !authData.token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(authData.token);
      const userId = decodedToken.id;
      if (userId) {
        fetchUserBookings(userId);
      } else {
        setError('Invalid token. Please log in again.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Invalid token. Please log in again.');
      navigate('/login');
    }
  }, [authData, authLoading, navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Unable to cancel booking. Please try again.');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  // Show loading while either auth is initializing or bookings are being fetched
  if (authLoading || loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className="p-6">No bookings available.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="p-4 mb-4 border border-gray-300 rounded shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold">{booking.service.name}</h2>
          <p className="text-gray-600">{booking.service.description}</p>
          <p className="font-bold text-green-600">Price: ${booking.service.price}</p>
          <p>
            Scheduled Date:{' '}
            {new Date(booking.scheduledDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p>Address: {booking.address}</p>
          <p>Phone: {booking.phone}</p>
          <p>
            Status:{' '}
            <span 
              className={`font-bold ${
                booking.status === 'cancelled' 
                  ? 'text-red-500' 
                  : booking.status === 'completed' 
                  ? 'text-green-500' 
                  : 'text-blue-500'
              }`}
            >
              {booking.status}
            </span>
          </p>
          {booking.status !== 'cancelled' && (
            <button
              onClick={() => handleCancelBooking(booking._id)}
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingDetails;