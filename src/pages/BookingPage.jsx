import React from 'react';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  const handleBooking = (details) => {
    console.log('Booking Details:', details);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Book a Service</h1>
      <BookingForm onSubmit={handleBooking} />
    </div>
  );
};

export default BookingPage;
