/* eslint-disable react/prop-types */

const ServiceList = ({ services, handleEditService, handleDeleteService }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <ul className="mb-6">
        {services.map((service) => (
          <li key={service._id} className="p-4 bg-gray-100 rounded shadow mb-4">
            <h3 className="text-lg font-medium">{service.name}</h3>
            <p className="text-lg font-medium">{service.providerName}</p>
            <p className="text-sm">{service.description}</p>
            <p className="text-sm font-bold">Price: ${service.price}</p>
            <p className="text-sm">Category: {service.category}</p>
            <p className="text-sm">Availability: {service.availability}</p>
            <p className="text-sm">Created At: {new Date(service.createdAt).toLocaleString()}</p>
            <p className="text-sm">Updated At: {new Date(service.updatedAt).toLocaleString()}</p>
            <button
              onClick={() => handleEditService(service)}
              className="text-blue-500 hover:underline mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteService(service._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
