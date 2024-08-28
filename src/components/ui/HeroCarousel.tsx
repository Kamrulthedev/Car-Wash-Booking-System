
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
    const navigate = useNavigate();

    // Settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <section className="relative h-screen overflow-hidden">
            <Slider {...settings}>
                {/* Slide 1 */}
                <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://i.ibb.co/L6Yd3jD/car-wash-bg.jpg')` }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-60"></div>

                    {/* Content */}
                    <div className="relative container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Premium Hand Car Wash
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl">
                            The best car wash experience tailored for your needs.
                        </p>
                        <button 
                            onClick={() => navigate('/services')}
                            className="px-8 py-3 bg-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
                        >
                            Book Your Service
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://i.ibb.co/4TP8XvY/car-wash-bg-2.jpg')` }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-60"></div>

                    {/* Content */}
                    <div className="relative container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Quality Detailing Services
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl">
                            Make your car shine like new.
                        </p>
                        <button 
                            onClick={() => navigate('/services')}
                            className="px-8 py-3 bg-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Add more slides as needed */}
            </Slider>
        </section>
    );
};

export default HeroCarousel;
