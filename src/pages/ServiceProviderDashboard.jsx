import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProviderBookings, getProviderEarnings } from '../services/serviceProviderService';
import { Link } from 'react-router-dom';

const ServiceProviderDashboard = () => {
  const { authData } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // Fetch provider's bookings and earnings
    if (authData) {
      getProviderBookings(authData.userId)
        .then(data => setBookings(data))
        .catch(error => console.log('Error fetching bookings', error));

      getProviderEarnings(authData.userId)
        .then(data => setEarnings(data))
        .catch(error => console.log('Error fetching earnings', error));
    }
  }, [authData]);

  return (
    <div>
      <h1>Service Provider Dashboard</h1>
      <div>
        <h2>Bookings</h2>
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <div>
                <h3>{booking.serviceName}</h3>
                <p>Status: {booking.status}</p>
                <Link to={`/booking/${booking.id}`}>Update Booking</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Earnings</h2>
        <p>Total Earnings: ${earnings}</p>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;