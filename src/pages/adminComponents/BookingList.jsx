/* eslint-disable react/prop-types */
const BookingList = ({
    bookings,
    handleEditBooking,
    handleDeleteBooking,
    handleUpdateBookingStatus,
  }) => {
    return (
      <div className="my-6">
        <h2 className="text-xl font-bold mb-4">Booking List</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{booking._id}</td>
                <td className="py-2 px-4 border-b">{booking.user.name}</td>
                <td className="py-2 px-4 border-b">{booking.service.name}</td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                  {booking.status !== 'completed' && (
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                      onClick={() => handleUpdateBookingStatus(booking._id, 'completed')}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BookingList;
  