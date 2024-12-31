import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../services/serviceService';
import { getReviewsForService, postReview, updateReview, deleteReview } from '../services/reviewService';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editingReview, setEditingReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    getServiceById(serviceId)
      .then((data) => setService(data))
      .catch((err) => {
        console.log('Error fetching service details:', err);
        setError('Unable to fetch service details.');
      });

    getReviewsForService(serviceId)
      .then((data) => setReviews(data))
      .catch((err) => {
        console.log('Error fetching reviews:', err);
        setError('Unable to fetch reviews.');
      });
  }, [serviceId]);

  const handleBookNow = () => {
    navigate(`/booking-form?serviceId=${serviceId}`);
  };

  const handlePostReview = async () => {
    try {
      const reviewData = { ...newReview, service: serviceId };
      const postedReview = await postReview(serviceId, reviewData);
      setReviews([...reviews, postedReview]);
      setNewReview({ rating: 0, comment: '' });
    } catch (err) {
      console.log('Error posting review:', err);
      setError('Unable to post review.');
    }
  };

  const handleUpdateReview = async () => {
    try {
      const updatedReviewData = { ...editingReview };
      const updatedReview = await updateReview(isEditing, updatedReviewData);
      setReviews(reviews.map((r) => (r._id === updatedReview._id ? updatedReview : r)));
      setIsEditing(null);
      setEditingReview({ rating: 0, comment: '' });
    } catch (err) {
      console.log('Error updating review:', err);
      setError('Unable to update review.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this review?');
      if (confirmation) {
        await deleteReview(reviewId);
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (err) {
      console.log('Error deleting review:', err);
      setError('Unable to delete review.');
    }
  };

  const handleEditReview = (review) => {
    setIsEditing(review._id);
    setEditingReview({ rating: review.rating, comment: review.comment });
  };

  const handleStarClick = (rating, isEditMode = false) => {
    if (isEditMode) {
      setEditingReview({ ...editingReview, rating });
    } else {
      setNewReview({ ...newReview, rating });
    }
  };

  const renderStarRating = (currentRating, isEditMode = false) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        onClick={() => handleStarClick(index + 1, isEditMode)}
        className={`cursor-pointer text-2xl ${
          index < currentRating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
    return <div className="flex space-x-1">{stars}</div>;
  };

  if (error) {
    return <div className="p-6 text-red-500 text-center font-semibold">{error}</div>;
  }

  if (!service) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-full mx-auto px-80 py-20 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{service.name}</h1>
        <p className="text-lg mb-6 text-gray-600">{service.description}</p>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-2xl font-semibold text-gray-800">${service.price}</p>
            <p className="text-sm text-gray-500">Provided by: {service.providerName}</p>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-600 italic">No reviews yet. Be the first to review!</p>
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <strong className="text-gray-800">{review.user.name}</strong>
                  {renderStarRating(review.rating)}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {isEditing ? 'Edit Review' : 'Add Review'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              {renderStarRating(isEditing ? editingReview.rating : newReview.rating, isEditing)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                value={isEditing ? editingReview.comment : newReview.comment}
                onChange={(e) =>
                  isEditing
                    ? setEditingReview({ ...editingReview, comment: e.target.value })
                    : setNewReview({ ...newReview, comment: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
              />
            </div>
            <div>
              <button
                onClick={isEditing ? handleUpdateReview : handlePostReview}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                {isEditing ? 'Update Review' : 'Post Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
