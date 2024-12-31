import { Link } from "react-router-dom";

const PopularServices = () => {
  const services = [
    {
      title: "Car repairing",
      description: "Professional car repair services",
      image: "/CarRepairing.png",
    },
    {
      title: "Plumber",
      description: "Expert plumbing solutions",
      image: "/Plumber.png",
    },
    {
      title: "Carpenter",
      description: "Quality carpentry work",
      image: "/Carpenter.png",
    },
    {
      title: "AC repairing",
      description: "Complete AC maintenance",
      image: "/ACrepair.png",
    },
  ];

  return (
    <section className="py-5 pl-6">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-extrabold mb-8">Popular services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative flex bg-gradient-to-r from-[#45389B] to-[#292259] text-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="relative w-1/2 mt-1 h-full pt-5 flex-shrink-0">
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 object-cover w-full h-full hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-200 mb-4">{service.description}</p>
            <Link to="/services">
              <button className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
                Book now
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default PopularServices;
