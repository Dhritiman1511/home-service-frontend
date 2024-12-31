import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { getServicesByCategory } from "../services/serviceService";

const ServiceList = () => {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesAndCategories = async () => {
      try {
        const categories = await getCategories();
        const servicesByCat = {};
        await Promise.all(
          categories.map(async (category) => {
            const data = await getServicesByCategory(category._id);
            servicesByCat[category.name] = data.services || [];
          })
        );
        setServicesByCategory(servicesByCat);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServicesAndCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-slate-400 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading services...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(servicesByCategory).map(([category, services]) => (
          <div key={category} className="mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-slate-800 py-8 px-6">
                <h2 className="text-3xl font-semibold text-white text-center">{category}</h2>
                <p className="text-white text-center mt-2">
                  Discover premium {category.toLowerCase()} services
                </p>
              </div>
              <div className="p-6">
                {services.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {services.map((service) => (
                      <Link
                        to={`/service/${service._id}`}
                        key={service._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                      >
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-80">
                          <img
                            src={service.icon || "/PlumberLogo.jpg"}
                            alt={service.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{service.name}</h3>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-teal-600 text-xs font-semibold bg-teal-100 px-2 py-1 rounded-full">
                              {service.rating || "4.0"} ★
                            </span>
                            <span className="text-gray-600 text-xs font-medium">
                              From ₹{service.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No services available</h3>
                    <p className="mt-1 text-sm text-gray-500">Stay tuned, more exciting services are coming soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
