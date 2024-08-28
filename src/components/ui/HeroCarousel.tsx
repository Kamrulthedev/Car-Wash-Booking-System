import { Carousel } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

// Style for carousel content
const contentStyle: React.CSSProperties = {
  height: "100vh", // Full viewport height
  color: "#fff",
  textAlign: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

// Hero Carousel component
const HeroCarousel = () => {
  const navigate = useNavigate();

  return (
    <section>
      <Carousel autoplay dotPosition="bottom" arrows infinite={false}>
        {/* Slide 1 */}
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage:
                "url('https://i.ibb.co/Z6z7zH2/man-cleaning-red-sports-car-with-power-washer-rainy-afternoon-garage-area-1090747-488.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay for dark effect */}
            <div className="relative text-center z-10 px-6 py-24">
              <h1 className="text-4xl md:text-6xl font-serif mb-6">
                Premium Hand Car Wash
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-serif">
                The best car wash experience tailored for your needs.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="px-8 font-serif py-3 bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>
        {/* Slide 2 */}
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage:
                "url('https://i.ibb.co/Z8cbvyd/man-with-beard-washes-gray-car-with-highpressure-apparatus-night-car-wash-1027059-15207.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay */}
            <div className="relative text-center z-10 px-6 py-24">
              <h1 className="text-4xl md:text-6xl font-serif mb-6">
                Quality Detailing Services
              </h1>
              <p className="text-lg md:text-xl mb-8 font-serif max-w-2xl mx-auto">
                Make your car shine like new.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="px-8 py-3 font-serif  bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        {/* Slide 3 */}
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage:
                "url('https://i.ibb.co/mDjJcJ8/man-polishing-car-inside-car-service-1303-26881.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay */}
            <div className="relative text-center z-10 px-6 py-24">
              <h1 className="text-4xl md:text-6xl font-serif  mb-6">
                Quality Detailing Services
              </h1>
              <p className="text-lg md:text-xl font-serif  mb-8 max-w-2xl mx-auto">
                Make your car shine like new.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="px-8 py-3 font-serif  bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        {/* Slide 4 */}
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage:
                "url('https://i.ibb.co/6FxgfHh/car-wash-expert-using-water-pressure-washer-clean-red-modern-sportscar-generated-by-ai-1020649-507.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay */}
            <div className="relative text-center z-10 px-6 py-24">
              <h1 className="text-4xl md:text-6xl font-serif  mb-6">
                Quality Detailing Services
              </h1>
              <p className="text-lg md:text-xl font-serif  mb-8 max-w-2xl mx-auto">
                Make your car shine like new.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="px-8 py-3 font-serif  bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Additional slides can be added similarly */}
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
