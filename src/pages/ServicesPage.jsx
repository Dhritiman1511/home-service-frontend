import React from 'react';
import ServiceCard from '../components/ServiceCard';

const mockServices = [
  { title: 'Plumbing', description: 'Fix your pipes and leaks.' },
  { title: 'Cleaning', description: 'Spotless home cleaning services.' },
];

const ServicesPage = () => (
  <div className="container mx-auto mt-8">
    <h1 className="text-2xl font-bold">Our Services</h1>
    <div className="grid grid-cols-3 gap-4 mt-4">
      {mockServices.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  </div>
);

export default ServicesPage;
