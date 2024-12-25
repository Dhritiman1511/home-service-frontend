import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { getBookings, updateBookingStatus } from '../services/bookingService';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode to decode the JWT token

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Retrieve the JWT token from cookies
  const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT token to get user data
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // If userId is available, fetch bookings
        fetchUserBookings(userId);
      } catch (error) {
        console.log('Error decoding token:', error);
        setError('Invalid token. Please log in again.');
        navigate('/login'); // Redirect to login if token is invalid
      }
    } else {
      // If no token, redirect to login page
      setError('No token found. Please log in.');
      navigate('/login');
    }
  }, [token, navigate]);

  const fetchUserBookings = async (userId) => {
    try {
      const data = await getBookings(userId); // Fetch bookings for the userId
      setBookings(data);
    } catch (err) {
      console.log('Error fetching bookings:', err);
      setError('Unable to fetch bookings.');
    }
  };

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
      console.log('Error canceling booking:', err);
      setError('Unable to cancel booking. Please try again.');
    }
  };

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
          className="p-4 mb-4 border border-gray-300 rounded shadow"
        >
          <h2 className="text-xl font-semibold">{booking.service.name}</h2>
          <p>{booking.service.description}</p>
          <p className="font-bold">Price: ${booking.service.price}</p>
          <p>Scheduled Date: {new Date(booking.scheduledDate).toLocaleDateString()}</p>
          <p>Address: {booking.address}</p>
          <p>Phone: {booking.phone}</p>
          <p>Status: <span className="font-bold">{booking.status}</span></p>
          {booking.status !== 'cancelled' && (
            <button
              onClick={() => handleCancelBooking(booking._id)}
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
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
