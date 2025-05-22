import { BsCheck2Circle } from "react-icons/bs";

const AboutPageCard = () => {
  return (
    <div>
      {/* Project Title */}
      <h1 className="text-3xl font-bold  sm:text-4xl lg:text-5xl lg:leading-tight text-white">
        1omi.
      </h1>

      {/* Introduction */}
      <p className="mt-2 md:text-lg  text-gray-300">
        Lomi is a revolutionary crowdfunding platform that connects creators,
        innovators, and change-makers with supporters worldwide. Whether
        you&apos;re an entrepreneur, artist, or social activist, Lomi gives you
        the tools you need to bring your ideas to life.
      </p>
      {/* Closing Statement */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold  text-gray-300">Why Lomi?</h2>
        <p className=" text-gray-300 mt-2">
          Inspired by the Amharic parable,{" "}
          <i>&quot;ሀምሳ ሎሚ ለሀምሳ ሰው ጌጡ ለአንድ ሰው ሸክሙ&quot;</i> which means &quot;50
          lemons are load for one person but jewelry for fifty,&quot; Lomi
          embodies the spirit of collective effort. We are here to make your
          journey to success lighter, impactful, and truly collaborative.
        </p>
      </div>

      {/* Key Features */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold  text-gray-300">Key Features:</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-x-3">
            <BsCheck2Circle className="text-lime-400 size-10" />
            <span className=" text-gray-300">
              <strong>Effortless Campaign Management:</strong> Launch and manage
              your campaign with intuitive tools and easy-to-use interfaces.
            </span>
          </li>
          <li className="flex items-start gap-x-3">
            <BsCheck2Circle className="text-lime-400 size-10" />
            <span className=" text-gray-300">
              <strong>Transparent and Secure Funding:</strong> Built on
              blockchain technology, ensuring secure, transparent contributions
              and fund distribution.
            </span>
          </li>
          <li className="flex items-center gap-x-3">
            <BsCheck2Circle className="text-lime-400 size-10" />
            <span className=" text-gray-300">
              <strong>Real-time Insights and Analytics:</strong> Track the
              progress of your campaign with real-time data, helping you make
              informed decisions.
            </span>
          </li>
        </ul>
      </div>

      {/* Community Invitation */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold  text-gray-300">
          Join Our Community of Innovators:
        </h2>
        <p className=" text-gray-300 mt-2">
          At Lomi, we believe in the power of community. Whether you&apos;re
          raising funds for a new product, an inspiring cause, or a
          groundbreaking idea, we are here to support you every step of the way.
        </p>
        <p className=" text-gray-300 mt-4">
          Our platform is designed to provide you with the best tools and
          resources, from campaign creation to promotion, helping you connect
          with a global network of supporters. Together, let&apos;s turn your
          vision into reality.
        </p>
      </div>
    </div>
  );
};

export default AboutPageCard;
