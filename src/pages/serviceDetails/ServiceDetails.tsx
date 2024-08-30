import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  return (
    <div className="mt-[62px]">
      <h1>dddddddddddddddddddddddd {id}</h1>
    </div>
  );
};

export default ServiceDetails;
