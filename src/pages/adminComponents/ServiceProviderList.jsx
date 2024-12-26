const ServiceProviderList = ({ serviceProviders }) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">All Service Providers</h2>
        <ul>
          {serviceProviders.map((provider) => (
            <li key={provider._id} className="border-b py-2">
              <strong>{provider.name}</strong> - {provider.email} - {provider.phone}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ServiceProviderList;