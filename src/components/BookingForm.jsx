import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [details, setDetails] = useState({ name: '', date: '', service: '' });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full border p-2"
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        className="w-full border p-2"
        onChange={handleChange}
      />
      <input
        type="text"
        name="service"
        placeholder="Service"
        className="w-full border p-2"
        onChange={handleChange}
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Book Service
      </button>
    </form>
  );
};

export default BookingForm;
