import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Get the authentication state from the Redux store
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);

  return (
    <div
      className="flex h-96 mt-[62px] flex-col items-center justify-center font-serif min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://i.ibb.co/Tcr6kjy/internet-network-warning-404-error-page-file-found-web-page-1150-48308.jpg')`,
      }}
    >
      <h1 className="text-5xl font-bold mb-4 text-black">404</h1>
      <p className="text-xl mb-8 text-black">
        Oops! The page you are looking for does not exist.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/")}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
        {/* Conditionally render the 'Go to Login' button based on authentication state */}
        {!isAuthenticated && (
          <button
            onClick={() => navigate("/login")}
            className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
