import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../services/serviceService';
import { getReviewsForService, postReview, updateReview, deleteReview } from '../services/reviewService';

const ServiceDetails = () => {
  const { serviceId } = useParams(); // Get serviceId from the route params
  const navigate = useNavigate(); // For navigation
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // For editing review
  const [editingReview, setEditingReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    // Fetch the service details
    getServiceById(serviceId)
      .then((data) => setService(data))
      .catch((err) => {
        console.log('Error fetching service details:', err);
        setError('Unable to fetch service details.');
      });

    // Fetch reviews for the service
    getReviewsForService(serviceId)
      .then((data) => setReviews(data))
      .catch((err) => {
        console.log('Error fetching reviews:', err);
        setError('Unable to fetch reviews.');
      });
  }, [serviceId]);

  const handleBookNow = () => {
    // Redirect to the booking form with the service ID
    navigate(`/booking-form?serviceId=${serviceId}`);
  };

  const handlePostReview = async () => {
    try {
      const reviewData = { ...newReview, service: serviceId };
      const postedReview = await postReview(serviceId, reviewData);
      setReviews([...reviews, postedReview]);
      setNewReview({ rating: '', comment: '' }); // Clear review input fields
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
      setIsEditing(null); // Close editing
      setEditingReview({ rating: '', comment: '' });
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
        setReviews(reviews.filter((review) => review._id !== reviewId)); // Remove the review from state
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

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!service) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{service.name}</h1>
      <p className="text-lg mb-4">{service.description}</p>
      <p className="text-lg font-bold mb-4">Price: ${service.price}</p>
      <button
        onClick={handleBookNow}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Book Now
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Reviews</h2>

        {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}

        <div className="mt-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b py-4">
              <div className="flex justify-between">
                <div>
                  <strong>{review.user.name}</strong> - <span>{review.rating} ⭐</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">{isEditing ? 'Edit Review' : 'Add Review'}</h3>
          <div className="mt-4">
            <label className="block">Rating (1-5)</label>
            <input
              type="number"
              value={isEditing ? editingReview.rating : newReview.rating}
              onChange={(e) => (isEditing ? setEditingReview({ ...editingReview, rating: e.target.value }) : setNewReview({ ...newReview, rating: e.target.value }))}
              className="w-full p-2 mt-2 border"
              min="1"
              max="5"
            />
          </div>
          <div className="mt-4">
            <label className="block">Comment</label>
            <textarea
              value={isEditing ? editingReview.comment : newReview.comment}
              onChange={(e) => (isEditing ? setEditingReview({ ...editingReview, comment: e.target.value }) : setNewReview({ ...newReview, comment: e.target.value }))}
              className="w-full p-2 mt-2 border"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={isEditing ? handleUpdateReview : handlePostReview}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {isEditing ? 'Update Review' : 'Post Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
