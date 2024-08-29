import FeaturedServices from "../../../components/ui/FeaturedServices";
import HeroCarousel from "../../../components/ui/HeroCarousel";

const Home = () => {
  return (
    <div className="mt-[62px]">
      <HeroCarousel></HeroCarousel>
      <FeaturedServices></FeaturedServices>
    </div>
  );
};

export default Home;
