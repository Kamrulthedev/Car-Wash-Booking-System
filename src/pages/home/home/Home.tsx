import Address from "../../../components/ui/Adress";
import FeaturedServices from "../../../components/ui/FeaturedServices";
import HeroCarousel from "../../../components/ui/HeroCarousel";
import ReviewSection from "../../../components/ui/ReviewSection";

const Home = () => {
  return (
    <div className="mt-16 lg:mt-[62px]">
      <HeroCarousel></HeroCarousel>
      <FeaturedServices></FeaturedServices>
      <ReviewSection></ReviewSection>
      <Address></Address>
    </div>
  );
};

export default Home;
