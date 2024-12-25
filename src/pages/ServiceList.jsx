import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/serviceService';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2>Available Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="font-bold">{service.name}</h3>
            <p>{service.description}</p>
            <Link to={`/services/${service.id}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
