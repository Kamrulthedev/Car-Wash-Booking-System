type StarRatingProps = {
    rating: number;
    setRating: (rating: number) => void;
  };

const StarRating = ({ rating, setRating } : StarRatingProps) => {
    return (
        <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-8 h-8 cursor-pointer ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => setRating(index + 1)}
        >
          <path d="M12 .587l3.668 7.425L24 9.748l-6 5.847L19.827 24 12 19.882 4.173 24 6 15.595 0 9.748l8.332-1.736L12 .587z" />
        </svg>
      ))}
    </div>
    );
};

export default StarRating;