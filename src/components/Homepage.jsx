import Slider from "../pages/Slider";
import Categories from "../pages/Categories";
import ChooseUs from "../pages/ChooseUs";
import PerfectMatch from "../pages/PerfectMatch";
import ScrollReveal from "../components/ScrollReveal";
import Options from "../pages/Options";
import NewlyLaunched from "../pages/NewlyLaunched";

const Homepage = () => {
  return (
    <div>
      <div className="mt-32 md:mt-[75px] z-40 bg-white">
        <ScrollReveal>
          <Options />
        </ScrollReveal>
        <ScrollReveal>
          <Slider />
        </ScrollReveal>
      </div>  
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <ScrollReveal>
          <Categories />
        </ScrollReveal>

        <ScrollReveal>
          <PerfectMatch />
        </ScrollReveal>

        <ScrollReveal>
          <ChooseUs />
        </ScrollReveal>

        <ScrollReveal>
          <NewlyLaunched />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Homepage;
