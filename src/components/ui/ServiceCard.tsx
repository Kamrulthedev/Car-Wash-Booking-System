import { Link } from "react-router-dom";


type ServiceCardProps = {
    title: string;
    price: string;
    duration: string;
    description?: string;
    linkText: string;
    link: string;
  };

const ServiceCard = ({ title, price, duration, linkText, link }: ServiceCardProps) => {
  return (
    <div className="border border-white p-3 lg:p-6 text-center text-white bg-opacity-80 backdrop-blur-md rounded-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-1">{price}</p>
      <p className="text-sm mb-4">{duration}</p>
      <Link
        to={link}
        className="text-sm underline hover:text-green-500 transition"
      >
        {linkText}
      </Link>
    </div>
  );
};


  

export default ServiceCard;
