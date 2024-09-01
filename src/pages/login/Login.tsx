import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/AuthApi";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading, isError, isSuccess, error: apiError }] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have logged in successfully.",
      });

      // Dispatch user data to Redux store
      dispatch(setUser({ user: result.data, token: result.token }));

      console.log("Login successful:", result.token, result.data);

      // Redirect to home or dashboard
      navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials and try again.");
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.data?.message || error,
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen lg:mt-[62px]">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/NrYkcBd/washing-process-self-service-car-wash-1124848-16980.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          zIndex: -1,
        }}
      />
      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded transition duration-300 ${
                isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              New user?
              <Link
                to="/register"
                className="text-blue-500 ml-2 hover:text-blue-700"
              >
                Sign Up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
