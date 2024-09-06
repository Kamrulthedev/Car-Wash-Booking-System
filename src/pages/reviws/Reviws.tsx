import { useEffect, useState } from "react";
import { useGetAllReviwsQuery } from "../../redux/features/reviw/ReviwsApi";
import { Spin } from "antd";
import StarRating from "../../components/ui/StarRating";


type TReview = {
    _id?: number;
    rating: number;
    feedback: string;
  };
  
  const Reviws = () => {
    const [reviews, setReviews] = useState<TReview[]>([]);
  
    // Fetch all reviews
    const { data, isLoading, error } = useGetAllReviwsQuery(undefined);
  
    useEffect(() => {
      if (data && data.data && Array.isArray(data.data)) {
        // Convert reviews data to match TReview type
        const formattedReviews: TReview[] = data.data.map((review: any) => ({
          _id: review?._id,
          feedback: review?.feedback || "",
          rating: Number(review?.rating) || 0,
        }));
        setReviews(formattedReviews);
      }
    }, [data]);
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500">An error occurred while fetching reviews.</p>
        </div>
      );
    }
  
    return (
      <div
        className="min-h-screen bg-cover bg-center p-8"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/hRysFLD/photo-1603240752514-448ad9767e2b.jpg')`, 
        }}
      >
        <div className="max-w-4xl mx-auto bg-white bg-opacity-80 rounded-lg shadow-lg p-6 mt-10">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Customer Reviews</h1>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="p-6 mb-6 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} setRating={() => {}} />
                  <span className="ml-2 text-sm text-gray-600">
                    {review.rating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="mt-2 text-gray-700 text-lg">{review.feedback}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews found.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Reviws;