import Hero from "../Components/Hero";
import Campaign from "../Components/Campaign";
import Steps from "../Components/Steps";
import Features from "../Components/Features";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Campaign />
      <Steps />
    </div>
  );
};

export default Home;
