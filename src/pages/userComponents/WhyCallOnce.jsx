const WhyCallOnce = () => {
  const features = [
    {
      icon: (
        <img src="/Customer.png" alt="customer.png" />
      ),
      title: '24x7',
      subtitle: 'Customer Service',
      description: 'Our Company Provides High Qualified Professional Workers'
    },
    {
      icon: (
        <img src="/Secure.png" alt="secure.png" />
      ),
      title: '24x7',
      subtitle: 'Customer Service',
      description: 'Our robust Security System ensures your data is always protected, providing confidentiality for business operation.'
    },
    {
      icon: (
        <img src="/247.png" alt="247.png" />
      ),
      title: '24x7',
      subtitle: 'Customer Service',
      description: 'Our dedicated Support team is available for 24/7 for any query and issues.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Why CallOnce</h2>
          <p className="text-xl text-black max-w-full mx-auto">
            Don&apos;t waste time on search manual tasks. Let Automation do it for you. Simplify workflows, reduce errors, and save time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-2">
                <img
                  src={feature.icon.props.src}
                  alt={feature.icon.props.alt}
                  className="w-[200px] h-[200px] p-5 overflow-visible rounded-full border-4 border-black shadow-md"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">{feature.title}</h3>
                <h4 className="text-3xl font-bold mb-3">{feature.subtitle}</h4>
                <p className="text-gray-600 leading-[1.1] font-semibold">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCallOnce;
