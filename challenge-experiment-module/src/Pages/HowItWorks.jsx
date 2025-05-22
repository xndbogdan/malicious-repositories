import Steps from "../Components/Steps";

const HowItWorks = () => {
  return (
    <div className="lg:py-32 py-20">
      <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-bottom-left -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 "></div>
      </div>
      <div className="mx-auto max-w-6xl">
        <Steps />
      </div>
    </div>
  );
};

export default HowItWorks;
