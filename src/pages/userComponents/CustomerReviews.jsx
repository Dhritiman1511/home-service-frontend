
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${index < rating ? 'text-white' : 'text-white/40'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  const reviews = [
    {
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Ramila Kaur',
      title: 'Customer',
      rating: 5,
      image: '/Customer1.jpg',
      bgColor: 'bg-[#619BF0]'
    },
    {
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Alia Bhattacharjee',
      title: 'Customer',
      rating: 4,
      image: '/Customer2.jpg',
      bgColor: 'bg-[#5B8EDE]'
    },
    {
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Shibu Shah',
      title: 'Customer',
      rating: 5,
      image: '/Customer3.jpg',
      bgColor: 'bg-[#7B6CF6]'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-5">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-1">Customer reviews</h2>
          <p className="text-xl text-gray-600">What customer tell about us.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="relative">
              <div className={`${review.bgColor} p-8 rounded-[32px] text-white relative`}>
                <StarRating rating={review.rating} />
                <p className="mb-8 text-white/90 leading-relaxed">{review.review}</p>
                <div className="absolute right-20 bottom-6">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-white/80">{review.title}</p>
                </div>
              </div>
              <div className="absolute -right-2 -bottom-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

