import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


type TReview = {
    id: number;
    rating: number;
    feedback: string;
  }
  
  const ReviewSection = () => {
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [reviews, setReviews] = useState<TReview[]>([]);
    const navigate = useNavigate();
  
    // Fetch existing reviews (replace with real data fetch)
    useEffect(() => {
      setReviews([
        { id: 1, rating: 4, feedback: "Great service!" },
        { id: 2, rating: 5, feedback: "Excellent experience!" },
      ]);
    }, []);
  
    // Submit a new review
    const handleSubmit = () => {
      const newReview: TReview = { id: reviews.length + 1, rating, feedback };
      setReviews([newReview, ...reviews]);
      setRating(0);
      setFeedback("");
      Swal.fire({
        title: 'Thank you!',
        text: 'Thank you for your feedback!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    };
  
    // Calculate average rating
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
    return (
      <section className="relative bg-white rounded-lg mx-auto flex justify-between">
        {/* Black Overlay with Login Button */}
        {/* {!isLoggedIn && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login to Leave a Review
            </button>
          </div>
        )} */}
  
        {/* Review Input Fields */}
        <div className={`relative`}>
          <h2 className="text-2xl font-semibold mb-4">Leave Your Feedback</h2>
          <StarRating rating={rating} setRating={setRating} />
          <textarea
            className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className={`mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300`}
          >
            Submit
          </button>
        </div>
  
        {/* Display Overall Rating */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Overall Rating</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            <StarRating rating={Math.round(averageRating)} setRating={() => {}} />
          </div>
        </div>
  
        {/* Last Two Reviews */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Recent Reviews</h3>
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="p-4 border rounded-lg mb-2">
              <StarRating rating={review.rating} setRating={() => {}} />
              <p className="mt-2">{review.feedback}</p>
            </div>
          ))}
          <button
            onClick={() => navigate("/reviews")}
            className="mt-4 py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            See All Reviews
          </button>
        </div>
      </section>
    );
  };
  
  export default ReviewSection;